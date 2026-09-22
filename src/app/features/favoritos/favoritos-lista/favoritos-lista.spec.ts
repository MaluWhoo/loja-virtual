import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritosLista } from './favoritos-lista';

describe('FavoritosLista', () => {
  let component: FavoritosLista;
  let fixture: ComponentFixture<FavoritosLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritosLista],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritosLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
