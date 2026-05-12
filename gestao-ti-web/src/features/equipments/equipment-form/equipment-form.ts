import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EquipmentService } from '../../../core/services/equipment.service';
import { EquipmentStatus } from '../../../shared/models/equipment.model';

@Component({
  selector: 'app-equipment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './equipment-form.html',
  styleUrl: './equipment-form.scss'
})
export class EquipmentForm implements OnInit {

  form: FormGroup;
  isEditMode = false;
  equipmentId: string | null = null;
  loading = false;
  errorMessage = '';

  statusOptions: EquipmentStatus[] = ['ATIVO', 'INATIVO', 'EM_MANUTENCAO', 'DESCARTADO'];

  constructor(
    private fb: FormBuilder,
    private equipmentService: EquipmentService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      serialNumber: ['', Validators.required],
      brand: [''],
      model: [''],
      status: ['ATIVO', Validators.required],
      assignedUserId: [null]
    });
  }

  ngOnInit(): void {
    this.equipmentId = this.route.snapshot.paramMap.get('id');
    if (this.equipmentId) {
      this.isEditMode = true;
      this.loadEquipment();
    }
  }

  loadEquipment(): void {
    if (!this.equipmentId) return;

    this.loading = true;
    this.equipmentService.findById(this.equipmentId).subscribe({
      next: (equipment) => {
        this.form.patchValue(equipment);
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

    const request = this.isEditMode && this.equipmentId
      ? this.equipmentService.update(this.equipmentId, this.form.value)
      : this.equipmentService.create(this.form.value);

    request.subscribe({
      next: () => {
        this.router.navigate(['/equipments']);
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}