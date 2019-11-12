import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsTitleComponent } from './objects-title.component';

describe('ObjectsTitleComponent', () => {
  let component: ObjectsTitleComponent;
  let fixture: ComponentFixture<ObjectsTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectsTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectsTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
