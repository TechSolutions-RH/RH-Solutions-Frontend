import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, User, LogOut } from 'lucide-angular';
import { AuthService } from '../../../services/auth.service';
import { DarkModeToggleComponent } from '../../dark-mode-toggle/dark-mode-toggle.component';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, DarkModeToggleComponent],
  templateUrl: './admin-header.component.html',
  styles: ``
})
export class AdminHeaderComponent implements OnInit {
  readonly User = User;
  readonly LogOut = LogOut;
  
  userRole: string = '';
  userName: string = '';
  showUserMenu: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.userRole = this.mapRoleToDisplay(currentUser.role);
      this.userName = currentUser.name || 'Usuário';
    }
  }

  private mapRoleToDisplay(role: string): string {
    const roleMap: { [key: string]: string } = {
      'admin': 'Administrador',
      'hr': 'Gente e Cultura',
      'collaborator': 'Colaborador'
    };
    return roleMap[role] || role;
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  closeUserMenu(): void {
    this.showUserMenu = false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getRoleBadgeClass(): string {
    const role = this.authService.getCurrentUser()?.role;
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200';
      case 'hr':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200';
      case 'collaborator':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  }
}
