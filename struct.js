function structfunction(){
    var dataType = splitWords[0]; //data type of variable
    var statement = 'struct ';
    var varName = splitWords[1];
    statement = statement +varName;
    statement += '{\n\n'; 

    programTextArea.executeEdits("", [{
		range: {
			startLineNumber: programTextArea.getPosition().lineNumber,
			startColumn: programTextArea.getPosition().column,
			endLineNumber: programTextArea.getPosition().lineNumber,
			endColumn: programTextArea.getPosition().column
		},
		text: statement,
		forceMoveMarkers: true
	}]);

	autoIndent()

    	// add closing brace to textarea
	programTextArea.executeEdits("", [{
		range: {
			startLineNumber: programTextArea.getPosition().lineNumber,
			startColumn: programTextArea.getPosition().column,
			endLineNumber: programTextArea.getPosition().lineNumber,
			endColumn: programTextArea.getPosition().column
		},
		text: "};",
		forceMoveMarkers: true
	}]);

	//reset cursor to between braces
	programTextArea.setPosition({lineNumber: programTextArea.getPosition().lineNumber - 1, column: programTextArea.getPosition().columnNumber + 2})

	indent++; //new braces added, increment indent
	//autoIndent(); //call function to implement auto indent

	programTextArea.focus(); //focus on textarea

}