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

import CheckPermissionsScreen from './screens/CheckPermissions';
import HomeScreen from './screens/Home';
import React, { PropsWithChildren } from 'react';
import ServerScreen from './screens/Server';
import store, { ReduxState } from './store';
import { SafeAreaView } from 'react-native';
import { Colors, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider, useSelector } from 'react-redux';
import { BackButton, NativeRouter, Switch, Route } from 'react-router-native';

interface AppProps {
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.black,
    accent: Colors.red600,
  },
};

const App = (_props: PropsWithChildren<AppProps>) => {
  const globalContent = useSelector((state: ReduxState) => state.app.globalContent);

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView>
        <Switch>
          <Route exact path="/" component={CheckPermissionsScreen} />
          <Route exact path="/home" component={HomeScreen} />
          <Route exact path="/server" component={ServerScreen} />
        </Switch>

        {globalContent}
      </SafeAreaView>
    </PaperProvider>
  );
};

export default () => {
  return (
    <ReduxProvider store={store}>
      <NativeRouter>
        <BackButton>
          <App />
        </BackButton>
      </NativeRouter>
    </ReduxProvider>
  );
};
