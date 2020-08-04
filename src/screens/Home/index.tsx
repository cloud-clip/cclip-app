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

import Enumerable from 'node-enumerable';
import Loader from '../../components/Loader';
import Page from '../../components/Page';
import React, { PropsWithChildren, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-native';
import { BackHandler, Text, View } from 'react-native';
import { Colors, List } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { reloadServers } from '../../store/actions';
import { ClipServer, FabButton, CanBeNil } from '../../models';
import { ReduxState } from '../../store';

interface HomeScreenProps { }

const HomeScreen = (_props: PropsWithChildren<HomeScreenProps>) => {
  const history = useHistory();
  const isLoading = useSelector((state: ReduxState) => state.app.isLoadingServers);
  const servers = useSelector((state: ReduxState) => state.app.servers);

  const addServer = useCallback(() => {
    console.log('Home.addServer');
  }, []);

  const openServer = useCallback((server: ClipServer) => {
    history.replace({
      pathname: '/server',
      state: {
        server,
      },
    });
  }, [history]);

  useEffect(() => {
    const backBtnHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();

      return true;
    });

    reloadServers();

    return () => {
      backBtnHandler.remove();
    };
  }, []);

  let content: any;
  let fabButtons: CanBeNil<FabButton[]>;
  if (isLoading || !servers) {
    content = (
      <Loader text="Loading servers ...." />
    );
  } else {
    if (servers?.length) {
      const serverListItems = servers.map((server, index) => {
        return {
          element: (
            <List.Item
              key={`b60e1d5b-69d0-47e6-8317-c37d234e2874-${server.baseUrl}-${index}`}
              onPress={() => openServer(server)}
              title={server.name}
              description={server.baseUrl}
              left={props => <List.Icon {...props} icon="dns" color={Colors.blue500} />}
            />
          ),
          item: server,
          index,
        };
      });

      content = (
        <View>
          {Enumerable.from(serverListItems).orderBy(x => {
            return String(x.item.name).toLowerCase().trim();
          }).thenBy(x => {
            return String(x.item.baseUrl).toLowerCase().trim();
          }).select(x => {
            return x.element;
          }).toArray()}
        </View>
      );
    } else {
      content = <Text>No servers found</Text>;
    }

    fabButtons = [{
      icon: 'plus',
      onPress: addServer,
    }];
  }

  return (
    <Page
      fabButtons={fabButtons}
      title="Servers"
    >
      {content}
    </Page>
  );
};

export default HomeScreen;
