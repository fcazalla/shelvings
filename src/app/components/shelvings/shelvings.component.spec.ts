import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelvingsComponent } from './shelvings.component';

describe('ShelvingsComponent', () => {
  let component: ShelvingsComponent;
  let fixture: ComponentFixture<ShelvingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelvingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelvingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
