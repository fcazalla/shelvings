import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelvingDetailComponent } from './shelving-detail.component';

describe('ShelvingDetailComponent', () => {
  let component: ShelvingDetailComponent;
  let fixture: ComponentFixture<ShelvingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelvingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelvingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
