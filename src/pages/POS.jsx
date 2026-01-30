import React, { useEffect, useState } from 'react';
import {
    Search, ChevronDown, Calendar, User, UserPlus,
    Trash2, Edit3, RotateCcw, ArrowLeft
} from 'lucide-react';
import axios from 'axios';



const POS = () => {
    const [cart, setCart] = useState([]);

    const categories = [
        { name: 'Ghutra', icon: '👳‍♂️' }, { name: 'Under T-Shirt', icon: '👕' },
        { name: 'Designer Saree', icon: '👗' }, { name: 'Hoodies', icon: '🧥' },
        { name: 'Blanket', icon: '🛌' }, { name: 'Long Dress', icon: '👗' },
        { name: 'Underwear & Socks', icon: '🧦' }, { name: 'Sweater', icon: '🧥' },
        { name: 'Scarf', icon: '🧣' }, { name: 'Bedsheet single', icon: '🛏️' },
        { name: '3PC Suit', icon: '👔' }, { name: '2PC Suit', icon: '👔' },
        { name: 'Pajama', icon: '👖' }, { name: 'Jacket', icon: '🧥' },
        { name: 'Hand Towel', icon: '🧼' }, { name: 'Shoe', icon: '👠' },
        { name: 'Trouser', icon: '👖' }, { name: 'T-Shirt', icon: '👕' },
        { name: 'Shirt', icon: '👔' }, { name: 'Pillow Case', icon: '🛌' },
    ];

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);


    const [selectedService, setSelectedService] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [qty, setQty] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/service_list/list");
            setServices(res.data.data);
            console.log(res.data);
        } catch (error) {
            console.error("Error fetching services", error);
        } finally {
            setLoading(false);
        }
    };

    const handleServiceClick = (service) => {
        setSelectedService(service);
        setSelectedType(service.service_types[0]); // default
        setQty(1);
        setIsModalOpen(true);
    };




    const addToCart = () => {
        const item = {
            id: Date.now(),
            name: selectedService.name,
            type: selectedType.type,
            price: Number(selectedType.price),
            qty,
        };

        setCart((prev) => [...prev, item]);
        setIsModalOpen(false);
    };


    // calculation
    const subTotal = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    const tax = subTotal * 0.05;
    const grandTotal = subTotal + tax;



    return (
        <div className="min-h-screen bg-[#f0f4f9] p-6 font-sans text-slate-700">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <button className="p-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold text-slate-800">Create New Order</h1>
            </div>

            <div className="grid grid-cols-12 gap-6">

                {/* Left Side: Product Selection */}
                <div className="col-span-8">
                    <div className="flex gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border-none bg-white shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border-none font-medium">
                            Sort By Category <ChevronDown size={16} />
                        </button>
                    </div>

                    {loading ? (
                        <p>Loading...</p>
                    ) : services.length > 0 ? (
                        <ServiceGrid
                            services={services}
                            onServiceClick={handleServiceClick}
                        />
                    ) : (
                        <p>No services found</p>
                    )}

                </div>

                {/* Right Side: Order Summary */}
                <div className="col-span-4 flex flex-col gap-4">
                    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col h-full">

                        {/* Dates & Users */}
                        <div className="grid grid-cols-2 gap-4 mb-6 text-xs">
                            <div className="flex flex-col gap-1">
                                <span className="text-slate-400">Order Date</span>
                                <div className="flex items-center gap-2 font-bold text-indigo-700">
                                    28/11/2025 <Calendar size={14} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 text-right">
                                <span className="text-slate-400">Delivery Date</span>
                                <div className="flex items-center justify-end gap-2 font-bold text-indigo-700">
                                    02/12/2025 <Calendar size={14} />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2 mb-6">
                            <button className="flex-1 flex items-center gap-2 px-3 py-2 bg-indigo-50 text-slate-500 rounded-lg text-sm">
                                <User size={16} /> Select Driver
                            </button>
                            <div className="flex-[1.2] flex items-center bg-indigo-50 rounded-lg pr-1">
                                <button className="flex-1 flex items-center gap-2 px-3 py-2 text-slate-500 text-sm">
                                    <User size={16} /> Select Customer
                                </button>
                                <button className="p-1.5 bg-indigo-600 text-white rounded-md">
                                    <UserPlus size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto mb-6 space-y-3">
                            {cart.map((item) => (
                                <div key={item.id} className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="font-bold text-slate-800">{item.name} <span className="text-indigo-400 font-normal text-sm">({item.type})</span></h4>
                                            <p className="text-sm font-bold mt-1 uppercase">AMD {item.price.toFixed(2)}</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button className="w-6 h-6 flex items-center justify-center bg-slate-200 rounded text-slate-600">-</button>
                                            <span className="w-8 text-center font-bold">{item.qty}</span>
                                            <button className="w-6 h-6 flex items-center justify-center bg-slate-200 rounded text-slate-600">+</button>
                                            <button className="ml-2 text-orange-400 hover:text-red-500">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2 mt-2">
                                        <div className={`w-12 h-6 rounded ${item.color} border border-slate-200`}></div>
                                        <button className="p-1 border border-indigo-300 text-indigo-500 rounded hover:bg-indigo-50">
                                            <Edit3 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Totals Section */}
                        <div className="bg-indigo-50/30 p-4 rounded-xl space-y-2 text-sm mb-4 border border-indigo-50">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Order ID:</span>
                                <span className="font-bold">Addon: <span className="ml-4">AED 25.00</span></span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500">Remarks:</span>
                                <div className="text-right">
                                    <div className="flex justify-between w-40"><span>Sub Total:</span> <b>AED {subTotal.toFixed(2)}</b></div>
                                    <div className="flex justify-between w-40"><span>Tax (5%):</span> <b>AED {tax.toFixed(2)}</b></div>
                                    <div className="flex justify-between w-40"><span>Discount %:</span> <b>0 %</b></div>
                                    <div className="flex justify-between w-40 text-base mt-1 text-slate-800"><span>Gross Total:</span> <b>AED {grandTotal.toFixed(2)}</b></div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <input type="text" placeholder="Enter Payment" className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-1 focus:ring-indigo-400 outline-none" />
                            <select className="px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white text-slate-500 outline-none">
                                <option>Payment Method</option>
                            </select>
                        </div>

                        <div className="flex gap-2">
                            <button className="flex-[2] bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-md">Save</button>
                            <button className="flex-[2] bg-emerald-500 text-white py-3 rounded-xl font-bold hover:bg-emerald-600 shadow-md">Print</button>
                            <button className="flex-none p-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 shadow-md">
                                <RotateCcw size={20} />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
{isModalOpen && selectedService && selectedType && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-[420px]">

                        <h3 className="text-lg font-bold mb-4">
                            {selectedService.name}
                        </h3>

                        {/* Service Types */}
                        <div className="space-y-2 mb-4">
                            {selectedService.service_types.map((type) => (
                                <button
                                    key={type.type}
                                    onClick={() => setSelectedType(type)}
                                    className={`w-full flex justify-between items-center p-3 rounded-lg border 
              ${selectedType.type === type.type
                                            ? "border-indigo-500 bg-indigo-50"
                                            : "border-slate-200"
                                        }`}
                                >
                                    <span className="capitalize font-medium">{type.type}</span>
                                    <span className="font-bold">AED {type.price}</span>
                                </button>
                            ))}
                        </div>

                        {/* Quantity */}
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-medium">Quantity</span>
                            <div className="flex items-center gap-2">
                                <button onClick={() => qty > 1 && setQty(qty - 1)}>-</button>
                                <span className="font-bold">{qty}</span>
                                <button onClick={() => setQty(qty + 1)}>+</button>
                            </div>
                        </div>

                        {/* Total */}
                        <div className="flex justify-between text-lg font-bold mb-4">
                            <span>Total</span>
                            <span>
                                AED {(qty * Number(selectedType.price)).toFixed(2)}
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 border rounded-lg py-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addToCart}
                                className="flex-1 bg-indigo-600 text-white rounded-lg py-2"
                            >
                                Add to Cart
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>

    );
};

const ServiceGrid = ({ services = [], onServiceClick }) => {
    const BASE_URL = "http://localhost:5000/uploads/services";

    return (
        <div className="grid grid-cols-5 gap-4">
            {services.map((item) => (
                <div
                    key={item.id}
                    onClick={() => onServiceClick(item)}
                    className="bg-white p-4 rounded-xl shadow hover:shadow-md cursor-pointer text-center"
                >
                    <img
                        src={`${BASE_URL}/${item.addIcon}`}
                        alt={item.name}
                        className="w-14 h-14 mx-auto mb-2 object-contain"
                        onError={(e) => (e.target.src = "/placeholder.png")}
                    />
                    <p className="font-semibold text-sm">{item.name}</p>
                </div>
            ))}
        </div>
    );
};


export default POS;