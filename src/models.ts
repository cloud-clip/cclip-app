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
import { FetchBlobResponse } from 'rn-fetch-blob';

/**
 * A back button action.
 */
export type BackAction = () => void;

/**
 * A type, that can be (null) or (undefined).
 */
export type CanBeNil<T extends any = any> = T | null | undefined;

/**
 * A clip.
 */
export interface Clip {
  /**
   * Creation time
   */
  creation_time: Moment;
  /**
   * Downloads the clip.
   *
   * @returns {Promise<FetchBlobResponse>} The promise with the response.
   */
  download: () => Promise<FetchBlobResponse>;
  /**
   * ID
   */
  id: string;
  /**
   * MIME type of content
   */
  mime: string;
  /**
   * Modification time
   */
  modification_time: Moment;
  /**
   * The display name.
   */
  name: string;
  /**
   * The size, in bytes.
   */
  size: number;
  /**
   * The underlying server.
   */
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
  password?: CanBeNil<string>;
  /**
   * The request function.
   */
  request: ClipServerRequestFunc;
}

/**
 * A function, that does a request to a Cloud Clip server.
 *
 * @param {string} path The relative path WITHOUT leading /
 * @param {RequestInit} [init] Initial options for the request.
 *
 * @returns {Promise<Response>} The promise with the response.
 */
export type ClipServerRequestFunc = (path: string, init?: RequestInit) => Promise<Response>;

/**
 * A FAB button.
 */
export interface FabButton {
  /**
   * The name of the icon.
   */
  icon: string;
  /**
   * The action to invoke if the button is pressed.
   */
  onPress: () => void;
}
