import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from '../../components/admin/admin-header/admin-header.component';
import { ColaboradorListComponent } from '../../components/admin/colaborador-list/colaborador-list.component';
import { ConviteColaboradorComponent } from '../../components/admin/convite-colaborador/convite-colaborador.component';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, AdminHeaderComponent, ColaboradorListComponent, ConviteColaboradorComponent],
  templateUrl: './admin.component.html',
  styles: ``
})
export class AdminComponentPage {
  activeTab: 'colaboradores' | 'convites' = 'colaboradores';
}