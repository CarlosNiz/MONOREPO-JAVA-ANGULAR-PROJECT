export type EquipamentStatus = 'ATIVO' | 'INATIVO' | 'EM_MANUTENCAO' | 'DESCARTADO';

export interface Equipment {
    id: number;
    name: string;
    type: string;
    serialNumber: string;
    brand: string;
    model: string;
    status: EquipamentStatus;
    assignedUsername: string;
    createdAt: string;
}   

export interface EquipmentRequest {
    name: string;
    type: string;
    serialNumber: string;
    brand?: string;
    model?: string;
    status: EquipamentStatus;
    assignedUsername?: string;
}