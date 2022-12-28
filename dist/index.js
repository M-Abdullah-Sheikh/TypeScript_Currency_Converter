#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
var Currencies;
(function (Currencies) {
    Currencies["PKRUPEE"] = "PKR";
    Currencies["INRRUPEE"] = "INR";
    Currencies["USDOLLAR"] = "USD";
})(Currencies || (Currencies = {}));
let ratesMap = new Map();
ratesMap.set(Currencies.PKRUPEE, { "INR": 0.27027, "PKR": 1, "USD": 0.0041 });
ratesMap.set(Currencies.INRRUPEE, { "INR": 1, "PKR": 3.7, "USD": 240 });
ratesMap.set(Currencies.USDOLLAR, { "INR": 120, "PKR": 240, "USD": 1 });
function getRates(from, to, amount) {
    let rates = ratesMap.get(from);
    let rate = rates[to];
    return rate * amount;
}
console.log(chalk.redBright("Welcome to Currency Converter System !\nHow May I Help You?"));
async function currencyConverter() {
    let answers = await inquirer.prompt([
        {
            type: "list",
            name: "fromCurrency",
            message: "Which currency you want to Convert?",
            choices: Object.values(Currencies)
        },
        {
            type: "input",
            name: "amount",
            message: "Enter your Amount Please",
        },
        {
            type: "list",
            name: "toCurrency",
            message: "In Which currency you want to Convert your amount?",
            choices: Object.values(Currencies)
        }
    ]);
    //getRates(answers.fromCurrency,answers.toCurrency,answers.amount)
    let result;
    switch (answers["toCurrency"]) {
        case Currencies.PKRUPEE:
            result = getRates(answers.fromCurrency, answers.toCurrency, answers.amount);
            break;
        case Currencies.INRRUPEE:
            result = getRates(answers.fromCurrency, answers.toCurrency, answers.amount);
        case Currencies.USDOLLAR:
            result = getRates(answers.fromCurrency, answers.toCurrency, answers.amount);
        default:
            break;
    }
    console.log(chalk.redBright(`Your Converted amount is ${result}\nThank You Please Come Again`));
}
currencyConverter();
//# sourceMappingURL=index.js.map