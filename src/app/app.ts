import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProdutoLista } from './component/produto-lista/produto-lista';

@Component({
  imports: [RouterOutlet, ProdutoLista],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('loja-virtual');
}
