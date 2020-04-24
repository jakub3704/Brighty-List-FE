import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewReminderComponent } from './dialog-new-reminder.component';

describe('DialogNewReminderComponent', () => {
  let component: DialogNewReminderComponent;
  let fixture: ComponentFixture<DialogNewReminderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogNewReminderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
