import { inject } from "@angular/core"
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LocalStorageService } from "../services/local-storage.service";
import { Iuser } from "../interfaces/Iuser";

export const CanActivateUser = () => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
    const toastr: ToastrService = inject(ToastrService);
    const localStorageService: LocalStorageService = inject(LocalStorageService);

    let currentUser: Iuser = localStorageService.getUserItem('currentUser');

    if(authService.loggedIn && currentUser.role === "employee"){
        return true;
    }
    else{
        router.navigate(['/login']);
        toastr.warning("Unauthorised access. Please login to access the home page.");
        return false;
    }
}

export const CanActivateManager = () => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
    const toastr: ToastrService = inject(ToastrService);
    const localStorageService: LocalStorageService = inject(LocalStorageService);

    let currentUser: Iuser = localStorageService.getUserItem('currentUser');

    if(authService.loggedIn && currentUser.role === "manager"){
        return true;
    }
    else{
        router.navigate(['/login']);
        toastr.warning("Unauthorised access. Please login to access the home page.");
        return false;
    }
}