let total = parseFloat(localStorage.getItem("total") || 0.0);
let totalExpense = parseFloat(localStorage.getItem("expenses") || 0.0);
let totalIncome = parseFloat(localStorage.getItem("income") || 0.0);
let totalSaving = parseFloat(localStorage.getItem("saving") || 0.0);
document.getElementById("total-balance").innerHTML = "Rs " + total.toFixed(2);
document.getElementById("total-expenses").innerHTML = "Rs " + totalExpense.toFixed(2);
document.getElementById("total-income").innerHTML = "Rs " + totalIncome.toFixed(2);
document.getElementById("total-savings").innerHTML = "Rs " + totalSaving.toFixed(2);
document.getElementById("add-transaction").addEventListener("click", function () {
    let transactionName = document.getElementById("description").value;
    let transactionAmount = parseFloat(document.getElementById("amount").value);
    let transactionType = document.getElementById("transaction-type").value;
    let transactionCategory = document.getElementById("category").value;
    if(transactionName===""){alert("Enter Description");return;}
    if(transactionAmount<0){alert("Amount can't be negative");return;}
    if(isNaN(transactionAmount)){alert("Enter amount");return;}
    if(transactionType===""){alert("Choose a Transaction Type");return;}
    if(transactionCategory===""){alert("Choose a Transaction Category");return;}
    if(transactionType==="Expense"){expense(transactionAmount)}
    else if(transactionType==="Income"){income(transactionAmount)}
    else{saving(transactionAmount)}
    let transactions=JSON.parse(localStorage.getItem("transactions"))||[];
    let transaction={
        description:transactionName,
        amount:transactionAmount,
        type:transactionType,
        category:transactionCategory,
        date:new Date()
    };
    transactions.push(transaction);
    localStorage.setItem("transactions",JSON.stringify(transactions));
    renderRecentTransactions();
});
let type=document.getElementById("transaction-type");
let category=document.getElementById("category");
type.addEventListener("change",function(){
    category.innerHTML="";
    if(type.value==="Expense"){
        category.innerHTML=`
            <option value="" disabled selected> Category</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Bills">Bills</option>
            <option value="Shopping">Shopping</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Other">Other</option>
        `;
    }else if(type.value==="Income"){
        category.innerHTML=`
            <option value="" disabled selected> Category</option>
            <option value="Salary">Salary</option>
            <option value="Freelance">Freelance</option>
            <option value="Business">Business</option>
            <option value="Gift">Gift</option>
            <option value="Other">Other</option>
        `;
    }else if(type.value==="Saving"){
        category.innerHTML=`
            <option value="" disabled selected> Category</option>
            <option value="Emergency Fund">Emergency Fund</option>
            <option value="Investment">Investment</option>
            <option value="Fixed Deposit">Fixed Deposit</option>
            <option value="Other">Other</option>
        `;
    }
});
document.getElementById("reset").addEventListener("click",function(){
    total=0.0;
    totalIncome=0.0;
    totalExpense=0.0;
    totalSaving=0.0;
    update();
    localStorage.removeItem("transactions");
    renderRecentTransactions();
});
let expense=function(transactionAmount){
    if(transactionAmount>total){
        let balance=transactionAmount-total;
        if(confirm("Not sufficient balance, do you want to retrieve the remaining Rs"+balance+" from your savings?")){
            if(totalSaving>=balance){
                total=0;
                totalExpense+=transactionAmount;
                totalSaving-=balance;
            }else alert("You do not have enough balance");
        }
    }else{
        total=total-transactionAmount;
        totalExpense+=transactionAmount;
    }
    update();
};
let income=function(transactionAmount){
    total=total+transactionAmount;
    totalIncome+=transactionAmount;
    update();
};
let saving=function(transactionAmount){
    if(transactionAmount>total){alert("You do not have enough savings")}else{
        total=total-transactionAmount;
        totalSaving+=transactionAmount;
        update();
    }
};
let update=function(){
    localStorage.setItem("total",total);
    localStorage.setItem("expenses",totalExpense);
    localStorage.setItem("income",totalIncome);
    localStorage.setItem("saving",totalSaving);
    document.getElementById("total-balance").innerHTML="Rs "+total.toFixed(2);
    document.getElementById("total-expenses").innerHTML="Rs "+totalExpense.toFixed(2);
    document.getElementById("total-income").innerHTML="Rs "+totalIncome.toFixed(2);
    document.getElementById("total-savings").innerHTML="Rs "+totalSaving.toFixed(2);
    document.getElementById("description").value="";
    document.getElementById("amount").value="";
    document.getElementById("transaction-type").value="";
    document.getElementById("category").value="";
    myChart.data.datasets[0].data=[totalExpense,totalIncome,totalSaving];
    myChart.update();
    let chartTotal=parseFloat(localStorage.getItem("total"));
    document.querySelector("#chart-center strong").innerHTML="Rs "+chartTotal.toFixed(2);
};
let renderRecentTransactions = function (){

    let recentTransactions = document.getElementById("recent-transactions");

    if (!recentTransactions) return;

    let transactions =
        JSON.parse(localStorage.getItem("transactions")) || [];

    let recent = transactions.slice(-5).reverse();


    if (recent.length === 0) {

        recentTransactions.innerHTML = `
            <div id="recent-header">
                <h3>Recent Transactions</h3>
                <a href="Transactions.html">View All</a>
            </div>
            <div id="None">
                <img src="none.png">
                <div>
                    No transactions yet
                </div>
            </div>
        `;}else{
    recentTransactions.innerHTML = `
        <div id="recent-header">
            <h3>Recent Transactions</h3>
            <a href="Transactions.html">View All</a>
        </div>

        <div id="recent-list">

            ${recent.map(function (transaction) {

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

                return `
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

                        <div class="recent-amount" style="color:${color}">
                            ₹${transaction.amount.toFixed(2)}
                        </div>

                    </div>
                `;

            }).join("")}

        </div>
    `;
};}

let ctx=document.getElementById("chart");
let myChart=new Chart(ctx,{
    type:"doughnut",
    data:{
        labels:["Expenses","Income","Savings"],
        datasets:[{
            data:[totalExpense,totalIncome,totalSaving]
        }]
    },
    options:{
        maintainAspectRatio:false,
        cutout:"65%",
        plugins:{
            legend:{
                position:"right"
            }
        }
    }
});
renderRecentTransactions();
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

document.getElementById("mobile-reset").onclick = function () {
 
    document.getElementById("reset").click();
};

document.getElementById("mobile-signout").onclick = function () {
    document.getElementById("Signout").click();
};

