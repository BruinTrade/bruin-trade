import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setReplyTarget } from '../redux/slices/replyTarget';
import commentServices from '../backend_services/comment_services';


export default function Comment(props) {

    
    const dispatch = useDispatch();

    const username = useSelector((state) => state.userInfo.username)
    const token = useSelector((state) => state.loginStatus.token)
    // const author = props.author;
    // const targetUser = props.targetUser;
    // const commentBody = props.commentBody;
    function replyHandler_author () {
        dispatch(setReplyTarget(props.author))
    }

    function replyHandler_targetUser () {
        dispatch(setReplyTarget(props.targetUser))
    }

    function deleteComment() {
        commentServices.deleteComment(token, props.comment_id).then(() => {
            
        })
    }


    return (
        <div className="w-1180px pb-40px">
            <div className='flex flex-row space-x-4px'>
                <div className="basis-3/100 text-12px text-gray-400 font-avenir-med mb-3px">From: </div>
                <button className="text-12px text-blue-400 font-avenir-med" onClick={replyHandler_author}>{`@${props.author}`}</button>
                {
                    username === props.author ? 
                    <div className='flex flex-row justify-end w-1170px'>
                        <button className=" text-12px text-gray-400 font-avenir-med rounded-full bg-red-100 w-50px " onClick={deleteComment}>Delete</button>
                    </div>
                    :
                    null 
                }
            </div>
            <div className='flex flex-row space-x-4px'>
                <div className="basis-3/100 text-12px text-gray-400 font-avenir-med mb-3px">To: </div>
                <button className="text-12px text-blue-400 font-avenir-med" onClick={replyHandler_targetUser}>{`@${props.targetUser}`}</button>
            </div>
            <div className='flex flex-row space-x-4px'>
                <div className="text-12px text-gray-400 font-avenir-med mb-3px">{props.createdTime}</div>
            </div>
            <div className='font-avenir-med text-12px text-gray-500 w-1180px'>
                {props.commentBody}
            </div>
        </div>
    );
}