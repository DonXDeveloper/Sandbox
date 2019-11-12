import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsDateComponent } from './objects-date.component';

describe('ObjectsDateComponent', () => {
  let component: ObjectsDateComponent;
  let fixture: ComponentFixture<ObjectsDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectsDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectsDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
