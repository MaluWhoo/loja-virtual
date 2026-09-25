import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { retry, timeout } from 'rxjs';

@Injectable({
    providedIn: 'root'
}) 
export class ProdutoService {
    // Abrindo a porta o HttpClient
    constructor(private http: HttpClient) {}

        getById(id: string) {
            return this.http.get<any>(`https://fakestoreapi.com/products/${id}`).pipe(
                timeout(10000),
                retry({ count: 2, delay: 1000 })
            );
        }

    listarProdutor() {
        return this.http.get<any[]>('https://fakestoreapi.com/products').pipe(
            timeout(10000),
            retry({ count: 2, delay: 1000 })
        );
    }
}
