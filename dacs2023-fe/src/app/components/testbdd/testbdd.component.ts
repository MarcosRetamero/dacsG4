import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BddService } from '../../core/services/bdd.service';
import { BddResponse } from '../../core/models/bdd.model';

@Component({
  selector: 'app-testbdd',
  templateUrl: './testbdd.component.html',
  styleUrls: ['./testbdd.component.css']
})
export class TestBddComponent implements OnInit {
  bddData!: BddResponse | null;  // Inicializa en null para evitar undefined

  constructor(private bddService: BddService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.bddService.getBddData().subscribe(
      (data : any) => {
        console.log('📥 Datos recibidos:', data);  // Verifica si los datos llegan correctamente
        this.bddData = data;
        this.cdr.detectChanges(); // Forzar actualización de la vista si es necesario
      },
      (error : any) => {
        console.error('❌ Error al obtener datos:', error);
      }
    );
  }
}
