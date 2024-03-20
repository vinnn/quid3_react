import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

    console.log("user", user)


  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
        <div className="flex flex-row justify-start items-center gap-2 p-2">
            <img className="size-20" src={user.picture} alt={user.nickname} />
            <h2 className="text-blue">{user.nickname}</h2>
      </div>
    )
  );
};

export default Profile;