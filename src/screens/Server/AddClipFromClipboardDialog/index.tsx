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

import React, { PropsWithChildren } from 'react';
import { StyleProp, Text, ViewStyle } from 'react-native';
import { Dialog } from 'react-native-paper';
import { CanBeNil } from '../../../models';

interface AddClipFromClipboardDialogProps {
  onDismiss: () => any;
  style?: CanBeNil<StyleProp<ViewStyle>>;
  visible: CanBeNil<boolean>;
}

const AddClipFromClipboardDialog = (props: PropsWithChildren<AddClipFromClipboardDialogProps>) => {
  return (
    <Dialog
      style={props.style}
      visible={!!props.visible}
      onDismiss={props.onDismiss}
    >
      <Dialog.Title>Add clip from clipboard</Dialog.Title>
      <Dialog.Content><Text>Lorem ipsum</Text></Dialog.Content>
    </Dialog>
  );
};

export default AddClipFromClipboardDialog;
