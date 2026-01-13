import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { 
  Phone, Mail, MapPin, Calendar, FileText, 
  DollarSign, CreditCard, Package 
} from "lucide-react";
import { BsFilePersonFill } from "react-icons/bs";
import { FaSquarePhone } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { BsFilePerson } from "react-icons/bs";
import { RiPagesLine } from "react-icons/ri";
import { MdOutlineLocationOn } from "react-icons/md";
import { TbFileInvoice } from "react-icons/tb";
import { GrMoney } from "react-icons/gr";





function CustomerD() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get customer ID from URL
  const location = useLocation();
  
  // Get customer data from navigation state or use default
  const customer = location.state?.customerData || {
    id: id || "N/A",
    name: "Customer Name",
    type: "Retail",
    contact: "123-456-7890",
    address: "123 Main St, Cityville",
    email: "customer@example.com",
    taxNumber: "TAX123456789",
    textingActive: true,
    invoiceTotal1: 1,
    totalPayments: 0.00,
    totalBalance: 40.25,
    advanceAmount: 0.00,
    orders: [
      {
        id: "TMS/ORD-01",
        orderDate: "28/11/23",
        deliveryDate: "30/11/23",
        amount: 40.25,
        status: "Received",
        totalAmount: 40.25,
        paidAmount: 0.00
      }
    ]
  };

  // Function to go back
  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
    // OR navigate to specific route:
    // navigate("/customers");
  };

  return (
    <div className="p-6 bg-[#f4f7fb] min-h-screen">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={handleGoBack}
            className="h-8 w-8 flex items-center justify-center bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
          >
            <IoReturnUpBackOutline />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Customer Details</h1>
        </div>
      </div>
        {/* Customer Basic Information */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 h-120 p-2">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Customer Information</h3>
          <div className="space-y-9">
            <div className="flex items-center">
              <span className="text-gray-600 w-24"><BsFilePersonFill />
</span>
              <span className="font-medium">{customer.name} </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 w-24"><BsFilePerson />
</span>
              <span className="font-medium">{customer.contact} contact</span>
            </div>
            
             <div className="flex items-center">
              <span className="text-gray-600 w-24"><MdOutlineEmail />
</span>
              <span className="font-medium">{customer.email} email </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 w-24"><RiPagesLine />
</span>
              <span className="font-medium">{customer.taxNumber} tax number </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 w-24"><MdOutlineLocationOn />
</span>
              <span className="font-medium">{customer.address} address </span>
            </div>
          </div>
        </div>

        

        <div className="bg-white rounded-lg shadow-md p-6 mb-6 h-60 w-150   ">
        <div className=" space-x-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-30 mb-9  m-7 flex">
          

          <div  className="m-5 ">
            <div className="text-sm text-gray-500  "> <TbFileInvoice /> Invoice Total</div>
            <p className="text-lg font-semibold">{customer.invoiceTotal1 || 0}</p>
          </div>

          <div className="m-5">
            <div className="text-sm text-gray-500"> <GrMoney />Total Payments</div>
            <p className="text-lg font-semibold">AED {customer.totalPayments?.toFixed(2) || "0.00"}</p>
          </div>

          <div className="m-5">
            <div className="text-sm text-gray-500"> <GrMoney />Total Balance</div>
            <p className="text-lg font-semibold text-red-600">AED {customer.totalBalance?.toFixed(2) || "0.00"} Dr</p>
          </div>

          <div className="m-5">
            <div className="text-sm text-gray-500"> <GrMoney /> Advance Amount</div>
            <p className="text-lg font-semibold">AED {customer.advanceAmount?.toFixed(2) || "0.00"}</p>
          </div>
        </div>

        {/* Email and Tax Number */}
        
      </div>
      </div>

     
      

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Orders</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-blue-300">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Id
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Information
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Amt.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customer.orders?.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{order.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm">Order date: {order.orderDate}</span>
                      </div>
                      <div className="flex items-center">
                        <Package className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm">Delivery Date: {order.deliveryDate}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold">AED {order.amount?.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'Received' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div>Total Amount: AED {order.totalAmount?.toFixed(2)}</div>
                      <div>Paid Amount: AED {order.paidAmount?.toFixed(2)}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    AED {(order.totalAmount - order.paidAmount)?.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                      Add Payment
                    </button>
                  </td>
                </tr>
              )) || (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No orders found for this customer.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CustomerD;
