import { useState } from "react";
import style from "./form.module.css";
import {
  BASE_URL,
  CREATE_FACULTY,
  CREATE_STUDENT,
  TEST_URL,
} from "../utils/constants";

export default function CreateStudent() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  return (
    <>
      <div className={style.font}>
        <div className="h-screen bg-neutral-900 w-96 pl-6 pr-6 pt-4 border-neutral-800 border-solid border-x-2">
          <div>
            <div className="font-extrabold text-2xl text-neutral-200">
              Create Faculty
            </div>
            <div className="text-xs text-neutral-500 font-regular">
              Enter faculty details
            </div>
            <div className="pt-6">
              <div className="flex flex-col">
                <div className="text-neutral-400 text-xs font-medium pb-2 placeholder:text-neutral-300">
                  Faculty Name
                </div>
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                    setSuccess("");
                  }}
                  placeholder="Enter the faculty's name"
                  className="placeholder:text-neutral-600 max-w-full bg-neutral-900 rounded-md w-full h-10 border-2 border-neutral-800 focus:ring-yellow-400 focus:ring-2 focus:outline-none text-gray-300 font-regular text-sm p-2"
                ></input>
                <div className="text-neutral-400 text-xs font-medium pb-2 pt-5">
                  Faculty ID
                </div>
                <input
                  onChange={(e) => {
                    setId(e.target.value);
                    setError("");
                    setSuccess("");
                  }}
                  placeholder="Enter the faculty's ID"
                  className="placeholder:text-neutral-600 max-w-full bg-neutral-900 rounded-md w-full h-10 border-2 border-neutral-800 focus:ring-yellow-400 focus:ring-2 focus:outline-none text-gray-300 font-regular text-sm p-2"
                ></input>
                <div className="text-neutral-400 text-xs font-medium pb-2 pt-5">
                  Password
                </div>
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                    setSuccess("");
                  }}
                  placeholder="Enter a password"
                  type="password"
                  className=" placeholder:text-neutral-600 max-w-full bg-neutral-900 rounded-md w-full h-10 border-2 border-neutral-800 focus:ring-yellow-400 focus:ring-2 focus:outline-none text-gray-300 font-regular text-sm p-2"
                ></input>
                <div className="text-neutral-400 text-xs font-medium pb-2 pt-5">
                  Confirm Password
                </div>
                <input
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                    setSuccess("");
                  }}
                  type="password"
                  placeholder="Confirm password"
                  className="placeholder:text-neutral-600 max-w-full bg-neutral-900 rounded-md w-full h-10 border-2 border-neutral-800 focus:ring-yellow-400 focus:ring-2 focus:outline-none text-gray-300 font-regular text-sm p-2"
                ></input>
                <div
                  onClick={() => {
                    createUser(
                      name,
                      id,
                      password,
                      confirmPassword,
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
                <div className="font-bold text-xs text-red-400 mt-3">
                  {error}
                </div>
                <div className="font-bold text-xs text-green-400 mt-3">
                  {success}
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}

async function createUser(
  name,
  id,
  password,
  confirmPassword,
  submitting,
  setError,
  setSuccess,
  setSubmitting
) {
  if (submitting === true) return;
  setSuccess("");
  setError("");
  setSubmitting(true);
  if (
    name.length < 1 ||
    id.length < 1 ||
    password.length < 1 ||
    confirmPassword < 1
  ) {
    setError("At least one field is empty. Try again.");
    setSubmitting(false);
    return;
  }
  if (confirmPassword !== password) {
    setError("Passwords do not match.");
    setSubmitting(false);
    return;
  }
  try {
    const facultyDetails = {
      personName: name,
      userId: id,
      password,
      designation: "faculty",
    };
    const response = await fetch(BASE_URL + CREATE_FACULTY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(facultyDetails),
    });
    const data = await response.json();
    if (data.status === "Successful") {
      setSuccess("User has been created.");
    } else {
      setError(data.status);
    }
  } catch (e) {
    console.log(e);
    setError("Failed to contact server.");
  }
  setSubmitting(false);
}
