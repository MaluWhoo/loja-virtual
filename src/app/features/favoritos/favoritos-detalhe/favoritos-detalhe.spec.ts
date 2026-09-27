import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritosDetalheComponent } from './favoritos-detalhe';

describe('FavoritosDetalheComponent', () => {
  let component: FavoritosDetalheComponent;
  let fixture: ComponentFixture<FavoritosDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritosDetalheComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritosDetalheComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
