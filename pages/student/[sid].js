import { useState } from "react";
import { useRouter } from "next/router";
import style from "./form.module.css";
import { CREATE_STUDENT, GET_COURSES, TEST_URL } from "../utils/constants";
import ShimmerSkeleton from "./shimmer";

export default function CreateStudent() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();
  const { sid } = router.query;
  return (
    <>
      <div className={style.font}>
        <div className="h-screen bg-neutral-900 w-96 pl-6 pr-6 pt-4 border-neutral-800 border-solid border-x-2">
          <div>
            <div className="font-extrabold text-2xl text-neutral-200">
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
                  placeholder="Enter the course code"
                  className="placeholder:text-neutral-600 max-w-full bg-neutral-900 rounded-md w-full h-10 border-2 border-neutral-800 focus:ring-yellow-400 focus:ring-2 focus:outline-none text-gray-300 font-regular text-sm p-2"
                ></input>
                <div
                  onClick={() => {
                    setSubmitting(true);
                    getCourses(sid, setSubmitting, setError);
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
                {submitting ? <ShimmerSkeleton /> : <div></div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

async function getCourses(sId, setSubmitting, setError) {
  try {
    setError("");
    const student = {
      sId,
    };
    const data = await fetch(TEST_URL + GET_COURSES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
    const response = await data.json();
    // setStatus("Data has been fetched successfully");
  } catch (e) {
    setError("An error occured please try again");
  } finally {
    setSubmitting(false);
  }
}

// import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

// export default function Home() {
//   return (
//     <>
//       <div className="flex">
//         <SideBar></SideBar>
//         <div className="w-3 h-screen"></div>
//         <div className="bg-red-800 w-10 h-10"></div>
//       </div>
//     </>
//   );
// }

// function SideBar() {
//   return (
//     <div className="">
//       <div className="h-screen bg-neutral-900 w-max p-6 pl-6 pt-4 border-neutral-800 border-solid border-x-2">
//         <div>
//           <div className="font-extrabold text-md mb-6">
//             Welcome, {"<Student Name>"}
//           </div>
//           <div>
//             <div className="text-neutral-600 text-xs font-medium mb-3">
//               Select course from the dropdown below
//             </div>
//             <FormControl
//               autoFocus={false}
//               variant="filled"
//               sx={{ minWidth: 250 }}
//             >
//               <InputLabel
//                 id="demo-simple-select-filled-label"
//                 className="text-sm"
//               >
//                 Select Course
//               </InputLabel>
//               <Select
//                 labelId="demo-simple-select-filled-label"
//                 id="demo-simple-select-filled"
//                 value=""
//                 onChange={() => {}}
//               >
//                 <MenuItem value={10}>CS 372</MenuItem>
//                 <MenuItem value={20}>CE 372</MenuItem>
//                 <MenuItem value={30}>HS 392</MenuItem>
//               </Select>
//             </FormControl>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
