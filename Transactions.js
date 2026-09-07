
let count=0;let color="yellow";
if(localStorage.getItem("total")=="0"){
    document.getElementById("None").style.display="flex";
    count=0;
}
let transactions = JSON.parse(localStorage.getItem("transactions"));

transactions.forEach(function(transaction, index) {
    if(transaction.type=="Income"){
        color="green";}
        else if(transaction.type=="Expense"){
        color="red";
        } else color="yellow";
    document.getElementById("data").innerHTML += `

        <tr>
            <td>${index + 1}</td>
            <td>${transaction.description}</td>
            <td style="color:${color}">₹${transaction.amount}</td>
            <td>${transaction.type}</td>
            <td>Today</td>
        </tr>
    `;

    }
);