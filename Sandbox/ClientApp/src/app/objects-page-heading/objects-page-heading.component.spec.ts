import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsPageHeadingComponent } from './objects-page-heading.component';

describe('ObjectsPageHeadingComponent', () => {
  let component: ObjectsPageHeadingComponent;
  let fixture: ComponentFixture<ObjectsPageHeadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectsPageHeadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectsPageHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
