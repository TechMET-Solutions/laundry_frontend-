import { NavLink } from 'react-router-dom'
import React, { useState } from 'react'
import logo from '../../assets/logo.png'

import {
  LuLayoutDashboard,
  LuShoppingCart,
  LuClipboardList,
  LuUsers,
  LuBriefcase,
  LuUserCog,
  LuReceipt,
  LuClock,
  LuMapPin,
  LuLogOut,
} from "react-icons/lu";
import { GiTakeMyMoney } from "react-icons/gi";
import { TbSettingsCode } from "react-icons/tb";
import { RiArrowDownSLine, RiArrowRightSLine } from 'react-icons/ri';

const menu = [
  { name: 'Dashboard', icon: LuLayoutDashboard, path: '/' },
  { name: 'POS', icon: LuShoppingCart, path: '/pos' },
  { name: 'Orders', icon: LuClipboardList, path: '/orders' },
  { name: 'Collection', icon: LuBriefcase, path: '/collection' },
  { name: 'Expenses', icon: GiTakeMyMoney, path: '/expenses' },
  { name: 'Customers', icon: LuUsers, path: '/customers' },
  {
    name: 'Services',
    icon: TbSettingsCode,
    children: [
      { name: 'Service List', path: '/services/list' },
      { name: 'Service Type', path: '/services/type' },
      { name: 'Service Category', path: '/services/category' },
      { name: 'Addon', path: '/services/addon' },
    ]
  },
  { name: 'Employees', icon: LuUserCog, path: '/employees' },
  { name: 'Payment Receipt', icon: LuReceipt, path: '/payments' },
  { name: 'Reports', icon: LuBriefcase, path: '/reports' },
  { name: 'Time Slots', icon: LuClock, path: '/time-slots' },
  {
    name: 'Location Management',
    icon: LuMapPin,
    children: [
      { name: 'Emirates', path: '/location_management/emirates' },
      { name: 'Areas', path: '/location_management/areas' }
    ]
  },
  { name: 'Logout', icon: LuLogOut, path: '/logout' },
]

function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null)
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile / Tablet Toggle Button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#EAEEF6] shadow"
      >
        ☰
      </button>

      {/* Overlay for mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:static z-50
          h-screen m-0 md:m-6 w-64
          bg-white rounded-xl shadow-xl
          flex flex-col
          transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="p-6">
          <img src={logo} alt="Logo" className="w-28 mx-auto" />
        </div>

        <nav className="flex-1 overflow-y-auto px-3 space-y-1">
          {menu.map((item, i) => {
            const Icon = item.icon

            if (item.children) {
              const isOpen = openMenu === item.name

              return (
                <div key={i}>
                  <button
                    onClick={() => setOpenMenu(isOpen ? null : item.name)}
                    className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium
                               text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <Icon className="text-lg" />
                    <span className="flex-1 text-left">{item.name}</span>
                    <span>{isOpen ? <RiArrowDownSLine /> : <RiArrowRightSLine />}</span>
                  </button>

                  {isOpen && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children.map((child, idx) => (
                        <NavLink
                          key={idx}
                          to={child.path}
                          onClick={() => setOpen(false)}
                          className={({ isActive }) =>
                            `block px-3 py-2 rounded-md text-sm transition
                            ${isActive
                              ? 'bg-blue-100 text-blue-600'
                              : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'
                            }`
                          }
                        >
                          {child.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            if (item.name === 'Logout') {
              return (
                <NavLink
                  key={i}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium
                             text-red-600 hover:bg-red-50 hover:text-red-700 transition"
                >
                  <Icon className="text-lg" />
                  {item.name}
                </NavLink>
              )
            }

            return (
              <NavLink
                key={i}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition
                  ${isActive
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                  }`
                }
              >
                <Icon className="text-lg" />
                {item.name}
              </NavLink>
            )
          })}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
