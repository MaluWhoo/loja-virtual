import { Component, OnInit, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../../../services/produto';
import { FavoritosService } from '../../../services/favoritos';
import { ReactiveFormsModule } from '@angular/forms';

type Produto = {
  id: number;
  title: string;
  image: string;
  price: number;
};

@Component({
  imports: [CurrencyPipe, ReactiveFormsModule],
  selector: 'app-favoritos-detalhe',
  styleUrl: './favoritos-detalhe.css',
  templateUrl: './favoritos-detalhe.html',
})
export class FavoritosDetalheComponent implements OnInit {
  produto = signal<Produto | null>(null);
  form: FormGroup;
  enviado = false;
  salvo = false;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private favoritosService: FavoritosService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      motivo: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) {
        return;
      }

      this.salvo = false;
      this.form.reset();
      this.produto.set({
        id: Number(id),
        title: `Produto #${id}`,
        image: '',
        price: 0
      });

      this.produtoService.getById(id).subscribe({
        next: (produto: Produto) => this.produto.set(produto),
        error: () => undefined
      });
    });
  }

  favoritar() {
    this.enviado = true;
    const produto = this.produto();
    if (this.form.valid && produto) {
      this.favoritosService.adicionarFavorito(produto, this.form.value.motivo);
      this.salvo = true;
    }
  }
}