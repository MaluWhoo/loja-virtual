import { TestBed } from '@angular/core/testing';
import { CarrinhoService } from './carrinho';

describe('CarrinhoService', () => {
  let service: CarrinhoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarrinhoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update the cart quantity when items are added', () => {
    service.adicionarProduto({ id: 1, title: 'Produto 1', price: 10 });
    service.adicionarProduto({ id: 2, title: 'Produto 2', price: 20 });

    expect(service.quantidadeItens()).toBe(2);
    expect(service.quantidade()).toBe(2);
  });
});