import { Book } from './Book';
import { User } from './User';

export class BookManagement{
    private adminLogin:string = "user@Admin2023";
    static bookList = new Map<number, Book>();
    static allUsers = new Map<string, User>();

    public validateAdminCredentials(adminId:String):Boolean{
        if(adminId.toLocaleLowerCase() == this.adminLogin.toLowerCase())
        {
            return true;
        }
        else{
            return false;
        }
    }
    
    public validateUserCredentials(userId:String):Boolean{
        console.log("Comes here");
        if(BookManagement.allUsers.has(userId.toLocaleLowerCase()))
        {
            console.log("Enteres here");
            return true;
        }
        else{
            return false;
        }
    }

    public setNewBooks(bookName:string, authorName:string):void{
        let newBook:Book = new Book(bookName, authorName);
        BookManagement.bookList.set(newBook.bookId, newBook);
        console.log("Added New Book!");
    }

    public setNewUser(newUserName:string):void{
        let newUser = new User(newUserName);
        BookManagement.allUsers.set(newUser.userId.toLowerCase(), newUser);
    }

    public getBookDetails(nameOrAuthor:string):void{
        let found = false;
        BookManagement.bookList.forEach((book) => {
            if(book.authorName.toLowerCase() == nameOrAuthor.toLowerCase() || book.bookName.toLowerCase() == nameOrAuthor.toLowerCase())
            {
                if(book.available){
                    console.log(`Book Details:\nID: ${book.bookId}\nName: ${book.bookName}\nAuthor Name: ${book.authorName}\nAvailability: Available`);
                }
                else{
                    console.log(`Book Details:\nID: ${book.bookId}\nName: ${book.bookName}\nAuthor Name: ${book.authorName}\nAvailability: Not Available`);
                }
                found = true;
                return true;
            }
        })
        if(!found){
            console.log("Book Not found with the entered name or author name!");
        }
    }

    public getAllBooks():void{
        let allBooks = BookManagement.bookList;
        if(allBooks.size == 0){
            console.log("There are no books!");
            return;
        }
        let j = 1;
        allBooks.forEach((book) => {
            if (book.available) {
                console.log(`${j}. Book ID: ${book.bookId} | Name:${book.bookName} | Author Name: ${book.authorName} | [Available]`);
            }
            else {
                console.log(`${j}. Book ID: ${book.bookId} | Name:${book.bookName} | Author Name: ${book.authorName} | [Not Available]`);
            }
            j++;
        });
    }

    public removeBook(bookId):void{
        console.log(BookManagement.bookList)
        if(BookManagement.bookList.has(bookId)){
            BookManagement.bookList.delete(bookId);
            console.log(`Book with id ${bookId} has been removed.`);
        }
        else{
            console.log(`Book with id ${bookId} does not exist.`);
        }
    }

    public userBookCheckOut(userId, bookId):void{
        let user = BookManagement.allUsers.get(userId);
        if(BookManagement.bookList.has(bookId)){
            if(user!['issuedBooks'].length < 3){
                let book = BookManagement.bookList.get(bookId);
                if(book!['available']){
                    book!['available'] = false;
                    user!['issuedBooks'].push(book!['bookId']);
                    BookManagement.allUsers.set(userId, user!);
                    BookManagement.bookList.set(bookId, book!);
                    console.log("Checkout Successful!")
                }
                else{
                    console.log("The book is currently unavailable!")
                }
            }
            else{
                console.log("Sorry! You cannot checkout the book. You have exceeded the checkout limit!")
            }
        }
        else{
            console.log("There is no book registered with the entered Id!")
        }
    }

    public userBookCheckIn(userId, bookId):void{
        let user = BookManagement.allUsers.get(userId);
        if(BookManagement.bookList.has(bookId)){
            let book = BookManagement.bookList.get(bookId);
            if(!book!['available'])
            {
                book!['available'] = true;
                user!['issuedBooks'] = user!['issuedBooks'].filter(id => id!=bookId);
                console.log(user);
                BookManagement.allUsers.set(userId, user!);
                BookManagement.bookList.set(bookId, book!);
            }
            else{
                console.log("Book with the entered book id is already checked-in!");
            }
        }
        else{
            console.log("There is no book registered with the entered Id!")
        }
    }
}

let book1 = new Book("Alchemist", "Paolo Cohelo");
let book2 = new Book("The Great Gatsby", "F. Scott Fitzgerald");
let book3 = new Book("1984", "George Orwell");
let book4 = new Book("Brave New World", "Aldous Huxley");
let book5 = new Book("Pride and Prejudice", "J.D. Salinger");
let book6 = new Book("The Catcher in the Rye", "J.D. Salinger");

BookManagement.bookList.set(book1.bookId, book1);
BookManagement.bookList.set(book2.bookId, book2);
BookManagement.bookList.set(book3.bookId, book3);
BookManagement.bookList.set(book4.bookId, book4);
BookManagement.bookList.set(book5.bookId, book5);
BookManagement.bookList.set(book6.bookId, book6);

let user1 = new User("Jennie Jane");
let user2 = new User("Rose Park");
let user3 = new User("Sana Zhang");
let user4 = new User("Mark Lee");
let user5 = new User("Karina");
let user6 = new User("Giselle");


BookManagement.allUsers.set(user1.userId.toLowerCase(), user1);
BookManagement.allUsers.set(user2.userId.toLowerCase(), user2);
BookManagement.allUsers.set(user3.userId.toLowerCase(), user3);
BookManagement.allUsers.set(user4.userId.toLowerCase(), user4);
BookManagement.allUsers.set(user5.userId.toLowerCase(), user5);
BookManagement.allUsers.set(user6.userId.toLowerCase(), user6);