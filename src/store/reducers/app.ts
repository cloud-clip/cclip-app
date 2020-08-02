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

import * as actions from '../actions';
import { Reducer } from 'redux';
import { BackAction, ClipServer } from '../../models';

/**
 * The Redux state for global app things.
 */
export interface AppReduxState {
  backAction?: BackAction | null | undefined;
  isLoadingServers: boolean;
  servers?: ClipServer[] | null | undefined;
  title?: string | null | undefined;
}

const initialState: AppReduxState = {
  isLoadingServers: false,
};

const appReducer: Reducer<AppReduxState> = (state = initialState, action) => {
  switch (action.type) {
    case actions.APP_RELOAD_SERVER_FINISHED:
      return {
        ...state,
        isLoadingServers: false,
        servers: action.servers,
      };

    case actions.APP_RELOAD_SERVER_STARTED:
      return {
        ...state,
        isLoadingServers: true,
      };

    case actions.APP_SET_BACK_ACTION:
      return {
        ...state,
        backAction: action.action,
      };

    case actions.APP_SET_TITLE:
      return {
        ...state,
        title: action.title,
      };
  }

  return state;
};

/**
 * The reducer for global app stuff.
 */
export default appReducer;
