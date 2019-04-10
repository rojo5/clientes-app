import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private endPoint: string = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    
    // Primera forma
    //return this.http.get<Cliente[]>(this.endPoint);

    //Segunda forma
    return this.http.get(this.endPoint).pipe(
      map((response) => response as Cliente[])
    );
  }
}
