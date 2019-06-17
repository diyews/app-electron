import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZhihuComponent } from './zhihu.component';

describe('ZhihuComponent', () => {
  let component: ZhihuComponent;
  let fixture: ComponentFixture<ZhihuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZhihuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZhihuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
