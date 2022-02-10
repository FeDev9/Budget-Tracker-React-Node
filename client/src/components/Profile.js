import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import avatar from '../public/img/avatar.png'
import { useEffect } from 'react';
import Filter from './Filter';

const Profile = (props) => {

    const [msg, setMsg] = useState(undefined);

    const [transactions, setTransactions] = useState([]);
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);


    const [value, setValue] = useState('');
    const [type, setType] = useState('');




    useEffect(() => {
        const fetchData = async () => {
            const results = await axios.post('http://localhost:3001/profile', {
                userId: props.userId
            });
            setTransactions(results.data.transactions);
            setIncome(results.data.income);
            setExpense(results.data.expense);
        }
        fetchData();


    }, [transactions, income, expense])

    const addTransaction = (e) => {
        e.preventDefault();
        const fetchData = async () => {
            const results = await axios.post('http://localhost:3001/transactions/add-transaction', {
                userId: props.userId,
                type: type,
                value: value
            })
        }
        fetchData();

    }

    const deleteTransaction = (id) => {
        console.log(id, props.userId);
        const fetchData = async () => {
            const results = await axios.post(`http://localhost:3001/transactions/delete-transaction/${id}`, {
                id: id,
                userId: props.userId
            })
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
                    <p> Clicking on the button below, you can see and filter all transactions!</p>
                    <button onClick={<Filter userId={props.userId} />}>
                        View all transactions
                    </button>
                </div>
                <div className="profile-page">
                    <div className="profile-header">
                        <div className="bal-inc-exp">
                            <h3 className="title-cnt">This Month</h3>
                            <div className="bal">
                                <h4 className="title">Balance</h4>
                                <p className="value">
                                    {income + expense}
                                </p>
                            </div>
                            <div className="inc">
                                <h4 className="title">Incomes</h4>
                                <p className="value">
                                    {income}
                                </p>
                            </div>
                            <div className="exp">
                                <h4 className="title">Expenses</h4>
                                <p className="value">
                                    {expense}
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

            <div class="filter-form">
                <form action="/transactions/filter" method="POST">
                    <h3>Filter your transactions</h3>
                    <div>
                        <label for="dateStart">Since:</label>
                        <input type="date" name="dateStart" id="dateStart" required />
                    </div>
                    <div>
                        <label for="dateEnd">Until:</label>
                        <input type="date" name="dateEnd" id="dateEnd" required />
                    </div>

                    <button type="submit">Filter</button>
                </form>
                <h4 className={msg !== undefined ? 'msg' : ''}>
                    {msg !== undefined ? msg : ''}
                </h4>
            </div>

            <div class="transaction">
                <h2 className="title">All Transactions</h2>
                {
                    transactions.map(transaction => transaction).reverse().map((transaction) => {
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
        </>
    )
}

export default Profile