import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DettagliPage } from './dettagli.page';

describe('DettagliPage', () => {
  let component: DettagliPage;
  let fixture: ComponentFixture<DettagliPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DettagliPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
