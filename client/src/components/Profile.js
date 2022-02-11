import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import avatar from '../public/img/avatar.png'
import { useEffect } from 'react';


const Profile = (props) => {

    const [msg, setMsg] = useState(undefined);

    const [transactions, setTransactions] = useState([]);
    const [filterTransactions, setFilterTransactions] = useState([]);
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);


    const [value, setValue] = useState('');
    const [type, setType] = useState('');

    const [dateStart, setDateStart] = useState();
    const [dateEnd, setDateEnd] = useState();


    useEffect(() => {
        const fetchData = async () => {
            const results = await axios.put('http://localhost:3001/user', {
                userId: props.userId
            });
            setTransactions(results.data.transactions);
            setIncome(results.data.income);
            setExpense(results.data.expense);
        }

        fetchData();


    }, [transactions, income, expense, filterTransactions])

    const addTransaction = (e) => {
        e.preventDefault();
        const fetchData = async () => {
            const results = await axios.post('http://localhost:3001/user/transactions/add-transaction', {
                userId: props.userId,
                type: type,
                value: value
            })
        }
        fetchData();

    }

    const deleteTransaction = (id) => {

        const fetchData = async () => {
            const results = await axios.delete(`http://localhost:3001/user/transactions/delete-transaction`, {
                data: {
                    id: id,
                    userId: props.userId
                },
                headers: { Authorization: "token" }
            })
        }
        fetchData();
    }

    const filter = (e) => {
        e.preventDefault();
        const fetchData = async () => {
            const results = await axios.put('http://localhost:3001/user/transactions/filter', {

                dateStart: dateStart,
                dateEnd: dateEnd,
                userId: props.userId

            })
            setFilterTransactions(results.data.results);
        }
        fetchData();
    }



    return (
        <>

            <div className="profile-cnt">
                <div className="profile-card">
                    <div className="avatar-cnt">
                        <img src={avatar} alt='avatar' className="avatar" />
                    </div>
                    <h5 className="card-title">
                        Ciao, {props.name}!
                    </h5>
                    <p>In this page you can manage your budget and see the incomes and the expenses of the
                        current month.</p>
                    <a href='/' className='delete'>Logout</a>
                </div>
                <div className="profile-page">
                    <div className="profile-header">
                        <div className="bal-inc-exp">
                            <h3 className="title-cnt">This Month</h3>
                            <div className="bal">
                                <h4 className="title">Balance</h4>
                                <p className="value">
                                    {(income + expense).toFixed(2)}
                                </p>
                            </div>
                            <div className="inc">
                                <h4 className="title">Incomes</h4>
                                <p className="value">
                                    {income.toFixed(2)}
                                </p>
                            </div>
                            <div className="exp">
                                <h4 className="title">Expenses</h4>
                                <p className="value">
                                    {expense.toFixed(2)}
                                </p>
                            </div>

                        </div>
                        <div className="add-transaction">
                            <h4 className="title">Add Transaction</h4>
                            <form onSubmit={addTransaction}>
                                <div className="input-box">
                                    <label htmlFor="type">Type</label>
                                    <input type="text" id="type" name="type" onChange={e => setType(e.target.value)} />
                                </div>
                                <div className="input-box">
                                    <label htmlFor="value">Expense/Income
                                        <br />
                                        <span>(- before for expenses)</span>
                                    </label>
                                    <input type="number" id="value" name="value" step="0.01" onChange={e => setValue(e.target.value)} />
                                </div>
                                <button type="submit">Add</button>
                            </form>
                        </div>
                    </div>
                    <div className="transaction">
                        <h2 className="title">Last 10 transactions</h2>
                        {
                            transactions.map(transaction => transaction).reverse().slice(0, 10).map((transaction) => {
                                return (
                                    <div key={transaction.id} className={transaction.value < 0 ? 'single negative' : 'single positive'}>
                                        <div className="data">
                                            <p>
                                                {transaction.type}
                                            </p>
                                            <p>
                                                {transaction.value} $
                                            </p>
                                            <p>
                                                {new Date(transaction.date).toLocaleDateString("en-US")}
                                            </p>
                                        </div>
                                        <button onClick={() => deleteTransaction(transaction.id)}
                                            className="delete">Delete</button>
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </div>

            <h2 className="filter-title">Filter Section</h2>
            <div className="filter-form">
                <form onSubmit={filter}>
                    <h3>Filter your transactions</h3>
                    <div>
                        <label htmlFor="dateStart">Since:</label>
                        <input type="date" name="dateStart" id="dateStart" required onChange={e => setDateStart(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="dateEnd">Until:</label>
                        <input type="date" name="dateEnd" id="dateEnd" required onChange={e => setDateEnd(e.target.value)} />
                    </div>

                    <button onClick={filter}>Filter</button>
                </form>
                <h4 className={msg !== undefined ? 'msg' : ''}>
                    {msg !== undefined ? msg : ''}
                </h4>
            </div>


            <div className="transaction">

                {
                    filterTransactions.map(transaction => transaction).reverse().map((transaction) => {
                        return (
                            <div key={transaction.id} className={transaction.value < 0 ? 'single negative' : 'single positive'}>
                                <div className="data">
                                    <p>
                                        {transaction.type}
                                    </p>
                                    <p>
                                        {transaction.value} $
                                    </p>
                                    <p>
                                        {new Date(transaction.date).toLocaleDateString("en-US")}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
            </div>


        </>
    )
}

export default Profile