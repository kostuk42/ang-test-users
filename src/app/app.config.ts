import { ApplicationConfig } from '@angular/core';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {ErrorInterceptor} from "../interceptors/error-interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi:false
    }
  ],
};
