/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RepaymentComponent } from './Repayment.component';

describe('RepaymentComponent', () => {
  let component: RepaymentComponent;
  let fixture: ComponentFixture<RepaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepaymentComponent ]
    })
    .compileComponents();
  })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  }
  );
}
);
