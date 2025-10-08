import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function GuestsCount() {
  const [guestCount, setGuestCount] = useState(1);

  const increaseGuests = () => setGuestCount((prev) => prev + 1);
  const decreaseGuests = () =>
    setGuestCount((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex items-center justify-between border-l border-gray-200 px-4">
      <FontAwesomeIcon icon={faUser} className="px-2 text-gray-600" />

      <button
        className="rounded-full hover:bg-gray-100 p-2 transition"
        type="button"
        onClick={decreaseGuests}
        disabled={guestCount === 1}
      >
        <FontAwesomeIcon
          icon={faMinus}
          className={`${guestCount === 1 ? "text-gray-400" : "text-gray-700"}`}
        />
      </button>

      <span className="text-gray-700 px-3 min-w-[60px] text-center">
        {guestCount} {guestCount === 1 ? "Guest" : "Guests"}
      </span>

      <button
        className="rounded-full hover:bg-gray-100 p-2 transition"
        type="button"
        onClick={increaseGuests}
      >
        <FontAwesomeIcon icon={faPlus} className="text-gray-700" />
      </button>
    </div>
  );
}
