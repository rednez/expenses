import { render } from '@testing-library/react';

import FormattedAmount from './FormattedAmount';

describe('FormattedAmount', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormattedAmount amount={1} color="" />);
    expect(baseElement).toBeTruthy();
  });
});
