import counterReducer, {
  CounterState,
  decrement,
  increment,
  incrementByAmount,
} from './counter-slice';

describe('counter reducer', () => {
  const initialState: CounterState = {
    status: 'idle',
    value: 3,
  };

  it('should handle initial state', () => {
    expect.assertions(1);
    expect(counterReducer(undefined, { type: 'unknown' })).toStrictEqual({
      status: 'idle',
      value: 0,
    });
  });

  it('should handle increment', () => {
    expect.assertions(1);
    const actual = counterReducer(initialState, increment());
    expect(actual.value).toStrictEqual(4);
  });

  it('should handle decrement', () => {
    expect.assertions(1);
    const actual = counterReducer(initialState, decrement());
    expect(actual.value).toStrictEqual(2);
  });

  it('should handle incrementByAmount', () => {
    expect.assertions(1);
    const actual = counterReducer(initialState, incrementByAmount(2));
    expect(actual.value).toStrictEqual(5);
  });
});
