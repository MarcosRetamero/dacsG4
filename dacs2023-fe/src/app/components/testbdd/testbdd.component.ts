import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BddService } from '../../core/services/bdd.service';

@Component({
  selector: 'app-testbdd',
  templateUrl: './testbdd.component.html',
  styleUrls: ['./testbdd.component.css']
})
export class TestBddComponent implements OnInit {
  bddData: any[] = [];  // Aseguramos que bddData es un array vacío desde el inicio

  constructor(private bddService: BddService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.bddService.getBddData().subscribe(
      (data: any) => {
        console.log('📥 Datos recibidos:', data);
        this.bddData = Array.isArray(data) ? data : [];  // Asegura que sea un array
        this.cdr.detectChanges();
      },
      (error: any) => {
        console.error('❌ Error al obtener datos:', error);
      }
    );
  }
}
