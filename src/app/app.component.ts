import { Component, OnDestroy } from '@angular/core';
import { ThemeService } from './theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy {
  private darkModeSubscription: Subscription;
  isDarkMode?: boolean; // Aggiungi '?' per rendere la proprietà nullable

  constructor(private themeService: ThemeService) {
    this.darkModeSubscription = this.themeService.isDarkMode.subscribe((value) => {
      this.isDarkMode = value;
    });
  }

  ngOnDestroy() {
    // Disiscrivi il componente quando non è più necessario per evitare memory leak
    this.darkModeSubscription.unsubscribe();
  }

  toggleTheme() {
    this.themeService.setDarkMode(!this.isDarkMode);
  }
}

