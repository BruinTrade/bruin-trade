import React, { useState } from 'react'
import Form from "./form.js";
import { useSelector } from 'react-redux'

//props.targetUser

export default function CreateComment(props) {

    const [commentBody, setCommentBody] = useState("");
    

    //const username = useSelector((state) => state.userInfo.username)
    //const token = useSelector((state) => state.loginStatus.token)
    let replyTargetContainer = useSelector((state) => state.replyTarget)

   

    function handleCreateComment() {
        // const res = ItemServices.createComment(
        //     token,
        //     item_id,
        //     replyTargetContainer.replyTarget,
        //     commentBody,
        // );
        // console.log(res);
    }

    return (
        <div className="grid grid-cols-1 w-1354px h-440px bg-white pt-52px pr-25px pl-51px rounded-25px drop-shadow-md place-items-center">

            <Form id="comment" 
                label={replyTargetContainer.replyTarget ? `@${replyTargetContainer.replyTarget}` : ""}
                placeholder="Create a new comment here" 
                value={commentBody} 
                onChange={(event) => setCommentBody(event.target.value)} 
                type="text" 
                width={1266}
                height={221}
                isLabelBlue={true}
                />

            <div className='mt-30px'>
                <button onClick={ () => handleCreateComment() } className="w-1266px h-50px rounded-full bg-blue-400 text-18px text-white bottom-0 right-0 mb-30px hover:bg-blue-500 active:bg-blue-700">
                    Post
                </button>
            </div>
        </div>
    );
}



