import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-entrenador',
  templateUrl: './registro-entrenador.component.html',
  styleUrls: ['./registro-entrenador.component.css']
})
export class RegistroEntrenadorComponent {
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      especialidad: ['', [Validators.required]],
      experiencia: [null, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      console.log('Registro de entrenador exitoso', this.formulario.value);
      alert(`Registro exitoso: ${JSON.stringify(this.formulario.value, null, 2)}`);
    }
  }
}
