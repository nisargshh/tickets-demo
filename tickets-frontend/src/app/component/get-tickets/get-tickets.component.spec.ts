import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTicketsComponent } from './get-tickets.component';

describe('GetTicketsComponent', () => {
  let component: GetTicketsComponent;
  let fixture: ComponentFixture<GetTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetTicketsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
