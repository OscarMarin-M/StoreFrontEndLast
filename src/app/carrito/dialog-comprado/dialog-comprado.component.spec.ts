import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCompradoComponent } from './dialog-comprado.component';

describe('DialogCompradoComponent', () => {
  let component: DialogCompradoComponent;
  let fixture: ComponentFixture<DialogCompradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCompradoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogCompradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
