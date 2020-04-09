import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateReminderComponent } from './dialog-update-reminder.component';

describe('DialogUpdateReminderComponent', () => {
  let component: DialogUpdateReminderComponent;
  let fixture: ComponentFixture<DialogUpdateReminderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUpdateReminderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpdateReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
