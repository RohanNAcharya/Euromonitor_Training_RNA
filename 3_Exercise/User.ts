export class User{
    static userIdNumber:number = 100;
    public userName:string;
    public userId:string;
    public issuedBooks:number[];

    constructor(userName:string){
        this.userName = userName;
        this.userId = 'USER' + (++User.userIdNumber);
        this.issuedBooks = [];
        console.log(`User Created!\nNew User LoginId:${this.userId}`);
    }
}