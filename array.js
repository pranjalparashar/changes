function arrayfunction()
{
    var dataType = splitWords[1]; //data type of variable
    var statement = dataType ;
    statement +=' ';
    var varName = splitWords[2];
    var size= splitWords[3];
    statement = statement +varName;
    statement +='[';
    statement+=size;
    statement += ']';
    statement+=";" 

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
}