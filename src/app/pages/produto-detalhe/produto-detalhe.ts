import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../services/produto';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
	imports: [CommonModule, RouterLink, MatButtonModule],
  selector: 'app-produto-detalhe',
  styleUrl: './produto-detalhe.css',
  templateUrl: './produto-detalhe.html',
})
export class ProdutoDetalhe {
	produto = signal<any | null>(null);
	produtoNaoEncontrado = signal(false);

	constructor(private route: ActivatedRoute, private produtoService: ProdutoService) {

	}

	ngOnInit(): void {
		const id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.produtoService.getById(id).subscribe({
				next: (data) => {
					this.produto.set(data);
					this.produtoNaoEncontrado.set(!data);
				},
				error: (error) => {
					console.error('Erro:', error);
					this.produtoNaoEncontrado.set(true);
				},
			});
		}
	}
}
