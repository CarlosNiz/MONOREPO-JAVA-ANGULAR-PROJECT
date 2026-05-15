export type LicenseStatus = 'ATIVA' | 'EXPIRANDO' | 'EXPIRADA';

export interface License {
    id: string;
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