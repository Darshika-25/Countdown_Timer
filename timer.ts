#!/usr/bin/env node
// shebang for npm upload

import inquirer from "inquirer";
import chalk from "chalk";


interface UserInput {
  eventName: string;
  userInput: number;
}

const ans = await inquirer.prompt<UserInput>([
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

let eventName: string = ans.eventName;
let countdownSeconds: number = ans.userInput;

function startTime(time: number, event: string): void {
  const targetTimeInMs: number = Date.now() + time * 1000; // Calculate target time in milliseconds for clarity
  const intervalTime: any = new Date(targetTimeInMs);

  const timer = setInterval(() => {
    const currentTime: any = new Date();
    const timeDiff: number = Math.max(
      Math.floor((intervalTime - currentTime) / 1000),
      0
    );

    if (timeDiff <= 0) {
      console.log(chalk.bold.red("Timer has expired"));
      clearInterval(timer);
      process.exit();
    }

    const min: number = Math.floor(timeDiff / 60);
    const sec: number = timeDiff % 60;
    const timerText: string = `${min}:${sec}`;

    console.clear();
    console.log(chalk.green(`Countdown Timer - Event: "${eventName}"`));
    console.log(chalk.cyan(`Event: ${event} - Time Remaining: ${timerText}`)); // Display event, and coutdown timer
  }, 1000);
}

console.clear(); // Clears the console for better visuals
startTime(countdownSeconds, eventName);