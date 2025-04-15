import {Link, useNavigate} from "react-router-dom";
import {FormEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store.ts";
import {login} from "../../redux/auth/authSlice.ts";

export default function LoginCard() {
    const [show, setShow] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        const resultAction = await dispatch(login({username, password}))
        if (login.fulfilled.match(resultAction)) {
            navigate("/");
        } else {
            alert("Login failed!")
        }
    }

    return (
        <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg my-20">
            <h2 className="font-bold text-3xl">#Here, log in...</h2>
            {/*Login Form*/}
            <form className="space-y-4 mt-10" onSubmit={handleLogin}>
                {/*Username input*/}
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                {/*Password input*/}
                <div className="relative">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        type={show ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="••••••••"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="button"
                            className="absolute top-[33px] right-3 cursor-pointer"
                            onClick={() => {setShow(prev => !prev)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </button>
                </div>
                {/*Login button*/}
                <div className="mt-10">
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition duration-200">
                        Sign in
                    </button>
                </div>
            </form>
            <div className="flex items-center gap-4 mt-10">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="text-gray-500 text-sm whitespace-nowrap">New to <span className="font-bold">SEROMEET</span> community?</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>
            {/*Redirect to register page button*/}
            <Link to="/register">
                <div className="flex items-center mt-10">
                    <button type="button" className="w-full items-center border-gray-300 border rounded-xl py-2 hover:bg-amber-100 transition duration-200">How about <span className="font-bold underline">signing up?</span></button>
                </div>
            </Link>
        </div>
    )
}