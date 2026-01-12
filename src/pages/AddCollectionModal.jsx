

const AddCollectionModal = ({onClose}) => {
    return (
        <>

            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"></div>

                <div className="fixed inset-0 flex items-center justify-center z-50 text-gray-700 ">
                    <div className="bg-white w-[520px] rounded-2xl shadow-xl p-6 ">
                    
                        <h2 className="text-lg font-semibold mb-4">Add Collection</h2>

                        <div className="flex gap-6 mb-4 text-sm ">
                            <label className="flex items-center gap-2">
                            <input type="radio" name="type" defaultChecked />
                                Cloth Collection
                            </label>
                            <label className="flex items-center gap-2">
                            <input type="radio" name="type" />
                                Payment Collection
                            </label>
                        </div>

                        {/* Form */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                            <label className="text-gray-800 ">Customer Type *</label>
                            <select className="w-full mt-1 border rounded-lg px-3 py-2 border-2 border-gray-300 text-gray-500">
                                <option>Choose Type</option>
                                <option>Individual</option>
                                <option>Corporate</option>
                            </select>
                            </div>

                            <div>
                            <label className="text-gray-800">Customer *</label>
                            <select className="w-full mt-1 border rounded-lg px-3 py-2 border-2 border-gray-300 text-gray-500">
                                <option>Choose Customer</option>
                                <option>Mohommad</option>
                                <option>Ashwin</option>
                            </select>
                            </div>

                            <div>
                            <label className="text-gray-800">Pick Up Date *</label>
                            <input type="date" className="w-full mt-1 border rounded-lg px-3 py-2 border-2 border-gray-300 text-gray-500" />
                            </div>

                            <div>
                            <label className="text-gray-800">Time Slot *</label>
                            <select className="w-full mt-1 border rounded-lg px-3 py-2 border-2 border-gray-300 text-gray-500 ">
                                <option>Choose Time Slot</option>
                                <option>05 PM - 06 PM</option>
                                <option>04 AM - 05 AM</option>
                                <option>03 PM - 04 PM</option>
                                <option>02 PM - 03 PM</option>
                                <option>01 PM - 02 PM</option>
                                <option>12 PM - 01 PM</option>
                            </select>
                            </div>

                            <div>
                            <label className="text-gray-800">Phone Number *</label>
                            <input
                                type="text"
                                placeholder="**********"
                                className="w-full mt-1 border rounded-lg px-3 py-2 border-2 border-gray-300 text-gray-500"
                            />
                            </div>

                            <div>
                            <label className="text-gray-800">Driver *</label>
                            <select className="w-full mt-1 border rounded-lg px-3 py-2 border-2 border-gray-300 text-gray-500 ">
                                <option>Choose Driver</option>
                                <option>Sales Team</option>
                                <option>Testing</option>
                                <option>Aghil</option>
                                <option>Aswin AD</option>
                                <option>Saurav KK</option>
                                <option>BMW X3</option>
                            </select>
                            </div>
                        </div>

                        {/* Comments */}
                        <div className="mt-4">
                            <label className="text-gray-800 text-sm">Comments</label>
                            <textarea
                            className="w-full mt-1 border rounded-lg px-3 py-2 h-20 resize-none border-2 border-gray-300"
                            placeholder="Enter Comments"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                            onClick={onClose}
                            className="px-5 py-2 border rounded-lg"
                            >
                                Cancel
                            </button>
                            <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg">
                                Save
                            </button>
                        </div>

                    </div>
            </div>
        </>
    );
}

    export default AddCollectionModal;
