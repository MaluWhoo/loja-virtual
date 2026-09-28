import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ProdutoService } from '../../services/produto';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

type FeedbackType = { tipo: 'sucesso' | 'erro'; mensagem: string } | null;

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
  feedback: FeedbackType = null;
  

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

      const produto = this.produtos().find((p: any) => p.id === id);
      const tituloProduto = produto ? produto.title : `ID ${id}`;

      this.ProdutoService.adicionarEstoque(id, quantidade);
      this.reposicaoEnviada = true;
      // console.log(`Adicionadas ${quantidade} unidades ao produto ${id}`);

      this.formItem.reset({
        id: null,
        quantidade: 1,
      });

      this.feedback = {
        tipo: 'sucesso',
        mensagem: `${quantidade} unidade(s) adicionadas ao produto "${tituloProduto}" com sucesso.`,
      };

    } else {
      this.feedback = {
        tipo: 'erro',
        mensagem: 'ID inválido ou produto não existe na base de dados.',
      };
    }
  }

  fecharFeedback(): void {
    this.feedback = null;
  }
}
