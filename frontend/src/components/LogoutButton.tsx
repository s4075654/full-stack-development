// LogoutButton.tsx
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/auth/authSlice.ts';
import {fetchHandler} from "../utils/fetchHandler.ts";


export default function LogoutButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetchHandler('/log/out', {
                method: 'POST',
                credentials: 'include'
            });
            
            if (response.ok) {
                dispatch(logout());
                navigate('/login');
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <button 
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
            Logout
        </button>
    );
}