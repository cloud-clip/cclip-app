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
import React, { PropsWithChildren, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-native';
import { Alert, BackHandler, PermissionsAndroid, Platform, StyleSheet, Rationale } from 'react-native';

interface AndroidPermission {
  requestOptions?: Rationale | undefined;
}

type AndroidPermissionList = { [name: string]: AndroidPermission };

interface HomeScreenProps { }

const requiredAndroidPermissions: AndroidPermissionList = {
  'ACCESS_NETWORK_STATE': {
    requestOptions: {
      title: 'Access network state',
      message: 'App needs permission to access network state',
      buttonPositive: 'OK',
    },
  },
  'DOWNLOAD_WITHOUT_NOTIFICATION': {
    requestOptions: {
      title: 'Download without notification',
      message: 'App needs permission to read from external storage',
      buttonPositive: 'OK',
    },
  },
  'INTERNET': {
    requestOptions: {
      title: 'Internet access',
      message: 'App needs internet permission to access remote server',
      buttonPositive: 'OK',
    },
  },
  'READ_EXTERNAL_STORAGE': {
    requestOptions: {
      title: 'Read external storages',
      message: 'App needs permission to read from external storages',
      buttonPositive: 'OK',
    },
  },
  'USE_FINGERPRINT': {
    requestOptions: {
      title: 'Fingerprint / face ID',
      message: 'App needs fingerprint permission to access your data safly',
      buttonPositive: 'OK',
    },
  },
  'WRITE_EXTERNAL_STORAGE': {
    requestOptions: {
      title: 'Write external storages',
      message: 'App needs permission to write to external storages',
      buttonPositive: 'OK',
    },
  },
};

const styles = StyleSheet.create({
  container: {
  },
});

const CheckPermissionsScreen = (_props: PropsWithChildren<HomeScreenProps>) => {
  const history = useHistory();

  const exitApp = useCallback(() => {
    BackHandler.exitApp();
  }, []);

  const gotoHome = useCallback(() => {
    history.replace('/home');
  }, [history]);

  const checkPermissions = useCallback(Platform.select({
    android: async () => {
      for (const permissionName of Object.keys(requiredAndroidPermissions)) {
        const permission = PermissionsAndroid.PERMISSIONS[permissionName];
        if (!permission) {
          continue;
        }

        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) {
          continue;
        }

        const settings = requiredAndroidPermissions[permissionName];

        const status = await PermissionsAndroid.request(permission, settings.requestOptions);
        if (status !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(`We cannot continue without the '${permissionName}' permission!`);

          exitApp();
          return;
        }
      }

      gotoHome();
    },
    default: async () => {
      gotoHome();
    },
  }), [exitApp, gotoHome]);

  useEffect(() => {
    checkPermissions().catch(err => {
      console.error('Check permissions', err);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let content: any;
  content = (
    <Loader text="Checking permissions ...." />
  );

  return (
    <Page style={[styles.container]}>
      {content}
    </Page>
  );
};

export default CheckPermissionsScreen;
