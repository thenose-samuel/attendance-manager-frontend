import { useRouter } from "next/router";
import style from "../font.module.css";
import Attendance from "./attendance";

export default function Course() {
  const router = useRouter();
  const { course } = router.query;
  return (
    <div className={style.font}>
      <div className="flex flex-col justify-between h-screen  p-6">
        <div className="flex justify-between border-b-2 h-screen">
          <div className="border-r-2 w-screen">
            <div className="font-bold pb-5">New Attendance</div>
            <div className="text-neutral-500 text-sm">Select date</div>
          </div>
          <div>
            <div className="pb-4 pl-14 flex flex-col items-center h-96">
              <div className="pb-5">Previous Attendance Data</div>
              <div className="overflow-y-scroll w-56">
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
