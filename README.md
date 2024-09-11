# Main Functionality
Style Your Console makes debugging a lot clearer by letting you style what's written in the console.

# Features
## Primary features

### I) Insert a void console.log
By void I mean a log message without a pre-determined variable. Useful if you just want to print a state message like "Success"/"Error" and you want to distinguish the two by color (Succes in blue, Error in red for example).
To do this :
- Pressing Ctrl + Alt + Z (Windows) or Control + Option + Z (Mac)
The log message will be inserted in the next lines like the following : 
`console.log(`%c🎨 ⍨ `, "Your_CSS_Goes_Here")`
### II) Insert a log message with a variable
A log message with a pre-determined variable. Perfect to track the value of something and with this extension you can track multiples variables and see through all of them easily by adding different CSS style on each.
To do this :
- Selecting the variable which is the subject of the debugging
- Pressing Ctrl + Alt + L (Windows) or Control + Option + L (Mac)
The log message will be inserted in the next lines like the following : 
`console.log(`%c🎨 ⍨ ${variable}`, "Your_CSS_Goes_Here");`

## Secondary features
All the following features here work only on the second primary feature (the one which insert with a variable). 
Work in progress to make these features work with the other primary feature (the variable-less one).

### I) Comment all log messages, inserted by the extension in the current document
To do this:
- Pressing Shift + Alt + C (Windows) or Shift + Option + C (Mac)
### II) Uncomment all log messages, inserted by the extension in the current document
To do this:
- Pressing Shift + Alt + U (Windows) or Shift + Option + U (Mac)
### III) Delete all log messages, inserted by the extension in the current document
To do this:
- Pressing Shift + Alt + D (Windows) or Shift + Option + D (Mac)