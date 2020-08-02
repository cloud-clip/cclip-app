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

import { Moment } from 'moment';

/**
 * A back button action.
 */
export type BackAction = () => void;

/**
 * A clip.
 */
export interface Clip {
  creation_time: Moment;
  id: string;
  mime: string;
  modification_time: Moment;
  name: string;
  size: number;
  server: ClipServer;
}

/**
 * A Cloud Clip server.
 */
export interface ClipServer {
  /**
   * The base URL
   */
  baseUrl: string;
  /**
   * The display name.
   */
  name: string;
  /**
   * The password to use.
   */
  password?: string | null | undefined;
  /**
   * Calls the API.
   *
   * @param {string} path The relative path WITHOUT leading /
   * @param {RequestInit} [init] Initial options for the request.
   *
   * @returns {Promise<Response>} The promise with the response.
   */
  request: (path: string, init?: RequestInit) => Promise<Response>;
}
