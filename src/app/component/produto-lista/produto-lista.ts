import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-produto-lista',
  styleUrl: './produto-lista.css',
  templateUrl: './produto-lista.html',
})
export class ProdutoLista implements OnInit {

  constructor(public ProdutoService: ProdutoService) { }

  reposicaoEnviada = false;
  produtos: any[] = [];

  formItem = new FormGroup({
    id: new FormControl(null, [Validators.required, Validators.min(1)]),
    quantidade: new FormControl(1, [Validators.required, Validators.min(1)]),
  });

  ngOnInit(): void {
    this.ProdutoService.listarProdutos().subscribe({
      next: (data) => this.produtos = data,
      error: (error) => console.error('Erro:', error),
    });
  }

  enviar() {
    if (this.formItem.valid) {
      this.ProdutoService.adicionarEstoque(
        this.formItem.value.id!,
        this.formItem.value.quantidade!
      );

      this.reposicaoEnviada = true;
      console.log(`Adicionadas ${this.formItem.value.quantidade} unidades ao produto ${this.formItem.value.id}`);

      this.formItem.reset({
        id: null,
        quantidade: 1,
      });
    }
  }
}
