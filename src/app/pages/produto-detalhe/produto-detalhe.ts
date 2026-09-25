import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../services/produto';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
	imports: [CommonModule, RouterLink],
  selector: 'app-produto-detalhe',
  styleUrl: './produto-detalhe.css',
  templateUrl: './produto-detalhe.html',
})
export class ProdutoDetalhe {
	produto: any= null;
	produtoNaoEncontrado = false;

	constructor(private route: ActivatedRoute, private produtoService: ProdutoService) {

	}

	ngOnInit(): void {
		const id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.produtoService.listarProdutoPorId(Number(id)).subscribe({
				next: (data) => {
					this.produto = data;
					this.produtoNaoEncontrado = !data;
				},
				error: (error) => {
					console.error('Erro:', error);
					this.produtoNaoEncontrado = true;
				},
			});
		}
	}
}
