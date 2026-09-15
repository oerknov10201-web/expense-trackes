```javascript
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const addButton = document.getElementById("add");

const list = document.getElementById("list");

const total = document.getElementById("total");

const incomeElement =
    document.getElementById("income");

const expenseElement =
    document.getElementById("expense");

const incomeBar =
    document.getElementById("incomeBar");

const expenseBar =
    document.getElementById("expenseBar");

const clearButton =
    document.getElementById("clear");

const empty =
    document.getElementById("empty");

const themeBtn =
    document.getElementById("themeBtn");


let transactions =
    JSON.parse(
        localStorage.getItem("transactions")
    ) || [];


// PULNI FORMATLASH

function money(number) {

    return number.toLocaleString("uz-UZ")
        + " so'm";

}


// SAYTNI YANGILASH

function updateUI() {

    list.innerHTML = "";

    let income = 0;

    let expense = 0;


    transactions.forEach(
        (item, index) => {

            if (item.amount >= 0) {

                income += item.amount;

            } else {

                expense += Math.abs(
                    item.amount
                );

            }


            const li =
                document.createElement("li");

            li.classList.add(
                "transaction"
            );


            if (item.amount >= 0) {

                li.classList.add(
                    "income-item"
                );

            } else {

                li.classList.add(
                    "expense-item"
                );

            }


            li.innerHTML = `

                <div>

                    <div class="transaction-name">
                        ${item.text}
                    </div>

                    <div class="transaction-amount">

                        ${
                            item.amount >= 0
                            ? "+"
                            : ""
                        }

                        ${money(item.amount)}

                    </div>

                </div>


                <button
                    class="delete-btn"
                    onclick="deleteTransaction(${index})"
                >
                    🗑️
                </button>

            `;


            list.appendChild(li);

        }
    );


    const balance =
        income - expense;


    total.textContent =
        money(balance);


    incomeElement.textContent =
        money(income);


    expenseElement.textContent =
        money(expense);


    // GRAFIK

    const max =
        Math.max(income, expense, 1);


    const incomeHeight =
        (income / max) * 170;


    const expenseHeight =
        (expense / max) * 170;


    incomeBar.style.height =
        Math.max(incomeHeight, 10)
        + "px";


    expenseBar.style.height =
        Math.max(expenseHeight, 10)
        + "px";


    // BO'SH TARIX

    if (transactions.length === 0) {

        empty.style.display =
            "block";

    } else {

        empty.style.display =
            "none";

    }


    // SAQLASH

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}


// QO'SHISH

addButton.addEventListener(
    "click",
    function() {

        if (
            text.value.trim() === ""
            ||
            amount.value === ""
        ) {

            alert(
                "Iltimos, barcha joylarni to'ldiring!"
            );

            return;

        }


        const item = {

            text:
                text.value.trim(),

            amount:
                Number(amount.value)

        };


        transactions.push(item);


        text.value = "";

        amount.value = "";


        updateUI();

    }
);


// ENTER BILAN QO'SHISH

amount.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            addButton.click();

        }

    }
);


// O'CHIRISH

function deleteTransaction(index) {

    transactions.splice(
        index,
        1
    );

    updateUI();

}


// HAMMASINI TOZALASH

clearButton.addEventListener(
    "click",
    function() {

        if (
            transactions.length === 0
        ) {

            return;

        }


        const answer =
            confirm(
                "Barcha operatsiyalar o'chirilsinmi?"
            );


        if (answer) {

            transactions = [];

            updateUI();

        }

    }
);


// =====================================
// 🌙 TUNGI / KUNDUZGI REJIM
// =====================================

function setTheme(isDark) {

    if (isDark) {

        document.body.classList.add("dark");

        themeBtn.textContent = "☀️";

        localStorage.setItem(
            "theme",
            "dark"
        );

    } else {

        document.body.classList.remove("dark");

        themeBtn.textContent = "🌙";

        localStorage.setItem(
            "theme",
            "light"
        );

    }

}


// KNOPKANI BOSISH

themeBtn.addEventListener(
    "click",
    function() {

        const isDark =
            document.body.classList.contains("dark");

        setTheme(!isDark);

    }
);


// OLDINGI REJIMNI TEKSHIRISH

const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "dark") {

    setTheme(true);

} else {

    setTheme(false);

}


// BOSHLANG'ICH HOLAT

updateUI();
```
