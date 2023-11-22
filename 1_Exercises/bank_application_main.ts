import * as readlineSync from 'readline-sync';
import * as readline from 'readline';
import { BankApplication } from './bank_application';
import { SavingsAccount } from './savings_account';
import { CurrentAccount } from './current_account';


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


class BankApplicationMain{
    options:string;

    constructor(){
        this.options = "1. Create an Account\n2. Check Balance\n3. Withdrawal\n4. Deposit\n5. View Account Details\n6. Exit\nEnter your choice:";
    }
    async getUserInput():Promise<void> {
        const userInput = await this.askQuestion(this.options);
        if(userInput == '1') {
            await this.handleAccountType()
        }
        else if(userInput == '2'){
            await this.handleAccountBalance()
        }
        else if(userInput == '3'){
            await this.handleWithdrawal()
        }
        else if(userInput == '4'){
            await this.handleDeposits()
        }
        else if(userInput == '5'){
            await this.handleAccountDetails()
        }
        else if(userInput == '6'){
            this.handleExit()
        }
        else{
            console.log("Invalid Input!");
        }
        this.likeToContinue();
    }

    async handleAccountType():Promise<void>{
        const accountType = await this.askQuestion("1. Savings\n2. Current\nEnter the Type of account: ");
        if (accountType=='1') {
            let savAccObj = new SavingsAccount();
            await this.getUserDetails(savAccObj);
        }
        else if (accountType=='2') {
            let currAccObj = new CurrentAccount();
            await this.getUserDetails(currAccObj);
        }
        else{
            console.log("Invalid Input");
        }
    }

    async handleAccountBalance():Promise<void>{
        let bankObj = new BankApplication();
        let accountNumber = await this.askQuestion("Enter account number to check balance: ");
        bankObj.getBalance(accountNumber);
    }
    
    async handleWithdrawal():Promise<void>{
        let bankObj = new BankApplication();
        let accountNumber = await this.askQuestion("Enter account number to withdraw amount: ");
        let amount = await this.askQuestion("Enter withdraw amount: ");
        bankObj.withdrawal(accountNumber, amount);
    }
    
    async handleDeposits():Promise<void>{
        let bankObj = new BankApplication();
        let accountNumber = await this.askQuestion("Enter account number to deposit amount: ");
        let amount = await this.askQuestion("Enter deposit amount: ");
        bankObj.deposit(accountNumber, amount);
    }
    
    async handleAccountDetails():Promise<void>{
        let bankObj = new BankApplication();
        let accountNumber = await this.askQuestion("Enter account number to check account details: ");
        bankObj.getAccountDetails(accountNumber);
    }
    
    handleExit():void{
        console.log("Exiting!");
        process.exit(0);
    }
    
    async getUserDetails(obj):Promise<void> {
        const name = await this.askQuestion("Enter Your Name:");
        
        let age = await this.askQuestion("Enter Age:");
        let ageResult:Boolean = await this.ageValidate(age, obj);
        if(!ageResult){
            console.log("Entered Age is not valid. Age entry limit exhausted!")
            return;
        }
    
        const location = await this.askQuestion("Enter Location:");
        const state = await this.askQuestion("Enter State:");
        const country = await this.askQuestion("Enter Country:");
    
        let email = await this.askQuestion("Enter Email:");
        let emailResult:Boolean = await this.validateEmail(email, obj);
        if(!emailResult){
            return;
        }
    
        const amount = await this.askQuestion("Enter Initial Amount:");
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
    
    async ageValidate(age, obj):Promise<Boolean>{
        if(/^\d+$/.test(age) && obj.validateAge(Number(age)))
        {
            return true;
        }
        else if (!/^\d+$/.test(age)) {
            console.log("Age must be a valid number. Enter again!");
            age = await this.askQuestion("Enter Age again:");
            return this.ageValidateCondition(age, obj);
        }
        else{
            console.log("The entered age is not valid for account opening.");
            age = await this.askQuestion("Enter Age again:");
            return this.ageValidateCondition(age, obj);
        }
    }
    
    ageValidateCondition(age, obj):Boolean{
        if(/^\d+$/.test(age) && obj.validateAge(Number(age)))
        {
            return true;
        }
        else{
            return false
        }
    }
    
    async validateEmail(email, obj):Promise<Boolean>{
        if(obj.validateEmail(email)){
            return true
        }
        else
        {
            console.log("The entered email is not valid. Enter again!");
            email = await this.askQuestion("Enter email again:");
            if(obj.validateEmail(email)){
                return true
            }
            else{
                console.log("The entered email is not valid. Email entry limit exhausted!")
                return false;
            }
        }
    }
    
    askQuestion(question: string): Promise<string> {
        return new Promise((resolve) => {
            rl.question(question, resolve);
        });
    }
    
    likeToContinue():void{
        rl.question("Would you like to continue? Y-Yes or N-No: ", (userChoice)=>{
            if(userChoice.toLowerCase()=='y'){
                this.getUserInput();
            }
            else{
                console.log('Thank You for Banking with us! Exiting the program.');
                rl.close();
                return;
            }
        });
    }
}




let bankAppRun = new BankApplicationMain()
bankAppRun.getUserInput()