import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewTaskComponent } from './dialog-new-task.component';

describe('DialogNewTaskComponent', () => {
  let component: DialogNewTaskComponent;
  let fixture: ComponentFixture<DialogNewTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogNewTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
