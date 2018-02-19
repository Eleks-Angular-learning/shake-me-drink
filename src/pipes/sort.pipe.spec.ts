import { SortPipe } from './sort.pipe';

describe('SortPipe', () => {
  let pipe: SortPipe;
  const testCollection: any = [
    {'strIngredient1': 'Tomato juice'},
    {'strIngredient1': '123Lemon vodka'},
    {'strIngredient1': 'Apple brandy'}
  ];

  beforeEach(() => {
    pipe = new SortPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return an null if input is null', () => {
    expect(pipe.transform(null, 'strIngredient1')).toEqual(null);
  });

  it('should return an \'undefined\' if input is \'undefined\'', () => {
    expect(pipe.transform(void 0, 'strIngredient1')).toEqual(void 0);
  });

  it('should apply correct sorting', () => {
    const alphabetical = [{ strIngredient1: '123Lemon vodka' }, { strIngredient1: 'Apple brandy' }, { strIngredient1: 'Tomato juice' }];
    const ascending = [{ strIngredient1: 'Tomato juice' }, { strIngredient1: 'Apple brandy' }, { strIngredient1: '123Lemon vodka' }];
    const descending = [{ strIngredient1: '123Lemon vodka' }, { strIngredient1: 'Apple brandy' }, { strIngredient1: 'Tomato juice' }];
    expect(pipe.transform(testCollection, 'strIngredient1', 'alphabetical')).toEqual(alphabetical);
    expect(pipe.transform(testCollection, 'strIngredient1', 'ascending', )).toEqual(ascending);
    expect(pipe.transform(testCollection, 'strIngredient1', 'descending', )).toEqual(descending);
    expect(pipe.transform(testCollection, 'strIngredient1', 'UNKNOWN-SORTING', )).toEqual(descending);
  });
});
