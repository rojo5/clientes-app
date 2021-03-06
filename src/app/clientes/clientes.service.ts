import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private endPoint = 'http://localhost:8081/api/clientes';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {

    // Primera forma
    // return this.http.get<Cliente[]>(this.endPoint);

    // Segunda forma
    return this.http.get(this.endPoint).pipe(
      map((response) => response as Cliente[])
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
     return this.http.post<Cliente>(this.endPoint, cliente, {headers: this.httpHeaders});
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.endPoint}/${id}`);
  }


  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.endPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders});
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.endPoint}/${id}`, {headers: this.httpHeaders});
  }

}
