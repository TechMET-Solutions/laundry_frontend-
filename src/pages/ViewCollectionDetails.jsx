// import { IoReturnUpBackOutline } from "react-icons/io5";

// const ViewCollectionDetails = ({onEvent}) => {
//     return (
//         <>   
//             <div className="p-6 bg-[#f4f7fb] min-h-screen">
//                 <div className="flex items-center justify-between mb-6">

//                     <div className="flex items-center gap-3">
//                         <button className="h-9 w-9 bg-indigo-600 text-white rounded flex items-center justify-center">
//                             <IoReturnUpBackOutline />
//                         </button>
                       
//                         <h1 className="text-xl font-semibold text-gray-800">
//                             Collection Details
//                         </h1>
//                     </div>

//                     <select className="px-4 py-2 bg-gray-100 rounded-md text-sm">
//                         <option>Scheduled</option>
//                         <option>Done</option>
//                         <option>Cancelled</option>
//                         <option>Re-Scheduled</option>
//                     </select>




//                     <div className="bg-white rounded-xl shadow p-6">

//         {/* Top Bar */}
//         <div className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-md mb-6">
//           <span className="font-semibold">DEMO LAUNDRY</span>
//           <span className="font-semibold text-gray-700">#TMS/COL-06</span>
//         </div>

//         {/* Order Summary */}
//         <section className="mb-6">
//           <h2 className="font-semibold mb-3">Order Summary & Timeline</h2>

//           <div className="grid grid-cols-2 gap-y-2 text-sm">
//             <p className="font-medium">Collection Status</p>
//             <p className="text-blue-600 font-medium">Scheduled</p>

//             <p className="font-medium">Pickup Date</p>
//             <p>04/12/2025</p>

//             <p className="font-medium">Time Slot</p>
//             <p>09:00 AM - 10:00 AM</p>

//             <p className="font-medium">Created On</p>
//             <p>02/12/2025</p>
//           </div>
//         </section>

//         <hr className="my-6" />

//         {/* Logistics */}
//         <section>
//           <h2 className="font-semibold mb-4">Collection Logistics</h2>

//           <div className="grid grid-cols-2 gap-6 text-sm">

//             {/* Customer */}
//             <div>
//               <h3 className="font-medium mb-2">Customer Details</h3>
//               <p><b>Name:</b> Test</p>
//               <p><b>Phone:</b> 9876543210</p>
//               <p><b>Email:</b> test@gmail.com</p>
//               <p><b>Address:</b> Dubai</p>
//             </div>

//             {/* Driver */}
//             <div>
//               <h3 className="font-medium mb-2">Driver Details</h3>
//               <p><b>Name:</b> Test</p>
//               <p><b>Phone:</b> 9876543210</p>
//             </div>

//           </div>

//           {/* Comments */}
//           <div className="mt-6 text-sm">
//             <p className="mb-2"><b>Order Comments:</b></p>
//             <p className="text-gray-600">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//             </p>

//             <p className="mt-4"><b>Status Notes:</b> New Cloth.</p>
//           </div>
//         </section>

//       </div>




//                 </div>
                
//             </div>
//         </>
//     );
// }

// export default ViewCollectionDetails;












// import { useParams, useNavigate } from "react-router-dom";
// import { IoReturnUpBackOutline } from "react-icons/io5";

// function ViewCollectionDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   return (
//     <div className="p-6 bg-[#f4f7fb] min-h-screen">
//       <div className="bg-white rounded-xl shadow max-w-4xl mx-auto p-6">

//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => navigate(-1)}
//               className="p-2 bg-indigo-600 text-white rounded"
//             >
//               <IoReturnUpBackOutline />
//             </button>
//             <h2 className="text-lg font-semibold">Collection Details</h2>
//           </div>

//           <select className="px-3 py-2 bg-gray-100 rounded">
//             <option>Scheduled</option>
//             <option>Done</option>
//             <option>Cancelled</option>
//           </select>
//         </div>

//         {/* ID Row */}
//         <div className="flex justify-between bg-gray-100 p-4 rounded mb-6">
//           <span className="font-medium">DEMO LAUNDRY</span>
//           <span className="font-semibold">#{id}</span>
//         </div>

//         {/* Rest of UI → exactly from Figma */}
//       </div>
//     </div>
//   );
// }

// export default ViewCollectionDetails;
