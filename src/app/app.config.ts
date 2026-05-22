import {
  ApplicationConfig,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';
import { LocaleService } from './services/locales.services';

registerLocaleData(localeEs, 'es');
registerLocaleData(localeFr, 'fr');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),

    {
      provide: LOCALE_ID,
      // useValue: 'fr',
      deps: [LocaleService],
      useFactory: (localeService: LocaleService) => localeService.getLocale,
    },
  ],
};
