import LoginCard from "../features/login/LoginCard.tsx";
import {Link} from "react-router-dom";

export default function LoginPage() {
    return (
        <>
            <div className="min-h-screen bg-amber-100 pt-1">
                <Link to="/">
                    <div className="bg-amber-100 ml-5 mt-5">
                        <img
                            src="/src/assets/AppNameCard.svg"
                            alt="AppNameCard"
                        />
                    </div>
                </Link>
                <div className="min-h-screen flex justify-center">
                    <LoginCard/>
                </div>
            </div>
        </>

    )
}