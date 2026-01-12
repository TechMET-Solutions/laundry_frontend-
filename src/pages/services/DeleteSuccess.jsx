import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

const DeleteSuccess = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl p-10 w-full max-w-md text-center border-2 border-green-500">
        
        <div className="flex justify-center mb-4 text-green-500">
          <IoCheckmarkDoneCircleOutline size={80} />
        </div>

        <p className="text-lg font-medium text-gray-800">
          Service removed from the list successfully.
        </p>

        <button
          className="mt-6 px-6 py-2 bg-green-500 text-white rounded-lg"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default DeleteSuccess;
