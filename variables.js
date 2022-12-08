function newVariable() {
    const audio = new Audio("pasoori.mp3");
    var dataType = splitWords[0]; //data type of variable
    var statement = ''; //entire statement to be added to program
    var i;

    var varName = splitWords[1]; //name of variable
    var allowed_names=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    var not_all=["1","2","3","4","5","6","7","8","9","10","_","-","$","&","*","+","@","`","!"];
    if(splitWords.length<2)
    {
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
    }

    else{
        if(!arrayContains(not_all,varName)){
            //continue adding to name until user has said 'equals' for initialization
            for (i = 2; i < splitWords.length && splitWords[i] !== 'equals'; i++) {
                varName += splitWords[i].replace(/^./, splitWords[i][0].toUpperCase()); //variable name in camel case
            }
            
            statement += dataType + ' ' + varName; //add variable data type and name to statement
            
            //variable initialization
            if (splitWords[i] === 'equals') {
                // if character, do initialization inside single quotes
                // may need change, since characters can also be initialized with integer values
                if (dataType === 'char') {
                    statement += ' = \'' + splitWords[i+1][0] + '\'';
                }
                else {
                    statement += ' = ' + splitWords[i+1];
                }
            }
            
            variables[varName] = dataType; //add variable to variables object, with data type
            
            statement += ';\n'; //add semicolon and newline to statement
            
            // add statement to program textarea
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
            
                }
            
                else{
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
 
    
    autoIndent(); //call function to implement auto indent
    programTextArea.focus(); // set focus on textarea
}
