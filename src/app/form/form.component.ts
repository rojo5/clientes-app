import { Component, OnInit } from '@angular/core';
import { Cliente } from '../clientes/Cliente';
import { ClientesService } from '../clientes/clientes.service';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

   public cliente: Cliente = new Cliente();

  public titulo: string = "Crear Cliente";
  
  constructor(private clientesService: ClientesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
    //console.log(this.cliente)
  }

  cargarCliente(): void{
    this.activatedRoute.params.subscribe(
      params => {
        let id= params['id']
        if(id){
          this.clientesService.getCliente( (cliente)  => this.cliente = cliente)

        }
      }
    )
  }

  public create(): void{

    this.clientesService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes']);
        //swal('Nuevo cliente', `El ${cliente.nombre} ${cliente.apellido} se ha creado correctamente`, 'success');

        Swal.fire('Nuevo cliente', `El ${cliente.nombre} ${cliente.apellido} se ha creado correctamente`, 'success')
      });

  }

}
