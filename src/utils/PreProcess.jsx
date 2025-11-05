function PreProcess({inputText, volume }) {
    let outputText = inputText
    outputText = outputText.replaceAll("{$VOLUME}", volume)
    return outputText;
}

export default PreProcess;