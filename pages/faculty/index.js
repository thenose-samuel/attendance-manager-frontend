import { useEffect, useState } from "react";
import style from "./font.module.css";
import { GET_COURSES, TEST_URL } from "../utils/constants";

export default function Faculty() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setError("");
    fetchCourses();
  }, []);

  async function fetchCourses() {
    setLoading(true);
    try {
      const response = await fetch(TEST_URL + GET_COURSES, {
        method: "GET",
      });
      const data = await response.json();
      setCourses(data);
      setError("");
      setLoading(false);
    } catch (e) {
      setError(e);
    }
  }

  return (
    <>
      {loading ? (
        <div
          className={`text-neutral-500 flex justify-center items-center h-screen duration-300 font-regular`}
        >
          {error.length == 0 ? "Please wait while we load your data..." : error}
        </div>
      ) : (
        <div className={style.font}>
          <div className="w-screen h-screen bg-black flex flex-col items-center justify-center">
            <div className="flex flex-col justify-center items-center">
              <div className="text-neutral-200 font-montserrat text-4xl pb-10 font-bold">
                Select Course to Mark Attendance
              </div>
              <div className="w-80 rounded-lg bg-neutral-900">
                {courses.map((course) => {
                  return (
                    <div
                      id="button"
                      className="p-3 border-b-2 border-neutral-800 hover:bg-yellow-600  duration-300 cursor-pointer text-neutral-300 hover:text-black"
                    >
                      <div className="font-montserrat text-sm font-medium">
                        {course.name}
                      </div>
                      <div className="font-montserrat text-xs font-medium text-neutral-700">
                        {course.cid}
                      </div>
                    </div>
                  );
                })}
                {/* <div
                  id="button"
                  className="p-3 border-b-2 text-neutral-300 border-neutral-800 cursor-pointer hover:bg-yellow-600 hover:text-black duration-300"
                >
                  <div className=" font-montserrat text-sm font-medium">
                    Create Faculty
                  </div>
                </div> */}

                {/* <div
                  id="button"
                  className="p-3 text-neutral-300 hover:bg-yellow-600 rounded-b-lg duration-300 hover:text-black"
                >
                  <div className=" font-montserrat text-sm cursor-pointer font-medium">
                    Create Student
                  </div>
                </div> */}
              </div>
              <div
                id="button"
                className="p-3 hover:bg-red-700 rounded-lg duration-300 mt-2 text-red-500 hover:text-neutral-200 cursor-pointer"
              >
                <div className=" font-montserrat text-sm  font-medium ">
                  Log Out
                </div>
              </div>
              <div className="text-neutral-700 text-xs pt-2">
                You're currently in the faculty panel.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
