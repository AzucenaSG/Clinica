import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgendaPacientesPage } from './agenda-pacientes.page';

describe('AgendaPacientesPage', () => {
  let component: AgendaPacientesPage;
  let fixture: ComponentFixture<AgendaPacientesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgendaPacientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
