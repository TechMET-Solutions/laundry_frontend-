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

import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FiEdit2 } from "react-icons/fi";
import { getAllServicesAddon } from "../../api/servicesapi";
import { API_URL } from "../../api";

function Category({ onSaveOrder, servicesData }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedValue, setSelectedValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [deliveryType, setDeliveryType] = useState(null);
  const [selectedServicesCheckbox, setSelectedServicesCheckbox] = useState({});
  const [usePreviousPrice, setUsePreviousPrice] = useState(0);

  const [adonData, setAdonData] = useState([]);

   

  const closePopup = () => {
    setSelectedCategory(null);
    setQuantity(1);
  };

  const getSelectedServices = () => {
    const selected = [];

    // Iterate through the selected category's service types
    selectedCategory?.service_types?.forEach((service) => {
      const key = `${selectedCategory.id}-${service.type}`;

      if (selectedServicesCheckbox[key]) {
        selected.push({
          type: service.type,
          price: service.price,
        });
      }
    });

    return selected;
  };

  const saveOrder = () => {
    // Calculate total service price - convert to number
    const servicePrice = getSelectedServices().reduce(
      (sum, service) => sum + Number(service.price),
      0,
    );

    // Get delivery price (remove "AED " and convert to number)
    const deliveryPrice = parseFloat(
      deliveryType?.price || 0
    );

    // Calculate price per item (ensure both are numbers)
    const pricePerItem = Number(servicePrice) + Number(deliveryPrice) + Number(usePreviousPrice);

    const orderData = {
      category: {
        id: selectedCategory.id,
        name: selectedCategory.name,
      },

      services: getSelectedServices(), //  selected checkboxes

      usePreviousPrice, //   value or null

      deliveryType: deliveryType  , //   full delivery object

      quantity,

      pricePerItem, // calculated total price per item

      price: pricePerItem, // total price for all quantities
    };

    console.log("FINAL ORDER DATA ", orderData);

    onSaveOrder(orderData);
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
  // console.log(filteredServices);

  const toggleServiceCheckbox = (key) => {
    setSelectedServicesCheckbox((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };


 useEffect(() => {
  const fetchAddons = async () => {
    const res = await getAllServicesAddon();
     setAdonData(res.data.data || []);
  };

  fetchAddons();
}, []);


  return (
    <>
      <aside className="  p-6 min-h-screen">
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
                  src={`${API_URL}/uploads/services/${el.addIcon}`}
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
        <div className="fixed inset-0 bg-black/50   flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl p-6">
            {/* Title */}
            <h2 className="text-lg font-bold text-slate-800 mb-6">
              {selectedCategory.name}
            </h2>

            {/* Service Type */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* {console.log(filteredServices)} */}

              {selectedCategory?.service_types?.map((el) => {
                const value = `${selectedCategory.id}-${el.type}`;

                const imageUrl = `${API_URL}/${el.image}`;
                const isSelected = !!selectedServicesCheckbox[value];

                // console.log(el.image);

                return (
                  <label
                    key={value}
                    className={`   cursor-pointer flex flex-col items-center gap-3 rounded-2xl
              ${
                isSelected
                  ? "border-indigo-700 ring-2 ring-indigo-400 bg-indigo-50"
                  : "border-slate-300 hover:border-indigo-400"
              }
          `}
                  >
                    {/* IMAGE */}
                    <img
                      src={imageUrl}
                      className="object-contain rounded-2xl"
                    />

                    {/* CHECKBOX */}
                    <div className="flex gap-2 mb-[-12px]">
                      <input
                        type="checkbox"
                        checked={!!selectedServicesCheckbox[value]}
                        onChange={() => toggleServiceCheckbox(value)}
                        className="accent-indigo-600"
                      />

                      {/* TEXT */}
                      <span className="font-semibold text-slate-700">
                        {el.type}
                      </span>
                    </div>

                    <span className="text-sm font-bold text-black">
                      AED {el.price}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* Previous Price */}
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={usePreviousPrice}
                  onChange={(e) => setUsePreviousPrice(3.5)}
                />
                Use Previous Price
              </label>
              <span className="text-xs text-slate-400">
                Last Price: AED 3.50
              </span>
            </div>

            {/* Delivery Options */}
            <div className="space-y-3 mb-6">
              {adonData.map((item) => (
                <label
                  key={item.id}
                  className="flex items-start justify-between   rounded-xl p-3 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="deliveryType"
                      checked={deliveryType?.id === item.id}
                      onChange={() => setDeliveryType(item)}
                      className="mt-1 accent-indigo-600"
                    />
                    <div>
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-xs text-red-500"> {item.addonMessage}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{item.price}</span>
                    <FiEdit2 className="text-slate-400 cursor-pointer" />
                  </div>
                </label>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={closePopup}
                className="flex-1 border rounded-xl py-2 font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={saveOrder}
                className="flex-1 bg-indigo-600 text-white rounded-xl py-2 font-semibold"
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
