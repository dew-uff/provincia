function SearchBar() {
  return (
    <div className="flex gap-4 items-center bg-white px-6 py-4 rounded-xl shadow-sm">
      <input type="text" className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none" placeholder="Buscar dataflows..." />
    </div>
  );
}

export default SearchBar;