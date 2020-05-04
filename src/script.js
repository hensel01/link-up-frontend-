document.addEventListener("DOMContentLoaded", function(){
    userURL = 'http://127.0.0.1:3000/users';
    receiveUserData();
})

function receiveUserData(){
    fetch(userURL)
    .then(response => response.json())
    .then(data => renderForm(data))
}

function renderForm(data){
    const inputForm = document.getElementById('inputform')
    inputForm.addEventListener('submit', function () {
        event.preventDefault()
        let username = document.getElementById('username')
        let savedPassword = data.password
        console.log(username.value)
        console.log(savedPassword)
    })
    const loginUL = document.getElementById('login-ul')

 }



