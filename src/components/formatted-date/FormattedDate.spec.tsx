import { render } from '@testing-library/react';
import { sub } from 'date-fns';
import FormattedDate from './FormattedDate';

describe('FormattedDate', () => {
  it('should render formatted date', () => {
    const { baseElement } = render(<FormattedDate date="1982-01-10" />);
    expect(baseElement.textContent).toBe('10.01.1982');
  });

  it('should render `Today`', () => {
    const { baseElement } = render(
      <FormattedDate date={new Date().toISOString()} />
    );
    expect(baseElement.textContent).toBe('Today');
  });

  it('should render `Yesterday`', () => {
    const { baseElement } = render(
      <FormattedDate date={sub(new Date(), { days: 1 }).toISOString()} />
    );
    expect(baseElement.textContent).toBe('Yesterday');
  });

  it('should render `invalid date`', () => {
    const { baseElement } = render(<FormattedDate date="notDate" />);
    expect(baseElement.textContent).toBe('invalid date');
  });
});
