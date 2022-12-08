// go to one line up
function goToUpDownLine() {
    // set the cursor to the above position
    if(splitWords[1] === "up") {
        programTextArea.setPosition({
            lineNumber: programTextArea.getPosition().lineNumber - 1,
            column: programTextArea.getModel().getLineLength(programTextArea.getPosition().lineNumber - 1) + 1,
        })
    } else if(splitWords[1] === "down") {
        programTextArea.setPosition({
            lineNumber: programTextArea.getPosition().lineNumber + 1,
            column: programTextArea.getModel().getLineLength(programTextArea.getPosition().lineNumber + 1) + 1,
        })
    }
}