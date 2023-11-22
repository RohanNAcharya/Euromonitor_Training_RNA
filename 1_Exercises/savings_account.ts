import { BankApplication } from "./bank_application";
export class SavingsAccount extends BankApplication{
    setAccountNumber():void{
        this.custAccountNumber = 'SAV' + Math.floor(Math.random() * 1000000);
    }

    setInitialAmount(initialAmount:number):void{
        this.custBalance = initialAmount;
    }

    validateInitialAmount(initialAmount:number):string{
        if(initialAmount>500){
            return 'valid';
        }
        return "Initial Amount should be a minimum of Rs 500!";
    }

    setAllAccountDetails():void{
        let tempAccountDetail = {
            "account_type": "Savings",
            "name": this.custName,
            "age": this.custAge,
            "location": this.custLocation,
            "state": this.custState,
            "country": this.custCountry,
            "email": this.custEmailId,
            "account_number": this.custAccountNumber,
            "balance": Number(this.custBalance)
        };
        
        BankApplication.bankAccounts.set(this.custAccountNumber.toLowerCase(), tempAccountDetail);
    }
}
