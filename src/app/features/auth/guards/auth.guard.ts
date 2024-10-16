import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';
import {jwtDecode} from 'jwt-decode';


export const authGuard: CanActivateFn = (route, state) => {

  const cookiService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();

  //Check for the JWT Token
  let token = cookiService.get('Authorization');

  if (token && user) {
    token = token.replace('Bearer', '')
    const decodedToken: any = jwtDecode(token); 


    //Check if token has expired
    const expirationDate = decodedToken.exp * 1000;
    const cuurrentTime = new Date().getTime();

    if (expirationDate < cuurrentTime) {
      //Logout
      authService.logout();
      return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } })
    } else {
      //Token still valid
      if (user.roles.includes('Writer')) {
        return true;
      } else {
        alert('Unauthorized');
        return false;
      }
    }

  } else {
    //Logout
    authService.logout();
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } })
  }
};
