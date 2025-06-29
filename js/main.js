let balance = 1000;
let selectedColor = null;
let time = 60;
let timer = document.getElementById("timer");
let resultEl = document.getElementById("result");
let balanceEl = document.getElementById("balance");
let historyList = document.getElementById("history-list");

function placeBet(color) {
  selectedColor = color;
  alert("✅ Bet placed on " + color.toUpperCase());
}

function updateBalance(amount) {
  balance += amount;
  balanceEl.innerText = balance;
}

function generateResult() {
  const colors = ["green", "red", "violet"];
  const result = colors[Math.floor(Math.random() * colors.length)];

  resultEl.innerText = "Result: " + result.toUpperCase();
  
  let li = document.createElement("li");
  li.textContent = result.toUpperCase();
  historyList.insertBefore(li, historyList.firstChild);
  if (historyList.children.length > 10) {
    historyList.removeChild(historyList.lastChild);
  }

  if (selectedColor === result) {
    if (result === "violet") {
      updateBalance(450);
      alert("🎉 You won ₹450 (4.5x)!");
    } else {
      updateBalance(200);
      alert("🎉 You won ₹200 (2x)!");
    }
  } else {
    updateBalance(-100);
    alert("❌ You lost ₹100!");
  }

  selectedColor = null;
}

// Timer countdown
setInterval(() => {
  time--;
  timer.innerText = time;
  if (time <= 0) {
    generateResult();
    time = 60;
  }
}, 1000);
