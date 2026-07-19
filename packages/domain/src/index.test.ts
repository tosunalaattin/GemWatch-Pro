import { describe, expect, it } from 'vitest';

import { createCorrelationId, parseCorrelationId, toUtcTimestamp } from './index.js';

describe('foundation primitives', () => {
  it('creates and validates correlation identifiers', () => {
    expect(parseCorrelationId(createCorrelationId())).toBeTruthy();
    expect(() => parseCorrelationId('unsafe value')).toThrow('Invalid');
  });

  it('serializes timestamps as UTC', () => {
    expect(toUtcTimestamp(new Date('2026-07-19T12:00:00Z'))).toBe('2026-07-19T12:00:00.000Z');
  });
});
