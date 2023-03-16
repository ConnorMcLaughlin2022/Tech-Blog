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

const logged_in = (req, res, next) => {
    if (!req.session.user_id) {
      res.redirect('/login');
    } else {
        console.log("logged in!")
        return true;
    }
  };
  
exports.default = logged_in;