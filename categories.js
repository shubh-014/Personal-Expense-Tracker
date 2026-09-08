let menuButton = document.getElementById("menu-button");
let navbar = document.getElementById("navbar");
let navbarOverlay = document.getElementById("navbar-overlay");

menuButton.onclick = function () {
    navbar.classList.add("open");
    navbarOverlay.classList.add("open");
};

navbarOverlay.onclick = function () {
    navbar.classList.remove("open");
    navbarOverlay.classList.remove("open");
};
let type = document.getElementById("transaction-type");
let categoryList = document.getElementById("category-list");

let categoryTotal = document.getElementById("category-total");
let highestCategory = document.getElementById("highest-category");
let insightText = document.getElementById("insight-text");

if (type) {

    type.addEventListener("change", function () {

        let transactions =
            JSON.parse(localStorage.getItem("transactions")) || [];

        let selectedType = type.value;

        let categoryTotals = {};

        // Calculate category totals
        transactions.forEach(function (transaction) {

            if (transaction.type === selectedType) {

                if (categoryTotals[transaction.category] === undefined) {
                    categoryTotals[transaction.category] = 0;
                }

                categoryTotals[transaction.category] +=
                    Number(transaction.amount);
            }

        });


        // Calculate total
        let total = 0;

        for (let category in categoryTotals) {
            total += categoryTotals[category];
        }


        // Clear old categories
        categoryList.innerHTML = "";


        // If there are no transactions
        if (total === 0) {

            categoryList.innerHTML = `
                <p class="no-data">
                    No ${selectedType.toLowerCase()} transactions yet.
                </p>
            `;

            categoryTotal.innerHTML = "₹0.00";
            highestCategory.innerHTML = "-";
            insightText.innerHTML =
                `No ${selectedType.toLowerCase()} data available yet.`;

            return;
        }


        // Sort categories
        let sortedCategories =
            Object.entries(categoryTotals).sort(function (a, b) {
                return b[1] - a[1];
            });


        // Highest category
        let topCategory = sortedCategories[0][0];
        let topAmount = sortedCategories[0][1];

        let topPercentage = (topAmount / total) * 100;


        // Display total
        categoryTotal.innerHTML =
            "₹" + total.toFixed(2);


        // Display highest category
        highestCategory.innerHTML =
            topCategory + " (" + topPercentage.toFixed(0) + "%)";


        // Display insight
        insightText.innerHTML =
            topCategory +
            " is your largest " +
            selectedType.toLowerCase() +
            " category, making up " +
            topPercentage.toFixed(0) +
            "% of the total.";


        // Colors
        let colors = [
            "#4c8dff",
            "#36b9e8",
            "#9b59ff",
            "#d946b8",
            "#3ccf91",
            "#f2b84b",
            "#64748b"
        ];


        // Create category rows
        sortedCategories.forEach(function (item, index) {

            let category = item[0];
            let amount = item[1];

            let percentage = (amount / total) * 100;

            let color =
                colors[Math.floor(Math.random() * colors.length)];

            categoryList.innerHTML += `

                <div class="category-row">

                    <div class="category-name">
                        ${category}
                    </div>

                    <div class="category-bar">

                        <div
                            class="category-fill"
                            style="
                                width:${percentage}%;
                                background-color:${color};
                            "
                        ></div>

                    </div>

                    <div class="category-amount">
                        ₹${amount.toFixed(2)}
                    </div>

                    <div class="category-percent">
                        ${percentage.toFixed(0)}%
                    </div>

                </div>

            `;

        });

    });

}