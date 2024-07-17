#! /usr/bin/env node
import chalk from "chalk";
import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";
console.log(chalk.greenBright.bold.italic("Welcome to the Timer App"));
console.log(chalk.yellowBright.bold.italic("\nThis app will help you to set a timer for a certain amount of seconds: \n"));
console.log(chalk.blueBright.bold.italic("Note: The timer will expire after 60 seconds"));
const res = await inquirer.prompt([
    {
        type: "number",
        name: "usrInput",
        message: chalk.italic.blueBright("Please enter the amount of second"),
        validate: (input) => {
            if (isNaN(input)) {
                return "Please enter a valid number";
            }
            else if (input > 60) {
                return "Second must be in 60";
            }
            else {
                return true;
            }
        }
    }
]);
let input = res.usrInput;
function startTime(val) {
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const interValTime = new Date(intTime);
    setInterval(() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(interValTime, currentTime);
        if (timeDiff <= 0) {
            console.log(chalk.greenBright("\nTimer has expired..."));
            process.exit();
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(chalk.yellowBright(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`));
    }, 1000);
}
;
startTime(input);
