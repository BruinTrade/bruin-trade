import React from 'react'
import Comment from './comment';


export default function CommentList(props) {

    const comments = props.comments;

    console.log(comments)

    return (
        <div className="grid grid-cols-1 w-1354px bg-white pt-40px pr-25px pl-40px rounded-25px drop-shadow-md place-items-center">
            {comments.map(element => {
                return <Comment author={element.author} targetUser={element.targetUser} commentBody={element.commentBody}/>
            })}
        </div>
    );
}