import React from "react";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [state, setState] = useState({});

  const [
    displayPersonalExpenseAmount,
    setDisplayExpensePersonalAmount,
  ] = useState(state.shareCategory !== "notShared");

  const [advanced, setAdvanced] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = () => {
    const newPage = {
      parent: { database_id: process.env.REACT_APP_NOTION_DATABASE_ID },
      properties: {
        Name: {
          type: "title",
          title: [
            {
              text: {
                content: "From React App with 3 tags",
              },
            },
          ],
        },
        Tags: {
          type: "multi_select",
          multi_select: [
            {
              name: "Postman",
            },
            {
              name: "Tag 1",
            },
            {
              name: "New Tag",
            },
          ],
        },
        Comments: {
          type: "rich_text",
          rich_text: [
            {
              text: {
                content: "This is a rich text input",
              },
            },
          ],
        },
      },
    };
    axios
      .post("https://api.notion.com/v1/pages", {
        headers: {
          "Content-Type": "application/json",
          "Notion-Version": "2021-08-16",
          Authorization: `Bearer ${process.env.REACT_APP_NOTION_API_KEY}`,
        },
        body: JSON.stringify(newPage),
      })
      .then((res) => res.data)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

    //   axios
    //     .post("https://jsonplaceholder.typicode.com/posts", {
    //       body: JSON.stringify({
    //         title: "foo",
    //         body: "bar",
    //         userId: 1,
    //       }),
    //       headers: {
    //         "Content-type": "application/json; charset=UTF-8",
    //       },
    //     })
    //     .then((response) => console.log(response))
    //     .then((json) => console.log(json))
    //     .catch((err) => console.log(err));
  };

  // useEffect(() => {
  //   console.log(state);
  // }, [state]);

  useEffect(() => {
    setDisplayExpensePersonalAmount(state.shareCategory === "otherShared");
  }, [state.shareCategory]);

  return (
    <div className="App">
      <header>
        <span className="pageTitle">Add an expense</span>
        <button onClick={handleSubmit} className="submitExpense">
          Add
        </button>
      </header>

      <main>
        <div className="input-container">
          <label htmlFor="expenseName">Expense Name</label>
          <input
            name="expenseName"
            id="expenseName"
            value={state.expenseName || ""}
            onChange={handleChange}
          />
        </div>

        <div className="input-container">
          <label htmlFor="totalExpense">Total Expense</label>
          <input
            name="totalExpense"
            id="totalExpense"
            value={state.totalExpense || ""}
            onChange={handleChange}
            type="number"
          />
        </div>

        <div className="input-container">
          <label htmlFor="shareCategory">Share Category</label>
          <select
            name="shareCategory"
            id="shareCategory"
            value={state.shareCategory || ""}
            onChange={handleChange}
          >
            <option value="1/3Shared">Shared - 1/3</option>
            <option value="1/2Shared">Shared - 1/2</option>
            <option value="otherShared">Shared - Other Amount</option>
            <option value="notShared">Not Shared</option>
          </select>
        </div>

        {displayPersonalExpenseAmount && (
          <div className="input-container">
            <label htmlFor="sharedAmount">Shared Amount</label>
            <input
              name="sharedAmount"
              id="sharedAmount"
              value={state.sharedAmount || ""}
              onChange={handleChange}
              type="number"
            />
          </div>
        )}

        {displayPersonalExpenseAmount && (
          <div className="input-container">
            <label htmlFor="personalExpenseAmount">
              Personal Expense Amount
            </label>
            <input
              name="personalExpenseAmount"
              id="personalExpenseAmount"
              value={state.personalExpenseAmount || ""}
              onChange={handleChange}
              type="number"
            />
          </div>
        )}

        <div className="input-container">
          <label htmlFor="paymentMethod">Payment Method</label>
          <select
            name="paymentMethod"
            id="paymentMethod"
            value={state.paymentMethod || ""}
            onChange={handleChange}
          >
            <option value="creditCard">Credit Card</option>
            <option value="debitCard">Debit Card</option>
            <option value="adivardhan">Adivardhan</option>
            <option value="shamanth">Shamanth</option>
            <option value="forexCard">Forex Card</option>
            <option value="cash">Cash</option>
          </select>
        </div>

        <div className="input-container">
          <label htmlFor="expenseCategory">Expense Category</label>
          <select
            name="expenseCategory"
            id="expenseCategory"
            value={state.expenseCategory || ""}
            onChange={handleChange}
          >
            <option value="groceries">Groceries</option>
            <option value="one-time">One Time</option>
            <option value="long-term">Long Term</option>
            <option value="restaurant">Restaurant</option>
            <option value="House">House</option>
            <option value="commute">Commute</option>
            <option value="entertainment">Entertainment</option>
            <option value="haircut">Haircut</option>
            <option value="rent">Rent</option>
            <option value="concordia-fees">Concordia Fees</option>
            <option value="miscellaneous">Miscellaneous</option>
          </select>
        </div>

        <div>
          <p
            onClick={() => setAdvanced(!advanced)}
            style={{ cursor: "pointer", textAlign: "left" }}
          >
            Advanced {advanced ? <span>&#709;</span> : <span>&#706;</span>}
          </p>
          {advanced && (
            <div className="dropdownContainer">
              <div className="input-container">
                <label htmlFor="date">Date</label>
                <input
                  name="date"
                  id="date"
                  value={state.date || new Date().toISOString().split("T")[0]}
                  onChange={handleChange}
                  type="date"
                />
              </div>

              <div className="input-container">
                <label htmlFor="sharedWith">Shared With</label>
                {/* Checkbox */}
              </div>

              <div className="input-container">
                <label htmlFor="comments">Comments</label>
                <input
                  name="comments"
                  id="comments"
                  value={state.comments || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
