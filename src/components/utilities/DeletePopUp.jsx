import Button from "../ui/Button";
 

export default function ({ PopupDescriptionMessage }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
        
      <div  className="  max-w-md  md:max-w-lg lg:max-w-xl max-h-80 md:max-h-96 rounded-lg bg-white p-18 shadow-lg">
        <h2 className="text-center text-[#3A3D51] font-['Source_Sans_3'] text-[21.79px] font-bold">
          Are you sure?
        </h2>

        <p className="mt-3 text-center text-gray-600 font-400">
          {PopupDescriptionMessage}
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Button className="px-6 " btnText="Cancel" variant="outline" />
          <Button className="px-6 " btnText="Update" variant="primary" />
        </div>
      </div>
    </div>
  );
}
