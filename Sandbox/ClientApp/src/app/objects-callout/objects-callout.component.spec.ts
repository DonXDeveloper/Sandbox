import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsCalloutComponent } from './objects-callout.component';

describe('ObjectsCalloutComponent', () => {
  let component: ObjectsCalloutComponent;
  let fixture: ComponentFixture<ObjectsCalloutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectsCalloutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectsCalloutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
