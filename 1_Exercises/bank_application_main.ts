import * as readlineSync from 'readline-sync';
import * as readline from 'readline';
import { BankApplication } from './bank_application';
import { SavingsAccount } from './current_account';
import { CurrentAccount } from './saving_account';


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


let options = "1. Create an Account\n2. Check Balance\n3. Withdrawal\n4. Deposit\n5. View Account Details\n6. Exit\nEnter your choice:";

async function getUserInput() {
    const userInput = await askQuestion(options);
    if(userInput == '1') {
        await handleAccountType()
    }
    else if(userInput == '2'){
        await handleAccountBalance()
    }
    else if(userInput == '3'){
        await handleWithdrawal()
    }
    else if(userInput == '4'){
        await handleDeposits()
    }
    else if(userInput == '5'){
        await handleAccountDetails()
    }
    else if(userInput == '6'){
        handleExit()
    }
    else{
        console.log("Invalid Input!");
    }
    likeToContinue();
}

async function handleAccountType(){
    const accountType = await askQuestion("1. Savings\n2. Current\nEnter the Type of account: ");
    if (accountType=='1') {
        let savAccObj = new SavingsAccount();
        await getUserDetails(savAccObj);
    }
    else if (accountType=='2') {
        let currAccObj = new CurrentAccount();
        await getUserDetails(currAccObj);
    }
    else{
        console.log("Invalid Input");
    }
}

async function handleAccountBalance(){
    let bankObj = new BankApplication();
    let accountNumber = await askQuestion("Enter account number to check balance: ");
    bankObj.getBalance(accountNumber);
}

async function handleWithdrawal(){
    let bankObj = new BankApplication();
    let accountNumber = await askQuestion("Enter account number to withdraw amount: ");
    let amount = await askQuestion("Enter withdraw amount: ");
    bankObj.withdrawal(accountNumber, amount);
}

async function handleDeposits(){
    let bankObj = new BankApplication();
    let accountNumber = await askQuestion("Enter account number to deposit amount: ");
    let amount = await askQuestion("Enter deposit amount: ");
    bankObj.deposit(accountNumber, amount);
}

async function handleAccountDetails(){
    let bankObj = new BankApplication();
    let accountNumber = await askQuestion("Enter account number to check account details: ");
    bankObj.getAccountDetails(accountNumber);
}

function handleExit(){
    console.log("Exiting!");
    process.exit(0);
}

async function getUserDetails(obj) {
    const name = await askQuestion("Enter Your Name:");
    
    let age = await askQuestion("Enter Age:");
    let ageResult:Boolean = await ageValidate(age, obj);
    if(!ageResult){
        console.log("Entered Age is not valid. Age entry limit exhausted!")
        return;
    }

    const location = await askQuestion("Enter Location:");
    const state = await askQuestion("Enter State:");
    const country = await askQuestion("Enter Country:");

    let email = await askQuestion("Enter Email:");
    let emailResult:Boolean = await validateEmail(email, obj);
    if(!emailResult){
        return;
    }

    const amount = await askQuestion("Enter Initial Amount:");
    const message = obj.validateInitialAmount(Number(amount));

    if (message === 'valid') {
        obj.setAccountNumber();
        obj.setAccountName(name);
        obj.setAccountAge(age);
        obj.setAccountLocation(location);
        obj.setAccountState(state);
        obj.setAccountCountry(country);
        obj.setAccountEmail(email);
        obj.setInitialAmount(amount);
        obj.setAllAccountDetails();
        console.log("Account Created!");
        obj.getAccountNumber();
    } else {
        console.log(message);
        return;
    }
}

async function ageValidate(age, obj):Promise<Boolean>{
    if(/^\d+$/.test(age) && obj.validateAge(Number(age)))
    {
        return true;
    }
    else if (!/^\d+$/.test(age)) {
        console.log("Age must be a valid number. Enter again!");
        age = await askQuestion("Enter Age again:");
        return ageValidateCondition(age, obj);
    }
    else{
        console.log("The entered age is not valid for account opening.");
        age = await askQuestion("Enter Age again:");
        return ageValidateCondition(age, obj);
    }
}

function ageValidateCondition(age, obj){
    if(/^\d+$/.test(age) && obj.validateAge(Number(age)))
    {
        return true;
    }
    else{
        return false
    }
}

async function validateEmail(email, obj):Promise<Boolean>{
    if(obj.validateEmail(email)){
        return true
    }
    else
    {
        console.log("The entered email is not valid. Enter again!");
        email = await askQuestion("Enter email again:");
        if(obj.validateEmail(email)){
            return true
        }
        else{
            console.log("The entered email is not valid. Email entry limit exhausted!")
            return false;
        }
    }
}

function askQuestion(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

function likeToContinue(){
    rl.question("Would you like to continue? Y-Yes or N-No: ", (userChoice)=>{
        if(userChoice.toLowerCase()=='y'){
            getUserInput();
        }
        else{
            console.log('Thank You for Banking with us! Exiting the program.');
            rl.close();
            return;
        }
    });
}


getUserInput()