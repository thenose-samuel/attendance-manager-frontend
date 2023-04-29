import { useReducer, useState } from "react";
import style from "./form.module.css";
import AddStudentModal from "../admin/add-student-modal";
import {
  FacultiesContext,
  FacultiesDispatchContext,
  StudentsContext,
  StudentsDispatchContext,
} from "../utils/contexts";
import AddFacultyModal from "./add-faculty-modal";
import { CREATE_COURSE, TEST_URL } from "../utils/constants";

export default function CreateCourse() {
  const [error, setError] = useState(false);
  const [addStudent, setAddStudent] = useState(false);
  const [addFaculty, setAddFaculty] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [students, studentDispatch] = useReducer(studentReducer, []);
  const [faculty, facultyDispatch] = useReducer(facultyReducer, []);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  return (
    <FacultiesDispatchContext.Provider value={facultyDispatch}>
      <FacultiesContext.Provider value={faculty}>
        <StudentsDispatchContext.Provider value={studentDispatch}>
          <StudentsContext.Provider value={students}>
            <div className={style.font}>
              <div className="h-screen bg-neutral-900 w-96 pl-6 pr-6 pt-4 border-neutral-800 border-solid border-x-2">
                <div>
                  <div className="font-extrabold text-2xl text-neutral-200">
                    Create Course
                  </div>
                  <div className="text-xs text-neutral-500 font-regular pt-2">
                    Enter course details
                  </div>
                  <div className="pt-6">
                    <div className="flex flex-col">
                      <div className="text-neutral-400 text-xs font-medium pb-2 placeholder:text-neutral-300">
                        Course Name
                      </div>
                      <input
                        onChange={(e) => {
                          setCourseName(e.target.value);
                          setError(false);
                          setSuccess(false);
                        }}
                        placeholder="Enter course name"
                        className="placeholder:text-neutral-600 max-w-full bg-neutral-900 rounded-md w-full h-10 border-2 border-neutral-800 focus:ring-yellow-400 focus:ring-2 focus:outline-none text-gray-300 font-regular text-sm p-2"
                      ></input>
                      <div className="text-neutral-400 text-xs font-medium pb-2 pt-5">
                        Course ID
                      </div>
                      <input
                        onChange={(e) => {
                          setCourseCode(e.target.value);
                          setError(false);
                          setSuccess(false);
                        }}
                        placeholder="Enter course ID"
                        className="placeholder:text-neutral-600 max-w-full bg-neutral-900 rounded-md w-full h-10 border-2 border-neutral-800 focus:ring-yellow-400 focus:ring-2 focus:outline-none text-gray-300 font-regular text-sm p-2"
                      ></input>
                      <div className="flex">
                        <div
                          onClick={() => setAddFaculty(true)}
                          className="text-xs font-bold pt-6 text-yellow-400 hover:text-yellow-600 duration-300 cursor-pointer"
                        >
                          Add Faculty
                        </div>
                        <div className="text-xs font-bold pt-6 pl-3 text-neutral-500">
                          {faculty.length} added.
                        </div>
                      </div>
                      <div className="flex">
                        <div
                          onClick={() => setAddStudent(true)}
                          className="text-xs font-bold pt-4 text-yellow-400 hover:text-yellow-600 duration-300 cursor-pointer"
                        >
                          Add Student
                        </div>
                        <div className="text-xs font-bold pt-4 pl-3 text-neutral-500">
                          {students.length} added.
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          createCourse(
                            courseName,
                            courseCode,
                            students,
                            faculty,
                            submitting,
                            setError,
                            setSuccess,
                            setSubmitting
                          );
                        }}
                        className={`${
                          submitting ? "bg-neutral-700" : "bg-yellow-500"
                        } w-20 rounded-sm text-center font-bold mt-5 text-xs p-2 cursor-pointer hover:bg-yellow-700 duration-200 text-black`}
                      >
                        {submitting ? "Wait" : "Submit"}
                      </div>
                      {error ? (
                        <div className="text-red-400 mt-5 text-xs font-bold">
                          Invalid input, please check the fields and submit
                          again.
                        </div>
                      ) : (
                        <></>
                      )}
                      {success ? (
                        <div className="text-green-400 mt-5 text-xs font-bold">
                          Course has been created successfully.
                        </div>
                      ) : (
                        <></>
                      )}
                      <AddStudentModal
                        show={addStudent}
                        onClose={() => {
                          setAddStudent(false);
                          setError(false);
                          setSuccess(false);
                        }}
                      />
                      <AddFacultyModal
                        show={addFaculty}
                        onClose={() => {
                          setAddFaculty(false);
                          setError(false);
                          setSuccess(false);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </StudentsContext.Provider>
        </StudentsDispatchContext.Provider>
      </FacultiesContext.Provider>
    </FacultiesDispatchContext.Provider>
  );
}

async function createCourse(
  courseName,
  courseCode,
  students,
  faculty,
  submitting,
  setError,
  setSuccess,
  setSubmitting
) {
  if (submitting === true) return;
  setSubmitting(true);
  if (
    courseName.length < 1 ||
    courseCode.length < 1 ||
    students.length < 1 ||
    faculty.length < 1
  ) {
    setError(true);
    setSubmitting(true);
    return;
  }
  try {
    const courseDetails = {
      courseName,
      courseCode,
      students,
      faculty,
    };
    const response = await fetch(TEST_URL + CREATE_COURSE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courseDetails),
    });
    const data = await response.json();
    if (data.status === "success") {
      setSuccess(true);
    } else {
      setError(true);
    }
  } catch (e) {
    setError(true);
    console.log(e);
  }
  setSubmitting(false);
}

function facultyReducer(faculty, action) {
  switch (action.type) {
    case "add": {
      return [
        ...faculty,
        {
          userId: action.userId,
          personName: action.personName,
        },
      ];
    }
    case "remove": {
      return faculty.filter((f) => f.userId != action.userId);
    }
  }
}

function studentReducer(students, action) {
  switch (action.type) {
    case "add": {
      return [
        ...students,
        {
          userId: action.userId,
          personName: action.personName,
        },
      ];
    }
    case "remove": {
      return students.filter((s) => s.userId !== action.userId);
    }
  }
}
