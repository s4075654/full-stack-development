import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/HomePage.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import RegisterPage from "../pages/RegisterPage.tsx";
import NotFound from "../pages/NotFound.tsx";
import EventDetail from "../pages/EventPage.tsx";
import PublicEventPage from "../pages/PublicEventPage.tsx";
import CreateEventPage from "../pages/CreateEventPage.tsx";
import EventManagementPage from "../pages/EventManagementPage.tsx";
import RSVPResponsePage from "../pages/RSVPResponsePage.tsx";
import AdminDashboardPage from "../pages/AdminDashboardPage.tsx";
import {adminLoader} from "../loader/adminLoader.ts";
import AccountPage from "../pages/AccountPage.tsx";


export const router = createBrowserRouter([
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
        element: <PublicEventPage />
    },
    {
        path: "/event-detail/:id",
        element: <EventDetail />
    },
    {
        path: "/create-event",
        element: <CreateEventPage />
    },
    {
        path: "/event-management",
        element: <EventManagementPage />
    },
    {
        path: "/rsvp-responses",
        element: <RSVPResponsePage />,
    },
    {
        path: "admin-dashboard",
        element: <AdminDashboardPage />,
        loader: adminLoader
    },
    {
        path: "/account",
        element: <AccountPage />
    },
    {
        path: "*" ,
        element: <NotFound />
    },
]);