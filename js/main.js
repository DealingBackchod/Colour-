let balance = 1000;
let selectedColor = null;
let selectedAmount = 0;
let time = 30;
const timer = document.getElementById("timer");
const resultEl = document.getElementById("result");
const balanceEl = document.getElementById("balance");
const historyList = document.getElementById("history-list");

function updateBalance(amount) {
  balance += amount;
  balanceEl.innerText = balance;
}

function placeBet(color) {
  const input = document.getElementById("betAmount").value;
  const betAmount = parseInt(input);

  if (!betAmount || betAmount < 10 || betAmount > 100000) {
    alert("❌ Bet must be between 10 and 100000 coins.");
    return;
  }

  if (betAmount > balance) {
    alert("❌ Not enough balance.");
    return;
  }

  selectedColor = color;
  selectedAmount = betAmount;
  alert(`✅ Bet placed on ${color.toUpperCase()} with ${betAmount} coins.`);
}

function generateResult() {
  const colors = ["green", "red", "violet"];
  const result = colors[Math.floor(Math.random() * colors.length)];

  resultEl.innerText = "Result: " + result.toUpperCase();

  const li = document.createElement("li");
  li.textContent = result.toUpperCase();
  historyList.insertBefore(li, historyList.firstChild);
  if (historyList.children.length > 10) {
    historyList.removeChild(historyList.lastChild);
  }

  if (selectedColor) {
    if (selectedColor === result) {
      let winnings = 0;
      if (result === "violet") {
        winnings = selectedAmount * 4.5;
      } else {
        winnings = selectedAmount * 2;
      }
      updateBalance(winnings);
      alert(`🎉 You won ₹${winnings}!`);
    } else {
      updateBalance(-selectedAmount);
      alert(`❌ You lost ₹${selectedAmount}.`);
    }
    selectedColor = null;
  }
}

setInterval(() => {
  time--;
  timer.innerText = time;
  if (time <= 0) {
    generateResult();
    time = 30;
  }
}, 1000);
