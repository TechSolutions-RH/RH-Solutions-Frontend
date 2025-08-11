import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, Download, Eye } from 'lucide-angular';
import { ColaboradorDetailModalComponent } from '../colaborador-detail-modal/colaborador-detail-modal.component';

@Component({
  selector: 'app-colaborador-list',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, ColaboradorDetailModalComponent],
  templateUrl: './colaborador-list.component.html',
  styles: ``
})
export class ColaboradorListComponent {
  readonly Search = Search;
  readonly Download = Download;
  readonly Eye = Eye;
}
