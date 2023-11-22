export class Book{
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