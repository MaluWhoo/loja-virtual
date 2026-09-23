import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProdutoService {

    // Abrindo a porta o HttpClient
    constructor(private http: HttpClient) { }

    private chaveEstoque = 'estoque';
    produtos: any[] = [];

    listarProdutos() {
        return this.http.get<any>('https://fakestoreapi.com/products');
    }

    buscarProdutoPorId(id: number) {
        return this.http.get<any>(`https://fakestoreapi.com/products/${id}`);
    }

    obterEstoque(): { [id: number]: number } {
        const estoque = localStorage.getItem(this.chaveEstoque);

        if (estoque) {
            return JSON.parse(estoque);
        }

        return {};
    }

    obterQuantidade(id: number): number {
        const estoque = this.obterEstoque();
        return estoque[id] ?? 0;
    }

    adicionarEstoque(id: number, quantidade: number): void {
        const estoque = this.obterEstoque();

        estoque[id] = (estoque[id] ?? 0) + quantidade;

        localStorage.setItem(
            this.chaveEstoque,
            JSON.stringify(estoque)
        );
    }
}
