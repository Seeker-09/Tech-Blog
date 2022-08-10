function postHandler(event) {
    console.log(event.target.parentElement.id)

    const postId = event.target.parentElement.id

    document.location.replace(`/post/${postId}`)
}

document.querySelector('#postList').addEventListener('click', postHandler)