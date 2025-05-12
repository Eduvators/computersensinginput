// --- Configuration: Insert your educational text here ---
const educationText = `
<strong>Why Do Cars Use Pull-Up and Pull-Down Resistors?</strong><br>
In automotive electronics, ECUs need to reliably detect if a switch or sensor is ON or OFF. Pull-up and pull-down resistors make sure the ECU input doesn't "float" when a switch is open.<br><br>
<b>Example:</b> When you open a car door, a switch opens. A pull-up resistor ensures the ECU sees a clear HIGH signal, so the dome light turns on.<br><br>
<b>How to Use This Demo:</b><br>
1. Click <b>Pull-Up Circuit</b> or <b>Pull-Down Circuit</b> to switch between circuit types.<br>
2. Click <b>Toggle Switch</b> to open/close the switch.<br>
3. <span style="color:#111;background:#ffe066;padding:1px 5px;border-radius:3px;">Observe the output indicator and the highlighted path in the circuit diagram.</span><br><br>
<b>What to Learn:</b><br>
- In a pull-up circuit, the output is HIGH when the switch is open.<br>
- In a pull-down circuit, the output is LOW when the switch is open.<br>
- Toggling the switch lets you see how the resistor determines the output state.
`;

// --- State ---
let mode = 'pullup'; // or 'pulldown'
let switchClosed = false;

// --- DOM Elements ---
const eduDiv = document.getElementById('education-text');
const canvas = document.getElementById('circuit-canvas');
const ctx = canvas.getContext('2d');
const outputDiv = document.getElementById('output-indicator');
const pullupBtn = document.getElementById('pullup-btn');
const pulldownBtn = document.getElementById('pulldown-btn');
const toggleSwitchBtn = document.getElementById('toggle-switch-btn');

// --- Initialization ---
window.onload = function() {
  eduDiv.innerHTML = educationText;
  updateButtons();
  drawCircuit();
  updateOutput();
};

// --- Button Handlers ---
pullupBtn.onclick = function() {
  mode = 'pullup';
  updateButtons();
  drawCircuit();
  updateOutput();
};
pulldownBtn.onclick = function() {
  mode = 'pulldown';
  updateButtons();
  drawCircuit();
  updateOutput();
};
toggleSwitchBtn.onclick = function() {
  switchClosed = !switchClosed;
  drawCircuit();
  updateOutput();
};

function updateButtons() {
  pullupBtn.classList.toggle('active', mode === 'pullup');
  pulldownBtn.classList.toggle('active', mode === 'pulldown');
}

// --- Drawing Logic ---
function drawCircuit() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.font = '14px Arial';

  // Common layout
  // Vcc or GND at top, resistor at left, switch at right, output in the middle
  const vccY = 40, gndY = 240;
  const leftX = 80, rightX = 440, midX = 260, outY = 140;

  // Draw Vcc or GND
  ctx.textAlign = 'center';
  if (mode === 'pullup') {
    ctx.fillStyle = '#c0392b';
    ctx.fillRect(leftX - 16, vccY - 18, 32, 18);
    ctx.fillStyle = '#111';
    ctx.font = 'bold 15px Arial';
    ctx.fillText('Vcc', leftX, vccY - 24);
  } else {
    ctx.fillStyle = '#34495e';
    ctx.fillRect(leftX - 16, gndY, 32, 18);
    ctx.fillStyle = '#111';
    ctx.font = 'bold 15px Arial';
    ctx.fillText('GND', leftX, gndY + 34);
  }

  // Label resistor
  ctx.font = 'bold 14px Arial';
  ctx.fillStyle = '#222';
  if (mode === 'pullup') {
    ctx.fillText('Resistor', leftX - 34, (vccY + outY - 20) / 2);
  } else {
    ctx.fillText('Resistor', leftX - 34, (gndY + outY + 20) / 2);
  }

  // Label switch
  ctx.font = 'bold 14px Arial';
  ctx.fillStyle = '#222';
  ctx.fillText('Switch', rightX + 38, outY + 4);


  // Draw resistor
  ctx.strokeStyle = '#e67e22';
  ctx.lineWidth = 4;
  if (mode === 'pullup') {
    drawResistor(leftX, vccY + 18, leftX, outY - 20);
  } else {
    drawResistor(leftX, gndY, leftX, outY + 20);
  }

  // Draw wire from resistor to output
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 3;
  ctx.beginPath();
  if (mode === 'pullup') {
    ctx.moveTo(leftX, outY - 20);
    ctx.lineTo(midX, outY);
  } else {
    ctx.moveTo(leftX, outY + 20);
    ctx.lineTo(midX, outY);
  }
  ctx.stroke();

  // Draw switch
  ctx.save();
  ctx.translate(rightX, outY);
  ctx.rotate(0);
  ctx.strokeStyle = '#2980b9';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(-40, 0);
  ctx.lineTo(0, 0);
  ctx.stroke();
  ctx.strokeStyle = '#16a085';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  if (switchClosed) {
    ctx.lineTo(0, 40);
    ctx.stroke();
    ctx.fillStyle = '#16a085';
    ctx.beginPath();
    ctx.arc(0, 40, 7, 0, 2 * Math.PI);
    ctx.fill();
  } else {
    ctx.lineTo(30, -30);
    ctx.stroke();
    ctx.fillStyle = '#16a085';
    ctx.beginPath();
    ctx.arc(30, -30, 7, 0, 2 * Math.PI);
    ctx.fill();
  }
  ctx.restore();

  // Draw output wire
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(midX, outY);
  ctx.lineTo(rightX, outY);
  ctx.stroke();

  // Draw output node
  ctx.fillStyle = '#f1c40f';
  ctx.beginPath();
  ctx.arc(midX, outY, 10, 0, 2 * Math.PI);
  ctx.fill();
  ctx.strokeStyle = '#b7950b';
  ctx.stroke();
  ctx.fillStyle = '#111'; // high contrast
  ctx.font = 'bold 15px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Output', midX, outY - 18);

  ctx.restore();
}

function drawResistor(x1, y1, x2, y2) {
  // Draw a zig-zag resistor
  const segs = 5;
  const dx = (x2 - x1) / (segs * 2);
  const dy = (y2 - y1) / (segs * 2);
  ctx.save();
  ctx.strokeStyle = '#e67e22';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  let dir = 1;
  for (let i = 1; i <= segs * 2; i++) {
    ctx.lineTo(x1 + dx * i, y1 + dy * i + dir * 8);
    dir *= -1;
  }
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.restore();
}

function updateOutput() {
  let outputHigh = false;
  let voltage = '';
  if (mode === 'pullup') {
    outputHigh = !switchClosed;
    voltage = outputHigh ? '5V' : '0V';
  } else {
    outputHigh = switchClosed;
    voltage = outputHigh ? '5V' : '0V';
  }
  outputDiv.innerHTML = outputHigh ? '<span style="color:#27ae60">Output: HIGH</span>' : '<span style="color:#c0392b">Output: LOW</span>';
  const ecuDiv = document.getElementById('ecu-reading');
  if (ecuDiv) {
    ecuDiv.innerHTML = outputHigh ? '<span style="color:#222">ECU Reads: <b>HIGH</b> (' + voltage + ')</span>' : '<span style="color:#222">ECU Reads: <b>LOW</b> (' + voltage + ')</span>';
  }
}

// Quiz logic
function checkQuizAnswer(answer) {
  const feedback = document.getElementById('quiz-feedback');
  if (!feedback) return;
  if (answer === 'pullup') {
    feedback.innerHTML = '<span style="color:#27ae60">Correct! A pull-up circuit makes the ECU read HIGH when the switch is open.</span>';
  } else {
    feedback.innerHTML = '<span style="color:#c0392b">Not quite. Try again! In a pull-up circuit, the output is HIGH when the switch is open.</span>';
  }
}

