import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsButtonComponent } from './objects-button.component';

describe('ObjectsButtonComponent', () => {
  let component: ObjectsButtonComponent;
  let fixture: ComponentFixture<ObjectsButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectsButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
