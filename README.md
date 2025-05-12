# computersensinginput
Interactive Sensor Circuit Demo
An interactive web application that demonstrates how electronic control units (ECUs) in vehicles and other embedded systems sense input from temperature sensors and other variable resistor-based sensors.
📋 Overview
This project provides a visual and interactive way to understand the basic principles of sensor circuits used in automotive and embedded systems. It demonstrates:

How pull-up and pull-down resistor circuits work
How temperature affects sensor resistance in an NTC (Negative Temperature Coefficient) thermistor
How the ECU interprets voltage readings to determine sensor values
What happens when sensors are disconnected

Perfect for automotive technicians, electronics students, and hobbyists interested in understanding how computers interface with the physical world.
✨ Features

Interactive Circuit Visualization: See the circuit update in real-time as you change parameters
Temperature Control: Simulate temperature changes and see how they affect sensor resistance
Circuit Type Toggle: Switch between pull-up and pull-down circuits to understand the differences
Sensor Connection Toggle: See what happens when a sensor is disconnected
Real-time Voltage Calculation: Watch how voltage changes based on resistance values

🧪 Technical Details
The demo simulates a simplified NTC (Negative Temperature Coefficient) thermistor circuit, similar to the engine coolant temperature sensors used in vehicles. Key technical aspects:

Voltage Divider Calculation: The voltage at the sense pin is calculated using the voltage divider formula:

Pull-up: V_sense = (R_sensor / (R_sensor + R_fixed)) * V_supply
Pull-down: V_sense = (R_fixed / (R_sensor + R_fixed)) * V_supply


NTC Thermistor Simulation: Resistance changes with temperature following a simplified version of the Steinhart-Hart equation:

R = R₀ * exp(β * (1/T - 1/T₀))
Where R₀ = 10kΩ at 25°C (298.15K), and β = 3500K



💻 Technologies Used

React (Hooks-based components)
Tailwind CSS for styling
JavaScript for circuit simulation calculations
