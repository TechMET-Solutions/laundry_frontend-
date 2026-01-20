import { useState } from "react";
import { FiSearch } from "react-icons/fi";

 



function Category({ onSaveOrder ,servicesData}) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [selectedValue, setSelectedValue] = useState("");
const [searchQuery, setSearchQuery] = useState("");

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

 

//Filter Dropdown

  const handleSelection = (value) => {
    setSelectedValue(value);
     
  };

// Common filtering logic search + dropdown
// console.log(servicesData);
  const filteredServices = servicesData.filter((item) => {
   const isActive = item.status === 1;

   const matchesSearch =
    searchQuery.trim() === "" ||
    item.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDropdown =
      selectedValue === "" ||
      selectedValue === "All" || 
      item.name.toLowerCase() === selectedValue.toLowerCase();

  return isActive  && matchesSearch && matchesDropdown;
});



  return (
    <>
      <aside className="bg-slate-100 p-4">
        <div className="flex gap-3 mb-6">
              <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 flex-1 mb-6">
                <FiSearch className="text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="outline-none flex-1"
                  placeholder="Search..."
                />
              </div>
        
              <select className="bg-white px-2 mb-6" value={selectedValue} onChange={(e) => handleSelection(e.target.value)}  >
                <option value="" >Sort By Category</option>
                  <option value="All" >All</option>
                 <option value="Gents">Gents</option>
                  <option value="Ladies">Ladies</option>
                   <option value="Kids">Kids</option>
                    <option value="Other">Other</option>
              </select>
            </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {filteredServices.map((el) => {
         

            return (
              <div
                key={el.name}
                onClick={() => setSelectedCategory(el)}
                className="bg-white  p-2 flex flex-col items-center
                           cursor-pointer hover:shadow-md max-w-[120px]"
              >
                 <img src={`http://localhost:5000/uploads/services/${el.addIcon}`} alt={el.addIcon} />
                <span className="text-xl mt-2">{el.name}</span>
              </div>
            );
          })}
        </div>
      </aside>

      {selectedCategory && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-80 text-center">
            {/* <selectedCategory.icon className="text-6xl text-indigo-500 mb-4" /> */}

            <img src={`http://localhost:5000/uploads/services/${selectedCategory.addIcon}`} alt={selectedCategory.name} />

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
