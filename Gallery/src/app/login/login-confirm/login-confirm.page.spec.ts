import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginConfirmPage } from './login-confirm.page';

describe('LoginConfirmPage', () => {
  let component: LoginConfirmPage;
  let fixture: ComponentFixture<LoginConfirmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginConfirmPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
