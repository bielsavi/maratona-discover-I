const Modal = {
    open() {
        //Abrir o Modal
        //Adicionar a classe active no modal
        document.querySelector('.modal-overlay')
            .classList.add('active')
    },
    close() {
        //Fechar o Modal
        //Remover a classe active no modal
        document.querySelector('.modal-overlay')
            .classList.remove('active')
    }
}

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021',
    },
    {
        id: 2,
        description: 'Website',
        amount: 500000,
        date: '23/01/2021',
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021',
    },
    {
        id: 4,
        description: 'App',
        amount: 200000,
        date: '23/01/2021',
    },
]

const Transaction = {
    all: transactions,
    add(transaction){
        Transaction.all.push(transaction)

        App.reload()
    },
    incomes() {
        //somatória das entradas
        let income = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.amount > 0) {
                income += transaction.amount;
            }
        })
        return income;
    },

    expenses() {
        //somatória das saídas
        let expense = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0) {
                expense += transaction.amount;
            }
        })
        return expense;
    },
    total() {
        //entradas - saídas
        return Transaction.incomes() + Transaction.expenses()
    },
}

//Substituir os dados do HTML com os dados do JS

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        console.log(transaction)
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover Transação">
            </td>
        `

        return html
    },
//Atualizar o Total
    updateBalance() {
        document.getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    },
    clearTransactions(){
        DOM.transactionsContainer.innerHTML = ""
    }

}
//Formato da Moeda
const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""
//Divisão dos numeros por 100 para adicionar a virgula
        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }
}

const App = {
    init() {
        
Transaction.all.forEach(transaction => {
    DOM.addTransaction(transaction)
})
        DOM.updateBalance()
    },
    //Após o carregamento das Transações, limpar todas antes de rodar a função
    reload() {
        DOM.clearTransactions()
        App.init()        
    },
}

App.init()
//Exemplo de Transação
Transaction.add({
    id: 39,
    description: "Alo",
    amount: 5000,
    date: '23/01/2021'
})