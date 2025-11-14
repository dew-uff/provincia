interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="w-full flex gap-4 items-center rounded-xl">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none"
        placeholder="Buscar dataflows..."
      />
    </div>
  );
}

export default SearchBar;