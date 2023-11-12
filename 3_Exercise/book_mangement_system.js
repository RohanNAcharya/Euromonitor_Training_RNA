"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var Book = /** @class */ (function () {
    function Book(bookName, authorName) {
        this.available = false;
        this.bookId = ++Book.bookInitialId;
        this.bookName = bookName;
        this.authorName = authorName;
        this.available = true;
    }
    Book.bookInitialId = 1000;
    return Book;
}());
var User = /** @class */ (function () {
    function User(userName) {
        this.userName = userName;
        this.userId = 'USER' + (++User.userIdNumber);
        this.issuedBooks = [];
        console.log("User Created!\nNew User LoginId:".concat(this.userId));
    }
    User.userIdNumber = 100;
    return User;
}());
var BookManagement = /** @class */ (function () {
    function BookManagement() {
        this.adminLogin = "user@Admin2023";
    }
    BookManagement.prototype.validateAdminCredentials = function (adminId) {
        if (adminId.toLocaleLowerCase() == this.adminLogin.toLowerCase()) {
            return true;
        }
        else {
            return false;
        }
    };
    BookManagement.prototype.setNewBooks = function (bookName, authorName) {
        var newBook = new Book(bookName, authorName);
        BookManagement.bookList.push(newBook);
        console.log("Added New Book!");
    };
    BookManagement.prototype.setNewUser = function (newUserName) {
        var newUser = new User(newUserName);
        BookManagement.allUsers.push(newUser);
    };
    BookManagement.prototype.getBookDetails = function (nameOrAuthor) {
        var found = false;
        for (var _i = 0, _a = BookManagement.bookList; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.bookName.toLocaleLowerCase() == nameOrAuthor.toLocaleLowerCase() || i.authorName.toLocaleLowerCase() == nameOrAuthor.toLocaleLowerCase()) {
                found = true;
                if (i.available) {
                    console.log("Book Details:\nID: ".concat(i.bookId, "\nName: ").concat(i.bookName, "\nAuthor Name: ").concat(i.authorName, "\nAvailability: Available"));
                }
                else {
                    console.log("Book Details:\nID: ".concat(i.bookId, "\nName: ").concat(i.bookName, "\nAuthor Name: ").concat(i.authorName, "\nAvailability: Not Available"));
                }
                break;
            }
        }
        if (!found) {
            console.log("Book Not found with the entered name or author name!");
        }
    };
    BookManagement.prototype.getAllBooks = function () {
        var allBooks = BookManagement.bookList;
        if (allBooks[0]) {
            console.log("All Books:");
            var j = 1;
            for (var _i = 0, allBooks_1 = allBooks; _i < allBooks_1.length; _i++) {
                var i = allBooks_1[_i];
                if (i.available) {
                    console.log("".concat(j, ". Book ID: ").concat(i.bookId, " | Name:").concat(i.bookName, " | Author Name: ").concat(i.authorName, " | [Available]"));
                }
                else {
                    console.log("".concat(j, ". Book ID: ").concat(i.bookId, " | Name:").concat(i.bookName, " | Author Name: ").concat(i.authorName, " | [Not Available]"));
                }
                j++;
            }
        }
        else {
            console.log("There are no books added!");
        }
    };
    BookManagement.prototype.removeBook = function (bookId) {
        var allBooks = BookManagement.bookList;
        var j = 0;
        if (allBooks[0]) {
            for (var _i = 0, allBooks_2 = allBooks; _i < allBooks_2.length; _i++) {
                var i = allBooks_2[_i];
                if (i.bookId == bookId) {
                    allBooks.splice(j, 1);
                    console.log("Book Removed!");
                    break;
                }
                j++;
            }
        }
        else {
            console.log("There are no books added!");
        }
    };
    BookManagement.prototype.validateUserCredentials = function (userId) {
        for (var _i = 0, _a = BookManagement.allUsers; _i < _a.length; _i++) {
            var i = _a[_i];
            if (userId.toLocaleLowerCase() == i.userId.toLocaleLowerCase()) {
                return true;
            }
        }
        return false;
    };
    BookManagement.prototype.userBookCheckOut = function (userId, bookId) {
        var checkOut = false;
        var book;
        var availability;
        for (var _i = 0, _a = BookManagement.bookList; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.bookId === bookId && i.available) {
                availability = i.available;
                checkOut = true;
                book = i;
                break;
            }
        }
        if (checkOut) {
            for (var _b = 0, _c = BookManagement.allUsers; _b < _c.length; _b++) {
                var j = _c[_b];
                if (j.userId.toLocaleLowerCase() == userId.toLocaleLowerCase()) {
                    if (j.issuedBooks.length < 3) {
                        j.issuedBooks.push(book);
                        console.log("Checkout Successful!");
                        book.available = false;
                        break;
                    }
                    else {
                        console.log('Sorry! You cannot checkout the book. You have exceeded the checkout limit!');
                        break;
                    }
                }
            }
        }
        else {
            console.log('Book is not available currently!');
        }
    };
    BookManagement.prototype.userBookCheckIn = function (userId, bookId) {
        var currentUserBooks;
        var successful = false;
        for (var _i = 0, _a = BookManagement.allUsers; _i < _a.length; _i++) {
            var j = _a[_i];
            if (j.userId.toLocaleLowerCase() == userId.toLocaleLowerCase()) {
                currentUserBooks = j.issuedBooks;
                break;
            }
        }
        if (currentUserBooks) {
            var indexOfBook = currentUserBooks.findIndex(function (book) { return book.bookId === bookId; });
            if (indexOfBook !== -1) {
                currentUserBooks.splice(indexOfBook, 1);
                console.log("Check-in Successful");
                successful = true;
            }
            else {
                console.log("Book not found in the user's issued books.");
            }
        }
        if (successful) {
            for (var _b = 0, _c = BookManagement.bookList; _b < _c.length; _b++) {
                var k = _c[_b];
                if (k.bookId == bookId) {
                    k.available = true;
                    break;
                }
            }
        }
    };
    BookManagement.bookList = [];
    BookManagement.allUsers = [];
    return BookManagement;
}());
var options = "1. Login as Admin\n2. Login as User\n3. Exit\nEnter your choice:";
var adminOptions = "1. Add new Books\n2. Add new user\n3. Search book details by title or author\n4. View Books\n5. Remove a book\n6. Return to user login page\n7. Exit\nEnter your choice:";
var userOptions = "1. View Books\n2. Search book details by title or author\n3. Check-out a book\n4. Check-in a book\n5. Return to user login page\n6. Exit\nEnter your choice:";
function getUserInput() {
    rl.question(options, function (userInput) {
        switch (userInput) {
            case '1':
                var admin_1 = new BookManagement();
                console.log("You selected option 1: Login as admin");
                rl.question("Enter Admin Id: ", function (adminId) {
                    // Admin Operations
                    function adminOperations() {
                        rl.question(adminOptions, function (userInput) {
                            switch (userInput) {
                                case '1':
                                    // console.log("Add new Books");
                                    rl.question("Enter Book Name: ", function (bookName) {
                                        rl.question("Enter Book Author Name: ", function (authorName) {
                                            admin_1.setNewBooks(bookName, authorName);
                                            adminLikeToContinue();
                                        });
                                    });
                                    break;
                                case '2':
                                    rl.question("Enter New User Name: ", function (newUserName) {
                                        admin_1.setNewUser(newUserName);
                                        adminLikeToContinue();
                                    });
                                    break;
                                case '3':
                                    rl.question("Enter the book name or author name: ", function (nameOrAuthor) {
                                        admin_1.getBookDetails(nameOrAuthor);
                                        adminLikeToContinue();
                                    });
                                    break;
                                case '4':
                                    console.log('View Books');
                                    admin_1.getAllBooks();
                                    adminLikeToContinue();
                                    break;
                                case '5':
                                    rl.question("Enter the book id: ", function (bookId) {
                                        admin_1.removeBook(Number(bookId));
                                        adminLikeToContinue();
                                    });
                                    break;
                                case '6':
                                    console.log('Return to the user login page.');
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
                        });
                    }
                    function adminLikeToContinue() {
                        rl.question("Would you like to continue? Y-Yes or N-No: ", function (userChoice) {
                            if (userChoice.toLowerCase() == 'y') {
                                adminOperations();
                            }
                            else {
                                console.log('Thank You Admin!\nExiting the program.\n');
                                rl.close();
                                return;
                            }
                        });
                    }
                    if (admin_1.validateAdminCredentials(adminId)) {
                        console.log("Welcome Admin");
                        adminOperations();
                    }
                    else {
                        console.log("Invalid Login Id!!");
                        rl.question("Re-enter Admin Id: ", function (adminId) {
                            if (admin_1.validateAdminCredentials(adminId)) {
                                console.log("Welcome Admin");
                                adminOperations();
                            }
                            else {
                                console.log("Invalid Login Id!!");
                                rl.close();
                            }
                        });
                    }
                });
                break;
            case '2':
                var user_1 = new BookManagement();
                console.log("You selected option 1: Login as user");
                rl.question("Enter User Id: ", function (userId) {
                    // User Operations
                    function userOperations() {
                        rl.question(userOptions, function (userInput) {
                            switch (userInput) {
                                case '1':
                                    console.log('View Books');
                                    user_1.getAllBooks();
                                    userLikeToContinue();
                                    break;
                                case '2':
                                    rl.question("Enter the book name or author name: ", function (nameOrAuthor) {
                                        user_1.getBookDetails(nameOrAuthor);
                                        userLikeToContinue();
                                    });
                                    break;
                                case '3':
                                    console.log('Check-out Book');
                                    rl.question("Enter the book id to check-out : ", function (bookId) {
                                        user_1.userBookCheckOut(userId, Number(bookId));
                                        userLikeToContinue();
                                    });
                                    break;
                                case '4':
                                    console.log('Check-in Book');
                                    rl.question("Enter the book id to check-in: ", function (bookId) {
                                        user_1.userBookCheckIn(userId, Number(bookId));
                                        userLikeToContinue();
                                    });
                                    break;
                                case '5':
                                    console.log('Return to the user login page.');
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
                        });
                    }
                    function userLikeToContinue() {
                        rl.question("Would you like to continue? Y-Yes or N-No: ", function (userChoice) {
                            if (userChoice.toLowerCase() == 'y') {
                                userOperations();
                            }
                            else {
                                console.log('Thank You User!\nExiting the program.\n');
                                rl.close();
                                return;
                            }
                        });
                    }
                    if (user_1.validateUserCredentials(userId)) {
                        console.log("Welcome!");
                        userOperations();
                    }
                    else {
                        console.log("Invalid Login Id!!");
                        rl.question("Re-enter Admin Id: ", function (userId) {
                            if (user_1.validateUserCredentials(userId)) {
                                console.log("Welcome!");
                                userOperations();
                            }
                            else {
                                console.log("Invalid Login Id!!");
                                rl.close();
                            }
                        });
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
var book1 = new Book("Alchemist", "Paolo Cohelo");
var book2 = new Book("Three Thousand Stitches", "Sudha Murthy");
var book3 = new Book("The Adventures of Tom Sawyer", "Mark Twin");
var book4 = new Book("You Can Win", "Shiv Khera");
var books = [book1, book2, book3, book4];
(_a = BookManagement.bookList).push.apply(_a, books);
var user1 = new User("Jennie");
var user2 = new User("Rose");
var user3 = new User("Sana");
var user4 = new User("Mark");
var user5 = new User("Lucas");
var users = [user1, user2, user3, user4, user5];
(_b = BookManagement.allUsers).push.apply(_b, users);
console.log(BookManagement.bookList);
console.log(BookManagement.allUsers);
console.log("||Welcome to Library||");
getUserInput();
