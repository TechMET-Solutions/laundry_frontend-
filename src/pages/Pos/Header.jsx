import { FiSearch } from "react-icons/fi";

function Header() {
  return (
    <div className="flex gap-3">
      <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 flex-1">
        <FiSearch className="text-gray-400" />
        <input
          className="outline-none flex-1"
          placeholder="Search..."
        />
      </div>

      <select className="bg-white rounded-xl px-4 py-2 border">
        <option>Sort By Category</option>
         <option>Gents</option>
          <option>Ladies</option>
           <option>Kids</option>
            <option>Other</option>
      </select>
    </div>
  );
}
export default Header;