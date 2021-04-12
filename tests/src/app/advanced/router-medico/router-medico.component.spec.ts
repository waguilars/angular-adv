import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterMedicoComponent } from './router-medico.component';
import { Router, ActivatedRoute } from '@angular/router';
import { of, Observable, Subject, from } from 'rxjs';

describe('RouterMedicoComponent', () => {
  let component: RouterMedicoComponent;
  let fixture: ComponentFixture<RouterMedicoComponent>;

  class FakeRouter {
    navigate(params) {}
  }

  class FakeActivatedRoute {
    // params: Observable<any> = of({ });

    private subject = new Subject();

    push(value) {
      this.subject.next(value);
    }

    get params() {
      return this.subject.asObservable();
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RouterMedicoComponent],
      providers: [
        { provide: Router, useClass: FakeRouter },
        { provide: ActivatedRoute, useClass: FakeActivatedRoute, useValue: {
          params: from([{id: 'nuevo'}])
        } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe redireccionar a medico cuando se guarde', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');

    component.saveMedico();

    expect(spy).toHaveBeenCalledWith(['medico', '123']);
  });

  it('Debe de colocar el id = nuevo ', () => {
    component = fixture.componentInstance;
    expect(component.id).toBe('nuevo');
  })
  
});
