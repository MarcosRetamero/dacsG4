import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-user',
  templateUrl: './registro-user.component.html',
  styleUrls: ['./registro-user.component.css']
})
export class RegistroUserComponent {
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      edad: [null, [Validators.required, Validators.min(1), Validators.max(120)]],
      estatura: [null, [Validators.required, Validators.min(1), Validators.max(300)]],
      peso: [null, [Validators.required, Validators.min(1), Validators.max(500)]],
    });
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      console.log('Registro exitoso', this.formulario.value);
      alert(`Registro exitoso: ${JSON.stringify(this.formulario.value, null, 2)}`);
    }
  }
}
