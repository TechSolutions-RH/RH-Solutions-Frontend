import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { LucideAngularModule, Search, Download, Edit } from 'lucide-angular';
import { ColaboradorDetailModalComponent } from '../colaborador-detail-modal/colaborador-detail-modal.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Colaborador,
  ColaboradorForDisplay,
} from '../../../models/colaborador';
import { BaseApiService } from '../../../services/base-api.service';

@Component({
  selector: 'app-colaborador-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    ColaboradorDetailModalComponent,
  ],
  templateUrl: './colaborador-list.component.html',
  styles: ``,
})
export class ColaboradorListComponent implements OnInit {
  readonly Search = Search;
  readonly Download = Download;
  readonly Edit = Edit;
  readonly Math = Math;

  colaboradores: ColaboradorForDisplay[] = [];
  loading: boolean = false;
  error: string | null = null;
  totalColaboradores: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  searchTerm: string = '';
  isModalOpen: boolean = false;
  selectedColaborador: ColaboradorForDisplay | null = null;
  currentUserRole: string = '';

  constructor(
    private http: HttpClient,
    private api: BaseApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.currentUserRole = currentUser.role;
    }
    this.loadColaboradores();
  }

  async loadColaboradores(): Promise<void> {
    try {
      this.loading = true;
      this.error = null;

      let params = new HttpParams()
        .set('page', this.currentPage.toString())
        .set('limit', this.itemsPerPage.toString());

      if (this.searchTerm) {
        params = params.set('search', this.searchTerm);
      }

      this.getColaboradores(params).subscribe({
        next: (response) => {
          this.colaboradores = this.mapColaboradoresForDisplay(
            response.data || (response as any)
          );
          this.totalColaboradores = response.total || response.length || 0;
          this.totalPages =
            response.totalPages ||
            Math.ceil(this.totalColaboradores / this.itemsPerPage);
          this.currentPage = response.page || this.currentPage;
        },
        error: (error) => {
          this.error = 'Erro ao carregar colaboradores. Tente novamente.';
        },
        complete: () => {
          this.loading = false;
        },
      });
    } catch (error) {
      this.error = 'Erro ao carregar colaboradores. Tente novamente.';
      this.loading = false;
    }
  }

  private getColaboradores(params: HttpParams): Observable<any> {
    return this.api.get('users', params);
  }

  private mapColaboradoresForDisplay(
    colaboradores: Colaborador[]
  ): ColaboradorForDisplay[] {
    return colaboradores.map((colaborador) => ({
      id: colaborador.id,
      nome: colaborador.name,
      email: colaborador.email,
      cpf: this.formatCPF(colaborador.cpf),
      telefone: this.formatPhone(colaborador.phone),
      endereco: this.formatAddress(colaborador),
      perfil: this.mapRoleToDisplay(colaborador.role),
      status: colaborador.isActive ? 'Ativo' : 'Inativo',
      dataCadastro: this.formatDate(colaborador.createdAt),
    }));
  }

  private mapRoleToDisplay(role: string): string {
    const roleMap: { [key: string]: string } = {
      admin: 'Administrador',
      hr: 'Gente e Cultura',
      collaborator: 'Colaborador Comum',
    };
    return roleMap[role] || role;
  }

  private formatCPF(cpf: string): string {
    if (!cpf || cpf.length !== 11) return cpf;
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  private formatPhone(phone: string): string {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(
        7
      )}`;
    }
    return phone;
  }

  private formatAddress(colaborador: Colaborador): string {
    const isValidField = (field: any): boolean => {
      return (
        field != null && typeof field === 'string' && field.trim().length > 0
      );
    };

    const parts: string[] = [];

    if (isValidField(colaborador.street)) {
      parts.push(colaborador.street.trim());
    }

    if (isValidField(colaborador.neighborhood)) {
      parts.push(colaborador.neighborhood.trim());
    }

    if (isValidField(colaborador.city)) {
      parts.push(colaborador.city.trim());
    }

    if (isValidField(colaborador.state)) {
      parts.push(colaborador.state.trim());
    }

    if (isValidField(colaborador.cep)) {
      parts.push(`CEP: ${colaborador.cep.trim()}`);
    }

    return parts.length > 0 ? parts.join(', ') : 'Endereço não informado';
  }

  private formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  searchColaboradores(): void {
    this.currentPage = 1;
    this.loadColaboradores();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.currentPage = 1;
    this.loadColaboradores();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadColaboradores();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  exportToExcel(): void {
    this.loading = true;

    let params = new HttpParams().set('format', 'excel');

    if (this.searchTerm) {
      params = params.set('search', this.searchTerm);
    }

    this.exportColaboradores(params).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `colaboradores_${
          new Date().toISOString().split('T')[0]
        }.xlsx`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        this.error = 'Erro ao exportar relatório. Tente novamente.';
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  private exportColaboradores(params: HttpParams): Observable<Blob> {
    return this.http.get('http://localhost:3000/users/export', {
      params,
      responseType: 'blob',
    });
  }

  editColaborador(colaborador: ColaboradorForDisplay): void {
    this.selectedColaborador = colaborador;
    this.isModalOpen = true;
  }

  canEditColaborador(colaborador: ColaboradorForDisplay): boolean {
    switch (this.currentUserRole) {
      case 'admin':
        return true;
      case 'hr':
        return colaborador.perfil !== 'Administrador';
      case 'employee':
      default:
        return false;
    }
  }

  getActionButtonClass(colaborador: ColaboradorForDisplay): string {
    if (this.canEditColaborador(colaborador)) {
      return 'flex items-center space-x-1 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium';
    } else {
      return 'flex items-center space-x-1 text-gray-400 cursor-not-allowed';
    }
  }

  getActionButtonTooltip(colaborador: ColaboradorForDisplay): string {
    if (this.canEditColaborador(colaborador)) {
      return 'Editar perfil do colaborador';
    }

    if (
      this.currentUserRole === 'hr' &&
      colaborador.perfil === 'Administrador'
    ) {
      return 'RH não pode editar Administradores';
    }

    return 'Sem permissão para editar';
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedColaborador = null;
  }

  onModalClosed(): void {
    this.closeModal();
  }

  reloadList(): void {
    this.searchTerm = '';
    this.currentPage = 1;
    this.loadColaboradores();
  }

  getPerfilBadgeClass(perfil: string): string {
    switch (perfil) {
      case 'Administrador':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Gente e Cultura':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Colaborador Comum':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  }

  getStatusBadgeClass(status: string): string {
    return status === 'Ativo'
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  }

  trackByColaborador(
    index: number,
    colaborador: ColaboradorForDisplay
  ): number {
    return colaborador.id;
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(
      1,
      this.currentPage - Math.floor(maxPagesToShow / 2)
    );
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }
}
