import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { retry, timeout } from 'rxjs';

@Injectable({
    providedIn: 'root'
}) 
export class ProdutoService {
	URL_STORE = 'https://fakestoreapi.com/';
    // Abrindo a porta o HttpClient
    constructor(private http: HttpClient) {}

        getById(id: string) {
            return this.http.get<any>(`${this.URL_STORE}/products/${id}`).pipe(
                timeout(10000),
                retry({ count: 2, delay: 1000 })
            );
        }

    listarProdutos() {
        return this.http.get<any[]>(`${this.URL_STORE}/products`).pipe(
            timeout(10000),
            retry({ count: 2, delay: 1000 })
        );
    }

	listarProdutoPorId(id: number) {
        return this.http.get<any>(`${this.URL_STORE}/products/${id}`);
	}
}
