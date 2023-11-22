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

    public async getUserInput():Promise<void> {
        const userInput = await this.question(this.options);
        if(userInput == '1') {
            await this.inputAccountType()
        }
        else if(userInput == '2'){
            await this.fetchAccountBalance()
        }
        else if(userInput == '3'){
            await this.withdrawalOperation()
        }
        else if(userInput == '4'){
            await this.depositsOperation()
        }
        else if(userInput == '5'){
            await this.fetchAccountDetails()
        }
        else if(userInput == '6'){
            this.exitMenu()
        }
        else{
            console.log("Invalid Input!");
        }
        this.repeatMenu();
    }

    public async inputAccountType():Promise<void>{
        const accountType = await this.question("1. Savings\n2. Current\nEnter the Type of account: ");
        if (accountType=='1') {
            let savAccObj = new SavingsAccount();
            await this.inputUserDetails(savAccObj);
        }
        else if (accountType=='2') {
            let currAccObj = new CurrentAccount();
            await this.inputUserDetails(currAccObj);
        }
        else{
            console.log("Invalid Input");
        }
    }

    public async fetchAccountBalance():Promise<void>{
        let bankObj = new BankApplication();
        let accountNumber = await this.question("Enter account number to check balance: ");
        bankObj.getBalance(accountNumber);
    }
    
    public async withdrawalOperation():Promise<void>{
        let bankObj = new BankApplication();
        let accountNumber = await this.question("Enter account number to withdraw amount: ");
        let amount = await this.question("Enter withdraw amount: ");
        bankObj.withdrawal(accountNumber, amount);
    }
    
    public async depositsOperation():Promise<void>{
        let bankObj = new BankApplication();
        let accountNumber = await this.question("Enter account number to deposit amount: ");
        let amount = await this.question("Enter deposit amount: ");
        bankObj.deposit(accountNumber, amount);
    }
    
    public async fetchAccountDetails():Promise<void>{
        let bankObj = new BankApplication();
        let accountNumber = await this.question("Enter account number to check account details: ");
        bankObj.getAccountDetails(accountNumber);
    }
    
    public exitMenu():void{
        console.log("Exiting!");
        process.exit(0);
    }
    
    public async inputUserDetails(obj):Promise<void> {
        const name = await this.question("Enter Your Name:");
        
        let age = await this.question("Enter Age:");
        let ageResult:Boolean = await this.validateAge(age, obj);
        if(!ageResult){
            console.log("Entered Age is not valid. Age entry limit exhausted!")
            return;
        }
    
        const location = await this.question("Enter Location:");
        const state = await this.question("Enter State:");
        const country = await this.question("Enter Country:");
    
        let email = await this.question("Enter Email:");
        let emailResult:Boolean = await this.validateEmail(email, obj);
        if(!emailResult){
            return;
        }
    
        const amount = await this.question("Enter Initial Amount:");
        const message = obj.validateInitialAmount(Number(amount));
    
        if (message === 'valid') {
            obj.setAccountNumber();
            obj.setAccountInstance(name, age, location, state, country, email, Number(amount));
            obj.setAccountDetails();
            console.log("Account Created!");
            obj.getAccountNumber();
        } else {
            console.log(message);
            return;
        }
    }
    
    public async validateAge(age, obj):Promise<Boolean>{
        if(/^\d+$/.test(age) && obj.validateAge(Number(age)))
        {
            return true;
        }
        else if (!/^\d+$/.test(age)) {
            console.log("Age must be a valid number. Enter again!");
            age = await this.question("Enter Age again:");
            return this.ageValidationCondition(age, obj);
        }
        else{
            console.log("The entered age is not valid for account opening.");
            age = await this.question("Enter Age again:");
            return this.ageValidationCondition(age, obj);
        }
    }
    
    public ageValidationCondition(age, obj):Boolean{
        if(/^\d+$/.test(age) && obj.validateAge(Number(age)))
        {
            return true;
        }
        else{
            return false
        }
    }
    
    public async validateEmail(email, obj):Promise<Boolean>{
        if(obj.validateEmail(email)){
            return true
        }
        else
        {
            console.log("The entered email is not valid. Enter again!");
            email = await this.question("Enter email again:");
            if(obj.validateEmail(email)){
                return true
            }
            else{
                console.log("The entered email is not valid. Email entry limit exhausted!")
                return false;
            }
        }
    }
    
    public question(question: string): Promise<string> {
        return new Promise((resolve) => {
            rl.question(question, resolve);
        });
    }
    
    public repeatMenu():void{
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