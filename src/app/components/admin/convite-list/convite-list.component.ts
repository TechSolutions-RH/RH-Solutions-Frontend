import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Check, Clock, X, Mail } from 'lucide-angular';

@Component({
  selector: 'app-convite-list',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './convite-list.component.html',
  styles: ``
})
export class ConviteListComponent {
  readonly Check = Check;
  readonly Clock = Clock;
  readonly X = X;
  readonly Mail = Mail;
}
