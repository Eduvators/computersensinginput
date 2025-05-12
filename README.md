# Pull-Up and Pull-Down Circuits – Automotive Demo

This interactive web demo is designed for auto technician students to learn how pull-up and pull-down resistor circuits work, especially in automotive applications like switches and sensor inputs to the ECU.

## Features
- **Automotive-focused explanations** with real-world examples
- **Interactive circuit diagrams** for both pull-up and pull-down configurations
- **Switch toggling** to see logic and voltage changes
- **Simulated ECU reading** (logic level and voltage)
- **Guided questions** and an interactive quiz for self-testing
- **"Learn More" and "Key Takeaways"** sections for deeper understanding
- **Accessible, high-contrast visuals**

## How to Use
1. Clone or download this repository.
2. Open `index.html` in your browser, or run a local server (e.g. `python3 -m http.server`).
3. Read the intro, try toggling the switch, and answer the quiz questions!

## File Overview
- `index.html`: Main web page
- `style.css`: Styles for the demo
- `app.js`: Handles all interactivity and logic
- `README.md`: This file

## Educational Context
Pull-up and pull-down resistors are found in many automotive circuits (e.g., door switches, brake pedal switches, sensor inputs). They ensure the ECU gets a reliable HIGH or LOW signal, avoiding floating inputs that can cause false readings.

## License
MIT License
