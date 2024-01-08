import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { SignInService } from '../service/api/signIn/sign-in.service';

@Injectable()
export class signInAuth implements CanActivate {
    constructor(private router: Router, private signinservice: SignInService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        console.log('CanActivateChild called');
        const auth = localStorage.getItem('auth');
                
        if (!auth) {
            console.log("Deu não")
            return false
        } else {
            const idProfile = localStorage.getItem('idProfile')
            console.log("navegar para topic")
            console.log("idProfilee", idProfile)
            this.router.navigate([`/profile/${idProfile}`])
            return true;
        }
    }
}
