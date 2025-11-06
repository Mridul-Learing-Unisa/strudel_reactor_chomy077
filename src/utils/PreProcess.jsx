function PreProcess({inputText, volume, cpm}) {
    let outputText = inputText
    outputText = outputText.replaceAll("{$VOLUME}", volume)
    outputText = outputText.replaceAll("{$CPM}", cpm || 30);

    return outputText;
}

export default PreProcess;