import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useAppSelector } from '../../app/hooks';
import { selectCalculatedOperations } from '../../app/operations.slice';

export default function Charts() {
  const navigate = useNavigate();
  const calculatedOperations = useAppSelector(selectCalculatedOperations);

  const handleClickBack = () => {
    navigate('/overview');
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Button onClick={handleClickBack}>Back</Button>
      </Box>

      <BarChart
        width={600}
        height={300}
        data={calculatedOperations}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" fontSize={10} />
        <YAxis fontSize={14} />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill={'#2eb202'} />
        <Bar dataKey="spense" fill={'#b20211'} />
      </BarChart>

      <AreaChart
        width={600}
        height={400}
        data={calculatedOperations}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" fontSize={10} />
        <YAxis fontSize={14} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="spense"
          stackId="1"
          stroke="#c2414c"
          fill="#c2414c"
        />
        <Area
          type="monotone"
          dataKey="income"
          stackId="1"
          stroke="#66c248"
          fill="#66c248"
        />
      </AreaChart>
    </Stack>
  );
}
