export default function SearchBar({ value, onChange }) {
  return (
    <div className="input-group" style={{ maxWidth: "700px" }}>
      <input
        type="search"
        className="form-control rounded"
        placeholder="Search"
        aria-label="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button type="button" className="btn btn-primary btn-floating" data-mdb-ripple-init>
        Search
      </button>
    </div>
  );
}