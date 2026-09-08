let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];
transactions = [...transactions].reverse();
let transactionList =
    document.getElementById("recent-list");
let none =
    document.getElementById("None");
if (transactions.length === 0) {
    none.style.display = "flex";
}
else {
    none.style.display = "none";
    transactions.forEach(function(transaction) {
        let color;
        if (transaction.type === "Income") {
            color = "green";
        }
        else if (transaction.type === "Expense") {
            color = "red";
        }
        else {
            color = "yellow";
        }
        let date = new Date(transaction.date);
        let day = date.getDate();
        let month = date.toLocaleString("en-US", {
            month: "short"
        }).toUpperCase();
        let year = date.getFullYear();


        transactionList.innerHTML += `
            <div class="recent-item">
                <div class="recent-date">
                    <strong>${day}</strong>
                    <span>${month} ${year}</span>
                </div>

                <div class="recent-info">

                    <div class="recent-name">
                        ${transaction.description}
                    </div>
                    <div class="recent-category">
                        ${transaction.type} • ${transaction.category}
                    </div>
                </div>
                <div
                    class="recent-amount"
                    style="color:${color}"
                >
                    ₹${Number(transaction.amount).toFixed(2)}
                </div>

            </div>

        `;

    });

}

document.getElementById("add-transaction").onclick=function(){
    window.location.href="index.html";
}
let menuButton = document.getElementById("menu-button");
let navbar = document.getElementById("navbar");
let navbarOverlay = document.getElementById("navbar-overlay");

menuButton.onclick = function () {
    navbar.classList.add("open");
    document.body.classList.add("no-scroll");
    navbarOverlay.classList.add("open");
};

navbarOverlay.onclick = function () {
    navbar.classList.remove("open");
    document.body.classList.remove("no-scroll");
    navbarOverlay.classList.remove("open");
};