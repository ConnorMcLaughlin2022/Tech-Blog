document.querySelectorAll(".post-box").forEach(section => {
    section.addEventListener("click", (e)=>{
    e.preventDefault();
    console.log(e)
    const postId = e.target.parentElement.getAttribute('id')
    console.log(postId)
    fetch(`/api/posts/${postId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => {
        if (res.ok) {
            location.href=`/post/${postId}` 
            console.log(res)
        }else{
            alert('something went wrong')
        }
    });
});
});