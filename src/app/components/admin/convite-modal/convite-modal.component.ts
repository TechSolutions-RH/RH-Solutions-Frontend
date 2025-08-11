import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X, Info, Mail } from 'lucide-angular';

@Component({
  selector: 'app-convite-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './convite-modal.component.html',
  styles: ``
})
export class ConviteModalComponent {
  readonly X = X;
  readonly Info = Info;
  readonly Mail = Mail;
}
