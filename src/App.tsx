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

import HomeScreen from './screens/Home';
import React, { PropsWithChildren, useCallback, useEffect } from 'react';
import ServerScreen from './screens/Server';
import store, { ReduxState } from './store';
import { BackHandler, SafeAreaView, StyleSheet } from 'react-native';
import { Appbar, Colors, DefaultTheme, FAB, Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider, useSelector } from 'react-redux';
import { BackButton, NativeRouter, Switch, Route, useLocation } from 'react-router-native';

interface AppProps {
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.black,
    accent: Colors.red600,
  },
};

const App = (_props: PropsWithChildren<AppProps>) => {
  const appTitle = useSelector((state: ReduxState) => state.app.title);
  const backAction = useSelector((state: ReduxState) => state.app.backAction);
  const fabButton = useSelector((state: ReduxState) => state.app.fabButton);
  const location = useLocation();

  const backBtnHandler = useCallback(() => {
    if (location.pathname === '/') {
      BackHandler.exitApp();
    } else {
      backAction?.();
    }

    return true;
  }, [backAction, location]);

  useEffect(() => {
    const backBtnEvent = BackHandler.addEventListener('hardwareBackPress', backBtnHandler);

    return () => {
      backBtnEvent.remove();
    };
  }, [backBtnHandler]);

  let fabBtnContent: any;
  if (fabButton) {
    fabBtnContent = (
      <FAB
        style={styles.fab}
        icon={fabButton.icon}
        onPress={fabButton.onPress}
      />
    );
  }

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView>
        <Appbar.Header>
          {backAction ? (
            <Appbar.BackAction onPress={backAction} />
          ) : null}
          <Appbar.Content title="Cloud Clip" subtitle={appTitle} />
        </Appbar.Header>

        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/server" component={ServerScreen} />
        </Switch>

        {fabBtnContent}
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
