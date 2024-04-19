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

let setButtonName = () => {
    const agent = checkUserAgent().then((agent) => {
        if (agent) {
            var buttonText = `Register using ${agent}`
            $('#registerButton').prop('value', buttonText)
        }
    })
}

let checkUserAgent = () => {
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
                return navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
                    stream.getVideoTracks().forEach((track) => {
                        track.stop();
                    });
                }).finally(() => setButtonName())
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