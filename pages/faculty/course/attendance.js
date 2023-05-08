export default function Attendance() {
  return (
    <div className="bg-neutral-800 p-4 mb-2 rounded-lg w-80">
      <div className="text-md font-medium mb-2">06/09/2001</div>
      <div className="flex">
        <div className="text-green-500 text-xs ">34 Present</div>
        <div className="text-red-500 text-xs ml-5">7 Absent</div>
      </div>
    </div>
  );
}
