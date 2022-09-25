import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authActions, selectUsername } from '../../app/auth.slice';
import { categoriesActions } from '../../app/categories.slice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  operationsActions,
  selectAllOperations,
  selectHasOperations,
} from '../../app/operations.slice';
import EmptyOperationsState from './components/EmptyOperationsState';
import OperationsTable from './components/OperationsTable';

export default function Overview() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const username = useAppSelector(selectUsername);
  const operations = useAppSelector(selectAllOperations);
  const hasOperations = useAppSelector(selectHasOperations);

  useEffect(() => {
    if (username) {
      dispatch(categoriesActions.load({ username }));
      dispatch(operationsActions.load({ username }));
    }
  }, [dispatch, username]);

  const handleCreateDemoData = () => {
    if (username) {
      dispatch(authActions.generateDemoData({ username }));
    }
  };

  const handleAddOperation = () => {
    navigate('/new-operation');
  };

  const handleDeleteOperation = (id: string) => {
    if (username) {
      dispatch(
        operationsActions.deleteOneOperation({ username, operationId: id })
      );
    }
  };

  const handleShowCharts = () => {
    navigate('/charts');
  };

  return hasOperations ? (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="success"
          onClick={handleAddOperation}
        >
          Add operation
        </Button>

        <Button variant="outlined" onClick={handleShowCharts}>
          Show Charts
        </Button>
      </Stack>
      <OperationsTable
        data={operations}
        onDeleteOperation={handleDeleteOperation}
      />
    </Stack>
  ) : (
    <EmptyOperationsState
      onCreateDemoData={handleCreateDemoData}
      onAddOperation={handleAddOperation}
    />
  );
}
