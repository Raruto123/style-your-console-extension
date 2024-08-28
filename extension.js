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
	let disposable = vscode.commands.registerCommand("extension.insertStyledVoidConsoleLog", () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const snippet = new vscode.SnippetString('\nconsole.log("%cYour text goes here", "Your CSS goes here")\n');
			editor.insertSnippet(snippet, editor.selection.end.with(editor.selection.end.line + 1, 0));
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

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposableWithVariable);
	
}
// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
