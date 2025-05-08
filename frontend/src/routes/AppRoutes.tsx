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
import AllUsersDashboardPage from "../pages/AllUserDashboardPage.tsx";
import AllEventDashboardPage from "../pages/AllEventDashboardPage.tsx";
import {authenticationLoader} from "../loader/authenticationLoader.ts";


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
        loader: authenticationLoader,
        path: "/public-events",
        element: <PublicEventPage />
    },
    {
        loader: authenticationLoader,
        path: "/event-detail/:id",
        element: <EventDetail />
    },
    {
        loader: authenticationLoader,
        path: "/create-event",
        element: <CreateEventPage />
    },
    {
        loader: authenticationLoader,
        path: "/event-management",
        element: <EventManagementPage />
    },
    {
        loader: authenticationLoader,
        path: "/rsvp-responses",
        element: <RSVPResponsePage />,
    },
    {
        path: "/admin-dashboard",
        element: <AdminDashboardPage />,
        loader: adminLoader
    },
    {
        path: "/admin-dashboard/all-user-dashboard",
        element: <AllUsersDashboardPage />,
        loader: adminLoader
    },
    {
        path: "/admin-dashboard/all-event-dashboard",
        element: <AllEventDashboardPage />,
        loader: adminLoader
    },
    {
        loader: authenticationLoader,
        path: "/account",
        element: <AccountPage />
    },
    {
        path: "*" ,
        element: <NotFound />
    },
]);