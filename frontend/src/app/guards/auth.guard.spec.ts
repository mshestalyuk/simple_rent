import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access for logged-in users', () => {
    authService.isLoggedIn.and.returnValue(true);

    const canActivate = guard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{});
    expect(canActivate).toBe(true);
  });

  it('should deny access for not logged-in users and navigate to login', () => {
    authService.isLoggedIn.and.returnValue(false);

    const canActivate = guard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{});
    expect(canActivate).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
