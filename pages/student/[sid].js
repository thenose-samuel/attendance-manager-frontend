import { useState } from "react";
import { useRouter } from "next/router";
import style from "./form.module.css";
import {
  BASE_URL,
  CREATE_STUDENT,
  GET_COURSES,
  GET_REPORT,
  TEST_URL,
} from "../../utils/constants";
import ShimmerSkeleton from "./shimmer";

export default function Student() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [status, setStatus] = useState("");
  const [cid, setCid] = useState("");
  const [dates, setDates] = useState([]);
  const [attendDates, setAttendDates] = useState([]);
  const router = useRouter();
  const { sid } = router.query;

  // async function getReport() {
  //   let details = { sid, cid };
  //   const data = await fetch(BASE_URL + GET_REPORT, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(details),
  //   });
  //   const response = await data.json();
  //   // console.log(response);
  // }

  return (
    <>
      <div className={style.font}>
        <div className="h-screen bg-white w-96 pl-6 pr-6 pt-4 border-pink-800 border-solid border-x-2">
          <div>
            <div className="font-extrabold text-2xl text-neutral-800">
              View Report
            </div>
            <div className="text-xs text-neutral-500 font-regular">
              Enter course code under
            </div>
            <div className="pt-6">
              <div className="flex flex-col">
                <div className="text-neutral-400 text-xs font-medium pb-2 placeholder:text-neutral-300">
                  Course Code
                </div>
                <input
                  onChange={(e) => {
                    setCid(e.target.value);
                  }}
                  placeholder="Enter the course code"
                  className="placeholder:text-neutral-800 max-w-full bg-white rounded-md w-full h-10 border-2 border-neutral-800 focus:ring-pink-400 focus:ring-2 focus:outline-none text-neutral-800 font-regular text-sm p-2"
                ></input>
                <div
                  onClick={() => {
                    setSubmitting(true);
                    getReport(
                      sid,
                      cid,
                      setSubmitting,
                      setError,
                      setDates,
                      setAttendDates
                    );
                  }}
                  className={`${
                    submitting ? "bg-neutral-700" : "bg-pink-500"
                  } w-20 rounded-sm text-center font-bold mt-5 text-xs p-2 cursor-pointer hover:bg-pink-700 duration-200 text-black`}
                >
                  {submitting ? "Wait" : "Submit"}
                </div>
                <div className="font-bold text-xs text-neutral-400 mt-3">
                  {error}
                </div>
                <div className="font-bold text-xs text-neutral-400 mt-3">
                  {success}
                </div>
                {submitting ? (
                  <ShimmerSkeleton />
                ) : dates.length === 0 ? (
                  <div></div>
                ) : (
                  <div>
                    <div>
                      <div className="font-medium text-4xl text-neutral-800">
                        {dates.length}
                      </div>
                      <div className="text-neutral-700 font-bold mb-5">
                        Classes Taken
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-4xl text-neutral-800">
                        {attendDates.length}
                      </div>
                      <div className="text-neutral-700 font-bold mb-5">
                        Classes Attended
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-4xl text-neutral-800">
                        {Math.round((attendDates.length / dates.length) * 100)}%
                      </div>
                      <div className="text-neutral-700 font-bold mb-5">
                        Attendence Percentage
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

async function getReport(
  sid,
  cid,
  setSubmitting,
  setError,
  setDates,
  setAttendDates
) {
  try {
    setError("");
    const student = {
      sid,
      cid,
    };
    const data = await fetch(BASE_URL + GET_REPORT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
    const response = await data.json();
    if (response.status === "success") {
      setDates(response.classesTaken);
      setAttendDates(response.attended);
    } else {
      setError(response.status);
    }
  } catch (e) {
    setError("An error occured please try again");
  } finally {
    setSubmitting(false);
  }
}
