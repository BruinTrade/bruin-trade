import React from "react";
import Comment from "./comment";

export default function CommentList(props) {
  const comments = props.comments;

  //console.log(comments)

  return props.comments.length ? (
    <div className="flex flex-col w-1354px bg-white pt-40px pr-25px pl-40px rounded-25px drop-shadow-md place-items-center">
      {comments.map((element) => {
        return (
          <Comment
            key={element._id}
            author={element.author}
            targetUser={element.target_user}
            commentBody={element.content}
            createdTime={element.created_time}
            comment_id={element._id}
            updateState={props.updateState}
          />
        );
      })}
    </div>
  ) : (
    <div className="grid grid-cols-1 w-1354px bg-white pt-20px pb-20px pr-25px pl-40px rounded-25px drop-shadow-md place-items-center text-300px text-gray-500">
      No comment currently -.-
    </div>
  );
}
