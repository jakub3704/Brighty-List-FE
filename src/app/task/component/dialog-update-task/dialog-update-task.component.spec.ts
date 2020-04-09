import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateTaskComponent } from './dialog-update-task.component';

describe('DialogUpdateTaskComponent', () => {
  let component: DialogUpdateTaskComponent;
  let fixture: ComponentFixture<DialogUpdateTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUpdateTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpdateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
