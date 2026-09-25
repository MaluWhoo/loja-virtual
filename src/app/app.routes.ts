import { Routes } from '@angular/router';
import { ProdutoLista } from './component/produto-lista/produto-lista';
import { Carrinho } from './component/carrinho/carrinho';
import { ProdutoDetalhe } from './pages/produto-detalhe/produto-detalhe';

export const routes: Routes = [
  {
    path: '',
    component: ProdutoLista
  },
  {
    path: 'carrinho',
    component: Carrinho
  },
  { path: 'produto/:id', 
	component: ProdutoDetalhe 
  }
];