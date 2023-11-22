import { BankApplication } from "./bank_application";
export class CurrentAccount extends BankApplication{
    setAccountNumber():void{
        this.custAccountNumber = 'CURR' + Math.floor(Math.random() * 1000000);
    }

    setInitialAmount(initialAmount:number):void{
        this.custBalance = initialAmount;
    }

    validateInitialAmount(initialAmount:number):string{
        if(initialAmount>800){
            return 'valid';
        }
        return "Initial Amount should be a minimum of Rs 800!";
    }

    setAllAccountDetails():void{
        let tempAccountDetail = {
            "account_type": "Current",
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