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

import Loader from '../../components/Loader';
import Page from '../../components/Page';
import React, { PropsWithChildren, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-native';
import { Text, View } from 'react-native';
import { Colors, List } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { reloadServers, setAppTitle, setBackAction } from '../../store/actions';
import { ClipServer } from '../../models';
import { ReduxState } from '../../store';

interface HomeScreenProps { }

const HomeScreen = (_props: PropsWithChildren<HomeScreenProps>) => {
  const history = useHistory();
  const isLoading = useSelector((state: ReduxState) => state.app.isLoadingServers);
  const servers = useSelector((state: ReduxState) => state.app.servers);

  const openServer = useCallback((server: ClipServer) => {
    history.push({
      pathname: '/server',
      state: {
        server,
      },
    });
  }, [history]);

  useEffect(() => {
    setAppTitle('Home');
    setBackAction(null);

    reloadServers();
  }, []);

  let content: any;
  if (isLoading || !servers) {
    content = (
      <Loader text="Loading servers ...." />
    );
  } else {
    if (servers?.length) {
      content = (
        <View>
          {servers.map((server, index) => {
            return <List.Item
              key={`b60e1d5b-69d0-47e6-8317-c37d234e2874-${server.baseUrl}-${index}`}
              onPress={() => openServer(server)}
              title={server.name}
              description={server.baseUrl}
              left={props => <List.Icon {...props} icon="dns" color={Colors.blue500} />}
            />;
          })}
        </View>
      );
    } else {
      content = <Text>No servers found</Text>;
    }
  }

  return (
    <Page>
      {content}
    </Page>
  );
};

export default HomeScreen;
