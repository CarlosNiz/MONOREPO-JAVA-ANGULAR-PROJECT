export type EquipmentStatus = 'ATIVO' | 'INATIVO' | 'EM_MANUTENCAO' | 'DESCARTADO';

export interface Equipment {
  id: string;
  name: string;
  type: string;
  serialNumber: string;
  brand: string;
  model: string;
  status: EquipmentStatus;
  assignedUserId?: string;   
  assignedUsername: string;
  createdAt: string;
}

export interface EquipmentRequest {
    name: string;
    type: string;
    serialNumber: string;
    brand?: string;
    model?: string;
    status: EquipmentStatus;
    assignedUsername?: string;
}