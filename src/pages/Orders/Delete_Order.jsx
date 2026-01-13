import React, { useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { CiClock2 } from "react-icons/ci";

function Delete_Order() {
  const [search, setSearch] = useState("");
  const [showRoles, setShowRoles] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const navigate = useNavigate();

  const HandlerOrderList = () => {
    navigate("/orders");
  };

  const tableData = [
    {
      orderId: "TMS/ORD-12",
      orderDate: "28/11/25",
      deliveryDate: "30/11/25",
      customer: "Testing",
      driver: "Aswin VD",
      amount: "AED 40.25",
      total: "AED 40.25",
      paid: "AED 0.00",
      createdBy: "Shop",
    },
    {
      orderId: "TMS/ORD-11",
      orderDate: "28/11/25",
      deliveryDate: "30/11/25",
      customer: "Testing",
      driver: "adhil",
      amount: "AED 40.25",
      total: "AED 40.25",
      paid: "AED 0.00",
      createdBy: "Shop",
    },
    {
      orderId: "TMS/ORD-10",
      orderDate: "28/11/25",
      deliveryDate: "30/11/25",
      customer: "Testing",
      driver: "Aswin VD",
      amount: "AED 40.25",
      total: "AED 40.25",
      paid: "AED 0.00",
      createdBy: "Shop",
    },
    {
      orderId: "TMS/ORD-09",
      orderDate: "28/11/25",
      deliveryDate: "30/11/25",
      customer: "Testing",
      driver: "adhil",
      amount: "AED 40.25",
      total: "AED 40.25",
      paid: "AED 0.00",
      createdBy: "Shop",
    },
  ];

  return (
    <>
      {/* Back Button */}
      <div
        onClick={HandlerOrderList}
        className="flex items-center justify-center bg-indigo-800 w-11 h-11 rounded-sm absolute top-[40px] left-[338px] cursor-pointer"
      >
        <TbArrowBackUp className="w-6 h-6 text-white" />
      </div>

      {/* Title */}
      <p className="absolute top-[50px] left-[450px] font-[Poppins] text-[16px] font-bold">
        Deleted Orders
      </p>

      {/* Search + Filter */}
      <div className="flex gap-4 absolute top-[120px] right-[60px]">
        <div className="w-[320px] h-12 rounded-lg bg-[#E2E8F0] flex items-center px-3 gap-2">
          <CiSearch className="w-5 h-5 text-slate-600" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="flex-1 bg-transparent outline-none"
          />
          {search && (
            <IoIosClose
              onClick={() => setSearch("")}
              className="w-6 h-6 cursor-pointer"
            />
          )}
        </div>

        <div className="relative w-[150px]">
          <div className="h-12 bg-[#E2E8F0] rounded-lg px-4 flex items-center justify-between">
            <span>{selectedRole || "All Drivers"}</span>
            <span
              onClick={() => setShowRoles(!showRoles)}
              className="cursor-pointer"
            >
              {showRoles ? (
                <RiArrowDropUpLine size={24} />
              ) : (
                <RiArrowDropDownLine size={24} />
              )}
            </span>
          </div>

          {showRoles && (
            <div className="absolute top-12 w-full bg-[#E2E8F0] rounded-lg shadow z-20">
              {["All Drivers", "Aswin VD", "Super Man", "Sales Team"].map(
                (role, i) => (
                  <p
                    key={i}
                    onClick={() => {
                      setSelectedRole(role);
                      setShowRoles(false);
                    }}
                    className="px-4 py-2 hover:bg-slate-200 cursor-pointer"
                  >
                    {role}
                  </p>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="absolute top-[190px] left-[300px] right-[40px] bg-[rgb(234,238,246)] rounded-xl p-4">
        {/* Header */}
        <div className="grid grid-cols-9 gap-2 text-[13px] font-semibold text-white text-center">
          {[
            "Order Id",
            "Order Info",
            "Customer",
            "Driver",
            "Amount",
            "Status",
            "Payment",
            "Created By",
            "Action",
          ].map((h, i) => (
            <div key={i} className="bg-sky-400 rounded px-3 py-2">
              {h}
            </div>
          ))}
        </div>

        {/* Rows */}
        {tableData.map((item, i) => (
          <div
            key={i}
            className="grid grid-cols-9 gap-2 mt-3  rounded-lg px-3 py-3 text-[13px] items-center text-center"
          >
            <div className="font-semibold">{item.orderId}</div>

            <div className="text-[12px] leading-5">
              <p>Order date: <b>{item.orderDate}</b></p>
              <p>Delivery Date: <b>{item.deliveryDate}</b></p>
            </div>

            <div>{item.customer}</div>
            <div>{item.driver}</div>
            <div className="font-semibold">{item.amount}</div>

            <div className="text-red-500 font-semibold leading-5">
              <p>Deleted</p>
              <p>Data</p>
            </div>

            <div className="text-[12px] leading-5">
              <p>Total: <b>{item.total}</b></p>
              <p>Paid: <b>{item.paid}</b></p>
            </div>

            <div>{item.createdBy}</div>

            <div className="flex justify-center">
              <div className="w-9 h-9 bg-sky-300 rounded-md flex items-center justify-center cursor-pointer">
                <CiClock2 size={18} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Delete_Order;
