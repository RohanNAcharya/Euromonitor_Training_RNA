import { inject } from "@angular/core"
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

export const CanActivateUser = () => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
    const toastr: ToastrService = inject(ToastrService);

    let currentUser = JSON.parse(sessionStorage.getItem('currentUser')!);

    if(authService.loggedIn && currentUser.role === "employee"){
        return true;
    }
    else{
        router.navigate(['/login']);
        toastr.warning("Unauthorised access. Please login to access the home page.");
        return false;
    }
}