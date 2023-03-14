
document.querySelector("#comment-btn").addEventListener("click", (e)=>{
    e.preventDefault();
    
    const postId = e.target.parentNode.getAttribute('id')
    console.log(postId)
    const commentObj = {
        text:document.querySelector("#add-comment").value,
        PostId: postId
    };

    fetch("/api/comments", {
        method:"POST",
        body: JSON.stringify(commentObj),
        headers: {
            "Content-Type": "application/json",
          },
    }).then((res)=>{
        if (res.ok) {
            location.reload();
          } else {
            alert("something went wrong");
          }
    });
});