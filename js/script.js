const Modal = {
    open() {

        document
            .querySelector('.modal-overlay')
            .classList.add('active')

        //abrir modal
        //adicionar a class active do modal
    },
    close() {
        document
            .querySelector('.modal-overlay')
            .classList.remove('active');
        //fechar modal
        //retirar a class active do modal 
    }
}

const transactions = [{
        id: 1,
        description: 'Luz',
        amount: -50001,
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
        amount: -20012,
        date: '23/01/2021',
    },

]

const Transaction = {

    all:transactions,
    add(transaction){
        Transaction.all.push(transaction)

        App.reload()
    },

    incomes() {
        let income = 0;
        //pegar todas as transações
        Transaction.all.forEach(transaction => {
        //para cada transacao, se ela for maior que zero
        if(transaction.amount > 0){
         //somar a uma variavel e retornar variavel
         income += transaction.amount
        }
        })
       
        return income
    },
    expenses() {
        let expense = 0;
        //pegar todas as transações
        Transaction.all.forEach(transaction => {
        //para cada transacao, se ela for menor que zero
        if(transaction.amount < 0){
         //somar a uma variavel e retornar variavel
         expense += transaction.amount
        }
       

        })

        return expense
    },
    total() {

        return Transaction.incomes() + Transaction.expenses()
    }
}

const DOM = {
    TransactionContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {

        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.TransactionContainer.appendChild(tr)

    },

    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? 'income' : 'expense'

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
                <td class="description">${transaction.description}</td>
                <td class="${CSSclass}"> ${amount}</td>
                <td class="date">${transaction.date}</td>
                <td>
                    <img src="./assets/minus.svg" alt="Remover transacao">
                </td>
         
        `

        return html

    },

    updateBalance(){
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total())
        
    },
    
    clearTransactions(){
        DOM
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? '-' : '';

        value = String(value).replace(/\D/g, '')

        value = Number(value) / 100

        value = value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })



        return signal + value
    }
}

const App = {
    init(){

        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })
        
        DOM.updateBalance()
    }, 
    reload(){
        App.init()

    }
}

App.init()



Transaction.add({
    id:39,
    description:'Alo',
    amount:200,
    date:'23/01/2021'
})







