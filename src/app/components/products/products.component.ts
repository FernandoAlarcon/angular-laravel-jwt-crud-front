import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild, HostListener, AfterViewInit,ChangeDetectorRef } from '@angular/core';
import { reportesService } from '../../services/reportes.service'; 
//// Modulos 
import * as $ from 'jquery'
import Swal from 'sweetalert2';

import * as bootstrap from "bootstrap";

//// MODELOS
import { Pagination } from 'src/app/models/reportes'; 
import { ActivatedRoute } from '@angular/router';
import { AnyPtrRecord } from 'dns';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'] 
})


export class reportesComponent implements OnInit {

  
  data     : string = '';
  reportes : any = {
    id: '',
    nombre:'',
    descripcion:'',
    cantidad:'',
    precio:'',
    categoria:''
  }
  Newreportes : any = { 
    nombre:'',
    descripcion:'',
    cantidad:'',
    precio:'',
    categoria:''
  }
  categories: any = [];
  reporteos : any = [];
  pagination: any = [];
 
   
  //@ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(  private reportesservice :ReportesService, 
                private activatedRoute: ActivatedRoute, 
                private categoriasservice:CategoriasService ) { }

  ngOnInit(): void {
    this.getreportes();
    this.GetCategories();
  }

  KeySearch(){
    this.pagination.current_page = 0;
    this.getreportes();
  }

  changePage(page: number):void{
    this.pagination.current_page = page;
    this.getreportes();
  }

  GetCategories():void {
    this.categoriasservice.getCategorias('',0).subscribe(
      (res:any) => {
        this.categories = res.categories.data
      }
    )
  } 

  getreportes():void{
    this.reportesservice.getreportes(this.data, this.pagination.current_page).subscribe(
      ( res:any) => {
        this.reporteos  = res.reporteos.data,
        this.pagination = res.pagination
      },
      (err: any) => console.error(err)
    )
  }

  Nuevosreporteos(): void {

    this.reportesservice.savereporteos(this.Newreportes)
    .subscribe(
      ( res:any) => {

        if(res.status){
          Swal.fire({
            icon: 'success',
            title: 'Bien echo',
            text: res.message
          })

          this.getreportes();
          this.Newreportes.id          = '';
          this.Newreportes.nombre      = '';
          this.Newreportes.descripcion = '';
          this.Newreportes.cantidad    = '';
          this.Newreportes.precio      = '';
          this.Newreportes.categoria   = ''; 
          //this.router.navigate(['/clientes']);
          $('#Nuevoreporteo').modal('hide');

        }else{

          Swal.fire({
            icon: 'error',
            title: 'error al ejecutar esto',
            text: res.message
          })

        }

      },
      err => console.log(err)
    );

  } 

  DataChange(Datareporteo: { id: string | undefined; nombre: string | undefined; descripcion: string | undefined; cantidad: string | undefined; precio: string | undefined; categoria: string | undefined; }): void {
   
    this.reportes.id          = Datareporteo.id;
    this.reportes.nombre      = Datareporteo.nombre;
    this.reportes.descripcion = Datareporteo.descripcion;
    this.reportes.cantidad    = Datareporteo.cantidad; 
    this.reportes.precio      = Datareporteo.precio;
    this.reportes.categoria   = Datareporteo.categoria; 
 
  }

  Deletereporteo(reporte: { id: any; }): void {
    if(confirm('Seguro que deseas eliminar')){
      this.reportesservice.deletereporteo(reporte.id)
      .subscribe(
        ( res:any)  => {
           this.getreportes();
        }, (err: any) => console.error(err)
      );
    }
  }
 
  Updatereporteo(): void { 

    this.reportesservice.updatereporteos(this.reportes.id , this.reportes).subscribe(
      (res:any) => {

        if(res.succes == true){
          this.reportes.id          = '';
          this.reportes.nombre      = '';
          this.reportes.descripcion = '';
          this.reportes.cantidad    = '';
          this.reportes.precio      = '';
          this.reportes.categoria   = ''; 
  
          this.getreportes();
          $('#Editarreporteo').modal('hide'); 

        }else{
          alert('Hubo un error');
        }    

     }, (err: any) => console.error(err)
    );
  }


}
function modal(modal: any) {
  throw new Error('Function not implemented.');
}

