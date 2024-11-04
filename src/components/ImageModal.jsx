import React, { useEffect, useState, useRef } from "react";
import { FaTimes } from "react-icons/fa"; // Importing a close icon

const ImageModal = ({ imageUrl, onClose }) => {
  const [zoomed, setZoomed] = useState(false);
  const closeButtonRef = useRef(null); // For focusing close button on open

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus(); // Focus close button on open

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out cursor-pointer"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl max-h-full p-4 bg-white rounded-lg shadow-lg transform scale-95 transition-transform duration-300 ease-in-out animate-fadeIn "
        onClick={(e) => e.stopPropagation()} // Prevent close on modal click
      >
        {/* Close Button with Icon and Focus */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-2 z-10 text-white bg-red-600 rounded-full w-8 h-8 flex items-center justify-center font-bold hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          ref={closeButtonRef}
          tabIndex="0"
        >
          <FaTimes />
        </button>

        {/* Image with toggle zoom effect */}
        <img
          src={imageUrl}
          alt="Selected"
          className={`w-full h-auto max-h-[80vh] max-w-full rounded-md cursor-pointer transition-transform duration-500 ease-in-out ${zoomed ? "scale-125" : "scale-100"} object-contain`}
          onClick={() => setZoomed(!zoomed)} // Toggle zoom on click
        />
      </div>
    </div>
  );
};

export default ImageModal;
