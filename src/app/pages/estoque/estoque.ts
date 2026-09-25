import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProdutoService } from '../../services/produto';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-estoque',
  styleUrl: './estoque.css',
  templateUrl: './estoque.html',
})
export class Estoque {

  constructor(public ProdutoService: ProdutoService) { }

  reposicaoEnviada = false;
  produtos: any[] = [];

  formItem = new FormGroup({
    id: new FormControl(null, [Validators.required, Validators.min(1)]),
    quantidade: new FormControl(1, [Validators.required, Validators.min(1)]),
  });

  validarId(control: AbstractControl): ValidationErrors | null {
    const idDigitado = Number(control.value);
    if (!idDigitado) return null;

    const existe = this.produtos.some(i => i.id === idDigitado);
    return existe ? null : { idNaoEncontrado: true };
  }

  ngOnInit(): void {
    this.ProdutoService.listarProdutos().subscribe({
      next: (data) => {
        this.produtos = data,
          this.formItem.get('id')?.addValidators(this.validarId.bind(this));
        this.formItem.get('id')?.updateValueAndValidity();
      },
      error: (error) => console.error('Erro:', error),
    });
  }

  enviar() {
    if (this.formItem.valid) {
      const id = this.formItem.value.id!;
      const quantidade = this.formItem.value.quantidade!;

      this.ProdutoService.adicionarEstoque(id, quantidade);
      this.reposicaoEnviada = true;
      console.log(`Adicionadas ${quantidade} unidades ao produto ${id}`);

      this.formItem.reset({
        id: null,
        quantidade: 1,
      });

      setTimeout(() => {
        this.reposicaoEnviada = false;
      }, 4000);

    } else {
      console.log('ID inválido ou produto não existe na base de dados.');
    }
  }
}
