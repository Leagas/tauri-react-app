import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useRecoilValue } from 'recoil';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { MainList } from './MainList';
import { navigationAtom } from "../store";
import { invoke } from "@tauri-apps/api/tauri";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(7),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Dashboard = (props) => {
  const navigation = useRecoilValue(navigationAtom);
  const [open, setOpen] = React.useState(true);
  const [list, setList] = React.useState<any>([]);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleList = async () => {
    const result: any = await invoke("list")
    if (result) {
      const json = JSON.parse(result)
      setList(JSON.parse(json))
    }
  }

  React.useEffect(() => {
    handleList()
  }, [])
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box style={{ height: '100%' }} sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
              }}
            >
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
              style={{ textTransform: 'capitalize' }}
            >
              {navigation}
            </Typography>
          </Toolbar>
        </AppBar>
        {open && <Drawer variant="permanent" open={open}>
          <List component="nav">
            <MainList />
            {list?.length && <p>{list[0].name}</p>}
          </List>
        </Drawer>}
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            display: 'flex',
            overflow: 'auto',
          }}
        >
          {props.children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard