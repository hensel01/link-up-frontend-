    function renderTimeline(){
        homepageDiv.style.display = "none"
        loginDiv.style.display = "none"
        signUpDiv.style.display = "none"
        statusContainer.style.display = "block"
        displayStyle()
        document.body.addEventListener("click", function(event){
            if(event.target.innerText === "Requests"){
            //    getRequests()
            }
        })
    }

    function displayStyle(){
        homepageNavBar.innerHTML = `
        <a> LinkUP </a>
        <a>Profile Page</a>
        <a>Requests</a>
        <a>Sign Out</a>`
        
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
                    Destination: ${data.attributes.destination.name}
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
                list.insertBefore(likeButton, list.childNodes[10])
            })
            submitPosts()
            likePost()
    }
renderTimeline()
    function submitPosts(){
       const form = document.querySelector('#status-form')
        form.addEventListener("submit", function(event){
            event.preventDefault();
            let id = parseInt(document.querySelector('.topnav').dataset.id)
            const submitPostList = document.createElement('li');
            const statusInput = document.querySelector('#status-input-form').value
            const destinationInput = document.querySelector('#destination-input-form').value
            submitPostList.className = "list-group-item"

            submitPostList.innerHTML = `
                <h5>Bob Marks </h5>
                <p>
                    ${statusInput}<br>
                    Destination: ${destinationInput}
                </p> 
                <span class="likes">0 likes</span><br>
                <button type="submit" class="like-button" >Like Post</button>
                <button type="submit" id="status-post-request" >Send Request</button>`
            statusList.insertBefore(submitPostList, statusList.childNodes[1])

            statusOBJ = {
                content: '',
                img_url: '',
                destination: '',
                
            }
                       
            fetch(`${statusURL}/data`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({}),
            })
            .then(response => response.json())
            .then(json => console.log(json))
            form.reset()
        })
    }

    function likePost(){
        likeButton.addEventListener('click', function(event){
            const id = event.target.id
            console.log(id)
            if(event.target.className === ".likes"){
                let updateLikesSpan = document.querySelector('.likes')
                let likesCount = parseInt(updateLikesSpan.innerText)
                likesCount += 1
                updateLikesSpan.innerText = `${likesCount} likes`
                const likesOBJ = {count: likesCount}

                fetch(likesURL, {
                    method: "PATCH",
                    headers: headers,
                    body: JSON.stringify(likesOBJ)
                })
                .then(response => response.json())
                .then(json => console.log(json))
            }
        })
    }