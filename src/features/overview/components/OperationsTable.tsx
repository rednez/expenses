import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import FormattedAmount from '../../../components/formatted-amount/FormattedAmount';
import FormattedDate from '../../../components/formatted-date/FormattedDate';
import { Operation } from '../../../data/operation';

interface OperationsTableProps {
  data: Operation[];
  onDeleteOperation: (id: string) => void;
}

const getColor = (type: 'income' | 'spense'): string =>
  type === 'income' ? '#119803' : '#d01515';

export default function OperationsTable({
  data = [],
  onDeleteOperation,
}: OperationsTableProps) {
  return (
    <Paper sx={{ border: '1px solid #f3f3f3' }} elevation={0}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell color="info">
                  <FormattedDate date={row.date} />
                </TableCell>
                <TableCell>
                  <FormattedAmount
                    amount={row.amount}
                    color={getColor(row.type)}
                  />
                </TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    onClick={() => onDeleteOperation(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
