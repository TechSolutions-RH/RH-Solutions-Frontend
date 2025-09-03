export interface Colaborador {
  id: number;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  isActive: boolean;
  role: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  createdAt: string;
  updatedAt: string;
}

// Interface para resposta da API
export interface ColaboradorResponse {
  data: Colaborador[];
  total: number;
  page: number;
  totalPages: number;
}

// Enum para roles 
export enum UserRole {
  ADMIN = 'admin',
  HR = 'hr', 
  COLLABORATOR = 'collaborator' 
}

// Interface com mapeamento de roles amigáveis (para exibição)
export interface ColaboradorForDisplay {
  id: number;
  nome: string; 
  email: string;
  cpf: string;
  telefone: string; 
  endereco: string; 
  perfil: string; 
  status: string;
  dataCadastro: string; 
}