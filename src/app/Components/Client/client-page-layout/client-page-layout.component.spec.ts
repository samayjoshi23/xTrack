import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPageLayoutComponent } from './client-page-layout.component';

describe('ClientPageLayoutComponent', () => {
  let component: ClientPageLayoutComponent;
  let fixture: ComponentFixture<ClientPageLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientPageLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
