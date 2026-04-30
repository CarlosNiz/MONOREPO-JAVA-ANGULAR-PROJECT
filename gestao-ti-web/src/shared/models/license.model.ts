export type LicenseStatus = 'ATIVO' | 'EXPIRANDO' | 'EXPIRADA';

export interface License {
    id: number;
    softwareName: string;
    licenseKey: string;
    vendor: string;
    totalSeats: number;
    usedSeats: number;
    expirationDate: Date;
    status: LicenseStatus;
    createdAt: string;
}

export interface LicenseRequest {
    softwareName: string;
    licenseKey: string;
    vendor?: string;
    totalSeats?: number;
    usedSeats?: number;
    expirationDate: Date;
    status: LicenseStatus;
}