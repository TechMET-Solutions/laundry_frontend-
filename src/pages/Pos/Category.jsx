// import { useState } from "react";
// import { FiSearch } from "react-icons/fi";

// function Category({ onSaveOrder ,servicesData}) {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [quantity, setQuantity] = useState(1);

//   const [selectedValue, setSelectedValue] = useState("");
// const [searchQuery, setSearchQuery] = useState("");

//   const closePopup = () => {
//     setSelectedCategory(null);
//     setQuantity(1);
//   };

//    const saveOrder = () => {
//   onSaveOrder({
//     name: selectedCategory.name,
//     quantity,
//     price: selectedCategory.price,
//   });

//   closePopup();
// };

 

// //Filter Dropdown

//   const handleSelection = (value) => {
//     setSelectedValue(value);
     
//   };

// // Common filtering logic search + dropdown
// // console.log(servicesData);
//   const filteredServices = servicesData.filter((item) => {
//    const isActive = item.status === 1;

//    const matchesSearch =
//     searchQuery.trim() === "" ||
//     item.name.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesDropdown =
//       selectedValue === "" ||
//       selectedValue === "All" ||
//       item.name.toLowerCase() === selectedValue.toLowerCase();

//   return isActive  && matchesSearch && matchesDropdown;
// });



//   return (
//     <>
//       <aside className="bg-slate-100 p-4">
//         <div className="flex gap-3 mb-6">
//               <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 flex-1 mb-6">
//                 <FiSearch className="text-gray-400" />
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="outline-none flex-1"
//                   placeholder="Search..."
//                 />
//               </div>
        
//               <select className="bg-white px-2 mb-6" value={selectedValue} onChange={(e) => handleSelection(e.target.value)}  >
//                 <option value="" >Sort By Category</option>
//                   <option value="All" >All</option>
//                  <option value="Gents">Gents</option>
//                   <option value="Ladies">Ladies</option>
//                    <option value="Kids">Kids</option>
//                     <option value="Other">Other</option>
//               </select>
//             </div>
//         <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
//           {filteredServices.map((el) => {
         

//             return (
//               <div
//                 key={el.name}
//                 onClick={() => setSelectedCategory(el)}
//                 className="bg-white  p-2 flex flex-col items-center
//                            cursor-pointer hover:shadow-md max-w-[120px]"
//               >
//                  <img src={`http://localhost:5000/uploads/services/${el.addIcon}`} alt={el.addIcon} />
//                 <span className="text-xl mt-2">{el.name}</span>
//               </div>
//             );
//           })}
//         </div>
//       </aside>

//       {selectedCategory && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
//           <div className="bg-white rounded-xl p-6 w-80 text-center">
//             {/* <selectedCategory.icon className="text-6xl text-indigo-500 mb-4" /> */}

//             <img src={`http://localhost:5000/uploads/services/${selectedCategory.addIcon}`} alt={selectedCategory.name} />

//             <h2 className="text-lg font-semibold mb-4">
//               {selectedCategory.name}
//             </h2>
//             <input
//               type="number"
//               min="1"
//               value={quantity}
//               onChange={(e) => setQuantity(Number(e.target.value))}
//               className="w-full border rounded px-3 py-2 mb-4"
//             />

//             <div className="flex justify-center gap-4">
//               <button onClick={closePopup} className="bg-gray-200 px-4 py-2 rounded">
//                 Cancel
//               </button>
//               <button
//                 onClick={saveOrder}
//                 className="bg-indigo-600 text-white px-4 py-2 rounded"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Category;


import { useState } from "react";
import { FiSearch } from "react-icons/fi";

function Category({ onSaveOrder, servicesData }) {
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

  const handleSelection = (value) => {
    setSelectedValue(value);
  };

  const filteredServices = servicesData.filter((item) => {
    const isActive = item.status === 1;

    const matchesSearch =
      searchQuery.trim() === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase());

    // Fix: Filter by the 'category' field instead of 'name'
    const matchesDropdown =
      selectedValue === "" ||
      selectedValue === "All" ||
      item.category.toLowerCase().includes(selectedValue.toLowerCase());

    return isActive && matchesSearch && matchesDropdown;
  });

  return (
    <>
      <aside className="bg-slate-100 p-6 min-h-screen">
        {/* Top Bar: Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 flex-1 shadow-sm border border-slate-200">
            <FiSearch className="text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none flex-1 bg-transparent text-sm"
              placeholder="Search services..."
            />
          </div>

          <select
            className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 outline-none text-sm text-slate-600"
            value={selectedValue}
            onChange={(e) => handleSelection(e.target.value)}
          >
            <option value="">Sort By Category</option>
            <option value="All">All Items</option>
            <option value="Gents">Gents</option>
            <option value="Ladies">Ladies</option>
            <option value="Kids">Kids</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {filteredServices.map((el) => (
            <div
              key={el.id || el.name}
              onClick={() => setSelectedCategory(el)}
              className="group bg-white rounded-2xl flex flex-col items-center justify-center transition-all duration-200 cursor-pointer hover:shadow-xl hover:-translate-y-1 border border-transparent hover:border-indigo-100"
            >
              {/* Image Container with fixed Aspect Ratio */}
              <div className=" mb-3 flex items-center justify-center bg-slate-50">
                <img
                  src={`http://localhost:5000/uploads/services/${el.addIcon}`}
                  alt={el.name}
                  className=" object-contain  rounded-t-2xl"
                />
              </div>

              <span className="text-sm font-semibold text-slate-700 pb-2 text-center line-clamp-2">
                {el.name}
              </span>
              {/* <span className="text-xs text-indigo-600 font-medium mt-1">
                ${el.price}
              </span> */}
            </div>
          ))}
        </div>
      </aside>

      {/* Modal - Improved UI */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <img
                  src={`http://localhost:5000/uploads/services/${selectedCategory.addIcon}`}
                  alt={selectedCategory.name}
                  className="w-16 h-16 object-contain"
                />
              </div>

              <h2 className="text-xl font-bold text-slate-800 mb-1">
                {selectedCategory.name}
              </h2>
              <p className="text-slate-500 text-sm mb-6">Enter quantity to add to order</p>

              <div className="w-full mb-6">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-lg font-semibold focus:border-indigo-500 outline-none transition-colors"
                />
              </div>

              <div className="flex w-full gap-3">
                <button
                  onClick={closePopup}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-3 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveOrder}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-200 transition-all"
                >
                  Add to Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Category;
