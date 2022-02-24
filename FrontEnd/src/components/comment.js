import React from 'react'

function replyHandler () {
    
}

export default function Comment(props) {

    // const author = props.author;
    // const targetUser = props.targetUser;
    // const commentBody = props.commentBody;


    return (
        <div className="w-1180px pb-40px">
            <div className='flex flex-row'>
                <div className="basis-3/100 text-12px text-gray-400 font-avenir-med mb-3px">From: </div>
                <button className="text-12px text-blue-400 font-avenir-med" onClick={replyHandler}>{`@${props.author}`}</button>
            </div>
            <div className='flex flex-row'>
                <div className="basis-3/100 text-12px text-gray-400 font-avenir-med mb-3px">To: </div>
                <button className="text-12px text-blue-400 font-avenir-med" onClick={replyHandler}>{`@${props.targetUser}`}</button>
            </div>
            <div className='font-avenir-med text-12px text-gray-500 w-1180px'>
                {props.commentBody}
            </div>
        </div>
    );
}