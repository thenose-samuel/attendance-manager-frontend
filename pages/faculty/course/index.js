import { useRouter } from "next/router";
import style from "../font.module.css";
import Attendance from "./attendance";
import { Breathing, Shimmer } from "react-shimmer";
import ShimmerSkeleton from "./shimmer";
import {
  ADD_ATTENDANCE,
  BASE_URL,
  GET_REGISTERED_STUDENTS,
  TEST_URL,
} from "@/utils/constants";
import { useEffect, useState } from "react";

export default function Course() {
  const router = useRouter();
  const [students, setStudents] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [date, setDate] = useState("");
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { course } = router.query;

  async function getRegisteredStudents(course) {
    const response = await fetch(BASE_URL + GET_REGISTERED_STUDENTS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ courseCode: course }),
    });
    const data = await response.json();
    setStudents(data.returnData);
  }

  async function addAttendance(setError) {
    setError("");
    setSuccess("");
    if (date.length == 0 || remarks.length == 0) {
      setError("One or more fields are empty");
      return;
    }
    let attendanceData = {
      stuId: selectedStudents,
      facId: router.query.faculty,
      date: date,
      remarks: remarks,
      cid: course,
    };
    console.log(attendanceData);
    const data = await fetch(BASE_URL + ADD_ATTENDANCE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attendanceData),
    });
    const response = await data.json();
    if (response.status === "success") setSuccess("Attendance Created.");
    else setError("Try Again");
  }

  useEffect(() => {
    console.log(router.query.course);
    getRegisteredStudents(router.query.course, router.query.faculty);
  }, []);

  return (
    <div className={style.font}>
      <div className="flex flex-col justify-between h-screen  p-6">
        <div className="flex justify-between border-b-2 h-screen">
          <div className="border-r-2 w-screen">
            <div className="flex">
              <div className="flex flex-col">
                <div className="font-bold pb-5">New Attendance</div>
                <div className="text-neutral-500 text-sm mb-2">Enter date</div>
                <input
                  onChange={(e) => {
                    setDate(e.target.value);
                    setError("");
                    setSuccess("");
                  }}
                  placeholder="DD/MM/YYYY"
                  className="placeholder:text-neutral-600  bg-neutral-900 rounded-md w-52 h-10 border-2 border-neutral-800 focus:ring-yellow-400 focus:ring-2 focus:outline-none text-gray-300 font-regular text-sm p-2"
                ></input>
                <input
                  onChange={(e) => {
                    // setCourseName(e.target.value);
                    // setError(false);
                    // setSuccess(false);
                    setRemarks(e.target.value);
                    setError("");
                    setSuccess("");
                  }}
                  placeholder="Remarks"
                  className="placeholder:text-neutral-600  mt-6 bg-neutral-900 rounded-md w-52 h-36 border-2 border-neutral-800 focus:ring-yellow-400 focus:ring-2 focus:outline-none text-gray-300 font-regular text-sm p-2"
                ></input>
                <div
                  onClick={() => {
                    addAttendance(setError);
                  }}
                  className="bg-yellow-500 w-20 rounded-sm text-center font-bold mt-5 text-xs p-2 cursor-pointer hover:bg-yellow-700 duration-200 text-black"
                >
                  Submit
                </div>
                <div className="text-red-500">{error}</div>
                <div className="text-green-500">{success}</div>
              </div>
              <div className="ml-32">
                <div className="text-neutral-500 text-sm mb-2 ">
                  Registered Students
                </div>
                {students === null ? (
                  <ShimmerSkeleton />
                ) : (
                  <div className=" h-96 w-60 overflow-y-scroll mt-3">
                    {students.map((student) => {
                      return (
                        <div
                          key={student.userId}
                          onClick={() => {
                            if (selectedStudents.includes(student.userId)) {
                              let temp = [];
                              temp = selectedStudents.filter(
                                (value) => value != student.userId
                              );
                              setSelectedStudents(temp);
                            } else {
                              let temp = [...selectedStudents];
                              temp.push(student.userId);
                              setSelectedStudents(temp);
                            }
                          }}
                          className={`${
                            selectedStudents.includes(student.userId)
                              ? "bg-yellow-500"
                              : "bg-neutral-800"
                          } mt-2  p-2 rounded-lg w-52 cursor-pointer group`}
                        >
                          <div
                            className={`${
                              selectedStudents.includes(student.userId)
                                ? "group-hover:text-black"
                                : "group-hover:text-yellow-500"
                            } text-sm font-bold  duration-200`}
                          >
                            {student.personName}
                          </div>
                          <div className="text-xs text-neutral-500">
                            {student.userId}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div></div>
          </div>
          <div>
            <div className="pb-4 pl-14 flex flex-col items-center h-96">
              <div className="pb-5 self-start font-bold text-sm">
                Previous Attendance Data
              </div>
              <div className="overflow-y-scroll w-96">
                <Attendance />
                <Attendance />
                <Attendance />
                <Attendance />
                <Attendance />
                <Attendance />
                <Attendance />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div>Course Statistics</div>
          <div>
            <div className="text-neutral-500">40 students enrolled</div>
            <div className="text-neutral-500">10 classes taken</div>
          </div>
        </div>
      </div>
    </div>
  );
}
