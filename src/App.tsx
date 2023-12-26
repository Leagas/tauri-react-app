import { useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import {
  Outlet,
  RouterProvider,
  Router,
  Route,
  RootRoute,
} from '@tanstack/react-router'
import Dashboard from "./dashboard/Dashboard";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Orders from './dashboard/Orders';
import { Typography } from '@mui/material';
import "./App.css";

const rootRoute = new RootRoute({
  component: () => (
    <Dashboard>
      <Outlet />
    </Dashboard>
  ),
})

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'dashboard',
  component: function Index() {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Orders />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    )
  },
})

const productionRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'production',
  component: function Production() {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography>Production</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    )
  },
})

const stagingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'staging',
  component: function Staging() {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography>Staging</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    )
  },
})

const statusRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'production/status',
  component: function Status() {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography>Status</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    )
  },
})

const clientRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'production/client',
  component: function Client() {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography>Client</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    )
  },
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  productionRoute,
  stagingRoute,
  statusRoute,
  clientRoute
])

const router = new Router({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  return (
    <div className="container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
