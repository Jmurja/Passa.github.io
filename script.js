// script.js

// Variáveis globais
let currentQuestionIndex = 0;
let currentTeam = '';
let teamAScore = 0;
let teamBScore = 0;
let responseTimer;
let passCount = 0;

// Dados das perguntas
const questions = [
  {
    question: 'Qual é a capital da França?',
    options: ['A) Berlim', 'B) Madrid', 'C) Paris', 'D) Roma'],
    answer: 'C'
  },
  // Adicione mais perguntas conforme necessário
];

// Função para iniciar o jogo
document.getElementById('start-button').addEventListener('click', () => {
  document.getElementById('start-screen').classList.add('hidden');
  startCountdown();
});

// Função de contagem regressiva
function startCountdown() {
  let countdown = 3;
  document.getElementById('countdown-screen').classList.remove('hidden');
  document.getElementById('countdown').innerText = countdown;
  
  const countdownInterval = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      document.getElementById('countdown').innerText = countdown;
    } else {
      clearInterval(countdownInterval);
      document.getElementById('countdown-screen').classList.add('hidden');
      startBuzzer();
    }
  }, 1000);
}

// Função para a tela do buzzer
function startBuzzer() {
  document.getElementById('buzzer-screen').classList.remove('hidden');
  // Simulação de detecção de mão
  document.getElementById('hand-area').addEventListener('click', () => {
    document.getElementById('buzzer-screen').classList.add('hidden');
    currentTeam = 'Time A'; // Defina a lógica para determinar o time
    showQuestion();
  });
}

// Função para exibir a pergunta
function showQuestion() {
  document.getElementById('question-screen').classList.remove('hidden');
  const currentQuestion = questions[currentQuestionIndex];
  document.getElementById('question').innerText = currentQuestion.question;
  
  const optionsContainer = document.getElementById('options');
  optionsContainer.innerHTML = '';
  
  currentQuestion.options.forEach((option) => {
    const button = document.createElement('button');
    button.className = 'bg-green-500 text-white px-4 py-2 rounded';
    button.innerText = option;
    button.addEventListener('click', () => checkAnswer(option.charAt(0)));
    optionsContainer.appendChild(button);
  });
  
  startResponseTimer();
}

// Função para iniciar o temporizador de resposta
function startResponseTimer() {
  let timeLeft = 30;
  document.getElementById('timer').innerText = `Tempo restante: ${timeLeft}s`;
  
  responseTimer = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').innerText = `Tempo restante: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(responseTimer);
      passQuestion();
    }
  }, 1000);
}

// Função para verificar a resposta
function checkAnswer(selectedOption) {
  clearInterval(responseTimer);
  const currentQuestion = questions[currentQuestionIndex];
  
  if (selectedOption === currentQuestion.answer) {
    // Resposta correta
    if (currentTeam === 'Time A') {
      teamAScore += 10;
    } else {
      teamBScore += 10;
    }
  } else {
    // Resposta incorreta
    if (currentTeam === 'Time A') {
      teamAScore -= 5;
    } else {
      teamBScore -= 5;
    }
  }
  nextQuestion();
}

// Função para passar a pergunta
document.getElementById('pass-button').addEventListener('click', passQuestion);

function passQuestion() {
  clearInterval(responseTimer);
  passCount++;
  if (passCount >= 2) {
    // Forçar a equipe original a responder
    passCount = 0;
    startResponseTimer();
  } else {
    // Passar para o outro time
    currentTeam = currentTeam === 'Time A' ? 'Time B' : 'Time A';
    startResponseTimer();
  }
}

// Função para avançar para a próxima pergunta
function nextQuestion() {
  document.getElementById('question-screen').classList.add('hidden');
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    startBuzzer();
  } else {
    endGame();
  }
}

// Função para finalizar o jogo
function endGame() {
  alert(`Fim do jogo! Pontuação:
  Time A: ${teamAScore}
  Time B: ${teamBScore}`);
}