import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const Filter = (props) => {

    const [msg, setMsg] = useState(undefined);
    const [transactions, setTransactions] = useState([]);



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

export default Filter