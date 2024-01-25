import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitaRegistradaPage } from './cita-registrada.page';

describe('CitaRegistradaPage', () => {
  let component: CitaRegistradaPage;
  let fixture: ComponentFixture<CitaRegistradaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CitaRegistradaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
