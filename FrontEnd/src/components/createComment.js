import React, { useState } from 'react'
import Form from "./form.js";
import { useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import commentServices from '../backend_services/comment_services.js';

export default function CreateComment(props) {

    const alert = useAlert()
    const token = useSelector((state) => state.loginStatus.token)
    const replyTargetContainer = useSelector((state) => state.replyTarget)
    const [commentBody, setCommentBody] = useState("");

    async function handleCreateComment() {
        let replyTarget
        if (replyTargetContainer.replyTarget !== null)
        {
            replyTarget = replyTargetContainer.replyTarget
        }
        else
        {
            replyTarget = props.item_owner
        }

        if (commentBody === "")
        {
            alert.show("Please provide comment content")
            return
        }

        const time = Date().toLocaleString()

        const res = await commentServices.addComment(
           token,
           commentBody,
           replyTarget,
           time,
           props.item_id,
        );
        if (res.status !== 200)
        {
            alert.show(res.data.errors)
        }
        else
        {
            setCommentBody("")
        }

        props.updateState();
    }

    return (
        <div className="flex flex-col pt-25px items-center w-1354px h-440px bg-white rounded-25px drop-shadow-md ">
            <Form id="comment" 
                label={replyTargetContainer.replyTarget ? `@${replyTargetContainer.replyTarget}` : ""}
                placeholder="Create a new message here" 
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



