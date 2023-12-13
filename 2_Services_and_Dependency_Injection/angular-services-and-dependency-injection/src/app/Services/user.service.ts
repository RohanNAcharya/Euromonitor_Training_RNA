import { EventEmitter, Injectable } from "@angular/core";
import { User } from "../Models/User";
import { LoggerService } from "./logger.service";

@Injectable()
export class UserService{
    users: User[] = [
        new User('Steve Smith', 'Male', 'Monthly', 'Active'),
        new User('Mary Jane', 'Female', 'Yearly', 'Inactive'),
        new User('Mark Tyler', 'Male', 'Quarterly', 'Active'),
    ];

    constructor(private logger: LoggerService){

    }

    onUserDetailsClicked: EventEmitter<User> = new EventEmitter<User>();

    OnShowUserDetails(user: User){
        this.onUserDetailsClicked.emit(user);
    }

    GetAllUsers(){
        return this.users;
    }

    CreateUser(name: string, gender: string, subType: string, status: string){
        let user = new User(name, gender, subType, status);
        this.users.push(user);
        this.logger.LogMessage(name, status);
    }
}