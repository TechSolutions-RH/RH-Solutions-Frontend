import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/dark-mode.service';
import { LucideAngularModule, Sun, Moon } from 'lucide-angular';

@Component({
  selector: 'app-dark-mode-toggle',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './dark-mode-toggle.component.html',
  styles: []
})
export class DarkModeToggleComponent implements OnInit, OnDestroy {
  isDarkMode = false;
  private subscription?: Subscription;
  Sun = Sun;
  Moon = Moon;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.subscription = this.themeService.isDarkMode$.subscribe((isDark: boolean) => {
      this.isDarkMode = isDark;
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  toggleTheme() {
    this.themeService.toggleDarkMode();
  }
}
