export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search here"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}