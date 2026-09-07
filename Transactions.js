let count=0;let color="yellow";
if(localStorage.getItem("total")=="0"){
    document.getElementById("None").style.display="flex";
    count=0;
}
let transactions = JSON.parse(localStorage.getItem("transactions"));
transactions=transactions.reverse();
transactions.forEach(function(transaction, index) {
    let date = new Date(transaction.date);
    let formattedDate =
        date.getDate() + "/" +
        (date.getMonth() + 1) + "/" +
        date.getFullYear();
    if(transaction.type=="Income"){
        color="green";}
        else if(transaction.type=="Expense"){
        color="red";
        } else color="yellow";
    document.getElementById("data").innerHTML += `
        <tr>
            <td>${formattedDate}</td>
            <td>${transaction.description}</td>
            <td style="color:${color}">₹${transaction.amount}</td>
            <td>${transaction.type}</td>
            <td>${transaction.category}</td>
        </tr>
    `;

    }
);