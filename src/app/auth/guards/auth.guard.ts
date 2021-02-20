import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // if (this.authService.userAuth.id) {
    //   return true;
    // } else {
    //   console.log('CanActive - Bloqueado por el guard');
    //   return false;
    // }
    return this.authService.verificaAuth().pipe(
      tap((isAuth) => {
        console.log({ isAuth });
        if (isAuth) {
          return true;
        } else {
          this.router.navigate(['/auth/login']);
          return false;
        }
      })
    );
  }

  // tslint:disable-next-line: max-line-length
  // si puedo cargar un modulo, solo sirve para prevenir que el usuario carge el modulo, si ya estaba previamente cargado el modulo el usuario va poder entrar, puede cargar el modulo no si puede activar las rutas
  // solo restringe q se pueda cargar el modulo
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    // if (this.authService.userAuth.id) {
    //   return true;
    // } else {
    //   console.log('CanLoad - Bloqueado por el guard');
    //   return false;
    // }
    return this.authService.verificaAuth().pipe(
      tap((isAuth) => {
        console.log({ isAuth });
        if (isAuth) {
          return true;
        } else {
          this.router.navigate(['/auth/login']);
          return false;
        }
      })
    );
  }
}
