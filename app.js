// Daftar konstanta
const CHOICES = {
  1: "Batu",
  2: "Kertas",
  3: "Gunting"
};

const RESULT_MESSAGES = {
  win: "Kamu menang!",
  lose: "Kamu kalah!",
  draw: "Hasil seri."
};

// Inisialisasi skor
let playerScore = 0;
let computerScore = 0;
let roundNumber = 1;

// Fungsi untuk memilih senjata
function chooseWeapon(playerChoice) {
  const computerChoice = generateComputerChoice();

  const result = determineWinner(playerChoice, computerChoice);
  updateScore(result);

  displayResult(playerChoice, computerChoice, result);

  if (playerScore >= 5 || computerScore >= 5) {
    endGame();
  } else {
    roundNumber++;
    updateRoundNumber(roundNumber);
  }
}

// Fungsi untuk menghasilkan pilihan komputer
function generateComputerChoice() {
  return Math.floor(Math.random() * 3) + 1;
}

// Fungsi untuk menentukan pemenang
function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "draw";
  } else if (
    (playerChoice === 1 && computerChoice === 3) ||
    (playerChoice === 2 && computerChoice === 1) ||
    (playerChoice === 3 && computerChoice === 2)
  ) {
    return "win";
  } else {
    return "lose";
  }
}

// Fungsi untuk memperbarui skor
function updateScore(result) {
  if (result === "win") {
    playerScore++;
  } else if (result === "lose") {
    computerScore++;
  }
  updateScoreDisplay();
}

// Fungsi untuk menampilkan hasil permainan
function displayResult(playerChoice, computerChoice, result) {
  const resultText = document.getElementById("result-text");

  resultText.innerHTML = `Kamu memilih <strong>${CHOICES[playerChoice]}</strong>. Komputer memilih <strong>${CHOICES[computerChoice]}</strong>. ${RESULT_MESSAGES[result]}`;

  const nextRoundButton = document.getElementById("next-round-button");
  nextRoundButton.disabled = false;
}

// Fungsi untuk memperbarui tampilan skor
function updateScoreDisplay() {
  const playerScoreElement = document.getElementById("player-score");
  const computerScoreElement = document.getElementById("computer-score");

  playerScoreElement.innerHTML = playerScore;
  computerScoreElement.innerHTML = computerScore;
}

// Fungsi untuk memperbarui nomor ronde
function updateRoundNumber(roundNumber) {
  const roundNumberElement = document.getElementById("round-number");
  roundNumberElement.innerHTML = `Ronde ${roundNumber}`;
}

// Fungsi untuk melanjutkan ke ronde berikutnya
function nextRound() {
  const resultText = document.getElementById("result-text");
  resultText.innerHTML = "";

  const nextRoundButton = document.getElementById("next-round-button");
  nextRoundButton.disabled = true;
}

// Fungsi untuk mengakhiri permainan
function endGame() {
  const choiceButtons = document.getElementsByClassName("choice-button");
  for (let i = 0; i < choiceButtons.length; i++) {
    choiceButtons[i].disabled = true;
  }

  const resultText = document.getElementById("result-text");
  if (playerScore > computerScore) {
    resultText.innerHTML = "Selamat! Kamu menang permainan.";
  } else if (computerScore > playerScore) {
    resultText.innerHTML = "Sayang sekali, kamu kalah permainan.";
  } else {
    resultText.innerHTML = "Permainan berakhir dengan hasil seri.";
  }

  const nextRoundButton = document.getElementById("next-round-button");
  nextRoundButton.disabled = true;
}