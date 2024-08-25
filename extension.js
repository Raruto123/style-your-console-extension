// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let disposable = vscode.commands.registerCommand("extension.insertStyledVoidConsoleLog", () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const newLine = editor.document.lineAt(5);
			const snippet = new vscode.SnippetString('\nconsole.log("%cYour text goes here", "Your CSS goes here")');
			editor.insertSnippet(snippet);
			vscode.window.showInformationMessage(`${newLine.lineNumber}`);
		}
	});

	context.subscriptions.push(disposable);
	
}
// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
