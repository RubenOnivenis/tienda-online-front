import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private _encargosService:EncargosService,
    private router:Router
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

  //AÑADIR ENCARGO

  aniadirEncargo(){
    this.rellenarEncargo();
    this._encargosService.aniadirEncargo(this.encargos)
      .subscribe(respuesta => {
        this.aniadirProducto_x_encargo();
        this.vaciarCesta();
        this.rutaPerfil();
      });
    
  }

  rellenarEncargo(){
    this.encargos = {
      id_usuario:1,
      precio_encargo:this.precioTotal*1.1,
      fch_pedido: this.hoy
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
      this.producto_x_encargo = {
        id_usuario:1,
        id_producto: productoCesta.id_producto,
        //cantidad:this.cantidadProducto
      }
      for(let i = 0; i < document.getElementsByName("cantidadProducto").length; i++){
        this.cantidadProducto = parseInt((<HTMLInputElement>document.getElementsByName("cantidadProducto")[i]).value);
        this.producto_x_encargo.cantidad = this.cantidadProducto;        
      }
      if(parseFloat(productoCesta.precio_oferta)){
        this.producto_x_encargo.precio_producto = this.producto_x_encargo.cantidad*parseFloat(productoCesta.precio_oferta)
      }else{
        this.producto_x_encargo.precio_producto = this.producto_x_encargo.cantidad*parseFloat(productoCesta.precio)
      }
    }
  }

  //VACIAR CESTA AL ENCARGAR PEDIDO

  vaciarCesta(){
    this._cestaService.borrarCesta(1)
      .subscribe(respuesta => {})
  }

  rutaPerfil(){
    this.router.navigate(['/perfil', 1]);
  }
}
