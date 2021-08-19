// import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
var billAmount = 0;
function App() {
  var [nextButton, setNextbutton] = useState("");
  var [checkButton, setCheckbutton] = useState("");
  var [notesTable, setNotesTable] = useState("");
  function billInputHandler(event) {
    var inputBill = event.target.value;
    billAmount = parseInt(inputBill);
    console.log(inputBill);
    if (parseInt(inputBill) > 0) {
      nextButton = (
        <div className="container">
          <label for="cash-amount">Cash Amount 💲 </label>
          <input
            id="cash-amount"
            placeholder="$"
            className="enter-amount"
            onChange={cashInputHandler}
            type="number"
          ></input>
        </div>
      );
      setNextbutton(nextButton);
    } else if (
      Number.isNaN(parseInt(inputBill)) &&
      !/[a-zA-Z]/.test(inputBill)
    ) {
      nextButton = "";
      setNextbutton(nextButton);
      setNotesTable("");
    } else {
      nextButton = "Enter valid bill amount";
      setNextbutton(nextButton);
      setNotesTable("");
    }
  }
  function calculateReturn(inputCash, billAmount) {
    var returnChange = parseInt(inputCash) - billAmount;
    var listDenomination = [2000, 500, 100, 20, 10, 5, 1];
    var listNumuberOfNotes = [];
    for (let i = 0; i < 7; i++) {
      listNumuberOfNotes.push(Math.trunc(returnChange / listDenomination[i]));
      returnChange = returnChange % listDenomination[i];
    }
    console.log(listNumuberOfNotes);
    notesTable = (
      <div className="container">
        <table className="notes-table">
          <caption
            style={{
              margin: "1rem",
              color: "var(--primary-color)",
              fontWeight: "700",
              fontSize: "1.5rem",
            }}
          >
            Return Change 💲
          </caption>
          <tr>
            <th>Number of notes</th>
            <td className="notes-returned">
              {checkNotes(listNumuberOfNotes[0])}
            </td>
            <td className="notes-returned">
              {checkNotes(listNumuberOfNotes[1])}
            </td>
            <td className="notes-returned">
              {checkNotes(listNumuberOfNotes[2])}
            </td>
            <td className="notes-returned">
              {checkNotes(listNumuberOfNotes[3])}
            </td>
            <td className="notes-returned">
              {checkNotes(listNumuberOfNotes[4])}
            </td>
            <td className="notes-returned">
              {checkNotes(listNumuberOfNotes[5])}
            </td>
            <td className="notes-returned">
              {checkNotes(listNumuberOfNotes[6])}
            </td>
          </tr>
          <tr>
            <th>Denomination</th>
            <td>2000</td>
            <td>500</td>
            <td>100</td>
            <td>20</td>
            <td>10</td>
            <td>5</td>
            <td>1</td>
          </tr>
        </table>
      </div>
    );
    setNotesTable(notesTable);
  }
  function cashInputHandler(event) {
    var inputCash = event.target.value;

    if (parseInt(inputCash) > billAmount) {
      checkButton = (
        <div className="container">
          <button
            id="check-button"
            onClick={() => calculateReturn(inputCash, billAmount)}
          >
            Check
          </button>
        </div>
      );
      setCheckbutton(checkButton);
    } else if (
      Number.isNaN(parseInt(inputCash)) &&
      !/[a-zA-Z]/.test(inputCash)
    ) {
      checkButton = "";
      setCheckbutton(checkButton);
      setNotesTable("");
    } else {
      var difference = billAmount - parseInt(inputCash);
      checkButton = (
        <span
          style={{
            color: "var(--primary-color)",
            fontWeight: "500",
            fontSize: "1.5rem",
          }}
        >
          You're short by{" "}
          <span style={{ fontWeight: "700", color: "#F87171" }}>
            {difference}!
          </span>
        </span>
      );
      setCheckbutton(checkButton);
      setNotesTable("");
    }
  }
  function checkNotes(item) {
    if (item > 0) {
      return (
        <span style={{ color: "#000099", fontWeight: "700" }}>{item}</span>
      );
    } else {
      return <span style={{ color: "#F87171" }}>{item}</span>;
    }
  }
  return (
    <div className="App">
      <div className="container">
        <h1 style={{ color: "var(--primary-color)" }}>Cash Register 💰</h1>
        <h2
          style={{
            color: "var(--primary-color",
            fontWeight: "500",
            fontSize: "1.2rem",
            marginBottom: "3.5rem",
          }}
        >
          Enter the bill amount and cash given and I'll let you know the minimum
          number of notes to be returned
        </h2>
        <label for="bill-amount">Bill Amount 💲</label>
        <input
          id="bill-amount"
          className="enter-amount"
          onChange={billInputHandler}
          type="number"
          placeholder="$"
        ></input>
        {nextButton}
        {checkButton}
        {notesTable}
      </div>
    </div>
  );
}

export default App;
