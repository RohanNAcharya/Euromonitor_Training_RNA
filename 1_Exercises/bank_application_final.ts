import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class BankApplication{
    private static bankAccounts:object[] = [];
    private static savingsAccountNumber = 1000100;
    private static currentAccountNumber = 1000100;
    
    private custAccountType:string;
    private custName:string;
    private custAge:number;
    private custLocation:string;
    private custState:string;
    private custCountry:string;
    private custEmailId:string;
    private custAccountNumber:string;
    private custBalance:number;
    

    setAccountType(accountType:string){
        this.custAccountType = accountType;
    }

    setAccountName(name:string){
        this.custName = name;
    }

    setAccountAge(age:number){
        this.custAge = age;
    }

    setAccountLocation(location:string){
        this.custLocation = location;
    }

    setAccountState(state:string){
        this.custState = state;
    }

    setAccountCountry(country:string){
        this.custCountry = country;
    }

    setAccountEmail(email:string){
        this.custEmailId = email;
    }

    setAccountBalance(initialAmount:number){
        this.custBalance = initialAmount;
    }

    setAccountNumber(accountType:string){
        let tempAccountNumber:number;
        if(accountType=="Savings"){
            tempAccountNumber = BankApplication.savingsAccountNumber++;
            this.custAccountNumber = "SAV" + tempAccountNumber;
        }
        else if(accountType=="Current"){
            tempAccountNumber = BankApplication.currentAccountNumber++;
            this.custAccountNumber = "CURR" + tempAccountNumber;
        }
    }

    // constructor(){
    //     this.setAccountNumber(this.custAccountType);
    //     this.setAllAccountDetails();
    // }

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

    getBalance(name:string){
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
    }

    withdrawAmount(name:string, withAmount:number){
        let found = false;
        for (let i = 0; i < BankApplication.bankAccounts.length; i++) {
            if (BankApplication.bankAccounts[i]['name'].toLowerCase() == name.toLocaleLowerCase()) {
                if (BankApplication.bankAccounts[i]['account_type'] == "Savings") {
                    if (BankApplication.bankAccounts[i]['balance'] <= Number(withAmount)) {
                        console.log("You cannot withdraw the amount due to insufficient balance!");
                    }
                    else {
                        BankApplication.bankAccounts[i]['balance'] -= Number(withAmount);
                        console.log(`Balance: Rs.${BankApplication.bankAccounts[i]['balance']}/-\n`);
                    }
                }
                else {
                    if (BankApplication.bankAccounts[i]['balance'] <= Number(withAmount)) {
                        console.log("Your account balance is insufficient, you may consider Overdraft service for your transaction.\n");
                    }
                    else {
                        BankApplication.bankAccounts[i]['balance'] -= Number(withAmount);
                        console.log(`Your Account Number: ${BankApplication.bankAccounts[i]['account_number']}\nBalance: Rs.${BankApplication.bankAccounts[i]['balance']}/-\n`);
                    }
                }
                found = true;
                break;
            }
        }
        if (!found) {
            console.log("Account with the entered name not found!\n");
        }
    }

    depositAmount(name:string, amount:number){
        let found = false;
        for(let i=0; i<BankApplication.bankAccounts.length;i++){
            if(BankApplication.bankAccounts[i]['name'].toLowerCase() == name.toLocaleLowerCase())
            {
                BankApplication.bankAccounts[i]['balance'] += Number(amount);       
                console.log(`Balance: Rs.${BankApplication.bankAccounts[i]['balance']}/-\n`);
                found = true;
                break;
            }
        }
        if(!found){
            console.log("Account with the entered name not found!\n");
        }
    }

    displayDetails(accountNumber:string){
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
    }
}

let options = "1. Create an Account\n2. Check Balance\n3. Withdrawal\n4. Deposit\n5. View Account Details\n6. Exit\nEnter your choice:";

function getUserInput() {  
    let bankApp = new BankApplication();  
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
                                                                bankApp.setAccountType("Savings");
                                                                bankApp.setAccountName(name);
                                                                bankApp.setAccountAge(Number(age));
                                                                bankApp.setAccountLocation(location);
                                                                bankApp.setAccountState(state);
                                                                bankApp.setAccountCountry(country);
                                                                bankApp.setAccountEmail(email);
                                                                bankApp.setAccountBalance(Number(initialAmount));
                                                                bankApp.setAccountNumber("Savings");
                                                                bankApp.setAllAccountDetails();
                                                                
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
                                                                bankApp.setAccountType("Current");
                                                                bankApp.setAccountName(name);
                                                                bankApp.setAccountAge(Number(age));
                                                                bankApp.setAccountLocation(location);
                                                                bankApp.setAccountState(state);
                                                                bankApp.setAccountCountry(country);
                                                                bankApp.setAccountEmail(email);
                                                                bankApp.setAccountBalance(Number(initialAmount));
                                                                bankApp.setAccountNumber("Current");
                                                                bankApp.setAllAccountDetails();
                                                
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
                    bankApp.getBalance(name);
                    likeToContinue();
                });
                break;
            case '3':
                console.log('You selected option 3.');
                rl.question("Enter name to make withdrawal: ", (name) => {
                    rl.question("Enter the withdrawal Amount: ", (withAmount) => {
                        bankApp.withdrawAmount(name, Number(withAmount));
                        likeToContinue();
                    });
                });
                break;
            case '4':
                console.log('You selected option 4.');
                rl.question("Enter name: ", (name) => {
                    rl.question("Enter deposit amount: ", (depositAmount) => {
                        bankApp.depositAmount(name, Number(depositAmount));
                        likeToContinue();
                    });
                });
                break;
            case '5':
                console.log('You selected option 5.');
                rl.question("Enter account number: ", (accountNumber) => {
                    bankApp.displayDetails(accountNumber);
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

