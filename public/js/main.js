document.querySelector("#logout").addEventListener("submit",e=>{
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