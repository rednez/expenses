import MuiAppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export interface AppBarProps {
  username: string;
  onLogout: VoidFunction;
}

export default function AppBar({ username, onLogout }: AppBarProps) {
  return (
    <div>
      <MuiAppBar position="static" sx={{ marginBottom: 4 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {username}
          </Typography>
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        </Toolbar>
      </MuiAppBar>
    </div>
  );
}
