import { useState } from "react";
import { IoShirt } from "react-icons/io5";
import { GiHoodie } from "react-icons/gi";
import { BiBlanket } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";

const categories = [
  { name: "Ghutra", icon: IoShirt, price: 10 },
  { name: "Under T-Shirt", icon: IoShirt, price: 8 },
  { name: "Designer Saree", icon: IoShirt, price: 25 },
  { name: "Hoodies", icon: GiHoodie, price: 15 },
  { name: "Blanket", icon: BiBlanket, price: 20 },
];


function Category({ onSaveOrder }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const closePopup = () => {
    setSelectedCategory(null);
    setQuantity(1);
  };

   const saveOrder = () => {
  onSaveOrder({
    name: selectedCategory.name,
    quantity,
    price: selectedCategory.price,
  });

  closePopup();
};

  return (
    <>
      <aside className="bg-slate-100 p-4">
        <div className="flex gap-3 mb-6">
              <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 flex-1 mb-6">
                <FiSearch className="text-gray-400" />
                <input
                  className="outline-none flex-1"
                  placeholder="Search..."
                />
              </div>
        
              <select className="bg-white px-2 mb-6">
                <option>Sort By Category</option>
                 <option>Gents</option>
                  <option>Ladies</option>
                   <option>Kids</option>
                    <option>Other</option>
              </select>
            </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;

            return (
              <div
                key={cat.name}
                onClick={() => setSelectedCategory(cat)}
                className="bg-white rounded-xl p-4 flex flex-col items-center
                           cursor-pointer hover:shadow-md"
              >
                <Icon className="text-4xl text-indigo-400 mb-2" />
                <span className="text-sm font-medium">{cat.name}</span>
              </div>
            );
          })}
        </div>
      </aside>

      {selectedCategory && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-80 text-center">
            <selectedCategory.icon className="text-6xl text-indigo-500 mb-4" />

            <h2 className="text-lg font-semibold mb-4">
              {selectedCategory.name}
            </h2>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full border rounded px-3 py-2 mb-4"
            />

            <div className="flex justify-center gap-4">
              <button onClick={closePopup} className="bg-gray-200 px-4 py-2 rounded">
                Cancel
              </button>
              <button
                onClick={saveOrder}
                className="bg-indigo-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Category;
