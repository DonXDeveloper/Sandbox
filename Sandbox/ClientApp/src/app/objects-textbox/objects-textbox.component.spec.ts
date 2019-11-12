import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsTextboxComponent } from './objects-textbox.component';

describe('ObjectsTextboxComponent', () => {
  let component: ObjectsTextboxComponent;
  let fixture: ComponentFixture<ObjectsTextboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectsTextboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectsTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
