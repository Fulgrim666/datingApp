import React from "react";
import { useParams } from "react-router-dom";
import UserEditPage from "../component/page/editUserPage";
import UserPage from "../component/page/userPage";
import UsersListPage from "../component/page/userPage/usersListPage";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    return (
        <>
            {userId ? (
                edit ? (
                    <UserEditPage />
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;
