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

  public titulo = 'Crear Cliente';

  constructor(private clientesService: ClientesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
    // console.log(this.cliente)
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(
      params => {
        const id = params.id;
        if (id) {
          this.clientesService.getCliente(id).subscribe( (cliente)  => this.cliente = cliente);

        }
      }
    );
  }

  public create(): void {

    this.clientesService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes']);
        Swal.fire('Nuevo cliente', `Cliente ${cliente.nombre} ${cliente.apellido} se ha creado correctamente`, 'success');
      });

  }


  update(): void {
    this.clientesService.update(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes']);
        Swal.fire('Cliente actualizado', `Cliente ${cliente.nombre} ${cliente.apellido} se ha actualizao correctamente`, 'success');
      }
    );
  }

}
