#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const ans = await inquirer.prompt([
    {
        type: "input",
        name: "eventName",
        message: "Please enter the event name:",
        validate: (input) => {
            if (input.trim() === "") {
                return "Event name cannot be empty. Please enter a valid event name.";
            }
            return true;
        },
    },
    {
        type: "number",
        name: "userInput",
        message: "Please enter the number of seconds for the countdown:",
        validate: (input) => {
            if (isNaN(input) || input < 0 || input > 60) {
                return "Please enter a valid number between 0 and 60";
            }
            return true;
        },
    },
]);
let eventName = ans.eventName;
let countdownSeconds = ans.userInput;
function startTime(time, event) {
    // Calculate target time in milliseconds for clarity
    const targetTimeInMs = Date.now() + time * 1000;
    const intervalTime = new Date(targetTimeInMs); // Explicit Date object creation
    const timer = setInterval(() => {
        const currentTime = new Date();
        const timeDiff = Math.max(Math.floor((intervalTime - currentTime) / 1000), 0);
        if (timeDiff <= 0) {
            console.log(chalk.bold.red("Timer has expired"));
            clearInterval(timer);
            process.exit();
        }
        const min = Math.floor(timeDiff / 60);
        const sec = timeDiff % 60;
        const timerText = `${min}:${sec}`;
        console.clear();
        console.log(chalk.green(`Countdown Timer - Event: "${eventName}"`));
        console.log(chalk.cyan(`Event: ${event} - Time Remaining: ${timerText}`)); // Display event, and coutdown timer
    }, 1000);
}
console.clear(); // Clears the console for better visuals
startTime(countdownSeconds, eventName);
