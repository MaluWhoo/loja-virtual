import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritosDetalhe } from './favoritos-detalhe';

describe('FavoritosDetalhe', () => {
  let component: FavoritosDetalhe;
  let fixture: ComponentFixture<FavoritosDetalhe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritosDetalhe],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritosDetalhe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
