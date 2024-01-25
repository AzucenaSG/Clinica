import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgendaAdminPage } from './agenda-admin.page';

describe('AgendaAdminPage', () => {
  let component: AgendaAdminPage;
  let fixture: ComponentFixture<AgendaAdminPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgendaAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
