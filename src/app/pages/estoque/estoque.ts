import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
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
  produtos = signal<any[]>([]);
  erro = signal(false);

  formItem = new FormGroup({
    id: new FormControl(null, [Validators.required, Validators.min(1), this.validarId.bind(this)]),
    quantidade: new FormControl(1, [Validators.required, Validators.min(1)]),
  });

  validarId(control: AbstractControl): ValidationErrors | null {
    const idDigitado = Number(control.value);
    if (!idDigitado) return null;

    const existe = this.produtos().some((i: any) => i.id === idDigitado);
    return existe ? null : { idNaoEncontrado: true };
  }

  ngOnInit(): void {
    this.ProdutoService.listarProdutos().subscribe({
      next: (data) => {
        this.produtos.set(Array.isArray(data) ? data : []);
        this.formItem.get('id')?.updateValueAndValidity();
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
        this.erro.set(true);
      },
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
