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
import { FaMusic } from "react-icons/fa";

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};
export default function StrudelDemo() {

    const hasRun = useRef(false);
    const handlePlay = () => {
        let outputText = PreProcess({ inputText: songText, volume: volume, cpm: cpm, tracks: tracks });
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
    const [tracks, setTracks] = useState({
        drum: true,
        bassline: true,
        melody: true,
        groove: true,
    });
    const [hotkeyMsg, setHotkeyMsg] = useState('');
    const flashHotkey = (msg) => {
      setHotkeyMsg(msg);
      window.clearTimeout(flashHotkey._t);
      flashHotkey._t = window.setTimeout(() => setHotkeyMsg(''), 800);
    };
    useEffect(() => {
        if (state === "play") {
            handlePlay();
        }
    }, [volume, cpm, tracks])

useEffect(() => {
  const onKey = (ev) => {
    // ignore when typing in input/textarea
    const tag = (document.activeElement && document.activeElement.tagName) || '';
    if (['INPUT', 'TEXTAREA'].includes(tag)) return;

    const key = ev.key;
    if (!['1','2','3','4'].includes(key)) return;

    const map = { '1': 'drum', '2': 'bassline', '3': 'melody', '4': 'groove' };
    const trackKey = map[key];

    // toggle tracks and update editor immediately
    setTracks(prev => {
      const next = { ...prev, [trackKey]: !prev[trackKey] };

      // apply preprocess immediately so editor shows synced code
      try {
        const outputText = PreProcess({ inputText: songText, volume: volume, cpm: cpm, tracks: next });
        if (globalEditor) {
          globalEditor.setCode(outputText);
        }
      } catch (err) {
        console.error('Preprocess failed after hotkey toggle', err);
      }

      // feedback badge
      if (typeof flashHotkey === 'function') flashHotkey(`${trackKey} ${next[trackKey] ? 'ON' : 'OFF'}`);

      return next;
    });

    ev.preventDefault();
  };

  window.addEventListener('keydown', onKey);
  return () => window.removeEventListener('keydown', onKey);
}, [songText, volume, cpm, setTracks]);

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
        <div className="bg-dark text-light min-vh-100">
            <main>
                <div className="container-fluid py-4">
                    <h2 className="display-4 mb-4"> <FaMusic /> Strudel Demo</h2>

                    <div className="row">
                        <div className="col-md-8">
                            <div className="mb-3">
                                <label className="form-label fs-5">Your Code</label>
                                <PreTextArea defaultValue={songText} onChange={(e) => setSongText(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <div className="d-flex gap-2 mt-2 mb-3" >
                                    <label className="form-label fs-5" style={{ marginRight: '80%'} }>Live Output</label>
                                    <PlayButtons onPlay={() => { setState("play"); handlePlay() }} onStop={() => { setState("stop"); handleStop() }} />
                                </div>
                                <div style={{ maxHeight: '50vh', overflowY: 'auto' }} className="p-2 rounded border border-secondary">
                                    <div id="editor" />
                                    <div id="output" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div style={{ position: 'sticky', top: '1rem' }}>
                                <div className="p-3 bg-secondary bg-opacity-10 border border-secondary rounded shadow-sm">
                                    <div className="mb-3">
                                        <SaveLoad />
                                    </div>

                                    <div className="mb-3">
                                        <DJcontrolls VolumeChange={ volume } onVolumeChange = {(e) => setVolume(e.target.value)} cpmChange = { cpm } onCpmChange = {(e) => setCpm(e.target.value)} tracks = { tracks } onTracksChange={(nextTracks) => setTracks(nextTracks)} />
                                    </div>

                                    <div className="alert alert-info" role="alert">
                                        <p className="lead mb-0">Hotkeys: press 1..4 to activate/deactivate instruments</p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <canvas
                                        id="roll"
                                        className="w-100 bg-light rounded"
                                        style={{ minHeight: '150px' }}
                                    ></canvas>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </main >
        </div >
    );
}