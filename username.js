window.addEventListener("load", function () {

    let username = localStorage.getItem("username");

    if (username == null) {
        username = prompt("Whats your good name?");
        localStorage.setItem("username", username);
    }

    document.getElementById("user-name").innerHTML =
        username.toUpperCase();

    document.getElementById("user-avatar").innerHTML =
        username.charAt(0).toUpperCase();


   function signOut() {

    if (confirm("Are you sure you wish to sign out?")) {
        localStorage.removeItem("username");
        
        let newUsername = prompt("Whats your good name?");
        
        if (newUsername == null || newUsername === "") {
            newUsername = "User";
        }
        
        localStorage.setItem("username", newUsername);
        
        document.getElementById("user-name").innerHTML =
        newUsername.toUpperCase();
        
        document.getElementById("user-avatar").innerHTML =
        newUsername.charAt(0).toUpperCase();
        localStorage.removeItem("transactions");

localStorage.removeItem("total");

localStorage.removeItem("income");

localStorage.removeItem("expenses");

localStorage.removeItem("saving");
location.reload();
    }
}


    // Normal dashboard Sign out button
    let signout = document.getElementById("Signout");

    if (signout) {
        signout.onclick = signOut;
    }


    // Mobile drawer Sign out button
    let mobileSignout =
        document.getElementById("mobile-signout");

    if (mobileSignout) {
        mobileSignout.onclick = signOut;
    }


    // Mobile drawer Reset button
    let mobileReset =
        document.getElementById("mobile-reset");

    if (mobileReset) {

        mobileReset.onclick = function () {

            if (confirm("Are you sure you wish to clear all past records?")) {

                localStorage.removeItem("transactions");

                location.reload();

            }

        };

    }

});