import { Component, OnInit } from '@angular/core';
import { BffService } from '../../core/services/bff.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-testbff',
  templateUrl: './testbff.component.html',
  styleUrls: ['./testbff.component.css']
})
export class TestBffComponent implements OnInit {

  datos: any = [];  // Variable para almacenar los datos obtenidos
  loading: boolean = true;  // Estado de carga

  constructor(private bffService: BffService) { }

  ngOnInit(): void {
    // Llamamos al servicio para obtener los datos del BFF
    this.bffService.getDatos().subscribe(
      (response) => {
        console.log('Datos recibidos:', response);  // Log para verificar los datos
        this.datos = response;  // Asignamos los datos recibidos a la variable 'datos'
        this.loading = false;  // Cambiamos el estado de carga cuando obtenemos los datos
      },
      (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos', error);
        this.loading = false;
      }
    );
  }
}
