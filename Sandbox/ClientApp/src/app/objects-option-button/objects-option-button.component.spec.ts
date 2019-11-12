import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsOptionButtonComponent } from './objects-option-button.component';

describe('ObjectsOptionButtonComponent', () => {
  let component: ObjectsOptionButtonComponent;
  let fixture: ComponentFixture<ObjectsOptionButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectsOptionButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectsOptionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
