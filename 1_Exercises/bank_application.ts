export class BankApplication{
    protected static bankAccounts = new Map<string, object>();
    
    public custName:string;
    public custAge:number;
    public custLocation:string;
    public custState:string;
    public custCountry:string;
    public custEmailId:string;
    public custAccountNumber:string;
    public custBalance:number;

    setAccountName(name:string):void{
        this.custName = name;
    }

    setAccountAge(age:number):void{
        this.custAge = age;
    }

    setAccountLocation(location:string):void{
        this.custLocation = location;
    }

    setAccountState(state:string):void{
        this.custState = state;
    }

    setAccountCountry(country:string):void{
        this.custCountry = country;
    }

    setAccountEmail(email:string):void{
        this.custEmailId = email;
    }

    setAccountBalance(initialAmount:number):void{
        this.custBalance = initialAmount;
    }

    validateAge(age:number):Boolean{
        if(age>68)
        {
            return false;
        }
        return true;
    }

    validateEmail(email:string):Boolean{
        const emailRegex = /^[A-Za-z0-9.-_]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        if (!emailRegex.test(email)){
            return false;
        }
        return true;
    }

    getAccountNumber():void{
        console.log(`Please note your account number:${this.custAccountNumber}`);
    }

    getBalance(accountNumber):void{
        let accountDetails = BankApplication.bankAccounts.get(accountNumber.toLowerCase());
        if(!accountDetails){
            console.log("The entered account number is invalid");
        }
        else{
            console.log(`Your Account Balance: ${accountDetails['balance']}/-`);
        }
    }

    withdrawal(accountNumber, withdrawAmount):void{
        if(BankApplication.bankAccounts.has(accountNumber.toLowerCase())){
            let accountDetails = BankApplication.bankAccounts.get(accountNumber.toLowerCase());
            if(accountDetails){
                if(accountDetails['account_type'].toLowerCase() == 'savings'){
                    if(accountDetails['balance'] <= Number(withdrawAmount)){
                        console.log("You cannot withdraw the amount due to insufficient balance!");
                    }
                    else{
                        accountDetails['balance'] -= Number(withdrawAmount);
                        console.log(`Balance: Rs.${accountDetails['balance']}/-`);
                    }
                }
                else{
                    if(accountDetails['balance'] <= Number(withdrawAmount)){
                        console.log("Your account balance is insufficient, you may consider Overdraft service for your transaction.");
                    }
                    else{
                        accountDetails['balance'] -= Number(withdrawAmount);
                        console.log(`Your Total Balance: Rs.${accountDetails['balance']}/-`);
                    }
                }
                BankApplication.bankAccounts.set(accountNumber.toLowerCase(), accountDetails)
            }
        }
        else{
            console.log("The entered account number is invalid!");
        }
    }

    deposit(accountNumber, depositAmount):void{
        if(BankApplication.bankAccounts.has(accountNumber.toLowerCase())){
            let accountDetails = BankApplication.bankAccounts.get(accountNumber.toLowerCase());
            if(accountDetails){
                accountDetails['balance'] += Number(depositAmount);       
                console.log(`Your Total Balance: Rs.${accountDetails['balance']}/-`);
                BankApplication.bankAccounts.set(accountNumber.toLowerCase(), accountDetails)
            }
        }
        else{
            console.log("The entered account number is invalid!");
        }
    }

    getAccountDetails(accountNumber):void{
        if(BankApplication.bankAccounts.has(accountNumber.toLowerCase())){
            let accountDetails = BankApplication.bankAccounts.get(accountNumber.toLowerCase());
            if(accountDetails){
                console.log(`Account Details:\n`);
                console.log(`Email: ${accountDetails['email']}`);
                console.log(`Account Number: ${accountDetails['account_number']}`);
                console.log(`Account Holder Name: ${accountDetails['name']}`);
                console.log(`Balance: ${accountDetails['balance']}/-`);
            }
        }
        else{
            console.log("The entered account number is invalid!");
        }
    }
}
