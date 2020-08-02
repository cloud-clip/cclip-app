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

import deepmerge from 'deepmerge';
import Store from '..';
import { BackAction, ClipServer } from '../../models';
import { Platform } from 'react-native';
import { Dispatch } from 'redux';

export const APP_SET_BACK_ACTION = 'APP_SET_BACK_ACTION';
export const APP_RELOAD_SERVER_FINISHED = 'APP_RELOAD_SERVER_FINISHED';
export const APP_RELOAD_SERVER_STARTED = 'APP_RELOAD_SERVER_STARTED';
export const APP_SET_TITLE = 'APP_SET_TITLE';

/**
 * Reloads the global server list.
 */
export function reloadServers() {
  //@ts-ignore
  Store.dispatch((dispatch: Dispatch) => {
    dispatch({ type: APP_RELOAD_SERVER_STARTED });

    setTimeout(() => {
      const servers: ClipServer[] = [{
        baseUrl: `http://${Platform.select({ android: '10.0.2.2', default: '127.0.0.1' })}:50979/`,
        name: 'Local dev server',
        password: 'test',
        request: function (p, i?) {
          const init: RequestInit = {
            headers: {},
          };
          if (this.password) {
            // @ts-ignore
            init.headers!.Authorization = 'Bearer ' + this.password;
          }

          return fetch(
            this.baseUrl + p,
            deepmerge(init, i || {})
          );
        },
      }];

      dispatch({ type: APP_RELOAD_SERVER_FINISHED, servers });
    }, 1000);
  });
}

/**
 * Sets the app / page title.
 *
 * @param {string} title The new title.
 */
export function setAppTitle(title: string) {
  Store.dispatch({ type: APP_SET_TITLE, title });
}

/**
 * Sets the action for global back button.
 *
 * @param {BackAction|null|undefined} action The new action.
 */
export function setBackAction(action: BackAction | null | undefined) {
  Store.dispatch({ type: APP_SET_BACK_ACTION, action });
}
