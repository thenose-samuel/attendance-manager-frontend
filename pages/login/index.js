import { useState } from "react";
import { TEST_URL, LOGIN, BASE_URL } from "../../utils/constants";
import { useRouter } from "next/router";

function Login() {
  const [state, setState] = useState("active");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  return (
    <main className="bg-white h-screen flex flex-col items-center justify-start">
      <div className="pt-20 max-w-lg flex flex-col justify-start items-start">
        <div className="flex flex-col">
          <div className="text-black font-montserrat text-4xl font-extrabold">
            Log In
          </div>
          <div className="text-neutral-500 font-medium text-xs pt-10 pb-6">
            Enter your account details under.
          </div>
          <div
            className="text-neutral-400 text-xs font-medium pb-2 placeholder:text-neutral-300"
            placeholder="Enter your username"
          >
            Username
          </div>
          <input
            disabled={state === "submitting"}
            onChange={(e) => {
              setUserName(e.target.value);
              setError("");
            }}
            placeholder="Enter your username"
            className="placeholder:text-neutral-600 max-w-full bg-white rounded-md w-72 h-12 border-2 border-neutral-800 focus:ring-pink-400 focus:ring-2 focus:outline-none text-neutral-800 font-bold text-sm p-2"
          ></input>
          <div className="text-neutral-400 text-xs font-medium pb-2 pt-5">
            Password
          </div>
          <input
            type="password"
            disabled={state === "submitting"}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            placeholder="Enter your password"
            className="placeholder:text-neutral-600 max-w-full bg-white rounded-md w-72 h-12 border-2 border-neutral-800 focus:ring-pink-400 focus:ring-2 focus:outline-none text-neutral-800 font-bold text-sm p-2"
          ></input>
          {/* <input class="border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ..."></input> */}
          <div
            className={`p-3 rounded-xl mt-6 bg-gradient-to-r duration-300 hover:rounded-md ${
              state === "active" ? "bg-pink-400" : "bg-neutral-800"
            } bg-pink-400`}
          >
            {state === "active" ? (
              <div
                onClick={() => {
                  handleSubmit(setState, setError, username, password, router);
                }}
                className="font-extrabold text-black text-center cursor-pointer"
              >
                Log In
              </div>
            ) : (
              <div
                onClick={() => {}}
                className="font-extrabold text-black text-center cursor-pointer"
              >
                Submitting
              </div>
            )}
          </div>
          <div className="text-red-400  font-medium text-center pt-4 text-xs">
            {error}
          </div>
          {/* <div className="text-neutral-600  font-medium text-center pt-4 text-xs">
            Account doesn&apos;t exist?{" "}
            <span className="text-yellow-600 cursor-pointer text-xs">
              Contact Admin.
            </span>
          </div> */}
        </div>
      </div>
    </main>
  );
}

async function handleSubmit(setState, setError, userName, password, router) {
  setState("submitting");
  setError("");
  const userDetails = {
    username: userName,
    password: password,
  };
  try {
    const data = await fetch(BASE_URL + LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });
    if (!data.ok) {
      throw new Error();
    }

    const response = await data.json();
    //console.log(string);

    if (response.exist != null) {
      const designation = response.exist.designation;
      if (designation === "faculty") {
        router.push(`/faculty?faculty=${response.exist.userId}`);
      } else if (designation === "student") {
        router.push(`/student/${response.exist.userId}`);
      } else {
        router.push(`/admin`);
      }
    } else {
      throw new Error();
    }
  } catch (e) {
    console.log(e);
    setError("Invalid username/password. Please try again..");
  }
  setState("active");
}

export default Login;
