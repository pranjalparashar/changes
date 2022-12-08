// go to line {lineNum}
// always done at the program top
function goToLineNumber() {
    // line number to go to
    var lineNum = Number(splitWords[3])

    // set the cursor to the above position
    programTextArea.setPosition({
        lineNumber: lineNum,
        column: 1,
    })
}