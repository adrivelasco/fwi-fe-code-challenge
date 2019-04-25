import React, { Fragment } from 'react';

import Header from './components/Header';
import PlayerTable from './components/PlayerTable';
import Button from './components/Button';

const App = () => {
  return (
    <Fragment>
      <Header>
        {/* <Header.Logo /> */}
        <Header.Title>FWI Poker Challenge</Header.Title>
        <Header.Spacer />
        <Header.List>
          <Header.ListItem>
            <Button>Create player</Button>
          </Header.ListItem>
        </Header.List>
      </Header>
      <PlayerTable />
    </Fragment>
  );
};

export default App;
