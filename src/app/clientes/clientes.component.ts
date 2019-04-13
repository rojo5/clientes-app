import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClientesService } from './clientes.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private clienteService: ClientesService) { }

  ngOnInit() {
    this.clienteService.getClientes()
      .subscribe(clientes => this.clientes = clientes);

  }

  delete(cliente: Cliente): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: `Vas a eleminar a ${cliente.nombre}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, quiero',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.clienteService.delete(cliente.id).subscribe(
          response => {

            this.clientes = this.clientes.filter(cli => cli !== cliente);

            swalWithBootstrapButtons.fire(
              '¡Eliminado!',
              'El cliente ha sido eliminado correctamente',
              'success'
            );
          }
        );


      }
    });
  }

}
