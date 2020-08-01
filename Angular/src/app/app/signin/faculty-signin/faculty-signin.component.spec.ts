import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultySigninComponent } from './faculty-signin.component';

describe('FacultySigninComponent', () => {
  let component: FacultySigninComponent;
  let fixture: ComponentFixture<FacultySigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultySigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultySigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
