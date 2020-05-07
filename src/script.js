   userURL = "http://localhost:3000/users";
    statusURL = 'http://localhost:3000/statuses';
    likesURL = 'http://localhost:3000/likes'
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    // receiveUserData();
    const topNav = document.querySelector(`.topnav`)
    const homepageDiv = document.querySelector(`#homepage`)
    const loginDiv = document.querySelector(`#login-div`)
    const signUpDiv = document.querySelector(`#sign-up-div`)
    const homepageNavBar = document.querySelector(`.topnav`)
    const statusList = document.querySelector(`.status-list`)
    const statusContainer = document.querySelector(`.status-container`)
    const requestPage = document.querySelector('#requests-page')
    let likeButton;
    statusContainer.style.display = "none"
    // requestPage.style.display = "none"

    topNav.addEventListener(`click`, function(event){
        if (event.target.textContent === "Log In"){
            renderLogInForm()
        }
        else if (event.target.textContent === "Sign up"){
            renderSignUpForm()
        } 
    })

    function renderLogInForm(){
        signUpDiv.style.display = "none"

        loginDiv.innerHTML = `
            <h1 class="homepage-h1">
                LinkUP
            </h1>
            <ul id="login-ul">
                <form id='inputform'>
                    <label for="fname">Username:</label><br>
                    <input type="text" id="username" name="fname"><br>
                    <label for="lname">Password:</label><br>
                    <input type="text" id="password" name="lname">
                    <button id="login-button" type="submit">Log in</button>
                </form>
            </ul>
        `

            // hideAll()
        homepageDiv.style.display = "none";
        loginDiv.style.display = "block"
        
        fetch(userURL)
        .then(response => response.json())
        .then(users => logIn(users))
    }

    function logIn(users){
        users.data.forEach(user => {
            console.log(user)
            document.body.addEventListener("submit", function(event){
                event.preventDefault()
                if(event.target.querySelector('#login-button').id === 'login-button' && event.target.querySelector('#username').value === user.attributes.username) {    
                    const userNavbar = event.target.parentNode.parentNode.parentNode.childNodes[1]
                    userNavbar.dataset.id = user.id
                    userNavbar.dataset.username = user.attributes.username
                    renderTimeline()
                }
            })
        })
    }

    function renderSignUpForm(){
        loginDiv.style.display = "none"
        signUpDiv.innerHTML = `
        <h1 class="homepage-h1">
            LinkUP
        </h1>
        <p>Create Your Account</p>
        <ul id="sign-up-ul">
            <form id='inputform'>
                <label for="fname">Username:</label><br>
                <input type="text" id="username" name="fname"><br>
                <label for="lname">Password:</label><br>
                <input type="text" id="password" name="lname">
                <button id="sign-up-button" type="submit">Sign up</button>
            </form>
        </ul>
        `
        homepageDiv.style.display = "none"
        signUpDiv.style.display = "block"

        document.body.addEventListener("submit", function(event){
            event.preventDefault()
            if(event.target.querySelector('#sign-up-button').id === 'sign-up-button'){
                renderTimeline()
            }
        })
    }

    // function hideAll(){
    //     homepageDiv.style.display = "none";
    //     loginDiv.style.display = "none";
    //     signUpDiv.style.display = "none";
    // }
    
    // function renderThis(divName){
    //     if (divName === homepageDiv){
    //         homepageDiv.style.display = "block";
    //     }
    //     else if (divName === loginDiv){
    //         loginDiv.style.display = "block";
    //     }
    //     else if(divName === signUpDiv){
    //         signUpDiv.style.display = "block";
    //     }
    // }

// login page type in your info, search the info in the DB, if its valid track the user, set it to a user object so you can have access throughout the whole app
// login = fetch request
// signup = Post request

