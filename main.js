
// whether an array contains an element
function arrayContains(array, element) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === element)
            return true;
    }

    return false;
}


// whether a dictionary contains a value
function dictContains(dict, element) {
    for (var i in dict) {
        if (dict[i] === element)
            return true;
    }

    return false;
}


//insert a character at a position in string
function insertAtPosition(str, pos, charToInsert) {
    return str.substr(0, pos) + charToInsert + str.substr(pos);
}

// for int i = 0 to 10 + 1

// get initialization for the for loop
function getInit(splitWordsStartIndex) {
    var varName = ''; // variable name for condition
    var dataType = '';
    var init = ''; // final initialization string 
    var i = splitWordsStartIndex; // start from index passed into the function
    
    // declaration & convertion to camelCase
    var dataType = splitWords[i];
    var varName = splitWords[i + 1];
    for (i = splitWordsStartIndex + 2; i < splitWords.length && splitWords[i] !== 'equals'; i++) {
        varName += splitWords[i].replace(/^./, splitWords[i][0].toUpperCase()); 
    }

    init += dataType + ' ' + varName;

    // initialization
    if (splitWords[i] === 'equals') {
        if (dataType === 'char') {
            init += ' = \'' + splitWords[i + 1][0] + '\'';
        } else {
            init += ' = ' + splitWords[i + 1];
        }
    }

    return init;
}

function getLoopCondition(splitWordsStartIndex) {
    var upperBound = 0;
    var condition = ''; // final initialization string 
    var i = splitWordsStartIndex; // start from index passed into the function

    var varName = splitWords[i + 1]; // variable name for condition
    for (i = splitWordsStartIndex + 2; i < splitWords.length && splitWords[i] !== 'equals'; i++) {
        varName += splitWords[i].replace(/^./, splitWords[i][0].toUpperCase()); 
    }

    condition += varName + ' < ';

    for (i = splitWordsStartIndex; i < splitWords.length; i++) {
        // if next word is a character

        // else if a boolean
    
        // else a number
        if(splitWords[i] === 'to') {
            condition += splitWords[i + 1];
            break; 
        }
    }

    return condition;
}

function getCounter(splitWordsStartIndex) {
    var counterTxt = ''; // final initialization string 
    var i = splitWordsStartIndex; // start from index passed into the function

    var varName = splitWords[i + 1]; // variable name for condition
    for (i = splitWordsStartIndex + 2; i < splitWords.length && splitWords[i] !== 'equals'; i++) {
        varName += splitWords[i].replace(/^./, splitWords[i][0].toUpperCase()); 
    }

    counterTxt += varName;
    
    for (; i < splitWords.length; i++) {
        if(splitWords[i] === '+')
            counterTxt += ' += ';
        else if(splitWords[i] === '-')
            counterTxt += ' -= ';
        else if(splitWords[i] === 'X')
            counterTxt += ' *= ';
        else if(splitWords[i] === 'divide')
            counterTxt += ' /= ';
        else
            continue;

        counterTxt += splitWords[i + 1];
        break;
    }

    return counterTxt;
}

// get condition for if, for, while statements
// takes an argument as to which index of the splitWords array to start from
function getCondition(splitWordsStartIndex) {
    var varName = ''; //variable name for condition
    var wordCount = 0; //track if first word of the variable, for camel case
    var condition = ''; //final condition string
    var i = splitWordsStartIndex; // start from index passed into the function
    var conditionLHS = ''; // left side of a relational operator for condition
    var finished = false; // done with the condition, or more logical operators and continue the condition?

    while (!finished) {
        //reset variables
        varName = '';
        wordCount = 0;
        conditionLHS = '';

        // if the word is 'variable', look for a variable as one side of the relational operator
        if (splitWords[i] === 'variable') {
            //keep adding to variable name till relational/logical operator is found
            for (var j = i+1; j < splitWords.length && splitWords[j] !== 'greater' && splitWords[j] !== 'less' && splitWords[j] !== 'equals' && splitWords[j] !== 'and' && splitWords[j] !== 'or'; j++) {
                if (wordCount === 0)
                    varName += splitWords[j]; //first word of variable, starts in lowercase
                else
                    varName += splitWords[j].replace(/^./, splitWords[j][0].toUpperCase()); //variable name in camel case

                wordCount++;
                i = j;
            }

            condition += varName; //add variable name to condition string
            conditionLHS = varName;

            //reset variables
            varName = '';
            wordCount = 0;
        }
        else if(splitWords[i] === 'while') {
            condition = "while()";
            break;
        }
        else {
            // if not a variable and not a number, then it is a character, include in single quotes
            condition += isNaN(splitWords[i]) ? '\'' + splitWords[i][0] + '\'' : splitWords[i];
        }

        // add symbols according to relational operators
    
        if (splitWords[i+1] === 'greater' && splitWords[i+2] === 'equals') {
            condition += ' >= ';
            i += 3;
        }
        else if (splitWords[i+1] === 'greater') {
            condition += ' > ';
            i += 2;
        }
        else if (splitWords[i+1] === 'less' && splitWords[i+2] === 'equals') {
            condition += ' <= ';
            i += 3
        }
        else if (splitWords[i+1] === 'less') {
            condition += ' < ';
            i += 2;
        }
        else if (splitWords[i+1] === 'equals') {
            condition += ' == ';
            i += 2;
        }
        else if (splitWords[i+1]==='not' && splitWords[i+2] ==='equals'){
            condition += ' != ';
            i += 3;
        }


        // for RHS of condition, check if user said the word variable
        if (splitWords[i] === 'variable') {
            for (var j = i+1; j < splitWords.length && splitWords[j] !== 'and' && splitWords[j] !== 'or'; j++) {
                if (wordCount === 0)
                    varName += splitWords[j]; //first word of variable name, not camel case
                else
                    varName += splitWords[j].replace(/^./, splitWords[j][0].toUpperCase()); // variable name should be in camel case

                i = j;
            }

            condition += varName; // add variable to condition
        }
        else {
            // if user did not say the word 'variable' and the expression is not a number, then it is a character. Add within single quotes
            condition += (isNaN(splitWords[i]) || variables[conditionLHS] === 'char') ? '\'' + splitWords[i][0] + '\'' : splitWords[i];
            i++;
        }

        // if we have reached the end of the word array, condition is finished
        if (i === splitWords.length) {
            finished = true;
            break;
        }
        // if this is not the end of the word array, look for a logical operator and add symbol accordingly
        // after adding logical operator, run the condition loop again to get LHS, relational operator and RHS again
        else {
            if (splitWords[i] === 'and')
                condition += ' && ';
            else if (splitWords[i] === 'or')
                condition += ' || ';
            i++;
        }
    }

    return condition; // return the final condition string
}

//function to implement auto indent
function autoIndent() {
  var indentText = ''; // string containing appropriate number of tabs

  // add tabs to indentText variable based on current indent level
  for (var i = 0; i < indent; i++) {
    indentText += '\t';
  }

  //add indent to program textarea
  programTextArea.executeEdits("", [{
      range: {
          startLineNumber: programTextArea.getPosition().lineNumber,
          startColumn: programTextArea.getPosition().column,
          endLineNumber: programTextArea.getPosition().lineNumber,
          endColumn: programTextArea.getPosition().column
      },
      text: indentText,
      forceMoveMarkers: true
  }]);
}
