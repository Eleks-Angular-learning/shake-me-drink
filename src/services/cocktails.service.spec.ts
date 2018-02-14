import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { DATA_URL } from '../config/api';
import { CocktailsService, DATA_KEY } from './cocktails.service';
import { CocktailsList, SelectedIngredients, CocktailDetails } from './../app/app.models';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';

describe('CocktailsService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let cocktailsService: CocktailsService;
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [ HttpClientTestingModule ],
      // Provide the service-under-test and its dependencies
      providers: [
        HttpClient,
        CocktailsService,
        HttpErrorHandler,
        MessageService
      ]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    cocktailsService = TestBed.get(CocktailsService);
    messageService = TestBed.get(MessageService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('can instantiate service when inject service', () => {
    expect(cocktailsService instanceof CocktailsService).toBe(true);
  });

  it('can instantiate service with "new"', () => {
    expect(httpClient).not.toBeNull('http should be provided');
    const errorHandler: HttpErrorHandler  = TestBed.get(HttpErrorHandler);
    const service = new CocktailsService(httpClient, errorHandler);
    expect(service instanceof CocktailsService).toBe(true, 'new service should be ok');
  });

  ///////////////////////////////////////////////////////////
  /// ** Sample case for obtaining a collection of objects **
  ///////////////////////////////////////////////////////////
  describe('#getCocktails', () => {
    const COCKTAILS_URL = DATA_URL.COCKTAILS;

    beforeEach(() => {
      cocktailsService = TestBed.get(CocktailsService);
      messageService = TestBed.get(MessageService);
    });

    afterEach(() => {
      // After every test, assert that there are no more pending requests.
      httpTestingController.verify();
    });

    it('should return expected cocktails (called once)', () => {
      const expectedCocktails = makeCocktails(2);
      const responseData = makeResponse(2);
      cocktailsService.getCocktails().subscribe(
        cocktails =>
          expect(cocktails).toEqual(expectedCocktails, 'should return expected cocktails'),
        fail
      );
      // CocktailsService should have made one request to GET heroes from expected URL
      const req = httpTestingController.expectOne(COCKTAILS_URL);
      req.flush(responseData); // Respond with no cocktails
    });

    it('should be OK returning no cocktails', () => {
      const responseData = makeResponse();
      cocktailsService.getCocktails().subscribe(
        cocktails =>
          expect(cocktails.length).toEqual(0, 'should have empty cocktails array'),
        fail
      );
      const req = httpTestingController.expectOne(COCKTAILS_URL);
      req.flush(responseData); // Respond with no cocktails
    });

    it('should return expected cocktails (called multiple times)', () => {
      const responseData0 = makeResponse();
      const responseData1 = makeResponse(1);
      const responseData2 = makeResponse(2);
      const expectedCocktails = makeCocktails(2);
      cocktailsService.getCocktails().subscribe();
      cocktailsService.getCocktails().subscribe();
      cocktailsService.getCocktails().subscribe(
        cocktails => expect(cocktails).toEqual(expectedCocktails, 'should return expected cocktails'),
        fail
      );
      const requests = httpTestingController.match(COCKTAILS_URL);
      expect(requests.length).toEqual(3, 'calls to getCocktails()');
      // Respond to each request with different mock hero results
      requests[0].flush(responseData0);
      requests[1].flush(responseData1);
      requests[2].flush(responseData2);
    });

    // This service reports the error but finds a way to let the app keep going.
    it('should turn 404 into an empty cocktails result', () => {
      // respond with a 404 and the error message in the body
      const msg = 'deliberate 404 error 1';
      cocktailsService.getCocktails().subscribe(
        cocktails => {
            expect(messageService.messages[0]).toMatch(new RegExp(msg, 'gi'), 'should catch bad response status code');
            expect(cocktails.length).toEqual(0, 'should return empty cocktails array');
          },
        fail
      );
      const req = httpTestingController.expectOne(COCKTAILS_URL);
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });
  });

  ///////////////////////////////////////////////////////////
  /// ** Sample case for single item Object by ID **
  ///////////////////////////////////////////////////////////
  describe('#getCocktailById', () => {
    const BASE_URL = DATA_URL.COCKTAIL_BY_ID;
    // Expecting the query form of URL so should not 404 when id not found
    const makeUrl = (id: number) => `${BASE_URL}${id}`;

    beforeEach(() => {
      cocktailsService = TestBed.get(CocktailsService);
      messageService = TestBed.get(MessageService);
    });

    afterEach(() => {
      // After every test, assert that there are no more pending requests.
      httpTestingController.verify();
    });

    it('should return cocktail by selected id', () => {
      const id = 14029;
      const DETAILS_URL = makeUrl(id);
      const responseData1 = makeResponse(1);
      const expectedCocktail1 = makeCocktails(1)[0];
      cocktailsService.getCocktailById(id).subscribe(
        cocktail => expect(cocktail).toEqual(expectedCocktail1, 'should return the single cocktail object'),
        fail
      );
      const req = httpTestingController.expectOne(DETAILS_URL);
      expect(req.request.method).toEqual('GET');
      expect(req.request.url).toBe(DETAILS_URL);
      req.flush(responseData1);
    });

    // This service reports the error but finds a way to let the app keep going.
    it('should turn 404 error into return of the cocktail by selected id', () => {
      const id = 14029;
      const DETAILS_URL = makeUrl(id);
      // respond with a 404 and the error message in the body
      const msg = 'Common 404 error 2323';
      cocktailsService.getCocktailById(id).subscribe(
        cocktail => {
          expect(messageService.messages[0]).toMatch(new RegExp(msg, 'gi'), 'should catch bad response status code');
          expect(cocktail).toEqual(<CocktailDetails>{}, 'should return empty object');
        },
        fail
      );
      const req = httpTestingController.expectOne(DETAILS_URL);
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });
  });

  describe('#getIngredients', () => {
    const INGREDIENTS_URL = DATA_URL.INGREDIENTS;

    beforeEach(() => {
      cocktailsService = TestBed.get(CocktailsService);
      messageService = TestBed.get(MessageService);
    });

    afterEach(() => {
      // After every test, assert that there are no more pending requests.
      httpTestingController.verify();
    });

    it('should return expected ingredients (called once)', () => {
      const itemsCount = 2;
      const expectedIngredients = makeIngredients(itemsCount);
      const responseData = makeIngredientsResponse(itemsCount);
      cocktailsService.getIngredients().subscribe(
        ingredients =>
          expect(ingredients).toEqual(expectedIngredients, 'should return expected Ingredients'),
        fail
      );
      // CocktailsService should have made one request to GET ingredients from expected URL
      const req = httpTestingController.expectOne(INGREDIENTS_URL);
      expect(req.request.url).toBe(INGREDIENTS_URL);
      req.flush(responseData); // Respond with no cocktails
    });

    it('should be OK returning no ingredients', () => {
      const responseData = makeIngredientsResponse();
      cocktailsService.getIngredients().subscribe(
        ingredients =>
          expect(ingredients.length).toEqual(0, 'should have empty ingredients array'),
        fail
      );
      const req = httpTestingController.expectOne(INGREDIENTS_URL);
      req.flush(responseData); // Respond with no ingredients
    });

    it('should return expected ingredients (called multiple times)', () => {
      const responseData0 = makeIngredientsResponse();
      const responseData1 = makeIngredientsResponse(1);
      const responseData2 = makeIngredientsResponse(2);
      const expectedIngredients = makeIngredients(2);
      cocktailsService.getIngredients().subscribe();
      cocktailsService.getIngredients().subscribe();
      cocktailsService.getIngredients().subscribe(
        cocktails => expect(cocktails).toEqual(expectedIngredients, 'should return expected ingredients'),
        fail
      );
      const requests = httpTestingController.match(INGREDIENTS_URL);
      expect(requests.length).toEqual(3, 'calls to getIngredients()');
      // Respond to each request with different mock ingredients results
      requests[0].flush(responseData0);
      requests[1].flush(responseData1);
      requests[2].flush(responseData2);
    });

    // This service reports the error but finds a way to let the app keep going.
    it('should turn 404 into an empty ingredients result', () => {
      // respond with a 404 and the error message in the body
      const msg = 'deliberate 404 error 21111';
      cocktailsService.getIngredients().subscribe(
        cocktails => {
          expect(messageService.messages[0]).toMatch(new RegExp(msg, 'gi'), 'should catch bad response status code');
          expect(cocktails.length).toEqual(0, 'should return empty ingredients array');
        },
        fail
      );
      const req = httpTestingController.expectOne(INGREDIENTS_URL);
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });
  });

  describe('#getDrinksByIngredient', () => {
    const BY_INGREDIENT = DATA_URL.COCKTAILS_BY_INGREDIENT;
    const makeUrl = (ingredient: string): string => `${BY_INGREDIENT}${ingredient}`;

    beforeEach(() => {
      cocktailsService = TestBed.get(CocktailsService);
      messageService = TestBed.get(MessageService);
    });

    afterEach(() => {
      // After every test, assert that there are no more pending requests.
      httpTestingController.verify();
    });

    it('should return cocktail by selected Ingredient', () => {
      const ingredient = 'Amaretto';
      const BY_INGREDIENT_URL = makeUrl(ingredient);
      const expectedCocktails = makeCocktails(2);
      const responseData = makeResponse(2);
      cocktailsService.getDrinksByIngredient(ingredient).subscribe(
        cocktails => expect(cocktails).toEqual(expectedCocktails, 'should return the single cocktail object'),
        fail
      );
      const req = httpTestingController.expectOne(BY_INGREDIENT_URL);
      expect(req.request.method).toEqual('GET');
      expect(req.request.url).toBe(BY_INGREDIENT_URL);
      req.flush(responseData);
    });

    // This service reports the error but finds a way to let the app keep going.
    it('should turn 404 into an empty cocktails result', () => {
      const ingredient = 'Unknown';
      // respond with a 404 and the error message in the body
      const msg = 'deliberate 404 error 77777';
      const BY_INGREDIENT_URL = makeUrl(ingredient);
      cocktailsService.getDrinksByIngredient(ingredient).subscribe(
        cocktails => {
          expect(messageService.messages[0]).toMatch(new RegExp(msg, 'gi'), 'should catch bad response status code');
          expect(cocktails.length).toEqual(0, 'should return empty cocktails array');
        },
        fail
      );
      const req = httpTestingController.expectOne(BY_INGREDIENT_URL);
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });
  });
});


//// Utils
function makeResponse(count?: number) {
  return ({[DATA_KEY]: makeCocktails(count)});
}

function makeIngredients(count?: number): SelectedIngredients {
  const double = [
    {'strIngredient1': 'Light rum'},
    {'strIngredient1': 'Applejack'}
  ] as SelectedIngredients;

  const singular = [
    {'strIngredient1': 'Light rum'}
  ] as SelectedIngredients;

  switch (count) {
    case (1) : return singular;
    case (2) : return double;
    default: return [] as SelectedIngredients;
  }
}

function makeIngredientsResponse(count?: number) {
  return ({[DATA_KEY]: makeIngredients(count)});
}

function makeCocktails(count?: number): CocktailsList | any[] {
  const double = [{
    'strDrink': '57 Chevy with a White License Plate',
    'strDrinkThumb': 'www.thecocktaildb.com\/images\/media\/drink\/qyyvtu1468878544.jpg',
    'idDrink': '14029'
  }, {
    'strDrink': '155 Belmont',
    'strDrinkThumb': 'www.thecocktaildb.com\/images\/media\/drink\/yqvvqs1475667388.jpg',
    'idDrink': '15346'
  }] as CocktailsList;

  const singular = [{
    'strDrink': '57 Chevy with a White License Plate',
    'strDrinkThumb': 'www.thecocktaildb.com\/images\/media\/drink\/qyyvtu1468878544.jpg',
    'idDrink': '14029'
  }] as CocktailsList;

  switch (count) {
    case (1) : return singular;
    case (2) : return double;
    default: return [];
  }
}
