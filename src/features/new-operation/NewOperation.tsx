import { useNavigate } from 'react-router-dom';
import { selectUsername } from '../../app/auth.slice';
import {
  categoriesActions,
  selectAllCategories,
} from '../../app/categories.slice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { operationsActions } from '../../app/operations.slice';
import NewOperationForm, {
  AddOperationsPayload,
} from './components/NewOperationForm';

export default function NewOperation() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const username = useAppSelector(selectUsername);
  const categories = useAppSelector(selectAllCategories);

  const handleAddOperation = (data: AddOperationsPayload) => {
    dispatch(
      operationsActions.addOneOperation({
        operation: data,
        username: username!,
      })
    );
    gotoOverview();
  };

  const handleAddCategory = (categoryName: string) => {
    dispatch(
      categoriesActions.addOneCategory({
        name: categoryName,
        username: username!,
      })
    );
  };

  const handleCancel = () => {
    gotoOverview();
  };

  const gotoOverview = () => {
    navigate('/overview');
  };

  return (
    <NewOperationForm
      categories={categories}
      onAdd={handleAddOperation}
      onCancel={handleCancel}
      onAddCategory={handleAddCategory}
    />
  );
}
