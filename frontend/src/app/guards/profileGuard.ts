import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class ProfileGuard implements CanActivate {
    constructor(private router: Router) {}
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        console.log('CanActivateChild called');
        const token = localStorage.getItem('token');
        console.log(token, 'toquinho');
        if (!token) {
            this.router.navigate(['/signIn'])
            return false
        } else {
            console.log(token)
            return true;
        }
    }
}
