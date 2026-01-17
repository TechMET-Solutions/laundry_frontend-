import { useEffect, useState } from "react";
import { createTimeSlot, updateTimeSlot } from "../../api/timeslot";
//import { updateTimeSlot } from "../../../../laundry_backend/src/controllers/timeslot.controller";

const AddTime = ({ onClose, onSuccess, slot }) => {
  // const [timeSlot, setTimeSlot] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");

  const convertTo24Hour = (time12h) => {
  if (!time12h) return "";

  const [time, modifier] = time12h.split(" ");
  let [hours, minutes] = time.split(":");

  if (modifier === "PM" && hours !== "12") {
    hours = String(parseInt(hours, 10) + 12);
  }
  if (modifier === "AM" && hours === "12") {
    hours = "00";
  }

  return `${hours.padStart(2, "0")}:${minutes}`;
};


  useEffect(() => {
    if(slot?.time_slot) {
      const [from12, to12] = slot.time_slot.split(" - ");
      setFromTime(convertTo24Hour(from12));
      setToTime(convertTo24Hour(to12));
      setIsActive(slot.status === 1);
    }
  }, [slot]);


  // const formatTime = (time) => {
  //   const [hour, minute] = time.split(":");
  //   let h = parseInt(hour, 10);
  //   const ampm = h >= 12 ? "PM" : "AM";
  //   h = h % 11 || 11;
  //   h = h % 12 || 12;
  //   return `${h}:${minute} ${ampm}`;
  // };

  // helper function
  // const convertTo24Hour = (time12h) => {
  //   const [time, modifier] = time12h.split(" ");
  //   let [hours, minutes] = time.split(":");

  //   if(modifier === "PM" && hours !== "12") {
  //     hours = String(parseInt(hours, 10) + 12);
  //   }
  //   if(modifier === "AM" && hours === "12") {
  //     hours = "00";
  //   }
  //   return `${hours.padStart(2, "0")}:${minutes}`;
  // }

  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    let h = parseInt(hour, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${minute} ${ampm}`;
  };

  const formatTimes = (time) => {
    const [hour, minute] = time.trim(":");
    let h = parseInt(hour, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${minute} ${ampm}`;
  }


  const handleSave = async () => {
    // if (!timeSlot.trim()) {
    //   alert("Time slot is required");
    //   return;
    // }

    if(!fromTime || !toTime) {
      alert("Time Slot is required");
      return;
    }
    
    const timeSlotValue = `${formatTime(fromTime)} - ${formatTime(toTime)}`;

    try {
       if(slot) {
        await updateTimeSlot(slot.id, {
          time_slot:timeSlotValue,
          status: isActive ? 1 : 0,
        })
       } else {
        await createTimeSlot({
          time_slot: timeSlotValue,
          status: isActive ? 1 : 0,
        })
      }
      // await createTimeSlot({
      //   time_slot: timeSlotValue,
      //   status: isActive ? 1 : 0,
      // });

      onSuccess(); // ✅ refresh table
      onClose();   // ✅ close modal
      } catch (error) {
            console.log("Axios error full:", error);
            //console.log("Response:", error.response);
            //console.log("Message:", error.message);
            alert("Failed to save time slot");
        }
      };

  return (
    // <div className="fixed inset-0 flex items-center justify-center bg-black/40">
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-80 rounded-xl p-8 shadow-lg">
        
        <h2 className="text-left text-lg font-medium text-gray-700 mb-3">
          {/* Add Time Slot */}
          {slot ? "Edit Time Slot" : "Add Time Slot"}
        </h2>

        <div className="text-left">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Time Slot <span className="text-red-500">*</span>
          </label>
          {/* <input
            type="text"
            placeholder="Ex: 05PM-06PM"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            className="text-sm border-2 border-gray-300 rounded-lg px-4 py-2 w-full"
          /> */}

          <div className="grid grid-cols-2 gap-3 mt-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From
              </label>
              <input
                type="time"
                value={fromTime}
                onChange={(e) => setFromTime(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To
              </label>
              <input
                type="time"
                value={toTime}
                onChange={(e) => setToTime(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

        </div>

        <div className="flex items-center mt-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-800 transition-all"></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-full"></div>
            <span className="text-sm font-medium text-gray-700 ml-3">
              Is Active?
            </span>
          </label>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            className="border-2 border-gray-300 text-sm px-8 py-2 rounded-lg cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="bg-blue-800 text-white px-8 py-2 rounded-lg cursor-pointer"
            onClick={handleSave}
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddTime;

