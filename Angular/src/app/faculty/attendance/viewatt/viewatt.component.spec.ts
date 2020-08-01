import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewattComponent } from './viewatt.component';

describe('ViewattComponent', () => {
  let component: ViewattComponent;
  let fixture: ComponentFixture<ViewattComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewattComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewattComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
