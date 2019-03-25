import React, { Fragment } from 'react';
import './App.scss';
import AppContext from './context';
import ByCountry from '../by-country';
import ByConstituency from '../by-constituency';
import MainInfo from '../main-info';

const App = () => (
  <AppContext.Consumer>
    {({ initialise, addListener, formatNumber }) => (
      <Fragment>
        <div className="petition">
          <MainInfo initialise={initialise} addListener={addListener} formatNumber={formatNumber}/>
          <div className="dataTable">
            <ByCountry addListener={addListener}/>
            <ByConstituency addListener={addListener}/>
          </div>
        </div>
      </Fragment>
    )}
  </AppContext.Consumer>
);

App.propTypes = {};

export default App;
