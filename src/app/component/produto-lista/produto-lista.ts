import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto';

@Component({
  imports: [CommonModule],
  selector: 'app-produto-lista',
  styleUrl: './produto-lista.css',
  templateUrl: './produto-lista.html',
})
export class ProdutoLista implements OnInit {

  constructor(public ProdutoService: ProdutoService) {}

  produtos: any[] = [];

  ngOnInit(): void {
    this.ProdutoService.listarProdutos().subscribe({
      next: (data) => this.produtos = data,
      error: (error) => console.error('Erro:', error),
    });
  }
}
