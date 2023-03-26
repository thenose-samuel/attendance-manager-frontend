function Login(){
    return(
        <main className="bg-black h-screen flex flex-col items-center justify-start">
            <div className="pt-20 max-w-lg flex flex-col justify-start items-start">
                <div className="flex flex-col">
                    <div className="text-gray-300 font-montserrat text-4xl font-extrabold">Log In</div>
                    <div className="text-neutral-500 font-medium text-xs pt-10 pb-6">Enter you account details under.</div>
                    <div className="text-neutral-400 text-xs font-medium pb-2 placeholder:text-neutral-300" placeholder="Enter your username">Username</div>
                    <input placeholder="Enter your username" className="placeholder:text-neutral-600 max-w-full bg-neutral-900 rounded-md w-72 h-12 border-2 border-neutral-800 focus:ring-yellow-600 focus:ring-2 focus:outline-none text-gray-300 font-bold text-sm p-2"></input>
                    <div className="text-neutral-400 text-xs font-medium pb-2 pt-5">Password</div>
                    <input placeholder="Enter your password" className="placeholder:text-neutral-600 max-w-full bg-neutral-900 rounded-md w-72 h-12 border-2 border-neutral-800 focus:ring-yellow-600 focus:ring-2 focus:outline-none text-gray-300 font-bold text-sm p-2"></input>
                    {/* <input class="border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ..."></input> */}
                    <div className="p-4 rounded-xl mt-8 bg-gradient-to-r duration-300 hover:rounded-md bg-opacity-50 from-yellow-700 via-yellow-600 to-yellow-400">
                        <div className="font-extrabold text-neutral-200 text-center cursor-pointer">Log In</div>
                    </div>
                    <div className="text-neutral-600  font-medium text-center pt-4 text-xs">Account doesn't exist? <span className="text-neutral-200 cursor-pointer text-xs">Contact Admin.</span></div>
                </div>
            </div>
        </main>
    )
}

export default Login;