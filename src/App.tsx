// Cloud Clip
// Copyright (C) 2020  Marcel Joachim Kloubert <marcel.kloubert@gmx.net>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React from 'react';

import { SafeAreaView } from 'react-native';
import { Appbar, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { BackButton, NativeRouter, Switch, Route } from 'react-router-native';

import HomeScreen from './screens/Home';
import Loader from './components/Loader';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // primary: 'tomato',
    // accent: 'yellow',
  },
};

const App = () => {
  return (
    <NativeRouter>
      <BackButton>
        <PaperProvider theme={theme}>
          <SafeAreaView>
            <Appbar.Header>
              <Appbar.Content title="Cloud Clip" subtitle={'Subtitle'} />
            </Appbar.Header>

            <Switch>
              <Route exact path="/" component={HomeScreen} />
              <Route exact path="/loader" component={Loader} />
            </Switch>
          </SafeAreaView>
        </PaperProvider>
      </BackButton>
    </NativeRouter>
  );
};

export default App;
