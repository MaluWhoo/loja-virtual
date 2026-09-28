import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Service } from '@angular/core';
import { retry, timeout } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProdutoService {
    URL_STORE = 'https://fakestoreapi.com/';

    // Abrindo a porta o HttpClient
    constructor(private http: HttpClient,) { }

    private platformId = inject(PLATFORM_ID);

    private chaveEstoque = 'estoque';
    produtos: any[] = [];

    // listarProdutos() {
    //     return this.http.get<any>('https://fakestoreapi.com/products');
    // }

    buscarProdutoPorId(id: number) {
        return this.http.get<any>(`https://fakestoreapi.com/products/${id}`);
    }

    obterEstoque(): { [id: number]: number } {
        if (isPlatformBrowser(this.platformId)) {
            const estoque = localStorage.getItem(this.chaveEstoque);

            if (estoque) {
                return JSON.parse(estoque);
            }
        }

        return {};
    }

    obterQuantidade(id: number): number {
        const estoque = this.obterEstoque();
        return estoque[id] ?? 0;
    }

    adicionarEstoque(id: number, quantidade: number): void {
        const estoque = this.obterEstoque();

        if (isPlatformBrowser(this.platformId)) {
            estoque[id] = (estoque[id] ?? 0) + quantidade;

            localStorage.setItem(
                this.chaveEstoque,
                JSON.stringify(estoque)
            );
        }
    }
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
