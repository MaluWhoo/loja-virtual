import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';

@Injectable({
    providedIn: 'root'
}) 
export class ProdutoService {

    // Abrindo a porta o HttpClient
    constructor(private http: HttpClient) {}

    listarProdutor() {
        return this.http.get<any>('https://fakestoreapi.com/products');
    }
}
