import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LicenseService } from '../../../core/services/license.service';
import { LicenseStatus } from '../../../shared/models/license.model';

@Component({
  selector: 'app-license-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './license-form.html',
  styleUrl: './license-form.scss'
})
export class LicenseForm implements OnInit {

  form: FormGroup;
  isEditMode = false;
  licenseId: string | null = null;
  loading = false;
  errorMessage = '';

  statusOptions: LicenseStatus[] = ['ATIVA', 'EXPIRANDO', 'EXPIRADA'];

  constructor(
    private fb: FormBuilder,
    private licenseService: LicenseService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      softwareName: ['', Validators.required],
      licenseKey: ['', Validators.required],
      vendor: [''],
      totalSeats: [null],
      usedSeats: [null],
      expirationDate: ['', Validators.required],
      status: ['ATIVA', Validators.required]
    });
  }

  ngOnInit(): void {
    this.licenseId = this.route.snapshot.paramMap.get('id');
    if (this.licenseId) {
      this.isEditMode = true;
      this.loadLicense();
    }
  }

  loadLicense(): void {
    if (!this.licenseId) return;

    this.loading = true;
    this.licenseService.findById(this.licenseId).subscribe({
      next: (license) => {
        this.form.patchValue(license);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    const request = this.isEditMode && this.licenseId
      ? this.licenseService.update(this.licenseId, this.form.value)
      : this.licenseService.create(this.form.value);

    request.subscribe({
      next: () => this.router.navigate(['/licenses']),
      error: (err) => {
        this.errorMessage = err.message;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}