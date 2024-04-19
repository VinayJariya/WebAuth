/**
 * Switch to login page
 */
$('#toLogin').click(function(e) {
    e.preventDefault();
    $('#registerContainer').hide();
    $('#loginContainer').show();
})

/**
 * Switch to registration page
 */
$('#toRegistration').click(function(e) {
    e.preventDefault();
    $('#loginContainer').hide();
    $('#registerContainer').show();
})

let loadMainContainer = () => {
    return fetch('/personalInfo', {credentials: 'include'})
        .then((response) => response.json())
        .then((response) => {
            if(response.status === 'ok') {
                $('#theSecret').html(response.theSecret)
                $('#name').html(response.name)
                $('#registerContainer').hide();
                $('#loginContainer').hide();
                $('#mainContainer').show();
            } else {
                alert(`Error! ${response.message}`)
            }
        })
}

let checkIfLoggedIn = () => {
    return fetch('/isLoggedIn', {credentials: 'include'})
        .then((response) => response.json())
        .then((response) => {
            if(response.status === 'ok') {
                return true
            } else {
                return false
            }
        })
}

let checkUserAgent = () => {
    // return fetch('/getDevice', {
    //     method: 'POST', body: JSON.stringify({ agent: navigator.userAgent }), headers: {
    //         'Content-Type': 'application/json'
    //     },
    // })
    //     .then((response) => response.json())
    //     .then((response) => {
    //         alert(JSON.stringify(response))

    //         if (navigator.userAgent.includes("iPhone") && !navigator.userAgent.includes("Macintosh")) {
    //             // iOS device, check for Face ID availability
    //             console.log("Face ID is available.");
    //             return "FaceId"
    //         } else if (navigator.userAgent.includes("Macintosh")) {
    //             console.log("Touch ID is available.");
    //             return "Touch Id"
    //             // macOS device, check for Touch ID availability
    //         } else {
    //             return
    //         }
    //     })
    return navigator.permissions.query({ name: "camera" }).then((camera) => {
        console.log(camera.state)
        switch (camera.state) {
            case "granted":
                console.log("Camera permission is available.");
                return "Face Id"
            case "denied":
                console.log("Camera permission is not available.");
                return "Touch Id"
            case "prompt":
                return
            default:
                return
        }
    })
}

$('#logoutButton').click(() => {
    fetch('/logout', {credentials: 'include'});

    $('#registerContainer').hide();
    $('#mainContainer').hide();
    $('#loginContainer').show();
})