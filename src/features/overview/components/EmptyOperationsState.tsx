import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';

interface EmptyOperationsStateProps {
  onCreateDemoData: VoidFunction;
  onAddOperation: VoidFunction;
}

const StyledEmptyOperationsState = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 16px;
  text-align: center;
  border: 1px solid #ededed;
  border-radius: 8px;
  background-color: #f7f7f7;
`;

export default function EmptyOperationsState(props: EmptyOperationsStateProps) {
  return (
    <StyledEmptyOperationsState>
      <Stack spacing={2}>
        <Typography variant="h5">There is no data yet</Typography>
        <Typography variant="body1">
          To create them please click{' '}
          <Button onClick={props.onCreateDemoData}>Create demo data</Button> to
          create mocked data or click{' '}
          <Button onClick={props.onAddOperation}>Add operation</Button> to
          create data manually.
        </Typography>
      </Stack>
    </StyledEmptyOperationsState>
  );
}
