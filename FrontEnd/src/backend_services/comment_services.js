import http from "../axios-http"

const commentServices = {
    addComment: addComment,
    deleteComment: deleteComment
}

async function addComment(token, content, target_user, time, item_id) {
    const config = {
        headers: {
            access_control: token,
        }
    }
    const data = {content: content, target_user: target_user, created_time: time}
    return http.post(`/post_comment/${item_id}`, data, config)
}

async function deleteComment(token, comment_id) {
    const config = {
        headers: {
            access_control: token,
        }
    }
    const data = {}
    return http.post(`/delete_comment/${comment_id}`, data, config)
}


export default commentServices