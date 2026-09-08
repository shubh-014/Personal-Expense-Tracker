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


    document.getElementById("Signout").onclick = function () {

        if (confirm("Are you sure you wish to sign out?")) {

            localStorage.removeItem("username");

            total = 0.0;
            totalIncome = 0.0;
            totalExpense = 0.0;
            totalSaving = 0.0;

            update();

            let newUsername = prompt("Whats your good name?");

            localStorage.setItem("username", newUsername);

            document.getElementById("user-name").innerHTML =
                newUsername.toUpperCase();

            document.getElementById("user-avatar").innerHTML =
                newUsername.charAt(0).toUpperCase();
        }
    };

});