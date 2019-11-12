import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsBreadcrumbsComponent } from './objects-breadcrumbs.component';

describe('ObjectsBreadcrumbsComponent', () => {
  let component: ObjectsBreadcrumbsComponent;
  let fixture: ComponentFixture<ObjectsBreadcrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectsBreadcrumbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectsBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
