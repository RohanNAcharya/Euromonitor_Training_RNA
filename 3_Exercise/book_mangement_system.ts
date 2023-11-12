import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Book{
    static bookInitialId:number = 1000;
    public bookName:string;
    public authorName:string;
    public available = false;
    public bookId:number;

    constructor(bookName:string, authorName:string){
        this.bookId = ++Book.bookInitialId;
        this.bookName = bookName;
        this.authorName = authorName;
        this.available = true;
    }
}

class User{
    static userIdNumber:number = 100;
    public userName:string;
    public userId:string;
    public issuedBooks:Book[];

    constructor(userName:string){
        this.userName = userName;
        this.userId = 'USER' + (++User.userIdNumber);
        this.issuedBooks = [];
        console.log(`User Created!\nNew User LoginId:${this.userId}`);
    }

}

class BookManagement{
    private adminLogin:string = "user@Admin2023";
    static bookList:Book[] = [];
    static allUsers:User[] = []

    validateAdminCredentials(adminId:String){
        if(adminId.toLocaleLowerCase() == this.adminLogin.toLowerCase())
        {
            return true;
        }
        else{
            return false;
        }
    }

    setNewBooks(bookName:string, authorName:string){
        let newBook:Book = new Book(bookName, authorName);
        BookManagement.bookList.push(newBook);
        console.log("Added New Book!");
    }

    setNewUser(newUserName:string){
        let newUser = new User(newUserName);
        BookManagement.allUsers.push(newUser);
    }

    getBookDetails(nameOrAuthor:string){
        let found = false;
        for(let i of BookManagement.bookList){
            if(i.bookName.toLocaleLowerCase() == nameOrAuthor.toLocaleLowerCase() || i.authorName.toLocaleLowerCase() == nameOrAuthor.toLocaleLowerCase()){
                found = true;
                if(i.available){
                    console.log(`Book Details:\nID: ${i.bookId}\nName: ${i.bookName}\nAuthor Name: ${i.authorName}\nAvailability: Available`);
                }
                else{
                    console.log(`Book Details:\nID: ${i.bookId}\nName: ${i.bookName}\nAuthor Name: ${i.authorName}\nAvailability: Not Available`);
                }
                break;
            }
        }
        if(!found){
            console.log("Book Not found with the entered name or author name!");
        }
    }

    getAllBooks(){
        let allBooks = BookManagement.bookList;
        if(allBooks[0]){
            console.log("All Books:");
            let j = 1;
            for(let i of allBooks){
                if(i.available){
                    console.log(`${j}. Book ID: ${i.bookId} | Name:${i.bookName} | Author Name: ${i.authorName} | [Available]`);
                }
                else{
                    console.log(`${j}. Book ID: ${i.bookId} | Name:${i.bookName} | Author Name: ${i.authorName} | [Not Available]`);
                }
                j++;
            }
        }
        else{
            console.log("There are no books added!");
        }
    }

    removeBook(bookId){
        let allBooks = BookManagement.bookList;
        let j=0;
        if(allBooks[0]){
            for(let i of allBooks){
                if(i.bookId == bookId){
                    allBooks.splice(j,1);
                    console.log("Book Removed!");
                    break;
                }
                j++;
            }
        }
        else{
            console.log("There are no books added!");
        }
    }

    validateUserCredentials(userId){
        for(let i of BookManagement.allUsers){
            if(userId.toLocaleLowerCase() == i.userId.toLocaleLowerCase()){
                return true;
            }
        }
        return false;
    }

    userBookCheckOut(userId, bookId:number){
        let checkOut = false;
        let book:Book | undefined;
        let availability;
        for(let i of BookManagement.bookList){
            if(i.bookId === bookId && i.available){
                availability = i.available;
                checkOut = true;
                book = i;
                break;
            }
        }

        if(checkOut){
            for (let j of BookManagement.allUsers) {
                if (j.userId.toLocaleLowerCase() == userId.toLocaleLowerCase()) 
                {
                    if(j.issuedBooks.length < 3) {
                        j.issuedBooks.push(book!);
                        console.log("Checkout Successful!");
                        book!.available = false;
                        break;
                    } else {
                        console.log('Sorry! You cannot checkout the book. You have exceeded the checkout limit!');
                        break;
                    }
                }
            }
        }
        else{
            console.log('Book is not available currently!');
        }
        
    }

    userBookCheckIn(userId, bookId:number){
        let currentUserBooks:Book[] | undefined;
        let successful = false;
        for (let j of BookManagement.allUsers) {
            if (j.userId.toLocaleLowerCase() == userId.toLocaleLowerCase()) 
            {
                currentUserBooks = j.issuedBooks;
                break;
            }
        }

        if (currentUserBooks) {
            const indexOfBook = currentUserBooks.findIndex(book => book.bookId === bookId);
    
            if (indexOfBook !== -1) {
                currentUserBooks.splice(indexOfBook, 1);
                console.log("Check-in Successful");
                successful = true;
            } else {
                console.log("Book not found in the user's issued books.");
            }
        }

        if(successful){
            for(let k of BookManagement.bookList){
                if(k.bookId == bookId){
                    k.available = true;
                    break;
                }
            }
        }
    }
}



let options = "1. Login as Admin\n2. Login as User\n3. Exit\nEnter your choice:";
let adminOptions = "1. Add new Books\n2. Add new user\n3. Search book details by title or author\n4. View Books\n5. Remove a book\n6. Return to user login page\n7. Exit\nEnter your choice:";
let userOptions = "1. View Books\n2. Search book details by title or author\n3. Check-out a book\n4. Check-in a book\n5. Return to user login page\n6. Exit\nEnter your choice:";

function getUserInput(){
    rl.question(options, (userInput) => {
        switch(userInput){
            case '1':
                let admin = new BookManagement();
                console.log("You selected option 1: Login as admin");
                rl.question("Enter Admin Id: ", (adminId)=>{
                    
                    // Admin Operations

                    function adminOperations(){
                        rl.question(adminOptions, (userInput) => {
                            switch(userInput){
                                case '1':
                                    // console.log("Add new Books");
                                    rl.question("Enter Book Name: ", (bookName)=>{
                                        rl.question("Enter Book Author Name: ", (authorName)=>{
                                            admin.setNewBooks(bookName, authorName);
                                            adminLikeToContinue();
                                        }); 
                                    });
                                    break;
                                case '2': 
                                    rl.question("Enter New User Name: ", (newUserName) => {
                                            admin.setNewUser(newUserName);
                                            adminLikeToContinue();
                                        });
                                    break;
                                case '3':
                                    rl.question("Enter the book name or author name: ", (nameOrAuthor) =>{
                                        admin.getBookDetails(nameOrAuthor);
                                        adminLikeToContinue();
                                    })
                                    break;
                                case '4': 
                                    console.log('View Books');
                                    admin.getAllBooks();
                                    adminLikeToContinue();
                                    break;
                                case '5':
                                    rl.question("Enter the book id: ", (bookId) =>{
                                        admin.removeBook(Number(bookId));
                                        adminLikeToContinue();
                                    })
                                    break;
                                case '6':
                                    console.log('Return to the user login page.')
                                    getUserInput();
                                    break;
                                case '7':
                                    console.log('Exiting the program.');
                                    rl.close();
                                    return;
                                default:
                                    console.log('Wrong Input! Re-enter your choice:');
                                    adminOperations();
                            }
                        })
                    }

                    function adminLikeToContinue(){
                        rl.question("Would you like to continue? Y-Yes or N-No: ", (userChoice)=>{
                            if(userChoice.toLowerCase()=='y'){
                                adminOperations();
                            }
                            else{
                                console.log('Thank You Admin!\nExiting the program.\n');
                                rl.close();
                                return;
                            }
                        });
                    }
                    
                    if(admin.validateAdminCredentials(adminId)){
                        console.log("Welcome Admin");
                        adminOperations();
                    }
                    else{
                        console.log("Invalid Login Id!!");
                        rl.question("Re-enter Admin Id: ", (adminId)=>{
                            if(admin.validateAdminCredentials(adminId)){
                                console.log("Welcome Admin");
                                adminOperations();
                            }
                            else{
                                console.log("Invalid Login Id!!");
                                rl.close();
                            }
                        })
                    }
                });
                break;
            case '2':
                let user = new BookManagement();
                console.log("You selected option 1: Login as user");
                rl.question("Enter User Id: ", (userId)=>{
                    
                    // User Operations

                    function userOperations(){
                        rl.question(userOptions, (userInput) => {
                            switch(userInput){
                                case '1':
                                    console.log('View Books');
                                    user.getAllBooks();
                                    userLikeToContinue();
                                    break;
                                case '2':
                                    rl.question("Enter the book name or author name: ", (nameOrAuthor) =>{
                                        user.getBookDetails(nameOrAuthor);
                                        userLikeToContinue();
                                    });
                                    break;
                                case '3': 
                                    console.log('Check-out Book');
                                    rl.question("Enter the book id to check-out : ", (bookId) => {
                                            user.userBookCheckOut(userId,Number(bookId));
                                            userLikeToContinue();
                                        });
                                    break;
                                case '4':
                                    console.log('Check-in Book');
                                    rl.question("Enter the book id to check-in: ", (bookId) =>{
                                        user.userBookCheckIn(userId, Number(bookId));
                                        userLikeToContinue();
                                    })
                                    break;
                                case '5':
                                    console.log('Return to the user login page.')
                                    getUserInput();
                                    break;
                                case '6':
                                    console.log('Exiting the program.');
                                    rl.close();
                                    return;
                                default:
                                    console.log('Wrong Input! Re-enter your choice:');
                                    userOperations();
                            }
                        })
                    }

                    function userLikeToContinue(){
                        rl.question("Would you like to continue? Y-Yes or N-No: ", (userChoice)=>{
                            if(userChoice.toLowerCase()=='y'){
                                userOperations();
                            }
                            else{
                                console.log('Thank You User!\nExiting the program.\n');
                                rl.close();
                                return;
                            }
                        });
                    }
                    
                    if(user.validateUserCredentials(userId)){
                        console.log("Welcome!");
                        userOperations();
                    }
                    else{
                        console.log("Invalid Login Id!!");
                        rl.question("Re-enter Admin Id: ", (userId)=>{
                            if(user.validateUserCredentials(userId)){
                                console.log("Welcome!");
                                userOperations();
                            }
                            else{
                                console.log("Invalid Login Id!!");
                                rl.close();
                            }
                        })
                    }
                });
                break;

            case '3':
                console.log('Exiting the program.');
                rl.close();
                return;

            default:
                console.log('Invalid option. Re-enter your option');
                getUserInput();
        }
    });
}





let book1 = new Book("Alchemist", "Paolo Cohelo");
let book2 = new Book("Three Thousand Stitches", "Sudha Murthy");
let book3 = new Book("The Adventures of Tom Sawyer", "Mark Twin");
let book4 = new Book("You Can Win", "Shiv Khera");

let books = [book1, book2, book3, book4];
BookManagement.bookList.push(...books);

let user1 = new User("Jennie");
let user2 = new User("Rose");
let user3 = new User("Sana");
let user4 = new User("Mark");
let user5 = new User("Lucas");

let users = [user1, user2, user3, user4, user5];
BookManagement.allUsers.push(...users);
console.log(BookManagement.bookList);
console.log(BookManagement.allUsers);


console.log("||Welcome to Library||");
getUserInput();
