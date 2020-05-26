const open = require('open');
const chalk = require('chalk');
const readline = require('readline');
const {default: generatorDefault} = require('node-plop/lib/generator-runner');
const path = require('path');

function askQuestion(query) {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	return new Promise(resolve => rl.question(query, ans => {
		rl.close();
		resolve(ans);
	}))
}

const setupAzureNpm = async (answers, config, plop) => {
	const {runGeneratorActions} = generatorDefault(plop, {})
	const {registryUrl, projectName} = config;
	await open(`https://dev.azure.com/${projectName}/_usersSettings/tokens`);

	console.log("Then, simply press the button labeled:");
	console.log(chalk.bold.blue('+ New Token'));
	console.log("");
	console.log("This will open a dialog to create a token. Look for the header labeled:");
	console.log(`${chalk.bold.blue('Packaging')} and select the value ${chalk.blue("Read, write, & manage")}`);
	console.log("");
	console.log("Give the token a 'Name' (at the top) and finally press:");
	console.log(chalk.bold.blue('Create'));
	console.log("");
	console.log(`Once this is done, you should see a screen that says ${chalk.bold('Success')}`);
	console.log("This screen will have a token input box with a copy button next to it.");
	console.log(chalk.bold("Copy this value and paste it here"));

	// Pause plop spinner if the project is using plop
	if (config.progressSpinner) {
		config.progressSpinner.stop();
	}

	const token = await askQuestion("Enter your user token here: ");

	const base64Token = Buffer.from(token).toString('base64');

	if (config.progressSpinner) {
		config.progressSpinner.start();
	}

	await runGeneratorActions({
		name: 'Azure NPM Setup',
		actions: [
			{
				type: 'add',
				path: `${process.cwd()}/.npmrc`,
				templateFile: path.join(__dirname, '.npmrc.bak'),
				data: {
					registryUrl,
					projectName,
					base64Token
				}
			}
		]
	})
	return;
}

module.exports = function (plop) {
	plop.setDefaultInclude({ actionTypes: true });
	plop.setActionType('setupAzureNPM', setupAzureNpm);
};
