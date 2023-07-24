import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(false);
  isDarkMode = this.darkMode.asObservable();

  constructor() {}

  setDarkMode(isDarkMode: boolean) {
    this.darkMode.next(isDarkMode);
  }
}
