import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/HomePage.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import RegisterPage from "../pages/RegisterPage.tsx";
import NotFound from "../pages/NotFound.tsx";
import EventDetail from "../pages/EventPage.tsx";
import PublicEvents from "../pages/PublicEvents.tsx";


export const router = createBrowserRouter([
    {
        path: "*",
        element: <NotFound />
    },
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/register",
        element: <RegisterPage />
    },
    {
        path: "/public-events",
        element: <PublicEvents />
    },
    {
        path: "/event-detail/:id",
        element: <EventDetail />
    }
]);