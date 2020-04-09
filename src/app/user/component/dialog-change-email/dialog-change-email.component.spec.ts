import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChangeEmailComponent } from './dialog-change-email.component';

describe('DialogChangeEmailComponent', () => {
  let component: DialogChangeEmailComponent;
  let fixture: ComponentFixture<DialogChangeEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogChangeEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogChangeEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
