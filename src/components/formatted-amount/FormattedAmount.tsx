import styled from '@emotion/styled';
import NumberFormat from 'react-number-format';

export interface FormattedAmountProps {
  amount: number;
  color: string;
}

const StyledFormattedAmount = styled.div`
  color: ${(props) => props.color};
`;

export function FormattedAmount(props: FormattedAmountProps) {
  return (
    <StyledFormattedAmount color={props.color}>
      <NumberFormat
        value={props.amount}
        displayType="text"
        thousandSeparator=" "
        decimalSeparator=","
        decimalScale={2}
        fixedDecimalScale={true}
      />
    </StyledFormattedAmount>
  );
}

export default FormattedAmount;
