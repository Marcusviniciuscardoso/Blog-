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
        const auth = localStorage.getItem('auth');
                
        if (!auth) {
            return false
        } else {
            const idProfile = localStorage.getItem('idProfile')
            this.router.navigate([`/profile/${idProfile}`])
            return true;
        }
    }
}
