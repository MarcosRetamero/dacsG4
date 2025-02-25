import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BddService } from '../../core/services/bdd.service';

@Component({
  selector: 'app-testbdd',
  templateUrl: './testbdd.component.html',
  styleUrls: ['./testbdd.component.css']
})
export class TestBddComponent implements OnInit {
  bddData: any[] = [];  // Usamos `any[]` en lugar de `BddResponse[]`

  constructor(private bddService: BddService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.bddService.getBddData().subscribe(
      (data: any) => {  // Ahora `data` es de tipo `any`
        console.log('📥 Datos recibidos:', data);
        this.bddData = data;  // Asigna los datos sin validación de tipo
        this.cdr.detectChanges();  // Fuerza actualización de la vista si es necesario
      },
      (error: any) => {
        console.error('❌ Error al obtener datos:', error);
      }
    );
  }
}
