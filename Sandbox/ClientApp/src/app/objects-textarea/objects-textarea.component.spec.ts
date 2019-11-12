import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsTextareaComponent } from './objects-textarea.component';

describe('ObjectsTextareaComponent', () => {
  let component: ObjectsTextareaComponent;
  let fixture: ComponentFixture<ObjectsTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectsTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectsTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
