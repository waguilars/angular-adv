import { MedicosComponent } from './medicos.component';
import { MedicosService } from './medicos.service';
import { of, throwError } from 'rxjs';

describe('MedicosComponent', () => {
  let componente: MedicosComponent;
  const service = new MedicosService(null);

  beforeEach(() => {
    componente = new MedicosComponent(service);
  });

  it('Init: should load the medicos', () => {
    const medicos = ['medico1', 'medico2', 'medico3'];
    spyOn(service, 'getMedicos').and.callFake(() => {
      return of([medicos]);
    });

    componente.ngOnInit();

    expect(componente.medicos.length).toBeGreaterThan(0);
  });

  it('should call server to add an medico', () => {
    const spy = spyOn(service, 'agregarMedico').and.callFake((medico) => {
      return of([]);
    });
    componente.agregarMedico();

    expect(spy).toHaveBeenCalled();
  });

  it('should add a new medico to array', () => {
    const medico = {
      id: 1,
      name: 'Juan',
    };

    spyOn(service, 'agregarMedico').and.returnValue(of(medico));
    componente.agregarMedico();

    expect(componente.medicos.indexOf(medico)).toBeGreaterThanOrEqual(0);
  });

  it('if the add fails, should be equal to the service error', () => {
    const myError = 'No se pudo agregar el medico';

    spyOn(service, 'agregarMedico').and.returnValue(throwError(myError));

    componente.agregarMedico();
    expect(componente.mensajeError).toBe(myError);
  });

  it('should call to server to delete medico', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const spy = spyOn(service, 'borrarMedico').and.returnValue(of([]));

    componente.borrarMedico('1');

    expect(spy).toHaveBeenCalledWith('1');
  });

  it('should not call to server to delete medico', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    const spy = spyOn(service, 'borrarMedico').and.returnValue(of([]));

    componente.borrarMedico('1');

    expect(spy).not.toHaveBeenCalledWith('1');
  });
});
