import style from "./form.module.css";

export default function CreateStudent() {
  return (
    <>
      <div className={style.font}>
        <div className="h-screen bg-neutral-900 w-96 pl-6 pr-6 pt-4 border-neutral-800 border-solid border-x-2">
          <div>
            <div className="font-extrabold text-2xl text-neutral-200">
              Create Student
            </div>
            <div className="text-xs text-neutral-500 font-regular">
              Enter student details
            </div>
            <div className="pt-6">
              <div className="flex flex-col">
                <div
                  className="text-neutral-400 text-xs font-medium pb-2 placeholder:text-neutral-300"
                  placeholder="Enter your username"
                >
                  Student Name
                </div>
                <input
                  placeholder="Enter your username"
                  className="placeholder:text-neutral-600 max-w-full bg-neutral-900 rounded-md w-full h-10 border-2 border-neutral-800 focus:ring-yellow-400 focus:ring-2 focus:outline-none text-gray-300 font-regular text-sm p-2"
                ></input>
                <div className="text-neutral-400 text-xs font-medium pb-2 pt-5">
                  Student ID
                </div>
                <input
                  placeholder="Enter your password"
                  className="placeholder:text-neutral-600 max-w-full bg-neutral-900 rounded-md w-full h-10 border-2 border-neutral-800 focus:ring-yellow-400 focus:ring-2 focus:outline-none text-gray-300 font-regular text-sm p-2"
                ></input>
                {/* <div className="text-neutral-400 text-xs font-medium pb-2 pt-5">Year of Enrollment</div> */}
                {/* <input placeholder="Enter your password" className="placeholder:text-neutral-600 max-w-full bg-neutral-900 rounded-md w-full h-10 border-2 border-neutral-800 focus:ring-yellow-400 focus:ring-2 focus:outline-none text-gray-300 font-regular text-sm p-2"></input> */}
                <div className="text-neutral-400 text-xs font-medium pb-2 pt-5">
                  Student ID
                </div>
                <input
                  placeholder="Enter your password"
                  className="placeholder:text-neutral-600 max-w-full bg-neutral-900 rounded-md w-full h-10 border-2 border-neutral-800 focus:ring-yellow-400 focus:ring-2 focus:outline-none text-gray-300 font-regular text-sm p-2"
                ></input>
                {/* <input class="border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ..."></input> */}
                {/* <div className="p-3 rounded-xl mt-6 bg-gradient-to-r duration-300 hover:rounded-md bg-yellow-400">
                        <div className="font-extrabold text-black text-center cursor-pointer">Log In</div>
                    </div> */}
                {/* <div className="text-neutral-600  font-medium text-center pt-4 text-xs">Account doesn't exist? <span className="text-yellow-600 cursor-pointer text-xs">Contact Admin.</span></div> */}
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
