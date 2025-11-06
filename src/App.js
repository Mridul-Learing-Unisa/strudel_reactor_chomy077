import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import DJcontrolls from './components/DJ_controlls'
import PlayButtons from './components/PlayButtons'
import ProcButtons from './components/ProcButtons'
import PreTextArea from './components/PreTextArea';
import SaveLoad from './components/SaveLoad'
import PreProcess from './utils/PreProcess';

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};
export default function StrudelDemo() {

    const hasRun = useRef(false);
    const handlePlay = () => {
        let outputText = PreProcess({ inputText: songText, volume: volume, cpm: cpm });
        globalEditor.setCode(outputText);
        globalEditor.evaluate();
    }
    const handleStop = () => {
        globalEditor.stop()
    }

    const [songText, setSongText] = useState(stranger_tune)
    const [volume, setVolume] = useState(1);
    const [state, setState] = useState("Stop");
    const [cpm, setCpm] = useState(30);

    useEffect(() => {
        if (state === "play") {
            handlePlay();
        }
    }, [volume, cpm])
useEffect(() => {

    if (!hasRun.current) {
        document.addEventListener("d3Data", handleD3Data);
        console_monkey_patch();
        hasRun.current = true;
        //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });
            
        document.getElementById('proc').value = stranger_tune
        //SetupButtons()
        //Proc()
    }
    globalEditor.setCode(songText)
}, [songText]);


return (
    <div>
        <h2>Strudel Demo</h2>
        <main>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <PreTextArea defaultValue={songText} onChange={(e) => setSongText(e.target.value)}/>
                    </div>
                    <div className="col-md-4">
                        
                        <nav>

                            <PlayButtons onPlay={() => { setState("play"); handlePlay() }} onStop={() => { setState("stop"); handleStop()}} />    
                            <br />
                            <br />

                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <div id="editor" />
                        <div id="output" />
                    </div>
                    <div className="col-md-4">
                        <SaveLoad />
                        <br />
                        <DJcontrolls VolumeChange={volume} onVolumeChange={(e) => setVolume(e.target.value)} cpmChange={cpm} onCpmChange={(e) => setCpm(e.target.value)} />
                        <div className="alert alert-info" role="alert">
                            <p className="lead">Hotkeys: press 1..4 to activate/deactivate instruments</p>
                        </div>
                    </div>
                </div>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div >
);


}