import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalisisnuevoPage } from './analisisnuevo.page';

describe('AnalisisnuevoPage', () => {
  let component: AnalisisnuevoPage;
  let fixture: ComponentFixture<AnalisisnuevoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AnalisisnuevoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
