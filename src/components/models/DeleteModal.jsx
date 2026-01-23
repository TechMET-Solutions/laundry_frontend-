// export default function DeleteModal({
//   isOpen,
//   title = "Are you sure?",
//   description = "Do you really want to continue? This action cannot be undone.",
//   onCancel,
//   onConfirm,
// }) {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Backdrop */}
//       <div
//         className="absolute inset-0 bg-black/40"
//         onClick={onCancel}
//       />

//       {/* Modal */}
//       <div
//         role="dialog"
//         aria-modal="true"
//         className="relative flex flex-col items-center bg-white shadow-lg rounded-xl py-6 px-5 md:w-[460px] w-[370px] border border-gray-200 animate-scaleIn"
//       >
//         {/* Icon */}
//         <div className="flex items-center justify-center p-4 bg-red-100 rounded-full">
//           <svg
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M2.875 5.75h1.917m0 0h15.333m-15.333 0v13.417a1.917 1.917 0 0 0 1.916 1.916h9.584a1.917 1.917 0 0 0 1.916-1.916V5.75m-10.541 0V3.833a1.917 1.917 0 0 1 1.916-1.916h3.834a1.917 1.917 0 0 1 1.916 1.916V5.75m-5.75 4.792v5.75m3.834-5.75v5.75"
//               stroke="#DC2626"
//               strokeWidth="1.8"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </div>

//         {/* Content */}
//         <h2 className="text-gray-900 font-semibold mt-4 text-xl">
//           {title}
//         </h2>
//         <p className="text-sm text-gray-600 mt-2 text-center">
//           {description}
//         </p>

//         {/* Actions */}
//         <div className="flex items-center justify-center gap-4 mt-5 w-full">
//           <button
//             type="button"
//             onClick={onCancel}
//             className="w-full md:w-36 h-10 rounded-md border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-100 active:scale-95 transition"
//           >
//             Cancel
//           </button>
//           <button
//             type="button"
//             onClick={onConfirm}
//             className="w-full md:w-36 h-10 rounded-md text-white bg-red-600 font-medium text-sm hover:bg-red-700 active:scale-95 transition"
//           >
//             Confirm
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import GreenCheckIcon from "../../assets/confirmation.gif";

export default function DeleteModal({
  isOpen,
  title = "Are you sure?",
  description = "Do you really want to continue? This action cannot be undone.",
  onCancel,
  onConfirm,
}) {
  const [confirmed, setConfirmed] = useState(false);

  // if (!isOpen) return null;

  // const handleConfirm = () => {
  //   setConfirmed(true);
  //   onConfirm?.(); // optional: parent action
  // };
  useEffect(() => {
    if (!isOpen) {
      setConfirmed(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (confirmed) {
      const timer = setTimeout(() => {
        onCancel?.();
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [confirmed, onCancel]);

   if (!isOpen) return null;

  const handleConfirm = () => {
    setConfirmed(true);
    onConfirm?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative flex flex-col items-center bg-white shadow-lg rounded-xl py-6 px-5 md:w-[460px] w-[370px] border border-gray-200 animate-scaleIn"
      >
        {!confirmed ? (
          <>
            {/* Icon */}
            <div className="flex items-center justify-center p-4 bg-red-100 rounded-full">
              {/* svg */}
            </div>

            {/* Content */}
            <h2 className="text-gray-900 font-semibold mt-4 text-xl">
              {title}
            </h2>
            <p className="text-sm text-gray-600 mt-2 text-center">
              {description}
            </p>

            {/* Actions */}
            <div className="flex items-center justify-center gap-4 mt-5 w-full">
              <button
                type="button"
                onClick={onCancel}
                className="w-full md:w-36 h-10 rounded-md border border-gray-300 bg-white text-gray-600 font-medium text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="w-full md:w-36 h-10 rounded-md text-white bg-red-600 font-medium text-sm"
              >
                Confirm
              </button>
            </div>
          </>
        ) : (
          <>
            <img src={GreenCheckIcon} alt="check" className="" />

            <h2 className="text-green-600 font-semibold text-xl">
              Deleted Successfully!
            </h2>
            <p className="text-sm text-gray-600 mt-2 text-center">
              Service type removed from the list successfully.
            </p>

            <button
              onClick={onCancel}
              className="mt-5 w-36 h-10 rounded-md bg-green-600 text-white"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}
