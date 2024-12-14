// DOM Elements
const timeDisplay = document.getElementById('timeDisplay');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapTimes = document.getElementById('lapTimes');

// Stopwatch Variables
let startTime = 0;
let elapsedTime = 0;
let timerInterval;

// Utility Functions
function formatTime(ms) {
    const date = new Date(ms);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
}

function updateTimeDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

// Start the Stopwatch
function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTimeDisplay, 10);
    startButton.disabled = true;
    pauseButton.disabled = false;
    resetButton.disabled = false;
    lapButton.disabled = false;
}

// Pause the Stopwatch
function pauseStopwatch() {
    clearInterval(timerInterval);
    startButton.disabled = false;
    pauseButton.disabled = true;
}

// Reset the Stopwatch
function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    timeDisplay.textContent = "00:00:00.000";
    lapTimes.innerHTML = '';
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
    lapButton.disabled = true;
}

// Record a Lap Time
function recordLapTime() {
    const lapItem = document.createElement('li');
    lapItem.textContent = formatTime(elapsedTime);
    lapTimes.appendChild(lapItem);
}

// Event Listeners
startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLapTime);

// Initialize
pauseButton.disabled = true;
resetButton.disabled = true;
lapButton.disabled = true;
