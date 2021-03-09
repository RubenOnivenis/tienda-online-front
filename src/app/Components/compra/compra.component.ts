import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CestaService } from 'src/app/services/cesta.service';
import { encargosDatos, EncargosService } from 'src/app/services/encargos.service';
import { productosDatos, productosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styles: []
})
export class CompraComponent implements OnInit {

  encargos: any = {};
  encargosArray: any [] = [];
  producto_x_encargo: any = {};
  productos: any = {};
  productosCesta: any [] = [];
  precioTotal!:number;
  cantidadProducto!:number;
  hoy: Date = new Date();

  constructor(
    private activatedRoute:ActivatedRoute,
    private _productosService:productosService,
    private _cestaService:CestaService,
    private _encargosService:EncargosService
  ) { 
    this.activatedRoute.params.subscribe(parametros => {
    })
  }

  ngOnInit(): void {
    this.verProductosCesta();
  }
  
  //PRODUCTOS DE LA CESTA

  verProductosCesta(){
    this._cestaService.productosCesta(1)
      .subscribe((respuesta:any) => {
        this.productosCesta = respuesta;
        this.calcularTotal();
      })
  }

  eliminarProducto(id_cesta:number){
    this._cestaService.borrarProductoCesta(id_cesta)
      .subscribe(respuesta => {
        this.verProductosCesta();
      })
  }

  calcularTotal(){
    this.precioTotal = 0;
    for(let i = 0; i < document.getElementsByName("cantidadProducto").length; i++){
      this.cantidadProducto = parseInt((<HTMLInputElement>document.getElementsByName("cantidadProducto")[i]).value);
      if(parseFloat(this.productosCesta[i].precio_oferta)){
        this.precioTotal = this.precioTotal + parseFloat(this.productosCesta[i].precio_oferta)*this.cantidadProducto;
      }else{
        this.precioTotal = this.precioTotal + parseFloat(this.productosCesta[i].precio)*this.cantidadProducto;
      }
    }
    return this.precioTotal;
  }

  //PRODUCTOS

  getProductos(){
    this._productosService.getProductos()
      .subscribe( (productos:any) => {
        this.productos = productos;
      } )
  }

  //ENCARGOS GET

  getEncargos(){
    this._encargosService.getEncargos()
      .subscribe((respuesta: any) => {
        this.encargosArray = respuesta;
      })
  }

  ///////////////////ENCARGOS

  encargarProducto(){
    /*console.log(this.encargos);
    console.log(this.producto_x_encargo);*/
    /*console.log(this.aniadirEncargo());
    this.aniadirProducto_x_encargo();*/
    //console.log(this.aniadirProducto_x_encargo());
    this.aniadirEncargo();
    this.aniadirProducto_x_encargo();
  }

  //AÑADIR ENCARGO

  aniadirEncargo(){
    this.rellenarEncargo();
    this._encargosService.aniadirEncargo(this.encargos)
      .subscribe(respuesta => {});
    this.getEncargos();
  }

  rellenarEncargo(){
    this.encargos = {
      id_usuario:1,
      precio_encargo:this.precioTotal*1.1,
      fch_pedido: new Date,
      fch_encargo_enviado: this.hoy.getDate()+1,
      fch_encargo_recibido: this.hoy.getDate()+8
    }
  }

  //AÑADIR PRODUCTO_X_ENCARGO

  aniadirProducto_x_encargo(){
    this.rellenarProducto_x_encargo();
    this._encargosService.aniadirProducto_x_encargo(this.producto_x_encargo)
      .subscribe(respuesta => {});
  }

  rellenarProducto_x_encargo(){
    for(let productoCesta of this.productosCesta){
      if(parseFloat(productoCesta.precio_oferta)){
        this.producto_x_encargo = {
          id_encargo: this.encargosArray.length,
          id_producto: 4,
          cantidad:1,
          precio_producto: this.producto_x_encargo.cantidad*parseFloat(productoCesta.precio_oferta)
        }
      }else{
        this.producto_x_encargo = {
          id_encargo: this.encargosArray.length,
          id_producto: 5,
          cantidad:1,
          precio_producto: this.producto_x_encargo.cantidad*parseFloat(productoCesta.precio)
        }
      }
    }
    
  }
}
