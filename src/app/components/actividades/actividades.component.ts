import { Component, OnInit } from '@angular/core';

///SERVICES

import { ActividadesService } from '../../services/actividades.service'; 

/// MODELS  
import { Categories } from 'src/app/models/category';
import Swal from 'sweetalert2';

import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadComponent implements OnInit {

  closeResult = '';

  data               : string = '';
  TotalHoras         : number = 0;
  TotalHorasllevas   : number = 0;
  HorasReporte       : number = 0;
  BuscarReportes     : string = '';
  GetActividadesData : any    = [];
  ReportesData       : any    = [];

  ModalReportes : boolean  = false;

  Actividad    : any = {
    id     : '', 
    actividad:'', 
    horas: 0
  }

  NewActividades : any = { 
    actividad:'', 
    horas:''
  }

  pagination: any = [];

  constructor(private actividadesService:ActividadesService) { }

  ngOnInit(): void {
    this.GetActividades()
  } 
  changePage(page: number):void{
    this.pagination.current_page = page;
    this.GetActividades();
  }

  KeySearch(){
    this.pagination.current_page = 0;
    this.GetActividades();
  } 

  GetActividades():void {
    this.actividadesService.getActividades(this.data, this.pagination.current_page).subscribe(
      (res:any) => {
        this.GetActividadesData = res.actividad.data
        this.pagination        = res.pagination
      }
    )
  }

  DataChange(DataCat : any){ 

    
    this.ModalReportes = true;
    this.Actividad.id        = DataCat.id;
    this.Actividad.actividad = DataCat.actividad;
    this.Actividad.horas     = parseInt(DataCat.horas);
  }

  UpdateCat(): void { 

    this.actividadesService.updateActividades(this.Actividad).subscribe(
      (res:any) => {

        if(res.status){ 
 
          Swal.fire({
            icon: 'success',
            title: 'Bien echo',
            text: res.message
          })

          this.Actividad.actividad   = '';
          this.Actividad.horas       = ''; 
  
          this.GetActividades();
          $('#Editarcat').modal('hide'); 

        }else{
          
          Swal.fire({
            icon: 'error',
            title: 'error al ejecutar esto',
            text: res.message
          })

        }    

     }, (err: any) => console.error(err)
    );
  }

  getReportes(Data: any){
    this.ReportesData = [];

    this.actividadesService.getReportes(this.BuscarReportes, this.pagination.current_page, Data.id).subscribe(
      (res:any) => {
        this.ReportesData = res.reportes.data
        this.pagination   = res.pagination
        this.TotalHoras   = this.Actividad.horas;
        this.TotalHorasllevas = 0;
        for (let index = 0; index < this.ReportesData.length; index++) {
          let hora =  parseInt(this.ReportesData[index].horas);
          this.TotalHorasllevas = this.TotalHorasllevas + hora;
        }

      }
    )
  }

  AddReporte(){

    let sumaHoras = this.HorasReporte + this.TotalHorasllevas;

    if(sumaHoras > this.TotalHoras){
      Swal.fire({
        icon: 'error',
        title: 'error al ejecutar esto',
        text: 'horas superadas al maximo'
      })
    }else{

      let reporte = {
        horas : this.HorasReporte,
        actividad : this.Actividad.id
      }
  
      this.actividadesService.saveReportes(reporte).subscribe(
        (res:any) => {
   
          if(res.status){
            

            this.getReportes(this.Actividad.id);
            this.HorasReporte  = 0;  

            Swal.fire({
              icon: 'success',
              title: 'Buen trabajo',
              text: res.message
            })

            this.ModalReportes = false;
            
  
          }else{

            Swal.fire({
              icon: 'error',
              title: 'error al ejecutar esto',
              text: res.message
            })
            
          }
  
        }, err => console.log(err)
      );

    }

  }

  SaveNewActividad(){

    this.actividadesService.saveActividades(this.NewActividades).subscribe(
      (res:any) => {

        if(res.status){
          
          this.GetActividades();
          Swal.fire({
            icon: 'success',
            title: 'Bien echo',
            text: res.message
          })
          this.NewActividades.horas     = '';
          this.NewActividades.actividad = '';
          $('#NewActividad').modal('hide');



        }else{

          Swal.fire({
            icon: 'error',
            title: 'error al ejecutar esto',
            text: res.message
          })

        }

      }, err => console.log(err)
    );
  }

  DeleteCat(Cat: { id: any; }): void {
    if(confirm('Seguro que deseas eliminar')){
      this.actividadesService.deleteActividades(Cat.id)
      .subscribe(
        ( res:any )  => {

          if(res.status){

            this.GetActividades();
            Swal.fire({
              icon: 'success',
              title: 'Bien echo',
              text: res.message
            })

          }else{

            Swal.fire({
              icon: 'error',
              title: 'error al ejecutar esto',
              text: res.message
            })

          }

          

          }, (err: any) => console.error(err)
      );
    }
  }

}
