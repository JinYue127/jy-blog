import { ToastContainer as ReactToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

export function ToastContainer() {
  return (
    <ReactToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar
      closeButton={CloseButton}
      toastClassName="dark:bg-[#1c1c1e] dark:text-white text-sm border dark:border-gray-800"
    />
  );
}

function CloseButton({
  closeToast,
}: {
  closeToast: (event: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <button
      type="button"
      aria-label="Close Toast"
      className="text-lg opacity-50 hover:opacity-100"
      onClick={closeToast}
    >
      <span className="icon-[material-symbols--close]"></span>
    </button>
  );
}
