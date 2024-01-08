import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCompComponent } from './all-comp.component';

describe('AllCompComponent', () => {
  let component: AllCompComponent;
  let fixture: ComponentFixture<AllCompComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllCompComponent]
    });
    fixture = TestBed.createComponent(AllCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
