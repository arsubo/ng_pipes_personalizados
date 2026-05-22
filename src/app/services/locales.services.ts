import { Injectable, signal } from '@angular/core';

export type availableLocale = 'es' | 'fr' | 'en';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private currentLocale = signal<availableLocale>('fr');

  constructor() {
    this.currentLocale.set((localStorage.getItem('locale') as availableLocale) ?? 'es');
  }

  get getLocale() {
    return this.currentLocale();
  }

  changeLocale(locale: availableLocale) {
    localStorage.setItem('locale', locale);
    this.currentLocale.set(locale);
    //recarga el navegador web para tomar el locale del mas alto nivel
    window.location.reload();
  }
}
