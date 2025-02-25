import { Component, OnInit } from '@angular/core';
import { BddService } from '../../core/services/bdd.service'; // Asegúrate de importar el servicio correctamente
import { BddResponse } from '../../core/models/bdd.model'; // Asegúrate de importar el modelo correctamente

@Component({
  selector: 'app-testbdd',
  templateUrl: './testbdd.component.html',
  styleUrls: ['./testbdd.component.css']
})
export class TestBddComponent implements OnInit {
  bddData: BddResponse | null = null;

  constructor(private bddService: BddService) {}

  ngOnInit(): void {
    this.bddService.getBddData().subscribe(
      (data : any) => {
        console.log('Datos recibidos:', data); // 🟢 Muestra los datos en la consola
        this.bddData = data; // Asigna los datos a la variable para el HTML
      },
      (error : any) => {
        console.error('Error al obtener datos:', error); // 🔴 Muestra el error si falla la petición
      }
    );
  }
}
