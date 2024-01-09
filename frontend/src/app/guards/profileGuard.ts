import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class ProfileGuard implements CanActivate {
    constructor(private router: Router) {}
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        const token = localStorage.getItem('token');
        if (!token) {
            this.router.navigate(['/signIn'])
            return false
        } else {
            return true;
        }
    }
}
