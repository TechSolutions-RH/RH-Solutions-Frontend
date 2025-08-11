import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { ConviteModalComponent } from '../convite-modal/convite-modal.component';
import { ConviteListComponent } from '../convite-list/convite-list.component';

@Component({
  selector: 'app-convite-colaborador',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ConviteModalComponent, ConviteListComponent],
  templateUrl: './convite-colaborador.component.html',
  styles: ``
})
export class ConviteColaboradorComponent {
  readonly Plus = Plus;
}
