import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsDropdownComponent } from './objects-dropdown.component';

describe('ObjectsDropdownComponent', () => {
  let component: ObjectsDropdownComponent;
  let fixture: ComponentFixture<ObjectsDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectsDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
