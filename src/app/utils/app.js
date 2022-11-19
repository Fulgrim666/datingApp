import React, { useState, useEffect } from "react";
import Users from "./component/users";
import api from "../api";
function App() {
    const [users, setUsers] = useState(api.users.fetchAll());
    useEffect(() => {
        api.users.fetchAll().then((user) => setUsers(user));
    });
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleBookmarkToogle = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };
    return (
        <div>
            {users && (
                <Users
                    onDelete={handleDelete}
                    onToogleBookmark={handleBookmarkToogle}
                    users={users}
                />
            )}
        </div>
    );
}

export default App;
