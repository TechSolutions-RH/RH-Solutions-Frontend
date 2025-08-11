import { Component } from '@angular/core';
import { LucideAngularModule, User, LogOut } from 'lucide-angular';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './admin-header.component.html',
  styles: ``
})
export class AdminHeaderComponent {
  readonly User = User;
  readonly LogOut = LogOut;
}
