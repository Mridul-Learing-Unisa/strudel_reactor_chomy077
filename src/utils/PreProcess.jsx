function PreProcess({inputText, volume, cpm , tracks}) {
    let outputText = inputText
    outputText = outputText.replaceAll("{$VOLUME}", volume)
    outputText = outputText.replaceAll("{$CPM}", cpm || 30);

    const t = tracks || {};
    const mapping = {
        drum: ["drums"],   
        bassline: ["bassline"],    
        melody: ["melody"],          
        groove: ["groove"]            
    };
    Object.entries(mapping).forEach(([key, labels]) => {
        const enabled = t[key] === undefined ? true : !!t[key]; 
        labels.forEach((label) => {
            const regex = new RegExp(`(^|\\n)\\s*_?\\s*(${label}\\s*:)`, "gmi");
            if (enabled) {
                outputText = outputText.replace(regex, (m, p1, p2) => `${p1}${p2}`);
            } else {
                outputText = outputText.replace(regex, (m, p1, p2) => `${p1}_${p2}`);
            }
        });
    });
    return outputText;
}

export default PreProcess;