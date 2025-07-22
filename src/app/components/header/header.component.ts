import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Menu, X } from 'lucide-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  isMenuOpen = false;
  menuIcon = Menu;
  closeIcon = X;
  @Input() logoSrc = 'assets/logoTS.png';
  @Input() logoAlt = 'LogoTechSolutions';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() isMobile = false;
  @Output() loginClick = new EventEmitter<void>();

  constructor(private router: Router) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  handleLogin() {
    console.log('Login clicked');
    this.router.navigate(['login']);
  }
  handleHome() {
    this.router.navigate(['']);
  }

  get sizeClass() {
    const sizes = {
      sm: 'h-8',
      md: 'h-12',
      lg: 'h-16',
    };
    return sizes[this.size];
  }

  onLoginClick() {
    this.loginClick.emit();
  }
}
