    function renderTimeline(){
        timelineDiv.style.backgroundColor = "#f5eee6"
        homepageDiv.style.display = "none"
        loginDiv.style.display = "none"
        signUpDiv.style.display = "none"
        statusContainer.style.display = "block"
        displayStyle()
 
        document.querySelector('.topnav').addEventListener("click", function(event){
            if(event.target.innerText === "Profile Page"){
                getProfilePage()
            }
        })
    }

    function displayStyle(){
        homepageNavBar.innerHTML = `
        <a> LinkUP </a>
        <a>Profile Page</a>
        <a>Requests</a>
        <a>Sign Out</a>`
        homepageNavBar.style.backgroundColor = "#bb5a5a"
        
        fetch(statusURL)
        .then(response => response.json())
        .then(element => renderStatuses(element))
    }

    // console.log(json.data[0].attributes.content)
    function renderStatuses(element){
            element.data.forEach(data => {
                const list = document.createElement('li')
                list.dataset.id = data.id
                list.className = "list-group-item"
                const image = document.createElement('img');
                image.src = `${data.attributes.img_url}`
                image.className = "status-image"
                const likesSpan = document.createElement('span')
                likesSpan.className = "likes"
                likesSpan.dataset.id = data.id

                likesSpan.textContent = `${data.attributes.total_likes.length} likes`
 
                list.innerHTML = `
                    <h5>${data.attributes.user.name} </h5>
                    <p>
                    ${data.attributes.content}<br>
                    Destination: ${data.attributes.destination}
                    </p> 
                    <br>
                    <br>
                    <button type="submit" id="status-post-request" >Send Request</button>
                    `
                statusList.append(list);
                list.insertBefore(image, list.childNodes[5])
                list.insertBefore(likesSpan, list.childNodes[7])
                
                likeButton = document.createElement('button')
                likeButton.innerText = "Like Post"
                likeButton.className = "like-button"
                likeButton.dataset.id = data.id
                
                likeButton.addEventListener('click', function () {
                    console.log('like')
                    let updateLikesSpan = parseInt(document.querySelector('.likes').dataset.id)
                    let likesCount = parseInt(updateLikesSpan.innerText)
                    likesCount += 1
                    updateLikesSpan.innerText = `${likesCount} likes`
                    let userIdFromNav = document.querySelector('.topnav').dataset.id
                    const likesOBJ = {
                        user_id: userIdFromNav,
                        status_id: likeButton.dataset.id
                    }
                    fetch(likesURL, {
                        method: "POST",
                        headers: headers,
                        body: JSON.stringify(likesOBJ)
                    })
                    .then(response => response.json())
                    .then(json => console.log(json))
                    })
                    list.insertBefore(likeButton, list.childNodes[10])
                })
                submitPosts()
      
    }
// renderTimeline()
    function submitPosts(){
       const form = document.querySelector('#status-form')
        form.addEventListener("submit", function(event){
            event.preventDefault();
            let id = parseInt(document.querySelector('.topnav').dataset.id)
            const submitPostList = document.createElement('li');
            const statusInput = document.querySelector('#status-input-form').value
            const destinationInput = document.querySelector('#destination-input-form').value
            const imageInput = document.querySelector('#image-input-form').value
            submitPostList.className = "list-group-item"
            submitPostList.dataset.id = id

            fetch(`${userURL}/${id}`)
            .then(response => response.json())
            .then(data => {
                let currentUserName = data.data.attributes.name
                submitPostList.innerHTML = `
                <h5>${currentUserName}</h5>
                <p>
                ${statusInput}<br>
                Destination: ${destinationInput}
                </p> 
                <br>
                <img src="${imageInput}" class="status-image">
                <br>
                <button class="like-button" data-id="${id}">Like Post</button>
                <button type="submit" id="status-post-request" >Send Request</button>
                `
            })
            
            document.querySelector('.status-list').append(submitPostList)
            
            statusOBJ = {
                content: statusInput,
                img_url: imageInput,
                destination: destinationInput,
                user_id: id
            }
                       
            fetch(`${statusURL}/data`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(statusOBJ)
            })
            .then(response => response.json())
            form.reset()
        })

    }

    // function likePost(){
       
    //     likeButton.addEventListener('click', function(event){
    //         console.log('like')
    //         const id = event.target.id
    //         console.log(id)
    //         if(event.target.className === ".likes"){
    //             console.log('like')
                
    //         }
        



// function clearPage(){

// }