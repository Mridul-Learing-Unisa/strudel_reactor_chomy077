
function DJcontrolls() {
    const BG = "https://cdn.mos.cms.futurecdn.net/2HFwv3bcoyZwtdG2tVBLv7-650-80.jpg.webp"
    return (
        <>
            <div className="card shadow border-0" style={{ background: 'blue', backgroundSize: "cover", backgroundPosition: "center", borderRadius: "12px" }}>
            
                <div className="card shadow border-0" style={{  background: 'black', opacity: '0.7', color: "white" }}>
                <div className="card-body">
                    <h5 className="card-title mb-3 text-warning" style={{ textAlign: "center" }} >DJ Controls</h5>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="cmp_label">Set CPM</span>
                        <input type="text" className="form-control" id = "cpm_text_input" placeholder="30" aria-label="cpm" aria-describedby="cpm_label" />
                    </div>

                    <label htmlFor="volume_range" className="form-label">Volume</label>
                        <input type="range" className="form-range" min="0" max="1" step="0.01" id="volume_range"/>

                    <label htmlFor="tracks" className="form-label">Tracks</label>

                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" style={{ accentColor: 'gold' }} id="s1"/>
                        <label className="form-check-label" htmlFor="s1">
                            Drum
                         </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="d1" />
                        <label className="form-check-label" htmlFor="d1">
                            Baseline
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="d2" />
                        <label className="form-check-label" htmlFor="d1">
                            Melody
                        </label>
                        </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="d2" />
                        <label className="form-check-label" htmlFor="d1">
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