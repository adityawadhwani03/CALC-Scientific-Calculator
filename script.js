/* =============================================
   CALC — Scientific Calculator
   script.js
   ============================================= */

// ── State ──────────────────────────────────────
let currentInput = '0';
let expression   = '';
let angleMode    = 'deg';
let justCalc     = false;
let history      = [];

// ── DOM References ─────────────────────────────
const display    = document.getElementById('display');
const exprEl     = document.getElementById('expression');
const historyBar = document.getElementById('historyBar');

// ── Angle Conversion Helpers ───────────────────
function toRad(x) {
  if (angleMode === 'deg')  return x * Math.PI / 180;
  if (angleMode === 'grad') return x * Math.PI / 200;
  return x;
}

function fromRad(x) {
  if (angleMode === 'deg')  return x * 180 / Math.PI;
  if (angleMode === 'grad') return x * 200 / Math.PI;
  return x;
}

// ── Angle Mode Toggle ──────────────────────────
function setAngle(mode) {
  angleMode = mode;
  document.querySelectorAll('.angle-btn').forEach(b => b.classList.remove('active'));
  const id = 'btn' + mode.charAt(0).toUpperCase() + mode.slice(1);
  document.getElementById(id).classList.add('active');
}

// ── Display Helpers ────────────────────────────
function updateDisplay(val) {
  display.innerHTML = val + '<span class="cursor"></span>';
  display.classList.remove('error', 'result-flash');
}

function flashResult() {
  display.classList.add('result-flash');
  setTimeout(() => display.classList.remove('result-flash'), 400);
}

function showError(msg) {
  display.textContent = msg;
  display.classList.add('error');
  currentInput = '0';
  expression   = '';
  justCalc     = false;
}

// ── Button Press Animation ─────────────────────
function pressEffect(btn) {
  btn.classList.add('pressed');
  setTimeout(() => btn.classList.remove('pressed'), 150);
}

document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('mousedown', () => pressEffect(btn));
});

// ── Input: Numbers ─────────────────────────────
function inputNum(n) {
  if (justCalc) {
    currentInput = n;
    expression   = '';
    justCalc     = false;
  } else if (currentInput === '0') {
    currentInput = n;
  } else {
    currentInput += n;
  }
  updateDisplay(currentInput);
}

// ── Input: Decimal Point ───────────────────────
function inputDecimal() {
  if (justCalc) {
    currentInput = '0.';
    expression   = '';
    justCalc     = false;
  } else if (!currentInput.includes('.')) {
    currentInput += '.';
  }
  updateDisplay(currentInput);
}

// ── Input: Operators ───────────────────────────
function inputOp(op) {
  if (justCalc) {
    expression = currentInput + ' ' + op + ' ';
    justCalc   = false;
  } else {
    expression += currentInput + ' ' + op + ' ';
  }
  currentInput = '0';
  exprEl.textContent = expression;
  updateDisplay('0');
}

// ── Input: Parentheses ─────────────────────────
function inputParen(p) {
  if (p === '(') {
    if (justCalc) {
      expression   = '(';
      currentInput = '0';
      justCalc     = false;
    } else {
      expression += currentInput + ' × (';
      currentInput = '0';
    }
  } else {
    expression  += currentInput + ')';
    currentInput = '0';
  }
  exprEl.textContent = expression;
  updateDisplay(currentInput);
}

// ── Scientific Functions ───────────────────────
function handleSci(fn) {
  const val = parseFloat(currentInput);
  let result;

  switch (fn) {
    case 'sin':  result = Math.sin(toRad(val));       break;
    case 'cos':  result = Math.cos(toRad(val));       break;
    case 'tan':  result = Math.tan(toRad(val));       break;
    case 'asin': result = fromRad(Math.asin(val));    break;
    case 'acos': result = fromRad(Math.acos(val));    break;
    case 'atan': result = fromRad(Math.atan(val));    break;
    case 'log':  result = Math.log10(val);            break;
    case 'ln':   result = Math.log(val);              break;
    case 'sqrt': result = Math.sqrt(val);             break;
    case 'cbrt': result = Math.cbrt(val);             break;
    case 'x2':   result = val * val;                  break;
    case 'x3':   result = val * val * val;            break;
    case 'exp':  result = Math.exp(val);              break;
    case '10x':  result = Math.pow(10, val);          break;
    case 'inv':  result = 1 / val;                    break;
    case 'abs':  result = Math.abs(val);              break;
    case 'fact': result = factorial(Math.round(val)); break;

    // xʸ — append power operator and wait for exponent input
    case 'pow':
      expression += currentInput + ' ^ ';
      currentInput = '0';
      exprEl.textContent = expression;
      updateDisplay('0');
      return;

    // Constants — append directly to current input
    case 'pi':
      currentInput = justCalc ? String(Math.PI) : currentInput + String(Math.PI);
      updateDisplay(currentInput);
      return;
    case 'e':
      currentInput = justCalc ? String(Math.E) : currentInput + String(Math.E);
      updateDisplay(currentInput);
      return;
  }

  if (result === undefined || isNaN(result)) {
    showError('Math Error');
    return;
  }

  expression = fn.toUpperCase() + '(' + currentInput + ')';
  exprEl.textContent = expression + ' =';
  currentInput = format(result);
  updateDisplay(currentInput);
  flashResult();
  justCalc = true;
}

// ── Factorial ──────────────────────────────────
function factorial(n) {
  if (n < 0 || n > 170) return Infinity;
  if (n === 0 || n === 1) return 1;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

// ── Calculate Result ───────────────────────────
function calculate() {
  let expr = expression + currentInput;
  exprEl.textContent = expr + ' =';

  // Normalise symbols to JS operators
  expr = expr
    .replace(/÷/g, '/')
    .replace(/×/g, '*')
    .replace(/−/g, '-')
    .replace(/\^/g, '**')
    .replace(/E/g, 'e');

  try {
    // eslint-disable-next-line no-new-func
    const result = Function('"use strict"; return (' + expr + ')')();

    if (!isFinite(result)) { showError('∞');           return; }
    if (isNaN(result))     { showError('Math Error');  return; }

    const formatted = format(result);
    addHistory(expression + currentInput + ' = ' + formatted);
    currentInput = formatted;
    expression   = '';
    updateDisplay(currentInput);
    flashResult();
    justCalc = true;

  } catch (e) {
    showError('Syntax Error');
  }
}

// ── Number Formatter ───────────────────────────
function format(n) {
  if (Math.abs(n) >= 1e15 || (Math.abs(n) < 1e-9 && n !== 0)) {
    return n.toExponential(6);
  }
  const s = String(+n.toPrecision(12));
  return s.replace(/\.?0+$/, '');
}

// ── Utility Actions ────────────────────────────
function clearAll() {
  currentInput = '0';
  expression   = '';
  justCalc     = false;
  exprEl.textContent = '';
  updateDisplay('0');
}

function deleteLast() {
  if (justCalc) { clearAll(); return; }
  currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
  updateDisplay(currentInput);
}

function toggleSign() {
  if (currentInput !== '0') {
    currentInput = currentInput.startsWith('-')
      ? currentInput.slice(1)
      : '-' + currentInput;
    updateDisplay(currentInput);
  }
}

// ── History ────────────────────────────────────
function addHistory(entry) {
  history.unshift(entry);
  if (history.length > 5) history.pop();
  renderHistory();
}

function renderHistory() {
  historyBar.innerHTML = '';
  history.forEach(h => {
    const chip = document.createElement('div');
    chip.className   = 'history-chip';
    chip.textContent = h;
    chip.onclick = () => {
      const parts = h.split(' = ');
      if (parts.length > 1) {
        currentInput = parts[parts.length - 1];
        updateDisplay(currentInput);
      }
    };
    historyBar.appendChild(chip);
  });
}

// ── Keyboard Support ───────────────────────────
document.addEventListener('keydown', e => {
  const k = e.key;
  if      (k >= '0' && k <= '9')      inputNum(k);
  else if (k === '.')                  inputDecimal();
  else if (k === '+')                  inputOp('+');
  else if (k === '-')                  inputOp('−');
  else if (k === '*')                  inputOp('×');
  else if (k === '/') { e.preventDefault(); inputOp('÷'); }
  else if (k === 'Enter' || k === '=') calculate();
  else if (k === 'Backspace')          deleteLast();
  else if (k === 'Escape')             clearAll();
  else if (k === '%')                  inputOp('%');
  else if (k === '(')                  inputParen('(');
  else if (k === ')')                  inputParen(')');
});
