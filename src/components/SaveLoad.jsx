import React, { useState } from "react";

export default function SaveLoad({ getSavePayload, onLoadObject, defaultState }) {
     const handleSave = () => {
        const payload = getSavePayload();
        const text = JSON.stringify(payload, null, 2);
        const blob = new Blob([text], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "settings.json";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };

    const handleLoadClick = () => {
        document.getElementById("settings-input").click();
    };

    const handleFileSelected = async (ev) => {
        const file = ev.target.files[0];
        const text = await file.text();
        const obj = JSON.parse(text);
        onLoadObject(obj);
    };

    const handleReset = () => {
        onLoadObject(defaultState);
    };


    return (
        <div className="d-flex gap-2 mt-2 align-items-center">
            <button className="btn btn-sm btn-outline-primary" onClick={handleSave} >Save</button>
            <button className="btn btn-sm btn-outline-success" onClick={handleLoadClick}>Load</button>
            <button className="btn btn-sm btn-outline-danger" onClick={handleReset}>Reset</button>
            <input id="settings-input" type="file" accept=".json" style={{ display: "none" }} onChange={handleFileSelected}/></div>
    );
}
