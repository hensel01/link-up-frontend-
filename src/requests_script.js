document.addEventListener('DOMContentLoaded', function () {
function getRequests() {
    fetch('http://127.0.0.1:3000/requests')
    .then(response => response.json())
    .then(data => displayRequests(data))
}
    function displayRequests(data) {
        data.data.forEach(request => {
    let requestTag = document.createElement('p')
    let acceptButton = document.createElement('button')
    acceptButton.innerText = "Accept"
    acceptButton.id = "accept-btn"
    
    acceptButton.addEventListener('click', function () {
        
        fetch('http://127.0.0.1:3000/requests', {
            method: 'PATCH',
            headers: {
                "accepts": "application/json",
                "content-type" : "application/json"
            },
            body: JSON.stringify({request: {attributes: {acception: true}}}),
            // mode: "no-cors"    
        })
        .then(response => response.json())
        .then(getRequests())

        console.log(`${request.attributes.status.content} accepted`)
    })
    let denyButton = document.createElement('button')
    denyButton.innerText = "Deny"
    denyButton.addEventListener('click', function () {
        console.log(`${request.attributes.status.content} denied`)
    })
    denyButton.id = "deny-btn"
    requestTag.className = "requests"
    console.log(request)
    requestTag.innerText = `${request.attributes.user.name} has requested to join your trip to ${request.attributes.status.destination_id}. Status content: ${request.attributes.status.content}`
    let requestDiv = document.getElementById('requests-page')
    requestDiv.appendChild(requestTag)
    requestDiv.appendChild(acceptButton)
    requestDiv.appendChild(denyButton)
    })
    }

getRequests()
})