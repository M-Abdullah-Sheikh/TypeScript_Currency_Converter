#! /usr/bin/env node


import inquirer from "inquirer";

import chalk from "chalk";

type Rates = {
    INR: number
    PKR: number
    USD: number
}

enum Currencies {
    PKRUPEE = "PKR",
    INRRUPEE = "INR",
    USDOLLAR = "USD"
}

let ratesMap = new Map<string, Rates>()

ratesMap.set(Currencies.PKRUPEE, { "INR": 0.27027, "PKR": 1, "USD": 0.0041 })
ratesMap.set(Currencies.INRRUPEE, { "INR": 1, "PKR": 3.7, "USD": 240 })
ratesMap.set(Currencies.USDOLLAR, { "INR": 120, "PKR": 240, "USD": 1 })

function getRates(from: string, to: keyof Rates, amount: number) {
    let rates = ratesMap.get(from)
    let rate = rates![to]
    return rate * amount
}
console.log(chalk.redBright("Welcome to Currency Converter System !\nHow May I Help You?"));
async function currencyConverter() {
    let answers: {
        fromCurrency: string,
        amount: number,
        toCurrency: string
    } = await
            inquirer.prompt([
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
            ])

    //getRates(answers.fromCurrency,answers.toCurrency,answers.amount)
    let result: number;
    switch (answers["toCurrency"]) {
        case Currencies.PKRUPEE:
            result = getRates(answers.fromCurrency, answers.toCurrency, answers.amount)
            break;
        case Currencies.INRRUPEE:
            result = getRates(answers.fromCurrency, answers.toCurrency, answers.amount)

        case Currencies.USDOLLAR:
            result = getRates(answers.fromCurrency, answers.toCurrency, answers.amount)

        default:
            break;
    }
    console.log(chalk.redBright(`Your Converted amount is ${result!}\nThank You Please Come Again`));
    
}
currencyConverter()