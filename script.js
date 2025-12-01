// Array expandido com cores HTML distintas
const COLORS = [
    'red', 'blue', 'green', 'yellow', 'purple', 
    'orange', 'pink', 'cyan', 'lime', 'magenta', 
    'teal', 'gold', 'coral', 'indigo', 'salmon'
];

// Estado do jogo
let targetColor = '';
let attempts = 3;
let isGameActive = true;

// Elementos do DOM
const elements = {
    body: document.body,
    input: document.getElementById('color-input'),
    btnGuess: document.getElementById('btn-guess'),
    btnRestart: document.getElementById('btn-restart'),
    msgArea: document.getElementById('feedback-msg'),
    attemptsDisplay: document.getElementById('attempts-count')
};

// Inicializa o jogo ao carregar
window.addEventListener('load', initGame);

// Event Listeners
elements.btnGuess.addEventListener('click', handleGuess);
elements.btnRestart.addEventListener('click', initGame);

// Permite jogar apertando Enter
elements.input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && isGameActive) handleGuess();
});

function initGame() {
    // Reset de variáveis
    attempts = 3;
    isGameActive = true;
    
    // Sorteio da cor [cite: 55]
    targetColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    console.log(`Debug - Cor Sorteada: ${targetColor}`); // Para testes conforme dica [cite: 118]

    // Reset UI
    elements.body.style.backgroundColor = '#2c3e50'; // Volta para cor neutra
    elements.input.value = '';
    elements.input.disabled = false;
    elements.input.focus();
    elements.btnGuess.disabled = false;
    elements.btnRestart.classList.add('hidden');
    elements.msgArea.textContent = '';
    elements.msgArea.className = 'message-area';
    updateAttemptsDisplay();
}

function handleGuess() {
    const userGuess = elements.input.value.trim().toLowerCase();

    // Validação de entrada vazia [cite: 73]
    if (!userGuess) {
        showMessage('⚠️ Por favor, digite o nome de uma cor!', 'info-msg');
        return;
    }

    // Lógica de Comparação
    if (userGuess === targetColor) {
        handleWin();
    } else {
        handleError();
    }
}

function handleWin() {
    isGameActive = false;
    elements.body.style.backgroundColor = targetColor; // Muda fundo [cite: 77]
    showMessage('🎉 Parabéns! Você acertou!', 'success-msg');
    endGame();
}

function handleError() {
    attempts--; // Decrementa tentativas [cite: 87]
    updateAttemptsDisplay();
    elements.input.value = '';
    elements.input.focus();

    if (attempts > 0) {
        showMessage('❌ Errou! Tente novamente.', 'error-msg');
    } else {
        handleLoss();
    }
}

function handleLoss() {
    isGameActive = false;
    showMessage(`💀 Fim de Jogo! A cor era: ${targetColor.toUpperCase()}`, 'error-msg');
    endGame();
}

function endGame() {
    elements.input.disabled = true;
    elements.btnGuess.disabled = true;
    elements.btnRestart.classList.remove('hidden'); // Mostra botão reiniciar [cite: 85]
}

function updateAttemptsDisplay() {
    elements.attemptsDisplay.textContent = attempts;
}

function showMessage(text, className) {
    elements.msgArea.textContent = text;
    elements.msgArea.className = `message-area ${className}`;
}