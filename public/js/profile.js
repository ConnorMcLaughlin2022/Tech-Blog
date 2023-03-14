document.querySelector("#post-btn").addEventListener("click", (e) => {
    e.preventDefault();
    const postObj = {
        title: document.querySelector("#postTitle").value,
        content: document.querySelector("#addPost").value,
    }
    fetch('api/posts', {
        method: 'POST',
        body: JSON.stringify(postObj),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => {
        if (res.ok) {
            location.href = "/profile"
        } else {
            alert("something went wrong")
        }
    })
})



document.querySelectorAll(".del-btn").forEach(section => {
    section.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(e)
        const postId = e.target.getAttribute('id')

        console.log(postId)
        fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            if (res.ok) {
                location.href = `/profile`

            } else {
                alert('something went wrong')
            }
        })
            ;
    })
})

document.querySelectorAll(".edit-btn").forEach(section => {
    section.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(e)
        const postId = e.target.getAttribute('id')
        console.log(postId)
        document.querySelector(`#edit-form-${postId}`).classList.remove("hide");
        document.querySelector(`#cancel-edit-${postId}`).classList.remove("hide");
    });
});


document.querySelector(`.cancel-edit`).addEventListener('click', (e) => {
    e.preventDefault();
    const postId = e.target.getAttribute('id')
    console.log(postId)
    document.querySelector(`.edit-form`).classList.add("hide")
    document.querySelector(`.cancel-edit`).classList.add("hide")
});


document.querySelector(".submit-edit").addEventListener("click", (e) => {
    e.preventDefault();
    console.log(e)
    const postId = e.target.getAttribute('id')
    console.log(postId)



    const postObj = {
        title: document.querySelector(`#title-edit-${postId}`).value,
        content: document.querySelector(`#content-edit-${postId}`).value,
        id: postId
    }
    fetch(`/api/posts/edit-post`, {
        method: 'PUT',
        body: JSON.stringify(postObj),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => {
        if (res.ok) {
            location.reload();

            // }else{
            //     alert('something went wrong')
        }
    })
        ;

})
