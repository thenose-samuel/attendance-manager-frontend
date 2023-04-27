import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import style from "./modal.module.css";
import { STUDENTS, TEST_URL } from "../utils/constants";

function AddStudentModal({ show, onClose }) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [students, setStudents] = useState(null);
  const [filteredStudents, setFilteredStudents] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    setIsBrowser(true);
    getStudents(setFetching, setStudents, students, setFilteredStudents);
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
                  onChange={(e) => {
                    searchStudent(
                      e.target.value,
                      filteredStudents,
                      students,
                      setFilteredStudents
                    );
                  }}
                  placeholder="Search"
                  className="placeholder:text-neutral-600 mb-2 max-w-full bg-neutral-900 rounded-md w-full h-10 border-2 border-neutral-800 focus:ring-yellow-400 focus:ring-2 focus:outline-none text-gray-300 font-regular text-sm p-2"
                ></input>
                {/* <div>hello</div> */}
                <div className="h-64  overflow-y-scroll">
                  {filteredStudents !== null ? (
                    filteredStudents[0].map((student) => {
                      return (
                        <div
                          onClick={() => {
                            if (!selectedStudents.includes(student.userId)) {
                              selectedStudents.push(student.userId);
                            } else {
                              selectedStudents.splice(
                                selectedStudents.indexOf(student.userId),
                                1
                              );
                            }
                            let newSelectedStudents = [...selectedStudents];
                            setFilteredStudents(filteredStudents);
                            setSelectedStudents(newSelectedStudents);
                          }}
                          key={student.userId}
                          className={`${
                            selectedStudents.includes(student.userId)
                              ? "bg-yellow-500 hover:bg-red-500"
                              : "hover:bg-neutral-800"
                          } m-1 rounded-md p-2 cursor-pointer duration-200`}
                        >
                          <div>
                            <div
                              className={`font-bold text-sm pt-1 ${
                                selectedStudents.includes(student.userId)
                                  ? "text-black"
                                  : "text-white"
                              }`}
                            >
                              {student.personName}
                            </div>
                            <div
                              className={`text-xs ${
                                selectedStudents.includes(student.userId)
                                  ? "text-black"
                                  : "text-neutral-700"
                              }`}
                            >
                              {student.userId}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div>No data</div>
                  )}
                </div>
                <div className="flex justify-end mt-5">
                  <div
                    onClick={() => {
                      onClose();
                    }}
                    className="text-red-400 font-bold text-xs pr-4 cursor-pointer hover:text-red-600 duration-200"
                  >
                    CANCEL
                  </div>
                  <div className="text-yellow-400 font-bold text-xs pr-4 cursor-pointer hover:text-yellow-600 duration-200">
                    DONE
                  </div>
                </div>
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

async function getStudents(
  setFetching,
  setStudents,
  students,
  setFilteredStudents
) {
  //if (students != null) return;
  setFetching(true);
  try {
    const response = await fetch(TEST_URL + STUDENTS, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setStudents([data]);
    setFilteredStudents([data]);
  } catch (e) {
    console.log("Error: ", e);
  }
  setFetching(false);
}

function searchStudent(
  searchText,
  filteredStudents,
  students,
  setFilteredStudents
) {
  if (searchText == "") {
    setFilteredStudents(students);
    return;
  }
  filteredStudents = [];
  students.forEach((student) => {
    if (
      student.personName.toLowerCase().includes(searchText.toLowerCase()) ||
      student.userId.toLowerCase().includes(searchText.toLowerCase())
    ) {
      filteredStudents.push(student);
    }
  });
  setFilteredStudents(filteredStudents);
}

export default AddStudentModal;
