// testbdd.component.ts
import { Component, OnInit } from '@angular/core';
import { BddService } from '../../core/services/bdd.service';  // Asegúrate de que la ruta sea correcta
import { BddResponse } from '../../core/models/bdd.model';
import { HttpErrorResponse } from '@angular/common/http';  // Importar HttpErrorResponse

@Component({
  selector: 'app-testbdd',
  templateUrl: './testbdd.component.html',
  styleUrls: ['./testbdd.component.css']
})
export class TestBddComponent implements OnInit {

  bddData: BddResponse | null = null;

  constructor(private bddService: BddService) { }

  ngOnInit(): void {
    this.bddService.getBddData().subscribe({
      next: (data: BddResponse) => {
        this.bddData = data;
      },
      error: (err: HttpErrorResponse) => {  // Especificamos el tipo de 'err'
        console.error('Error al obtener los datos', err.message);
      }
    });
  }
}
