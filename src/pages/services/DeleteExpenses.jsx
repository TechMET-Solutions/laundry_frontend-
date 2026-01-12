import { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";


const DeleteExpenses = ({onClose,onDelete}) => {
    
    return (
    <>
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
    <div className="w-full max-w-90   rounded-xl bg-white p-8 shadow-lg ">
        <div className="align-center justify-center flex text-gray-700 ">
            <MdOutlineDeleteOutline size={60}/>
        </div>
       <div className=" text-center">
        
        
         <h3 className="text-gray-800 font-bold text-2xl">Are you sure ?</h3>
        <p className="text-base">Are you sure you want to delete this</p>
       </div>

       <div className="align-center justify-center flex gap-4 mt-5">
        <button className="border-2 border-gray-500 px-5 py-2 rounded-lg" onclick={onclose}>Cancel</button>
        <button className="bg-orange-500 px-4 py-2 rounded-lg text-white" onClick={onDelete}>Delete</button>
       </div>
    </div>
    </div>
    </>
    );
}

    export default DeleteExpenses;
