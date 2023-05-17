import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <div className="w-screen h-screen bg-white flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <div className="text-neutral-800 font-montserrat text-4xl pb-10 font-bold">
          What do you want to do?
        </div>
        <div className="w-80 rounded-lg bg-pink-600">
          <div
            onClick={() => {
              router.push("/admin/create-course");
            }}
            id="button"
            className="p-3 border-b-2 hover:bg-pink-800 rounded-t-lg duration-300 cursor-pointer text-white hover:text-black"
          >
            <div className="font-montserrat text-sm font-medium">
              Create Course
            </div>
          </div>

          {/* <div id="sized-box" className="h-3 bg-neutral-9"></div> */}
          <div
            onClick={() => {
              router.push("/admin/create-faculty");
            }}
            id="button"
            className="p-3 border-b-2 text-white cursor-pointer hover:bg-pink-800 hover:text-black duration-300"
          >
            <div className=" font-montserrat text-sm font-medium">
              Create Faculty
            </div>
          </div>

          <div
            onClick={() => {
              router.push("/admin/create-student");
            }}
            id="button"
            className="p-3 text-white hover:bg-pink-800 rounded-b-lg duration-300 hover:text-black"
          >
            <div className=" font-montserrat text-sm cursor-pointer font-medium">
              Create Student
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            router.push("/");
          }}
          id="button"
          className="p-3 hover:bg-red-700 rounded-lg duration-300 mt-2 text-red-500 hover:text-neutral-200 cursor-pointer"
        >
          <div className=" font-montserrat text-sm  font-medium ">Log Out</div>
        </div>
        {/* <div className="text-neutral-700 text-xs pt-2">
          You`&apos;`re currently in the admin panel.
        </div> */}
      </div>
    </div>
  );
}
