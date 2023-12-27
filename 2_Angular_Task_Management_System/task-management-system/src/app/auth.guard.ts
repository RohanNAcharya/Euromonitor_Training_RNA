import { inject } from "@angular/core"
import { AuthService } from "./Services/auth.service"
import { Router } from "@angular/router";

export const CanActivate = () => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    if(authService.loggedIn){
        return true;
    }
    else{
        router.navigate(['/home']);
        return false;
    }
}