// import React from 'react'
// import logo from '../../assets/logo.png'
// import {
//   LuLayoutDashboard,
//   LuShoppingCart,
//   LuClipboardList,
//   LuUsers,
//   LuBarChart3,
//   LuBriefcase,
//   LuUserCog,
//   LuReceipt,
//   LuClock,
//   LuMapPin,
//   LuLogOut
// } from "react-icons/lu";

// const menu = [
//   { name: 'Dashboard', icon: LuLayoutDashboard },
//   { name: 'POS', icon: LuShoppingCart },
//   { name: 'Orders', icon: LuClipboardList },
//   { name: 'Products', icon: LuBriefcase },
//   { name: 'Customers', icon: LuUsers },
//   { name: 'Reports', icon: LuBarChart3 },
//   { name: 'Services', icon: LuBriefcase },
//   { name: 'Employees', icon: LuUserCog },
//   { name: 'Payment Receipt', icon: LuReceipt },
//   { name: 'Time Slots', icon: LuClock },
//   { name: 'Location Management', icon: LuMapPin },
// ]

// function Sidebar() {
//   return (
//     <aside className="h-screen w-64 bg-white border-r flex flex-col">
      
     
//       <div className="p-6">
//         <img src={logo} alt="Logo" className="w-28 mx-auto" />
//       </div>

//       <nav className="flex-1 overflow-y-auto px-3 space-y-1">
//         {menu.map((item, i) => {
//           const Icon = item.icon
//           return (
//             <button
//               key={i}
//               className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600
//                          hover:bg-blue-50 hover:text-blue-600 transition"
//             >
//               <Icon className="text-lg" />
//               <span className="text-sm font-medium">{item.name}</span>
//             </button>
//           )
//         })}
//       </nav>

//       {/* Logout */}
//       <div className="p-3 border-t">
//         <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg
//                            text-red-500 hover:bg-red-50 transition">
//           <LuLogOut />
//           Logout
//         </button>
//       </div>

//     </aside>
//   )
// }

// export default Sidebar


import { NavLink } from 'react-router-dom'
import React from 'react'
import logo from '../../assets/logo.png'
import {
  LuLayoutDashboard,
  LuShoppingCart,
  LuClipboardList,
  LuUsers,
  // LuBarChart3,
  LuBriefcase,
  LuUserCog,
  LuReceipt,
  LuClock,
  LuMapPin,
  LuLogOut
} from "react-icons/lu";

const menu = [
  { name: 'Dashboard', icon: LuLayoutDashboard, path: '/' },
  { name: 'POS', icon: LuShoppingCart, path: '/pos' },
  { name: 'Orders', icon: LuClipboardList, path: '/orders' },
  { name: 'Products', icon: LuBriefcase, path: '/products' },
  { name: 'Customers', icon: LuUsers, path: '/customers' },
  { name: 'Reports', icon: LuBriefcase, path: '/reports' },
  { name: 'Services', icon: LuBriefcase, path: '/services' },
  { name: 'Employees', icon: LuUserCog, path: '/employees' },
  { name: 'Payment Receipt', icon: LuReceipt, path: '/payments' },
  { name: 'Time Slots', icon: LuClock, path: '/time-slots' },
  { name: 'Location Management', icon: LuMapPin, path: '/locations' },
]


function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-white border-r flex flex-col">
      
      {/* Logo */}
      <div className="p-6">
        <img src={logo} alt="Logo" className="w-28 mx-auto" />
      </div>

    <nav className="flex-1 overflow-y-auto px-3 space-y-1">
  {menu.map((item, i) => {
    const Icon = item.icon
    return (
      <NavLink
        key={i}
        to={item.path}
        className={({ isActive }) =>
          `w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition
          ${isActive
            ? 'bg-blue-100 text-blue-600'
            : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`
        }
      >
        <Icon className="text-lg" />
        {item.name}
      </NavLink>
    )
  })}
</nav>


      {/* Logout */}
      <div className="p-3 border-t">
        <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg
                           text-red-500 hover:bg-red-50 transition">
          <LuLogOut />
          Logout
        </button>
      </div>

    </aside>
  )
}

export default Sidebar
