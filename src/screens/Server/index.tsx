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
import moment from 'moment';
import Page from '../../components/Page';
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Colors, List } from 'react-native-paper';
import { useHistory } from 'react-router-native';
import { Clip, ClipServer } from '../../models';
import { setAppTitle, setBackAction } from '../../store/actions';

interface ClipResultItem {
  ctime: number;
  id: string;
  mime: string;
  mtime: number;
  name: string;
  resource: string;
  share: string;
  size: number;
}

interface ServerScreenProps { }

const ServerScreen = (_props: PropsWithChildren<ServerScreenProps>) => {
  const [clips, setClips] = useState<Clip[]>([]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  const server: ClipServer = (history.location.state as any).server;

  const reloadClips = useCallback(() => {
    setIsLoading(true);

    server.request('api/v1/clips', {
      method: 'GET',
    }).then(res => res.json()).then((clipFromAPI: ClipResultItem[]) => {
      setClips(clipFromAPI.map(clip => {
        return {
          creation_time: moment.utc(clip.ctime * 1000).local(),
          id: clip.id,
          mime: clip.mime,
          modification_time: moment.utc(clip.mtime * 1000).local(),
          name: clip.name,
          server,
          size: clip.size,
        };
      }));
    }).catch(err => {
      console.log('reloadClips.ERROR', err);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [server]);

  useEffect(() => {
    setBackAction(() => history.push('/'));
  }, [history]);

  useEffect(() => {
    setAppTitle(`Clips of '${server.name}'`);
  }, [server]);

  useEffect(() => {
    reloadClips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let content: any;
  if (isLoading) {
    content = (
      <Loader text={`Loading clips from '${server.baseUrl}'....`} />
    );
  } else {
    if (clips.length) {
      content = (
        <View>
          {clips.map(clip => {
            return <List.Item
              key={`8241aea1-eba8-422d-9b53-5af50fab699e-${server.baseUrl}-${clip.id}`}
              title={clip.name}
              description={`${clip.modification_time.format('YYYY-MM-DD HH:mm:ss')}; ${clip.mime}`}
              left={props => <List.Icon {...props} icon="file" color={Colors.green600} />}
            />;
          })}
        </View>
      );
    } else {
      content = <Text>No clips found</Text>;
    }
  }

  return (
    <Page>
      {content}
    </Page>
  );
};

export default ServerScreen;
