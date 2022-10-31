import React, { useState } from "react";
import Users from "./component/users";
import SearchStatus from "./component/SearchStatus";
import api from "../api";

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());

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
      <SearchStatus length={users.length} />
      <Users
        onDelete={handleDelete}
        onToogleBookmark={handleBookmarkToogle}
        users={users}
      />
    </div>
  );
}

export default App;
