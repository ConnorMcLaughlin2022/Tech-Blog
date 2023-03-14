document.querySelector("#logout").addEventListener("click",e=>{
    e.preventDefault();

    fetch("/api/users/logout",{ 
        method:"DELETE",
        headers:{
            "content-Type":"application/json"
        }
    }).then(res=>{
        location.href="/"
        
    })
})