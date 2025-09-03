import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X, Save } from 'lucide-angular';
import { ColaboradorForDisplay } from '../../../models/colaborador';
import { AuthService } from '../../../services/auth.service';

interface RoleOption {
  value: string;
  label: string;
  canSelect: boolean;
}

@Component({
  selector: 'app-colaborador-detail-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './colaborador-detail-modal.component.html',
  styles: ``
})
export class ColaboradorDetailModalComponent implements OnChanges, OnInit {
  readonly X = X;
  readonly Save = Save;

  @Input() colaborador: ColaboradorForDisplay | null = null;
  @Input() isOpen: boolean = false;
  @Output() closed = new EventEmitter<void>();

  // Propriedades para o formulário
  selectedRole: string = '';
  password: string = '';
  currentUserRole: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.currentUserRole = currentUser.role;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['colaborador'] && this.colaborador) {
      this.selectedRole = this.colaborador.perfil;
      this.password = '';
    }
  }

  /**
   * Obter opções de perfil disponíveis baseado nas permissões
   */
  getAvailableRoles(): RoleOption[] {
    const allRoles = [
      { value: 'Colaborador Comum', label: 'Colaborador Comum' },
      { value: 'Gente e Cultura', label: 'Gente e Cultura' },
      { value: 'Administrador', label: 'Administrador' }
    ];

    return allRoles.map(role => ({
      ...role,
      canSelect: this.canSelectRole(role.value)
    }));
  }

  /**
   * Verificar se pode selecionar um perfil específico
   */
  private canSelectRole(targetRole: string): boolean {
    if (!this.colaborador) return false;

    switch (this.currentUserRole) {
      case 'admin':
        // Administrador pode alterar qualquer perfil para qualquer outro
        return true;

      case 'hr':
        // RH pode apenas trabalhar com Colaborador Comum e Gente e Cultura
        const allowedRoles = ['Colaborador Comum', 'Gente e Cultura'];
        
        // RH não pode mexer em Administradores
        if (this.colaborador.perfil === 'Administrador') return false;
        
        // RH só pode selecionar perfis permitidos
        return allowedRoles.includes(targetRole);

      default:
        return false;
    }
  }

  /**
   * Verificar se precisa mostrar campo de senha
   */
  shouldShowPasswordField(): boolean {
    if (!this.colaborador) return false;
    
    // Mostrar senha apenas quando está promovendo para um cargo administrativo
    const isPromoting = this.colaborador.perfil === 'Colaborador Comum' && 
                       (this.selectedRole === 'Gente e Cultura' || this.selectedRole === 'Administrador');
    
    return isPromoting;
  }

  /**
   * Verificar se houve mudanças
   */
  hasChanges(): boolean {
    return this.colaborador ? this.selectedRole !== this.colaborador.perfil : false;
  }

  /**
   * Fechar modal
   */
  closeModal(): void {
    this.closed.emit();
  }

  /**
   * Salvar alterações
   */
  saveChanges(): void {
    if (!this.colaborador || !this.hasChanges()) {
      alert('Nenhuma alteração foi feita.');
      return;
    }

    // Validar permissões
    if (!this.canSelectRole(this.selectedRole)) {
      alert('Você não tem permissão para alterar para este perfil.');
      return;
    }

    // Validar senha se necessário
    if (this.shouldShowPasswordField() && !this.password.trim()) {
      alert('Senha é obrigatória ao promover colaborador para perfil administrativo.');
      return;
    }

    // Validação específica para RH
    if (this.currentUserRole === 'hr' && this.colaborador.perfil === 'Administrador') {
      alert('RH não pode alterar perfis de Administradores.');
      return;
    }

    // Dados para enviar para a API
    const changeData = {
      colaboradorId: this.colaborador.id,
      colaboradorNome: this.colaborador.nome,
      perfilAtual: this.colaborador.perfil,
      novoRole: this.selectedRole,
      alteradoPor: this.currentUserRole,
      requerSenha: this.shouldShowPasswordField(),
      senha: this.password || null
    };

    console.log('Salvando alteração de perfil:', changeData);

    // Aqui irei fazer a chamada para a API:
    // this.colaboradorService.updateRole(changeData).subscribe({...});

    // Feedback visual
    const roleChangeMessage = `
      ✅ Perfil alterado com sucesso!
      
      👤 Colaborador: ${this.colaborador.nome}
      📝 De: ${this.colaborador.perfil}
      📝 Para: ${this.selectedRole}
      👨‍💼 Alterado por: ${this.getRoleDisplayName(this.currentUserRole)}
      ${this.shouldShowPasswordField() ? '\n🔐 Nova senha definida' : ''}
    `;

    alert(roleChangeMessage);
    this.closeModal();
  }

  /**
   * Mapear role para nome amigável
   */
  private getRoleDisplayName(role: string): string {
    const roleMap: { [key: string]: string } = {
      'admin': 'Administrador',
      'hr': 'Gente e Cultura',
      'collaborator': 'Colaborador Comum'
    };
    return roleMap[role] || role;
  }
}
