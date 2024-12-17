let timer;
let isRunning = false;
let timeRemaining;
let workTime = 25 * 60; // Default: 25 minutes
let breakTime = 5 * 60;  // Default: 5 minutes
let isWorkSession = true; // True: Work, False: Break
let roundCounter = 0;

const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const workTimeInput = document.getElementById('work-time');
const breakTimeInput = document.getElementById('break-time');
const applySettingsBtn = document.getElementById('apply-settings-btn');
const roundCounterDisplay = document.getElementById('round-counter');
const sessionStatus = document.getElementById('session-status');

// Format time as MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Update the timer display
function updateDisplay() {
    timerDisplay.textContent = formatTime(timeRemaining);
}

function updateSessionStatus() {
    if (isWorkSession) {
        sessionStatus.textContent = 'Work';
        sessionStatus.classList.remove('break');
    } else {
        sessionStatus.textContent = 'Break';
        sessionStatus.classList.add('break');
    }
}

// Start the timer
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        playStartSound();
        timer = setInterval(() => {
            if (timeRemaining > 0) {
                timeRemaining--;
                updateDisplay();
            } else {
                clearInterval(timer);
                isRunning = false;
                handleSessionEnd();
            }
        }, 1000);
    }
}

// Pause the timer
function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

// Reset the timer
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isWorkSession = true;
    timeRemaining = workTime;
    roundCounter = 0;
    updateDisplay();
    updateRoundCounter();
    updateSessionStatus();
}

// Handle session end
function handleSessionEnd() {
    if (isWorkSession) {
        roundCounter++;
        updateRoundCounter();
        timeRemaining = breakTime;
        playBreakSound();
        isWorkSession = false;
    } else {
        timeRemaining = workTime;
        isWorkSession = true;
    }
    updateSessionStatus();
    startTimer(); // Automatically start the next session
}

// Update round counter display
function updateRoundCounter() {
    roundCounterDisplay.textContent = `Rounds: ${roundCounter}`;
}

// Apply custom settings
function applySettings() {
    const workMinutes = parseInt(workTimeInput.value, 10);
    const breakMinutes = parseInt(breakTimeInput.value, 10);
    if (!isNaN(workMinutes) && !isNaN(breakMinutes)) {
        workTime = workMinutes * 60;
        breakTime = breakMinutes * 60;
        resetTimer(); // Reset timer to apply new settings
    }
}

// Play notification sound
function playStartSound() {
    const audio = new Audio("assets/audio/Meditation-bell-sound.mp3");
    audio.play();
}

function playBreakSound() {
    const audio = new Audio("assets/audio/Icy-bell-gliss-ascending.mp3");
    audio.play();
}

// Event listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
applySettingsBtn.addEventListener('click', applySettings);

// Initialize timer
timeRemaining = workTime;
updateDisplay();
updateSessionStatus();