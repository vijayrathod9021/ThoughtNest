import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth"
import { logout } from "../../store/authSlice"

function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = async () => {
        try {
            const user = await authService.getCurrentUser();
            await authService.logout();
            dispatch(logout());
        } catch (error) {
            console.error("LOGOUT ERROR:", error);
        }
    };
    return (
        <button
            onClick={logoutHandler}
            className="inline-block px-6 py-2 duration-200 rounded-full hover:bg-red-100 hover:text-red-600"
        >
            Logout
        </button>
    )
}

export default LogoutBtn 