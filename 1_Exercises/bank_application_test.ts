import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class BankApplication{
    static bankAccounts:object[] = [];
    static savingsAccountNumber = 1000100;
    static currentAccountNumber = 1000100;
    
    public custAccountType:string;
    public custAccountName:string;
    public custName:string;
    public custAge:number;
    public custLocation:string;
    public custState:string;
    public custCountry:string;
    public custEmailId:string;
    public custAccountNumber:string;
    public custBalance:number;
    
    constructor(public accountType:string, public name:string, public age:number, public location:string, public state:string, public country:string, public emailId:string, public initialAmount:number){
        this.custAccountType = accountType;
        this.custName = name;
        this.custAge = age;
        this.custLocation = location;
        this.custState = state;
        this.custCountry = country;
        this.custEmailId = emailId;
        this.custBalance = initialAmount;
        this.setAccountNumber(accountType);
        // BankApplication.bankAccounts.push(this);
        this.setAllAccountDetails();
    }

    setAllAccountDetails(){
        let tempAccountDetail = {
            "account_type": (this.custAccountType=="Savings") ? 'Savings' : 'Current',
            "name": this.custName,
            "age": this.custAge,
            "location": this.custLocation,
            "state": this.custState,
            "country": this.custCountry,
            "email": this.custEmailId,
            "account_number": this.custAccountNumber,
            "balance": this.custBalance
        };
        // let tempAccountDetailsWithAccountNumber = {};
        // tempAccountDetailsWithAccountNumber[this.custAccountNumber] = tempAccountDetail;
        BankApplication.bankAccounts.push(tempAccountDetail);
    }

    setAccountNumber(accountType:string){
        let tempAccountNumber = BankApplication.savingsAccountNumber++;
        if(accountType=="Savings"){
            this.custAccountNumber = "SAV" + tempAccountNumber;
        }
        else if(accountType=="Current"){
            this.custAccountNumber = "CURR" + tempAccountNumber;
        }
    }
}

let options = "1. Create an Account\n2. Check Balance\n3. Withdrawal\n4. Deposit\n5. View Account Details\n6. Exit\nEnter your choice:";

function getUserInput() {    
    rl.question(options, (userInput) => {
        switch (userInput) {
            case '1':
                console.log('You selected option 1.');
                rl.question("1. Savings\n2. Current\nEnter the Type of account: ", (accountType)=>{
                    switch(accountType){
                        case '1':
                            console.log("Savings Account");
                            rl.question("Enter Name: ", (name:string)=>{
                                rl.question("Enter Age: ", (age) => {
                                    if(Number(age)>68){
                                        console.log("You are not eligible for account opening.")
                                        console.log('Exiting the program.');
                                        rl.close();
                                        return;
                                    }
                                    rl.question("Enter Location: ", (location:string)=>{
                                        rl.question("Enter State: ", (state:string)=>{
                                            rl.question("Enter Country: ", (country:string)=>{
                                                rl.question("Enter Email Id: ", (email:string)=>{
                                                    const minimumAmount = function() {
                                                        rl.question("Enter Initial Deposit: ", (initialAmount) => {
                                                            if(Number(initialAmount) < 500){
                                                                console.log("Initial Amount should be a minimum of Rs 500!")
                                                                rl.close();
                                                            }
                                                            else{
                                                                // console.log(`Name: ${name} | Age: ${age} | City: ${location} | State:${state} | Country: ${country} | Email: ${email} | Initial Amount: ${initialAmount}`);
                                                                let bankAccount = new BankApplication("Savings", name, Number(age), location, state, country, email, Number(initialAmount));
                                                                // console.log(BankApplication.bankAccounts);
                                                                likeToContinue();
                                                            }
                                                        })
                                                    }
                                                    const emailRegex = /^[A-Za-z0-9.-_]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
                                                    if (!emailRegex.test(email)){
                                                        console.log('Invalid Email');
                                                        let reEnterEmail = function() {
                                                            rl.question("Please Enter a valid email: ", (email:string)=>{
                                                                const emailRegex = /^[A-Za-z0-9.-_]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
                                                                if (!emailRegex.test(email)){
                                                                    reEnterEmail();
                                                                }
                                                                else{
                                                                    console.log("Email is valid!");
                                                                    minimumAmount();
                                                                }
                                                            });
                                                        } 
                                                        reEnterEmail();
                                                    }
                                                    else
                                                    {
                                                        minimumAmount();
                                                    }
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                            break;
                        case '2':
                            console.log("Current Account");
                            rl.question("Enter Name: ", (name:string)=>{
                                rl.question("Enter Age: ", (age) => {
                                    if(Number(age)>68){
                                        console.log("You are not eligible for account opening.")
                                        console.log('Exiting the program.');
                                        rl.close();
                                        return;
                                    }
                                    rl.question("Enter Location: ", (location:string)=>{
                                        rl.question("Enter State: ", (state:string)=>{
                                            rl.question("Enter Country: ", (country:string)=>{
                                                rl.question("Enter Email Id: ", (email:string)=>{
                                                    const minimumAmount = function() {
                                                        rl.question("Enter Initial Deposit: ", (initialAmount) => {
                                                            if(Number(initialAmount) < 800){
                                                                console.log("Initial Amount should be a minimum of Rs 500!")
                                                                rl.close();
                                                            }
                                                            else{
                                                                // console.log(`Name: ${name} | Age: ${age} | City: ${location} | State:${state} | Country: ${country} | Email: ${email} | Initial Amount: ${initialAmount}`);
                                                                let bankAccount = new BankApplication("Current", name, Number(age), location, state, country, email, Number(initialAmount));
                                                                // console.log(BankApplication.bankAccounts);
                                                                likeToContinue();
                                                            }
                                                        })
                                                    }
                                                    const emailRegex = /^[A-Za-z0-9.-_]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
                                                    if (!emailRegex.test(email)){
                                                        console.log('Invalid Email');
                                                        let reEnterEmail = function() {
                                                            rl.question("Please Enter a valid email: ", (email:string)=>{
                                                                const emailRegex = /^[A-Za-z0-9.-_]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
                                                                if (!emailRegex.test(email)){
                                                                    reEnterEmail();
                                                                }
                                                                else{
                                                                    console.log("Email is valid!");
                                                                    minimumAmount();
                                                                }
                                                            });
                                                        } 
                                                        reEnterEmail();
                                                    }
                                                    else
                                                    {
                                                        minimumAmount();
                                                    }
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                            break;

                        default:
                            console.log("Invalid Input");
                    }

                    likeToContinue();
                });
                break;
            case '2':
                console.log('You selected option 2.');
                rl.question("Enter name to check balance: ", (name) => {
                    let found = false;
                    for(let i=0; i<BankApplication.bankAccounts.length;i++){
                        if(BankApplication.bankAccounts[i]['name'].toLowerCase() == name.toLocaleLowerCase())
                        {
                            console.log(`Your Account Number: ${BankApplication.bankAccounts[i]['account_number']}\nBalance: Rs.${BankApplication.bankAccounts[i]['balance']}/-\n`);
                            found = true;
                            break;
                        }
                    }
                    if(!found){
                        console.log("Account with the entered name not found!");
                    }
                    likeToContinue();
                });
                break;
            case '3':
                console.log('You selected option 3.');
                rl.question("Enter name to make withdrawal: ", (name) => {
                    rl.question("Enter the withdrawal Amount: ", (withAmount) => {
                        let found = false;
                        for(let i=0; i<BankApplication.bankAccounts.length;i++){
                            if(BankApplication.bankAccounts[i]['name'].toLowerCase() == name.toLocaleLowerCase())
                            {
                                if(BankApplication.bankAccounts[i]['account_type']=="Savings")
                                {
                                    if(BankApplication.bankAccounts[i]['balance'] <= Number(withAmount))
                                    {
                                        console.log("You cannot withdraw the amount due to insufficient balance!");
                                    }
                                    else{
                                        BankApplication.bankAccounts[i]['balance'] -= Number(withAmount);
                                        console.log(`Balance: Rs.${BankApplication.bankAccounts[i]['balance']}/-\n`);
                                    }
                                }
                                else{
                                    if(BankApplication.bankAccounts[i]['balance'] <= Number(withAmount))
                                    {
                                        console.log("Your account balance is insufficient, you may consider Overdraft service for your transaction.\n");
                                    }
                                    else{
                                        BankApplication.bankAccounts[i]['balance'] -= Number(withAmount);
                                        console.log(`Your Account Number: ${BankApplication.bankAccounts[i]['account_number']}\nBalance: Rs.${BankApplication.bankAccounts[i]['balance']}/-\n`);
                                    }
                                }
                                found = true;
                                break;
                            }
                        }
                        if(!found){
                            console.log("Account with the entered name not found!\n");
                        }
                        likeToContinue();
                    });
                });
                break;
            case '4':
                console.log('You selected option 4.');
                rl.question("Enter name: ", (name) => {
                    rl.question("Enter deposit amount: ", (depositAmount) => {
                        let found = false;
                        for(let i=0; i<BankApplication.bankAccounts.length;i++){
                            if(BankApplication.bankAccounts[i]['name'].toLowerCase() == name.toLocaleLowerCase())
                            {
                                BankApplication.bankAccounts[i]['balance'] += Number(depositAmount);       
                                console.log(`Balance: Rs.${BankApplication.bankAccounts[i]['balance']}/-\n`);
                                found = true;
                                break;
                            }
                        }
                        if(!found){
                            console.log("Account with the entered name not found!\n");
                        }
                        likeToContinue();
                    });
                });
                break;
            case '5':
                console.log('You selected option 5.');
                rl.question("Enter account number: ", (accountNumber) => {
                    let found = false;
                    for(let i=0; i<BankApplication.bankAccounts.length;i++){
                        if(BankApplication.bankAccounts[i]['account_number'].toLowerCase() == accountNumber.toLocaleLowerCase())
                        {
                            console.log(`Account Details:\n`);
                            console.log(`Email: ${BankApplication.bankAccounts[i]['email']}`);
                            console.log(`Account Number: ${BankApplication.bankAccounts[i]['account_number']}`);
                            console.log(`Account Holder Name: ${BankApplication.bankAccounts[i]['name']}`);
                            console.log(`Balance: ${BankApplication.bankAccounts[i]['balance']}/-`);
                            found = true;
                            break;
                        }
                    }
                    if(!found){
                        console.log("Account with the entered account number not found!\n");
                    }
                    likeToContinue();
                });
                break;
            case '6':
                console.log('Exiting the program.');
                rl.close();
                return;
            default:
                console.log('Invalid option. Re-enter your option');
                getUserInput();
        }
    });
}


function likeToContinue(){
    rl.question("Would you like  to continue? Y-Yes or N-No: ", (userChoice)=>{
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

getUserInput();

// let bankAccount = new BankApplication("Savings", "Jennie", 27, "Seoul", "Gangnam", "South Korea", "jennie@gmail.com", 700);
// let bankAccount1 = new BankApplication("Savings", "Mina", 25, "Tokyo", "Osaka", "Japan", "mina@gmail.com", 600);
// console.log(BankApplication.bankAccounts[0]['balance']);
