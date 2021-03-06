let userProfile = document.getElementsByClassName("profile-page")[0]

function getProfilePage(){
    bioForm.style.display = "none";
    statusContainer.style.display = "none"
    statusList.style.display = "none"
    profilePage.style.display = "block"
    profileStatusContainer.style.display = "block"

    let id = parseInt(document.querySelector('.topnav').dataset.id)
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

// const list = document.createElement('li')
// list.dataset.id = data.id
// list.className = "list-group-item"
// const image = document.createElement('img');
// image.src = `${data.attributes.img_url}`
// image.className = "status-image"


// list.innerHTML = `
//     <h5>${data.attributes.user.name} </h5>
//     <p>
//     ${data.attributes.content}<br>
//     Destination: ${data.attributes.destination}
//     </p> 
//     <br>
//     <br>
//     <button type="submit" id="status-post-request" >Send Request</button>
//     `
// statusList.append(list);
// list.insertBefore(image, list.childNodes[5])
// list.insertBefore(likesSpan, list.childNodes[7])
// likeButton = document.createElement('button')
// likeButton.innerText = "Like Post"
// likeButton.className = "like-button"
// likeButton.dataset.id = data.id
// list.insertBefore(likeButton, list.childNodes[10])

// "id": "1",
// "type": "status",
// "attributes": {
//   "content": "Ruby inherited the Perl philosophy of having more than one way to do the same thing. I inherited that philosophy from Larry Wall, who is my hero actually. I want to make Ruby users free. I want to give them the freedom to choose.",
//   "img_url": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2020%2F01%2Fhawaii-december-EVRYMONTH1019.jpg",
//   "destination": "Uganda",
//   "user": {
//     "id": 1,
//     "name": "Joseph Cha",
//     "age": 23,
//     "bio": "I'm very shy please don't judge me.",
//     "img_url": "https://ca.slack-edge.com/T02MD9XTF-USM2G2TNV-f854fbc28824-512",
//     "rating": 5,
//     "password": "123",
//     "username": "johnnyHardCode",
//     "created_at": "2020-05-07T22:43:34.717Z",
//     "updated_at": "2020-05-08T04:34:07.697Z"
//   },
//   "total_likes": [
//     {
//       "id": 1,
//       "user_id": 1,
//       "status_id": 1,
//       "created_at": "2020-05-07T22:43:37.244Z",
//       "updated_at": "2020-05-07T22:43:37.244Z"
//     }
//   ]
// }
// },

// "id": "15",
//       "type": "status",
//       "attributes": {
//         "content": "",
//         "img_url": "",
//         "destination": "",
//         "user": {
//           "id": 1,
//           "name": "Joseph Cha",
//           "age": 23,
//           "bio": "I'm very shy please don't judge me.",
//           "img_url": "https://ca.slack-edge.com/T02MD9XTF-USM2G2TNV-f854fbc28824-512",
//           "rating": 5,
//           "password": "123",
//           "username": "johnnyHardCode",
//           "created_at": "2020-05-07T22:43:34.717Z",
//           "updated_at": "2020-05-08T04:34:07.697Z"
//         },
//         "total_likes": [
          