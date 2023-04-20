import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import style from "./modal.module.css";

function AddStudentModal({ show, onClose }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser) {
    if (show === true) {
      return ReactDOM.createPortal(
        <div className={style.font}>
          <div
            className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center backdrop-blur-md "
            //onClick={() => onClose()}
          >
            <div className="bg-neutral-900 w-96 h-96 p-3 border-neutral-800 border-solid border-x-2 border-y-2">
              <input
                placeholder="Search"
                className="placeholder:text-neutral-600 max-w-full bg-neutral-900 rounded-md w-full h-10 border-2 border-neutral-800 focus:ring-yellow-400 focus:ring-2 focus:outline-none text-gray-300 font-regular text-sm p-2"
              ></input>
            </div>
          </div>
        </div>,
        document.getElementById("modal")
      );
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export default AddStudentModal;
