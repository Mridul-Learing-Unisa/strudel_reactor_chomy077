import { useState } from 'react'
function DJcontrolls({ volume, onVolumeChange, cpmChange, onCpmChange, onTracksChange}) {
    const BG = "https://cdn.mos.cms.futurecdn.net/2HFwv3bcoyZwtdG2tVBLv7-650-80.jpg.webp";
    const [tracks, setTracks] = useState({
        drum: true,
        bassline: true,
        melody: true,
        groove: true,
    });

    const toggleTrack = (id) => {
        const next = { ...tracks, [id]: !tracks[id] };
        setTracks(next);
        if (typeof onTracksChange === "function") onTracksChange(next);
    };
    return (
        <>
            <div className="card shadow border-0" style={{ background: 'blue', backgroundSize: "cover", backgroundPosition: "center", borderRadius: "12px" }}>
            
                <div className="card shadow border-0" style={{  background: 'black', opacity: '0.7', color: "white" }}>
                <div className="card-body">
                    <h5 className="card-title mb-3 text-warning" style={{ textAlign: "center" }} >DJ Controls</h5>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="cmp_label">Set CPM</span>
                            <input type="text" className="form-control" id="cpm_text_input" onChange={onCpmChange} placeholder="30" aria-label="cpm" aria-describedby="cpm_label" />
                    </div>

                    <label htmlFor="volume_range" className="form-label">Volume</label>
                        <input type="range" className="form-range" min="0" max="1" step="0.01" onMouseUp={onVolumeChange} id="volume_range"/>

                    <label htmlFor="tracks" className="form-label">Tracks</label>

                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="Drum" checked={tracks.drum} onChange={() => toggleTrack('drum')} />
                            <label className="form-check-label" htmlFor="drum">
                            Drum
                         </label>
                    </div>
                    <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="Baseline" checked={tracks.bassline} onChange={() => toggleTrack('bassline')} />
                            <label className="form-check-label" htmlFor="bassline">
                            Baseline
                        </label>
                    </div>
                    <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="Melody" checked={tracks.melody} onChange={() => toggleTrack('melody')} />
                            <label className="form-check-label" htmlFor="melody">
                            Melody
                        </label>
                        </div>
                    <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="groove" checked={tracks.groove} onChange={() => toggleTrack('groove')} />
                            <label className="form-check-label" htmlFor="groove">
                            Groove
                        </label>
                    </div>
                </div>
             </div>
          </div>
      </>
  );
}

export default DJcontrolls;