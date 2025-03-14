import React from 'react';
import { Container, Grid } from '@mui/material';
import Header from './components/Header';
import NavigationPane from './components/NavigationPane';
import MainDisplay from './components/MainDisplay';
import Footer from './components/Footer';
import { NavigationProvider } from './components/NavigationContext';

function App() {
  return (
    <NavigationProvider>
      <div className="App">
        <Header />
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <NavigationPane />
            </Grid>
            <Grid item xs={8}>
              <MainDisplay />
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </div>
    </NavigationProvider>
  );
}

export default App;
