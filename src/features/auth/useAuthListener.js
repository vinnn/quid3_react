import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { setAuthState } from "./authSlice";
import { useEffect } from 'react';

const useAuthListener = () => {
    const { isAuthenticated, isLoading, user } = useAuth0()

    const dispatch = useDispatch()
    useEffect(() => {
        // !!!! DISPATCH ==> CHANGES THE STATE WITH ACTION  (setAuthSlice)
        dispatch( setAuthState( {isAuthenticated, isLoading, user} ) )
    }, [dispatch, isAuthenticated, isLoading, user])

    return {isLoading, isAuthenticated}
}

export default useAuthListener;

