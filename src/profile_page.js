let userProfile = document.getElementsByClassName("profile-page")[0]

function getProfilePage(){
    bioForm.style.display = "none";
    statusContainer.style.display = "none"
    statusList.style.display = "none"
    profilePage.style.display = "block"
    profilePage.style.backgroundColor = "#f5eee6"
    profileStatusContainer.style.display = "block"

    let id = parseInt(document.querySelector('.topnav').dataset.id)
    console.log(document.querySelector('.topnav'))
    console.log(id)
    getUserData(id)
    getStatusData()    
}

function getUserData(id){
    fetch(`${userURL}/${id}`)
    .then(resp => resp.json())
    .then(object => addProfPic(object))    
}

function addProfPic(object){
    let profilePic = document.getElementsByClassName("profile_pic")[0]
    profilePic.src = `${object.data.attributes.img_url}` 
    getBio(object)
}

function getBio(object) {
    
        userBio.children[0].innerText = `${object.data.attributes.name}`
        userBio.children[1].innerText = `${object.data.attributes.age}`  
        userBio.children[2].innerText = `${object.data.attributes.bio}`
        userBio.children[3].innerText = `Following: ${object.data.attributes.followees.length}`
        userBio.children[4].innerText = `Followers: ${object.data.attributes.followers.length}`

        userBio.addEventListener('click', (event) => {
        event.preventDefault();
        const editButton = document.getElementsByClassName("bio_button")[0]
         if (event.target === editButton) {
             userBio.style.display = "none"
            bioForm.style.display = "block"
            bioForm.childNodes[4].value = object.data.attributes.name
            bioForm.childNodes[10].innerText = object.data.attributes.bio
            bioForm.childNodes[17].value = `${object.data.attributes.age}`
            bioForm.childNodes[23].value = object.data.attributes.img_url
            submitUserBio()
        }
    })
}

function submitUserBio(){
    bioForm.addEventListener('submit', (event) =>{
        let submitID = parseInt(document.querySelector('.topnav').dataset.id)
        event.preventDefault()
        let formName = bioForm.childNodes[4].value 
        let formBio = bioForm.childNodes[10].value
        let formAge = bioForm.childNodes[17].value
        let formImage = bioForm.childNodes[23].value

        formOBJ = {
            name: formName,
            age: formAge,
            bio: formBio,
            img_url: formImage,
        }

        fetch(`${userURL}/${submitID}`, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(formOBJ)
        })
        .then(getProfilePage)
        bioForm.style.display = "none"
        userBio.style.display = "block"
    })
}

function getStatusData(){
    fetch(statusURL)
    .then(resp => resp.json())
    .then(object => object.data.forEach(status => getStatus(status)))
}

function getStatus(status) {
    let userID = parseInt(document.querySelector('.topnav').dataset.id)
    if(status.attributes.user.id === userID){
            const profileStatusUL = document.createElement('ul')
            profileStatusContainer.dataset.id = status.id
            profileStatusContainer.className = "list-group-item"
        
                let profileStatusList = document.createElement('li')

                profileStatusList.innerHTML =  `
                <p>
                ${status.attributes.content}<br>
                Destination: ${status.attributes.destination}
                </p>
                <img src="${status.attributes.img_url}" alt="image not rendering" class="status-image">  <br>
                `

                profileStatusUL.append(profileStatusList)
                profileStatusContainer.append(profileStatusUL)    
                profileStatusContainer.style.display = "block"
    }   
}
