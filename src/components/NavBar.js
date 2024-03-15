import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";


export default function NavBar() {

    const { user, isAuthenticated, isLoading } = useAuth0();
    // const usr = user.user_metadata

    // console.log("user", user)

    if (isAuthenticated) {
        return (          
            <div>
                <h2>name : {user.name}</h2>
                <p>email : {user.email}</p>
                <LogoutButton />
            </div>
        )
    } 

    return (
            <div>
                <LoginButton />
            </div>
    )
}



