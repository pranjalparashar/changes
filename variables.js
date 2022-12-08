function newVariable() {
    var dataType = splitWords[0]; //data type of variable
    var statement = ''; //entire statement to be added to program
    var i;

    var varName = splitWords[1]; //name of variable
    var allowed_names=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    var not_all=["1","2","3","4","5","6","7","8","9","10","_","-","$","&","*","+","@","`","!"];
    
    if(splitWords.length < 2) {
        statement += "/*SORRY SYNTAX ERROR. PLEASE PROVIDE A VALID VARIABLE NAME.*/";
        programTextArea.executeEdits("", [{
            range: {
                startLineNumber: programTextArea.getPosition().lineNumber,
                startColumn: programTextArea.getPosition().column,
                endLineNumber: programTextArea.getPosition().lineNumber,
                endColumn: programTextArea.getPosition().column
            },
            text:  statement,
            forceMoveMarkers: true
        }]);
    } else {
        if(!arrayContains(not_all, varName)) {
            //continue adding to name until user has said 'equals' for initialization
            for (i = 2; i < splitWords.length && splitWords[i] !== 'equals'; i++) {
                varName += splitWords[i].replace(/^./, splitWords[i][0].toUpperCase()); 
            }
            
            statement += dataType + ' ' + varName;

            //variable initialization
            if (splitWords[i] === 'equals') {
                if (dataType === 'char') {
                    statement += ' = \'' + splitWords[i+1][0] + '\'';
                }
                else {
                    statement += ' = ' + splitWords[i+1];
                }
            }

            variables[varName] = dataType; 
            statement += ';\n';
            programTextArea.executeEdits("", [{
                range: {
                    startLineNumber: programTextArea.getPosition().lineNumber,
                    startColumn: programTextArea.getPosition().column,
                    endLineNumber: programTextArea.getPosition().lineNumber,
                    endColumn: programTextArea.getPosition().column
                },
                text:  statement,
                forceMoveMarkers: true
            }]);
        } else{
            statement += "/*SORRY SYNTAX ERROR. PLEASE PROVIDE A VALID VARIABLE NAME.*/";
            programTextArea.executeEdits("", [{
                range: {
                    startLineNumber: programTextArea.getPosition().lineNumber,
                    startColumn: programTextArea.getPosition().column,
                    endLineNumber: programTextArea.getPosition().lineNumber,
                    endColumn: programTextArea.getPosition().column
                },
                text:  statement,
                forceMoveMarkers: true
            }]);
    
            audio.play();
        }
    }
    autoIndent(); 
    programTextArea.focus();
}