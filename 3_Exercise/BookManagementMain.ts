import * as readline from 'readline';
import { BookManagement } from './BookManagement';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class BookManagementMain{
    options:string;
    adminOptions:string;
    userOptions:string;

    constructor(){
        this.options = "1. Login as Admin\n2. Login as User\n3. Exit\nEnter your choice:";
        this.adminOptions = "1. Add new Books\n2. Add new user\n3. Search book details by title or author\n4. View Books\n5. Remove a book\n6. Return to user login page\n7. Exit\nEnter your choice:";
        this.userOptions = "1. View Books\n2. Search book details by title or author\n3. Check-out a book\n4. Check-in a book\n5. Return to user login page\n6. Exit\nEnter your choice:";
    }

    public async getUserInput():Promise<void> {
        const userInput = await this.question(this.options);
        let userObject = new BookManagement();
        if(userInput == '1') {
            let adminId = await this.question("Enter Admin Id:");
            this.validateAdminId(adminId, userObject);
        }
        else if(userInput == '2'){
            let userId = await this.question("Enter User Id:");
            this.validateUserId(userId, userObject);
        }
        else if(userInput == '3'){
            this.exitMenu();
        }
        else{
            console.log("Invalid Input!");
        }
        this.getUserInput();
    }

    public async validateAdminId(adminId, obj){
        if(obj.validateAdminCredentials(adminId)){
            await this.adminOperations(this.adminOptions, obj);
        }
        else{
            console.log("Invalid Login Id!!");
            let adminId = await this.question("Re-enter Admin Id:");
            if(obj.validateAdminCredentials(adminId)){
                await this.adminOperations(this.adminOptions, obj);
            }
            else{
                console.log("Invalid Login Id!!");
                this.repeatMainMenu();
            }
        }
    }

    public async adminOperations(options, obj):Promise<void> {
        const userInput = await this.question(options);
        if(userInput == '1') {
            await this.addNewBooksOperation(obj);
        }
        else if(userInput == '2'){
            await this.addNewUser(obj);
        }
        else if(userInput == '3'){
            await this.searchBook(obj);
        }
        else if(userInput == '4'){
            await this.viewBooks(obj);
        }
        else if(userInput == '5'){
            await this.removeBookOperation(obj)
        }
        else if(userInput == '6'){
            this.getUserInput();
        }
        else if(userInput == '7'){
            this.exitMenu()
        }
        else{
            console.log("Invalid Input!");
        }
        this.adminRepeatOption(options, obj);
    }

    public async addNewBooksOperation(obj):Promise<void>{
        let bookName = await this.question("Enter Book Name:");
        let author = await this.question("Enter Book Author Name:");
        obj.setNewBooks(bookName, author);
    }

    public async addNewUser(obj):Promise<void>{
        let userName = await this.question("Enter New User Name: ");
        obj.setNewUser(userName);
    }

    public async searchBook(obj):Promise<void>{
        let nameOrAuthor = await this.question("Enter the book name or author name: ");
        obj.getBookDetails(nameOrAuthor);
    }

    public async viewBooks(obj):Promise<void>{
        obj.getAllBooks();
    }

    public async removeBookOperation(obj):Promise<void>{
        let bookId = await this.question("Enter the book id: ");
        obj.removeBook(Number(bookId));
    }

    public async adminRepeatOption(options, obj):Promise<void>{
        let adminChoice = await this.question("Would you like to continue? Y-Yes or N-No:");
        if(adminChoice.toLowerCase()=='y'){
            this.adminOperations(options, obj);
        }
        else{
            console.log('Thank You Admin!\nExiting the program.\n');
            this.exitMenu();
        }
    }

    public async validateUserId(userId, obj){
        if(obj.validateUserCredentials(userId)){
            await this.userOperations(this.userOptions, obj, userId);
        }
        else{
            console.log("Invalid Login Id!!");
            let userId = await this.question("Re-enter User Id:");
            if(obj.validateUserCredentials(userId)){
                await this.userOperations(this.userOptions, obj, userId);
            }
            else{
                console.log("Invalid Login Id!!");
                this.repeatMainMenu();
            }
        }
    }

    public async userOperations(options, obj, userId):Promise<void> {
        const userInput = await this.question(options);
        if(userInput == '1') {
            await this.viewBooks(obj);
        }
        else if(userInput == '2'){
            await this.searchBook(obj);
        }
        else if(userInput == '3'){
            await this.checkOutOperation(obj, userId);
        }
        else if(userInput == '4'){
            await this.checkInOperation(obj, userId);
        }
        else if(userInput == '5'){
            this.getUserInput();
        }
        else if(userInput == '6'){
            this.exitMenu()
        }
        else{
            console.log("Invalid Input!");
        }
        this.userRepeatMenu(options, obj, userId);
    }

    public async checkOutOperation(obj, userId):Promise<void>{
        let bookId = await this.question("Enter the book id:");
        obj.userBookCheckOut(userId, Number(bookId))
    }

    public async checkInOperation(obj, userId):Promise<void>{
        let bookId = await this.question("Enter the book id:");
        obj.userBookCheckIn(userId, Number(bookId))
    }

    public async userRepeatMenu(options, obj, userId):Promise<void>{
        let adminChoice = await this.question("Would you like to continue? Y-Yes or N-No:");
        if(adminChoice.toLowerCase()=='y'){
            this.userOperations(options, obj, userId);
        }
        else{
            console.log('Thank You!\nExiting the program.\n');
            this.exitMenu();
        }
    }

    public async repeatMainMenu():Promise<void>{
        let adminChoice = await this.question("Would you like to continue? Y-Yes or N-No:");
        if(adminChoice.toLowerCase()=='y'){
            this.getUserInput();
        }
        else{
            console.log('Thank You!\nExiting the program.\n');
            this.exitMenu();
        }
    }


    public exitMenu():void{
        console.log("Exiting!");
        process.exit(0);
    }

    public question(question: string): Promise<string> {
        return new Promise((resolve) => {
            rl.question(question, resolve);
        });
    }
}

let bmm = new BookManagementMain();
bmm.getUserInput();

