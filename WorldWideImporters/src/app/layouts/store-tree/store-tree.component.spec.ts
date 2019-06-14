import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreTreeComponent } from './store-tree.component';

describe('StoreTreeComponent', () => {
  let component: StoreTreeComponent;
  let fixture: ComponentFixture<StoreTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
