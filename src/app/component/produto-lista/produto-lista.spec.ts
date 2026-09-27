import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProdutoLista } from './produto-lista';

describe('ProdutoLista', () => {
  let component: ProdutoLista;
  let fixture: ComponentFixture<ProdutoLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoLista],
    }).compileComponents();

    fixture = TestBed.createComponent(ProdutoLista);
    component = fixture.componentInstance;
    component.produtos.set([
      {
        id: 1,
        title: 'Produto teste',
        category: 'electronics',
        price: 129.9,
        image: 'https://example.com/produto.png'
      }
    ]);
    component.categoriaSelecionada = 'electronics';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve mostrar campo de observação quando o item for marcado como com interesse', () => {
    const checkbox = fixture.debugElement.query(By.css('input[type="checkbox"][name="interesse-1"]'));
    expect(checkbox).toBeTruthy();

    checkbox.nativeElement.checked = true;
    checkbox.nativeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    const observacao = fixture.debugElement.query(By.css('textarea[name="observacao-1"]'));
    expect(observacao).toBeTruthy();
  });
});
