window.onload = function () {
    let x = localStorage.getItem("username");
    if (x == null) {
        let username = prompt("Whats your good name?")
        localStorage.setItem("username", username)
    }
    x = localStorage.getItem("username");
    document.getElementById("Username").innerHTML = x.toUpperCase();
}
document.getElementById("Signout").onclick = function () {
    if (confirm("Are you sure you wish to sign out?")) {
        localStorage.removeItem("username");
        total = 0.0;
        totalIncome = 0.0;
        totalExpense = 0.0;
        totalSaving = 0.0;
        document.getElementById("Username").innerHTML = " ";
        update();
        let username = prompt("Whats your good name?")
        localStorage.setItem("username", username)
        x = localStorage.getItem("username");
        document.getElementById("Username").innerHTML = x.toUpperCase();
    }
}

