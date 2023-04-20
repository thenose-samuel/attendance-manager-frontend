import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import style from "./modal.module.css";
import { STUDENTS, TEST_URL } from "../utils/constants";

function AddStudentModal({ show, onClose }) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [students, setStudents] = useState(null);
  useEffect(() => {
    setIsBrowser(true);
    getStudents(setFetching, setStudents, students);
  }, []);

  if (isBrowser) {
    if (show === true) {
      return ReactDOM.createPortal(
        !fetching ? (
          <div className={style.font}>
            <div
              className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center backdrop-blur-md "
              // onClick={() => onClose()}
            >
              <div className="bg-neutral-900 w-96 h-96 p-3 border-neutral-800 border-solid border-x-2 border-y-2">
                <input
                  placeholder="Search"
                  className="placeholder:text-neutral-600 max-w-full bg-neutral-900 rounded-md w-full h-10 border-2 border-neutral-800 focus:ring-yellow-400 focus:ring-2 focus:outline-none text-gray-300 font-regular text-sm p-2"
                ></input>
                {/* <div>hello</div> */}
                {students !== null ? (
                  students[0].map((student) => {
                    return (
                      <>
                        <div className="font-bold text-sm pt-2">
                          {student.personName}
                        </div>
                        <div className="text-xs text-neutral-700 border-b-2 border-neutral-800">
                          {student.userId}
                        </div>
                      </>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className={style.font}>
            <div
              className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center backdrop-blur-md "
              // onClick={() => onClose()}
            >
              <div className="bg-neutral-900 w-96 h-96 p-3 border-neutral-800 border-solid border-x-2 border-y-2 flex justify-center items-center">
                <div className="font-bold text-sm">
                  Fetching student data...
                </div>
              </div>
            </div>
          </div>
        ),
        document.getElementById("modal")
      );
    } else {
      return null;
    }
  } else {
    return null;
  }
}

async function getStudents(setFetching, setStudents, students) {
  setFetching(true);
  try {
    const response = await fetch(TEST_URL + STUDENTS, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setStudents([data]);
    console.log(students);
  } catch (e) {
    console.log("Error: ", e);
  }
  setFetching(false);
}

export default AddStudentModal;
