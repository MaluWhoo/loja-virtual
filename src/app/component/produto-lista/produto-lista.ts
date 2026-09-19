import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ProdutoService } from '../../services/produto';
import { CarrinhoService } from '../../services/carrinho';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-produto-lista',
  styleUrl: './produto-lista.css',
  templateUrl: './produto-lista.html',
})
export class ProdutoLista implements OnInit {

  produtos = signal<any[]>([]);

  constructor(
    public ProdutoService: ProdutoService,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit(): void {
    this.ProdutoService.listarProdutor().subscribe({
      next: (data) => {
        this.produtos.set(data);
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
      },
    });
  }

  adicionarAoCarrinho(produto: any) {
    this.carrinhoService.adicionarProduto(produto);
    console.log('Produto adicionado ao carrinho:', produto);
  }
}