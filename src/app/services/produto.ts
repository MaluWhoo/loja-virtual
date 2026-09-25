import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';

@Injectable({
    providedIn: 'root'
}) 
export class ProdutoService {

    // Abrindo a porta o HttpClient
    constructor(private http: HttpClient) {}

    listarProdutos() {
        return this.http.get<any>('https://fakestoreapi.com/products');
    }

	listarProdutoPorId(id: number) {
        return this.http.get<any>(`https://fakestoreapi.com/products/${id}`);
	}
}
