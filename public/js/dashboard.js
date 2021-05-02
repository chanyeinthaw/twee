function logout() {
    document.location.href = '/logout'
}

function changePassword() {
    let newPassword = prompt('New Password')

    if (newPassword) {
        document.location.href = '/change-password?new=' + newPassword
    }
}

function changePasswordFor(username) {
    let newPassword = prompt('New Password')

    if (newPassword) {
        document.location.href = `/user/password?username=${username}&new=` + newPassword
    }
}

function remove(username) {
    document.location.href = '/user/delete?username=' + username
}