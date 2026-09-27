import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Favorito, FavoritosService, Prioridade } from '../../../services/favoritos';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-favoritos-lista',
  styleUrl: './favoritos-lista.css',
  templateUrl: './favoritos-lista.html',
})
export class FavoritosLista {
  favoritos: Favorito[] = [];
  mostrarTodos = false;
  private readonly ordemPrioridade: Record<Prioridade, number> = {
    alta: 0,
    média: 1,
    baixa: 2
  };

  constructor(
    private favoritosService: FavoritosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mostrarTodos = this.route.snapshot.data['mostrarTodos'] === true;
    const favoritos = this.favoritosService.listar();
    this.favoritos = this.mostrarTodos
      ? favoritos.filter((favorito) =>
          favorito.produto &&
          (favorito.favorito === true || favorito.favorito === undefined)
        )
      : favoritos
          .filter((favorito) => favorito.produto && (favorito.wishlist === true || favorito.wishlist === undefined))
          .sort((a, b) => this.valorPrioridade(a) - this.valorPrioridade(b));
  }

  valorPrioridade(favorito: Favorito): number {
    return this.ordemPrioridade[favorito.prioridade] ?? this.ordemPrioridade.média;
  }

  voltarParaInicio(): void {
    this.router.navigate(['/']);
  }
}
