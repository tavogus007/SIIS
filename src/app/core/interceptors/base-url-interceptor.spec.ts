import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BASE_URL, BaseUrlInterceptor } from './base-url-interceptor';

describe('BaseUrlInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  const baseUrl = 'https://foo.bar';

  const setBaseUrl = (url: string | null) => {
    TestBed.overrideProvider(BASE_URL, { useValue: url });
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: BASE_URL, useValue: null },
        { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
  });

  afterEach(() => httpMock.verify());

  xit('should not prepend base url when base url is empty', () => {
    setBaseUrl(null);

    http.get('/me').subscribe(data => expect(data).toEqual({ success: true }));

    httpMock.expectOne('/me').flush({ success: true });
  });

  xit('should prepend base url when request url does not has http scheme', () => {
    setBaseUrl(baseUrl);

    http.get('./me').subscribe(data => expect(data).toEqual({ success: true }));
    httpMock.expectOne(baseUrl + '/me').flush({ success: true });

    http.get('').subscribe(data => expect(data).toEqual({ success: true }));
    httpMock.expectOne(baseUrl).flush({ success: true });
  });
});
