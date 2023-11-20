"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var BankApplication = /** @class */ (function () {
    function BankApplication() {
    }
    BankApplication.prototype.setAccountType = function (accountType) {
        this.custAccountType = accountType;
    };
    BankApplication.prototype.setAccountName = function (name) {
        this.custName = name;
    };
    BankApplication.prototype.setAccountAge = function (age) {
        this.custAge = age;
    };
    BankApplication.prototype.setAccountLocation = function (location) {
        this.custLocation = location;
    };
    BankApplication.prototype.setAccountState = function (state) {
        this.custState = state;
    };
    BankApplication.prototype.setAccountCountry = function (country) {
        this.custCountry = country;
    };
    BankApplication.prototype.setAccountEmail = function (email) {
        this.custEmailId = email;
    };
    BankApplication.prototype.setAccountBalance = function (initialAmount) {
        this.custBalance = initialAmount;
    };
    BankApplication.prototype.setAccountNumber = function (accountType) {
        var tempAccountNumber;
        if (accountType == "Savings") {
            tempAccountNumber = BankApplication.savingsAccountNumber++;
            this.custAccountNumber = "SAV" + tempAccountNumber;
        }
        else if (accountType == "Current") {
            tempAccountNumber = BankApplication.currentAccountNumber++;
            this.custAccountNumber = "CURR" + tempAccountNumber;
        }
    };
    // constructor(){
    //     this.setAccountNumber(this.custAccountType);
    //     this.setAllAccountDetails();
    // }
    BankApplication.prototype.setAllAccountDetails = function () {
        var tempAccountDetail = {
            "account_type": (this.custAccountType == "Savings") ? 'Savings' : 'Current',
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
    };
    BankApplication.prototype.getBalance = function (name) {
        var found = false;
        for (var i = 0; i < BankApplication.bankAccounts.length; i++) {
            if (BankApplication.bankAccounts[i]['name'].toLowerCase() == name.toLocaleLowerCase()) {
                console.log("Your Account Number: ".concat(BankApplication.bankAccounts[i]['account_number'], "\nBalance: Rs.").concat(BankApplication.bankAccounts[i]['balance'], "/-\n"));
                found = true;
                break;
            }
        }
        if (!found) {
            console.log("Account with the entered name not found!");
        }
    };
    BankApplication.prototype.withdrawAmount = function (name, withAmount) {
        var found = false;
        for (var i = 0; i < BankApplication.bankAccounts.length; i++) {
            if (BankApplication.bankAccounts[i]['name'].toLowerCase() == name.toLocaleLowerCase()) {
                if (BankApplication.bankAccounts[i]['account_type'] == "Savings") {
                    if (BankApplication.bankAccounts[i]['balance'] <= Number(withAmount)) {
                        console.log("You cannot withdraw the amount due to insufficient balance!");
                    }
                    else {
                        BankApplication.bankAccounts[i]['balance'] -= Number(withAmount);
                        console.log("Balance: Rs.".concat(BankApplication.bankAccounts[i]['balance'], "/-\n"));
                    }
                }
                else {
                    if (BankApplication.bankAccounts[i]['balance'] <= Number(withAmount)) {
                        console.log("Your account balance is insufficient, you may consider Overdraft service for your transaction.\n");
                    }
                    else {
                        BankApplication.bankAccounts[i]['balance'] -= Number(withAmount);
                        console.log("Your Account Number: ".concat(BankApplication.bankAccounts[i]['account_number'], "\nBalance: Rs.").concat(BankApplication.bankAccounts[i]['balance'], "/-\n"));
                    }
                }
                found = true;
                break;
            }
        }
        if (!found) {
            console.log("Account with the entered name not found!\n");
        }
    };
    BankApplication.prototype.depositAmount = function (name, amount) {
        var found = false;
        for (var i = 0; i < BankApplication.bankAccounts.length; i++) {
            if (BankApplication.bankAccounts[i]['name'].toLowerCase() == name.toLocaleLowerCase()) {
                BankApplication.bankAccounts[i]['balance'] += Number(amount);
                console.log("Balance: Rs.".concat(BankApplication.bankAccounts[i]['balance'], "/-\n"));
                found = true;
                break;
            }
        }
        if (!found) {
            console.log("Account with the entered name not found!\n");
        }
    };
    BankApplication.prototype.displayDetails = function (accountNumber) {
        var found = false;
        for (var i = 0; i < BankApplication.bankAccounts.length; i++) {
            if (BankApplication.bankAccounts[i]['account_number'].toLowerCase() == accountNumber.toLocaleLowerCase()) {
                console.log("Account Details:\n");
                console.log("Email: ".concat(BankApplication.bankAccounts[i]['email']));
                console.log("Account Number: ".concat(BankApplication.bankAccounts[i]['account_number']));
                console.log("Account Holder Name: ".concat(BankApplication.bankAccounts[i]['name']));
                console.log("Balance: ".concat(BankApplication.bankAccounts[i]['balance'], "/-"));
                found = true;
                break;
            }
        }
        if (!found) {
            console.log("Account with the entered account number not found!\n");
        }
    };
    BankApplication.bankAccounts = [];
    BankApplication.savingsAccountNumber = 1000100;
    BankApplication.currentAccountNumber = 1000100;
    return BankApplication;
}());
var options = "1. Create an Account\n2. Check Balance\n3. Withdrawal\n4. Deposit\n5. View Account Details\n6. Exit\nEnter your choice:";
function getUserInput() {
    var bankApp = new BankApplication();
    rl.question(options, function (userInput) {
        switch (userInput) {
            case '1':
                console.log('You selected option 1.');
                rl.question("1. Savings\n2. Current\nEnter the Type of account: ", function (accountType) {
                    switch (accountType) {
                        case '1':
                            console.log("Savings Account");
                            rl.question("Enter Name: ", function (name) {
                                rl.question("Enter Age: ", function (age) {
                                    if (Number(age) > 68) {
                                        console.log("You are not eligible for account opening.");
                                        console.log('Exiting the program.');
                                        rl.close();
                                        return;
                                    }
                                    rl.question("Enter Location: ", function (location) {
                                        rl.question("Enter State: ", function (state) {
                                            rl.question("Enter Country: ", function (country) {
                                                rl.question("Enter Email Id: ", function (email) {
                                                    var minimumAmount = function () {
                                                        rl.question("Enter Initial Deposit: ", function (initialAmount) {
                                                            if (Number(initialAmount) < 500) {
                                                                console.log("Initial Amount should be a minimum of Rs 500!");
                                                                rl.close();
                                                            }
                                                            else {
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
                                                        });
                                                    };
                                                    var emailRegex = /^[A-Za-z0-9.-_]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
                                                    if (!emailRegex.test(email)) {
                                                        console.log('Invalid Email');
                                                        var reEnterEmail_1 = function () {
                                                            rl.question("Please Enter a valid email: ", function (email) {
                                                                var emailRegex = /^[A-Za-z0-9.-_]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
                                                                if (!emailRegex.test(email)) {
                                                                    reEnterEmail_1();
                                                                }
                                                                else {
                                                                    console.log("Email is valid!");
                                                                    minimumAmount();
                                                                }
                                                            });
                                                        };
                                                        reEnterEmail_1();
                                                    }
                                                    else {
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
                            rl.question("Enter Name: ", function (name) {
                                rl.question("Enter Age: ", function (age) {
                                    if (Number(age) > 68) {
                                        console.log("You are not eligible for account opening.");
                                        console.log('Exiting the program.');
                                        rl.close();
                                        return;
                                    }
                                    rl.question("Enter Location: ", function (location) {
                                        rl.question("Enter State: ", function (state) {
                                            rl.question("Enter Country: ", function (country) {
                                                rl.question("Enter Email Id: ", function (email) {
                                                    var minimumAmount = function () {
                                                        rl.question("Enter Initial Deposit: ", function (initialAmount) {
                                                            if (Number(initialAmount) < 800) {
                                                                console.log("Initial Amount should be a minimum of Rs 500!");
                                                                rl.close();
                                                            }
                                                            else {
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
                                                        });
                                                    };
                                                    var emailRegex = /^[A-Za-z0-9.-_]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
                                                    if (!emailRegex.test(email)) {
                                                        console.log('Invalid Email');
                                                        var reEnterEmail_2 = function () {
                                                            rl.question("Please Enter a valid email: ", function (email) {
                                                                var emailRegex = /^[A-Za-z0-9.-_]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
                                                                if (!emailRegex.test(email)) {
                                                                    reEnterEmail_2();
                                                                }
                                                                else {
                                                                    console.log("Email is valid!");
                                                                    minimumAmount();
                                                                }
                                                            });
                                                        };
                                                        reEnterEmail_2();
                                                    }
                                                    else {
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
                rl.question("Enter name to check balance: ", function (name) {
                    bankApp.getBalance(name);
                    likeToContinue();
                });
                break;
            case '3':
                console.log('You selected option 3.');
                rl.question("Enter name to make withdrawal: ", function (name) {
                    rl.question("Enter the withdrawal Amount: ", function (withAmount) {
                        bankApp.withdrawAmount(name, Number(withAmount));
                        likeToContinue();
                    });
                });
                break;
            case '4':
                console.log('You selected option 4.');
                rl.question("Enter name: ", function (name) {
                    rl.question("Enter deposit amount: ", function (depositAmount) {
                        bankApp.depositAmount(name, Number(depositAmount));
                        likeToContinue();
                    });
                });
                break;
            case '5':
                console.log('You selected option 5.');
                rl.question("Enter account number: ", function (accountNumber) {
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
function likeToContinue() {
    rl.question("Would you like  to continue? Y-Yes or N-No: ", function (userChoice) {
        if (userChoice.toLowerCase() == 'y') {
            getUserInput();
        }
        else {
            console.log('Thank You for Banking with us! Exiting the program.');
            rl.close();
            return;
        }
    });
}
getUserInput();
