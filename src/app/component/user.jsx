import React from "react";
import Qualitie from "./Qualitie";
import Bookmark from "./Bookmark";

const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  onDelete,
  bookmark,
  onToogleBookmark,
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map((qual) => {
          return <Qualitie key={qual._id} {...qual} />;
        })}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td>
        <Bookmark status={bookmark} onClick={() => onToogleBookmark(_id)} />
      </td>
      <td>
        <button className={"btn btn-danger"} onClick={() => onDelete(_id)}>
          Удалить
        </button>
      </td>
    </tr>
  );
};

export default User;
