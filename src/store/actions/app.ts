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

import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';
import deepmerge from 'deepmerge';
import Enumerable from 'node-enumerable';
import Store from '..';
import { CanBeNil, ClipServer, ClipServerRequestFunc } from '../../models';
import { Platform } from 'react-native';
import { Dispatch } from 'redux';

export const APP_RELOAD_SERVER_FINISHED = 'APP_RELOAD_SERVER_FINISHED';
export const APP_RELOAD_SERVER_STARTED = 'APP_RELOAD_SERVER_STARTED';
export const APP_SET_GLOBAL_CONTENT = 'APP_SET_GLOBAL_CONTENT';

const STORAGE_KEY_SERVER = 'ClipServers';

function createServerRequestFunction(baseUrl: string, password: CanBeNil<string>): ClipServerRequestFunc {
  return (p, i?) => {
    const init: RequestInit = {
      headers: {},
    };
    if (password) {
      // @ts-ignore
      init.headers!.Authorization = 'Bearer ' + this.password;
    }

    return fetch(
      baseUrl + p,
      deepmerge(init, i || {})
    );
  };
}

/**
 * Reloads the global server list.
 */
export function reloadServers() {
  //@ts-ignore
  Store.dispatch((dispatch: Dispatch) => {
    dispatch({ type: APP_RELOAD_SERVER_STARTED });

    const servers: ClipServer[] = [];

    if (__DEV__) {
      // add an entry for a local development server

      const name = 'Local dev server';
      const baseUrl = `http://${Platform.select({ android: '10.0.2.2', default: '127.0.0.1' })}:50979/`;
      const password = 'test';

      servers.push({
        baseUrl,
        name,
        password,
        request: createServerRequestFunction(baseUrl, password),
      });
    }

    // hardcoded servers?
    if (typeof Config.SERVERS === 'string') {
      Enumerable.from(Config.SERVERS.split(';'))
        .select(item => item.trim())
        .where(item => item !== '')
        .select(item => {
          let [name, baseUrl, password] = item.split('|');

          name = String(name).trim();

          baseUrl = String(baseUrl).trim();
          if (!baseUrl.endsWith('/')) {
            baseUrl += '/';
          }

          if (!password) {
            password = '';
          }
          password = String(password).trim();
          if (!password) {
            password = undefined as any;
          }

          return {
            baseUrl,
            name,
            password,
          };
        })
        .distinctBy(x => x.baseUrl.toLowerCase())
        .forEach(x => {
          console.log('x', x);

          servers.push({
            baseUrl: x.baseUrl,
            name: x.name,
            password: x.password,
            request: createServerRequestFunction(x.baseUrl, x.password),
          });
        });
    }

    AsyncStorage.getItem(STORAGE_KEY_SERVER)
      .then(value => {
        try {
          if (value) {
            const storedServers = JSON.parse(value);
            if (Array.isArray(storedServers)) {
              servers.push(
                ...storedServers.filter(server => typeof server === 'object')
              );
            }
          }
        } catch (e) {
          console.log('[ERROR] reloadServers(1)', e);
        }
      })
      .finally(() => {
        dispatch({ type: APP_RELOAD_SERVER_FINISHED, servers });
      });
  });
}

/**
 * Sets the global FAB button(s).
 *
 * @param {FabButton[]} buttons The new button(s).
 */
export function setGlobalContent(content: any) {
  Store.dispatch({ type: APP_SET_GLOBAL_CONTENT, content });
}
