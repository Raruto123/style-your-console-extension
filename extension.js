// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	//command to insert a simple console.log()
	let disposable = vscode.commands.registerCommand(
		"styleYourConsole.insertStyledVoidConsoleLog", () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const snippet = new vscode.SnippetString(
				'\nconsole.log(\`%c🎨 ⍨ \`, "Your_CSS_Goes_Here")'
			);
			// '\nconsole.log(\`%c🎨 ⍨ \`, "Your_CSS_Goes_Here")\n'
			const position = editor.selection.active;  
			const document = editor.document;
	
			let newPosition;
	
			if (position.line === document.lineCount - 1) {
				//If the cursor is on the last line, the snippet is inserted at the end of the document.
				newPosition = position.with(
					position.line, 
					document.lineAt(position.line).range.end.character
				);
			} else {
				//Otherwise, we add it to the following line
				// newPosition = position.with(position.line + 1, 0);
				newPosition = position.with(
					position.line, 
					document.lineAt(position.line).range.end.character
				);
			}
			editor.insertSnippet(snippet, newPosition);
		}
	});

	// let disposableWithVariable = vscode.commands.registerCommand(
	// 	"styleYourConsole.insertStyledWithVariableConsoleLog", () => {
	// 	const editor= vscode.window.activeTextEditor;
	// 	if (editor) {
	// 		const selection = editor.selection;
	// 		//To trim the spaces
	// 		let text = editor.document.getText(selection).trim();
	// 		if (text) {
	// 			const insertPosition = selection.end.with(
	// 				selection.end.line + 1,
	// 				0
	// 			); //Go back to the line

	// 			editor.edit((editBuilder) => {
	// 				editBuilder.insert(insertPosition, 
	// 					`console.log(\`%c🎨 ⍨ \${${text}}\`, "Your_CSS_Goes_Here");\n`
	// 				)
	// 			})
	// 			// .then(() => {
	// 			// 	editor.selection = new vscode.Selection(
	// 			// 		insertPosition, insertPosition
	// 			// 	);//Place the cursors on a new line
	// 		};
	// 	};
	// });

	// //ccommand to insert a console.log() with a variable
	// let disposableWithVariable = vscode.commands.registerCommand(
	// 	"styleYourConsole.insertStyledWithVariableConsoleLog", () => {
	// 		const editor = vscode.window.activeTextEditor;
	// 		if (editor) {
	// 			const selection = editor.selection;
	// 			// Pour supprimer les espaces inutiles
	// 			let text = editor.document.getText(selection).trim();
	// 			if (text) {
	// 				// Obtenir le numéro de ligne où se termine la sélection
	// 				const lineNumber = selection.end.line;
	// 				// Récupérer le texte de cette ligne
	// 				const lineText = editor.document.lineAt(lineNumber).text;
	// 				// Extraire l'indentation (espaces ou tabulations) en début de ligne
	// 				const leadingWhitespace = lineText.match(/^\s*/)[0];
	
	// 				// Position où insérer le console.log (ligne suivante)
	// 				const insertPosition = new vscode.Position(lineNumber + 1, 0);

	// 				// Préparer la ligne de console.log avec la bonne indentation
	// 				const consoleLogLine = leadingWhitespace + `console.log(\`%c🎨 ⍨ \${${text}} ⍨ ${text}\`, "Your_CSS_Goes_Here");\n`;
	
	// 				editor.edit((editBuilder) => {
	// 					editBuilder.insert(insertPosition, consoleLogLine);
	// 				});
	// 				// Si vous souhaitez déplacer le curseur à la nouvelle ligne, vous pouvez décommenter le code ci-dessous
	// 				// .then(() => {
	// 				//     editor.selection = new vscode.Selection(
	// 				//         insertPosition, insertPosition
	// 				//     ); // Place le curseur sur la nouvelle ligne
	// 				// });
	// 			}
	// 		}
	// 	}
	// );

	let disposableWithVariable = vscode.commands.registerCommand(
		"styleYourConsole.insertStyledWithVariableConsoleLog", () => {
			const editor = vscode.window.activeTextEditor;
			if (editor) {
				const selection = editor.selection;
				// Pour supprimer les espaces inutiles
				let text = editor.document.getText(selection).trim();
				if (text) {
					// Obtenir le numéro de ligne où se termine la sélection
					const lineNumber = selection.end.line;
					// Récupérer le texte de cette ligne
					const lineText = editor.document.lineAt(lineNumber).text;
					// Extraire l'indentation (espaces ou tabulations) en début de ligne
					const leadingWhitespace = lineText.match(/^\s*/)[0];
	
					// Position où insérer le console.log (à la fin de la ligne actuelle)
					const lineEndPosition = editor.document.lineAt(lineNumber).range.end;
	
					// Préparer la ligne de console.log avec un saut de ligne et la bonne indentation
					const consoleLogLine = `\n${leadingWhitespace}console.log(\`%c🎨 ⍨ \${${text}} ⍨ ${text}\`, "Your_CSS_Goes_Here");`;
	
					editor.edit((editBuilder) => {
						editBuilder.insert(lineEndPosition, consoleLogLine);
					});
				}
			}
		}
	);


	//command to comment all console.log() with a variable
	let disposableComment = vscode.commands.registerCommand(
		'styleYourConsole.commentAllConsoleLogs', function () {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const text = editor.document.getText();
			const regex = /^(\s*)(\/\/\s*)?(console\.log\(`%c🎨 ⍨ .*\);)/gm;
			const commentedText = text.replace(regex, "$1// $3" )
	
			editor.edit(editBuilder => {
				const firstLine = editor.document.lineAt(0);//To get the first line of a document
				const lastLine = editor.document.lineAt(editor.document.lineCount - 1);
				const fullRange = new vscode.Range(
					firstLine.range.start, lastLine.range.end
				);//To obtain the full range between the first and last line
				editBuilder.replace(fullRange, commentedText);
			});
		}
	});

	//command to uncomment all console.log() with a variable
	let disposableUncomment = vscode.commands.registerCommand(
		'styleYourConsole.uncommentAllConsoleLogs', function () {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const text = editor.document.getText();
			const regex = /^(\s*\/\/\s*)+(console\.log\(`%c🎨 ⍨ .*\);)/gm;
			// const uncommentedText = text.replace(regex, " ");
			const uncommentedText = text.replace(regex, "$2")
	
			editor.edit(editBuilder => {
				const firstLine = editor.document.lineAt(0);
				const lastLine = editor.document.lineAt(editor.document.lineCount - 1);
				const fullRange = new vscode.Range(
					firstLine.range.start, lastLine.range.end);
				editBuilder.replace(fullRange, uncommentedText);
			});
		}
	});

	//command to delete all console.log() with a variable
	let disposableDelete = vscode.commands.registerCommand(
		'styleYourConsole.deleteAllConsoleLogs', function () {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const text = editor.document.getText();
			// const regex = /console\.log\(`%c🎨 ⍨ .*\);/g;
			// Expression régulière améliorée
			const regex = /^[\t ]*(\/\/\s*)*console\.log\(`%c🎨 ⍨ .*?\);\s*$/gm;
			const deletedText = text.replace(regex, "");
			// const deletedText = text.replace(regex, "");

	
			editor.edit(editBuilder => {
				const firstLine = editor.document.lineAt(0);
				const lastLine = editor.document.lineAt(editor.document.lineCount - 1);
				const fullRange = new vscode.Range(
					firstLine.range.start, lastLine.range.end);
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
