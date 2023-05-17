import React, { useContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import style from "./modal.module.css";
import { BASE_URL, FACULTIES, TEST_URL } from "../../utils/constants";
import { FacultiesDispatchContext } from "../../utils/contexts";

function AddFacultyModal({ show, onClose }) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [faculties, setFaculties] = useState(null);
  const [filteredStudents, setFilteredFaculties] = useState(null);
  const [selectedFaculties, setSelectedFaculties] = useState([]);
  const dispatch = useContext(FacultiesDispatchContext);

  useEffect(() => {
    setIsBrowser(true);
    getStudents(setFetching, setFaculties, faculties, setFilteredFaculties);
  }, []);

  if (isBrowser) {
    if (show === true) {
      return ReactDOM.createPortal(
        !fetching ? (
          <div className={style.font}>
            <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center backdrop-blur-md ">
              <div className="bg-white w-96 h-96 p-3 border-neutral-800 border-solid border-x-2 border-y-2">
                <input
                  onChange={(e) => {
                    searchStudent(
                      e.target.value,
                      filteredStudents,
                      faculties,
                      setFilteredFaculties
                    );
                  }}
                  placeholder="Search"
                  className="placeholder:text-neutral-600 mb-2 max-w-full bg-white rounded-md w-full h-10 border-2 border-neutral-800 focus:ring-pink-400 focus:ring-2 focus:outline-none text-neutral-800 font-regular text-sm p-2"
                ></input>
                {/* <div>hello</div> */}
                <div className="h-64  overflow-y-scroll">
                  {filteredStudents !== null ? (
                    filteredStudents[0].map((student) => {
                      return (
                        <div
                          onClick={() => {
                            if (!selectedFaculties.includes(student.userId)) {
                              dispatch({
                                type: "add",
                                userId: student.userId,
                                personName: student.personName,
                              });
                              selectedFaculties.push(student.userId);
                            } else {
                              selectedFaculties.splice(
                                selectedFaculties.indexOf(student.userId),
                                1
                              );
                              dispatch({
                                type: "remove",
                                userId: student.userId,
                              });
                            }
                            let newSelectedStudents = [...selectedFaculties];
                            setFilteredFaculties(filteredStudents);
                            setSelectedFaculties(newSelectedStudents);
                          }}
                          key={student.userId}
                          className={`${
                            selectedFaculties.includes(student.userId)
                              ? "bg-pink-500 hover:bg-red-500"
                              : "hover:bg-pink-700"
                          } m-1 rounded-md p-2 cursor-pointer duration-200`}
                        >
                          <div>
                            <div
                              className={`font-bold text-sm pt-1 ${
                                selectedFaculties.includes(student.userId)
                                  ? "text-white"
                                  : "text-black"
                              }`}
                            >
                              {student.personName}
                            </div>
                            <div
                              className={`text-xs ${
                                selectedFaculties.includes(student.userId)
                                  ? "text-white"
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
                    className="text-yellow-400 font-bold text-xs pr-4 cursor-pointer hover:text-green-400 duration-200"
                  >
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
              <div className="bg-white w-96 h-96 p-3 border-neutral-800 border-solid border-x-2 border-y-2 flex justify-center items-center">
                <div className="font-bold text-black text-sm">
                  Fetching faculty data...
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
    const response = await fetch(BASE_URL + FACULTIES, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setStudents([data.facultyData]);
    setFilteredStudents([data.facultyData]);
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

export default AddFacultyModal;
