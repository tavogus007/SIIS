import { TestBed } from '@angular/core/testing';
import { TokenFactory, TokenService, currentTimestamp } from '@core/authentication';
import { LocalStorageService, MemoryStorageService } from '@shared/services/storage.service';
import { tap } from 'rxjs';

describe('TokenService', () => {
  let tokenService: TokenService;
  let tokenFactory: TokenFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: LocalStorageService, useClass: MemoryStorageService }],
    });
    tokenService = TestBed.inject(TokenService);
    tokenFactory = TestBed.inject(TokenFactory);
  });

  xit('should be created', () => {
    expect(tokenService).toBeTruthy();
  });

  xit('should get authorization header value', () => {
    tokenService.set({ access_token: 'token', token_type: 'bearer' });

    expect(tokenService.getBearerToken()).toEqual('Bearer token');
  });

  xit('cannot get authorization header value', () => {
    tokenService.set({ access_token: '', token_type: 'bearer' });

    expect(tokenService.getBearerToken()).toBe('');
  });

  xit('should not has exp when token has expires_in', () => {
    tokenService.set({ access_token: 'token', token_type: 'bearer' });

    tokenService
      .change()
      .pipe(tap(token => expect(token!.exp).toBeUndefined()))
      .subscribe();
  });

  xit('should has exp when token has expires_in', () => {
    const expiresIn = 3600;
    tokenService.set({ access_token: 'token', token_type: 'bearer', expires_in: expiresIn });

    tokenService
      .change()
      .pipe(tap(token => expect(token!.exp).toEqual(currentTimestamp() + expiresIn)))
      .subscribe();
  });
});
