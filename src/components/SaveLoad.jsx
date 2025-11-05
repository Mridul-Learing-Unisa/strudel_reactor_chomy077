function SaveLoad() {
  return (
      <div className="d-flex gap-2 mt-2">
          <button className="btn btn-sm btn-outline-primary">Save</button>
          <button className="btn btn-sm btn-outline-secondary">Load</button>
          <button className="btn btn-sm btn-success ms-auto">Apply</button>
          <button className="btn btn-sm btn-outline-danger">Reset</button>
      </div>
  );
}

export default SaveLoad;