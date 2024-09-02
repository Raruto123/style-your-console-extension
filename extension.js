// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	//commande pour insérer un console.log() simple stylisé
	let disposable = vscode.commands.registerCommand(
		"extension.insertStyledVoidConsoleLog", () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const snippet = new vscode.SnippetString(
				'\nconsole.log("%cYour text goes here", "Your CSS goes here")\n'
			);
			const position = editor.selection.active;
			const document = editor.document;
	
			let newPosition;
	
			if (position.line === document.lineCount - 1) {
				// Si le curseur est sur la dernière ligne, on insère le snippet à la fin du document
				newPosition = position.with(position.line, document.lineAt(position.line).range.end.character);
			} else {
				// Sinon, on l'ajoute à la ligne suivante
				newPosition = position.with(position.line + 1, 0);
			}
			editor.insertSnippet(snippet, newPosition);
		}
	});
	//commande pour insérer un console.log() stylisé avec une variable
	let disposableWithVariable = vscode.commands.registerCommand("extension.insertStyledWithVariableConsoleLog", () => {
		const editor= vscode.window.activeTextEditor;
		if (editor) {
			const selection = editor.selection;
			//To trim the spaces
			let text = editor.document.getText(selection).trim();
			if (text) {
				const insertPosition = selection.end.with(selection.end.line + 1, 0); //Go back to the line

				editor.edit((editBuilder) => {
					editBuilder.insert(insertPosition, `\nconsole.log(\`%cAny text you want\${${text}}\`, "your css goes here");\n`)
				}).then(() => {
					editor.selection = new vscode.Selection(insertPosition, insertPosition);//Place the cursors on a new line
				})
			};
		};
	});

	let disposableComment = vscode.commands.registerCommand('extension.commentAllConsoleLogs', function () {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const text = editor.document.getText();
			const regex = /(console\.log\(`%cAny text you want.*\);)/g;
			const commentedText = text.replace(regex, "// $1");
	
			editor.edit(editBuilder => {
				const firstLine = editor.document.lineAt(0);
				const lastLine = editor.document.lineAt(editor.document.lineCount - 1);
				const fullRange = new vscode.Range(firstLine.range.start, lastLine.range.end);
				editBuilder.replace(fullRange, commentedText);
			});
		}
	});

	let disposableUncomment = vscode.commands.registerCommand('extension.uncommentAllConsoleLogs', function () {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const text = editor.document.getText();
			const regex = /\/\/\s*(console\.log\(`%cAny text you want.*\);)/g;
			const uncommentedText = text.replace(regex, "$1");
	
			editor.edit(editBuilder => {
				const firstLine = editor.document.lineAt(0);
				const lastLine = editor.document.lineAt(editor.document.lineCount - 1);
				const fullRange = new vscode.Range(firstLine.range.start, lastLine.range.end);
				editBuilder.replace(fullRange, uncommentedText);
			});
		}
	});

	let disposableDelete = vscode.commands.registerCommand('extension.deleteAllConsoleLogs', function () {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const text = editor.document.getText();
			const regex = /console\.log\(`%cAny text you want.*\);/g;
			const deletedText = text.replace(regex, "");
	
			editor.edit(editBuilder => {
				const firstLine = editor.document.lineAt(0);
				const lastLine = editor.document.lineAt(editor.document.lineCount - 1);
				const fullRange = new vscode.Range(firstLine.range.start, lastLine.range.end);
				editBuilder.replace(fullRange, deletedText);
			});
		}
	});


	context.subscriptions.push(disposable);
	context.subscriptions.push(disposableWithVariable);
	context.subscriptions.push(disposableComment);
	context.subscriptions.push(disposableDelete);
	context.subscriptions.push(disposableUncomment);

	
}
// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
