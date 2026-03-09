# CALC — Scientific Calculator

A sleek, dark-themed scientific calculator built with pure HTML, CSS, and JavaScript. Features a space-age UI with animated backgrounds, full scientific functions, calculation history, and a fully responsive layout for all screen sizes.

---

## 📁 Project Structure

```
scientific-calculator/
├── index.html    # HTML structure and markup
├── style.css     # All styles, themes, and responsive breakpoints
└── script.js     # Calculator logic, scientific functions, keyboard support
```

---

## 🚀 Getting Started

1. Download or clone all three files into the same folder.
2. Open `index.html` in any modern web browser.
3. No build tools, dependencies, or installation required.

---

## ✨ Features

### Basic Operations
- Addition, subtraction, multiplication, and division
- Percentage calculation
- Positive/negative toggle (`±`)
- Parentheses support for grouped expressions
- Scientific notation input (`EXP`)
- Decimal point input

### Scientific Functions
| Function | Description |
|---|---|
| `sin`, `cos`, `tan` | Trigonometric functions |
| `sin⁻¹`, `cos⁻¹`, `tan⁻¹` | Inverse trigonometric functions |
| `log` | Base-10 logarithm |
| `ln` | Natural logarithm |
| `√x`, `∛x` | Square root and cube root |
| `x²`, `x³` | Power of 2 and 3 |
| `xʸ` | Custom exponent (x to the power of y) |
| `eˣ` | Euler's number raised to x |
| `10ˣ` | 10 raised to x |
| `1/x` | Reciprocal |
| `\|x\|` | Absolute value |
| `n!` | Factorial |
| `π` | Pi constant (3.14159...) |
| `e` | Euler's number (2.71828...) |

### Angle Modes
Switch between three angle modes for trigonometric calculations:
- **DEG** — Degrees (default)
- **RAD** — Radians
- **GRAD** — Gradians

### UX Highlights
- **Live expression display** — shows the full equation above the result
- **Calculation history** — last 5 results shown as clickable chips to recall values
- **Blinking cursor** on the display
- **Button press animations** with ripple effect on hover
- **Result flash** — display briefly highlights on calculation
- **Error handling** — graceful messages for Math Error, Syntax Error, and division by zero (∞)

### Keyboard Support
| Key | Action |
|---|---|
| `0–9` | Input digits |
| `.` | Decimal point |
| `+` `-` `*` `/` | Arithmetic operators |
| `%` | Percentage |
| `(` `)` | Parentheses |
| `Enter` or `=` | Calculate result |
| `Backspace` | Delete last character |
| `Escape` | Clear all (AC) |

---

## 📱 Responsive Design

The calculator adapts seamlessly across all screen sizes using CSS custom properties and media queries.

| Screen | Breakpoint | Behaviour |
|---|---|---|
| Large Desktop | 1024px+ | Wider panel (460px), larger buttons and fonts |
| Laptop | 769px – 1023px | Default layout — 420px panel |
| Tablet | 480px – 768px | Panel fills 96vw, compact spacing, scrollable |
| Mobile | up to 479px | Full-width panel, touch-optimised, tighter layout |
| Small phones | up to 360px | Minimum sizes, history bar hidden |
| Landscape mobile | height < 600px | Ultra-compact, history hidden to save space |

---

## 🛠️ Technologies Used

- **HTML5** — Semantic document structure
- **CSS3** — Custom properties, CSS Grid, Flexbox, keyframe animations, media queries
- **JavaScript (ES6+)** — Calculator engine, DOM manipulation, keyboard events

---

## 🎨 Design

- **Font:** [Space Mono](https://fonts.google.com/specimen/Space+Mono) (monospace) + [Syne](https://fonts.google.com/specimen/Syne) (logo)
- **Theme:** Dark space-age with animated grid background and purple nebula glow
- **Color accents:** Violet `#7c3aed`, Cyan `#06b6d4`, Amber `#f59e0b`
- **Animations:** Float-in entrance, blinking cursor, button press, result flash, grid pulse, nebula drift

---

## 🌐 Browser Support

Works in all modern browsers that support CSS custom properties and ES6+:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

---
