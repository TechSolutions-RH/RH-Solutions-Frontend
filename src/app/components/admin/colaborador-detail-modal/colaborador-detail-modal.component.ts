import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X, Save } from 'lucide-angular';

@Component({
  selector: 'app-colaborador-detail-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './colaborador-detail-modal.component.html',
  styles: ``
})
export class ColaboradorDetailModalComponent {
  readonly X = X;
  readonly Save = Save;
}
