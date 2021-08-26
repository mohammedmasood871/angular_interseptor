import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, materialize, dematerialize, delay } from 'rxjs/operators';
import { RegisteredUsers } from 'data.interface';

const ok = (body: any) => {
  return of(new HttpResponse({ status: 200, body }));
};
const error = (message: any) => {
  return throwError({ error: { message } });
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser') ?? '');
};
const getRegisteredUsers = () => {
  const registeredUsers = localStorage.getItem('registeredUsers');
  return registeredUsers ? JSON.parse(registeredUsers) : [];
};
@Injectable()
export class InterseptorService {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, body } = req;
    const registeredUsers = getRegisteredUsers();
    return of(null)
      .pipe(
        mergeMap(() => {
          if (url.endsWith('/loginAuth') && method == 'POST') {
            const { name, password } = body;
            const loggedInUser = registeredUsers.filter(
              (usr: any) =>
                usr.name === name ||
                (usr.name === name && usr.password === password)
            );
            if (loggedInUser.length == 0) {
              return error('Email or Password  do not match');
            } else {
              return ok([
                {
                  name: loggedInUser[0].name,
                  role: loggedInUser[0].role,
                  token: 'fake-jwt-token',
                },
              ]);
            }
          }
          if (url.endsWith('/registerAuth') && method == 'POST') {
            const { name } = body;
            const loggedInUser = registeredUsers.filter(
              (usr: any) => usr.name === name
            );
            if (loggedInUser.length == 0) {
              registeredUsers.push(body);
              localStorage.setItem(
                'registeredUsers',
                JSON.stringify(registeredUsers)
              );
              return ok('Email / User name registered.. Login to continue');
            } else {
              return error(`User is already registered . Try Login`);
            }
          }
          return next.handle(req);
        })
      )
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}
export const backEndProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: InterseptorService,
  multi: true,
};
