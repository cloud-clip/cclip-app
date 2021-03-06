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
import { StyleProp, ViewStyle } from 'react-native';
import { Colors, Dialog, List } from 'react-native-paper';
import { CanBeNil } from '../../../models';

interface AddClipDialogProps {
  onDismiss: () => any;
  onSelected: (action: SelectedAddClipAction) => any;
  style?: CanBeNil<StyleProp<ViewStyle>>;
  visible: CanBeNil<boolean>;
}

export enum SelectedAddClipAction {
  FromClipboard
}

const AddClipDialog = (props: PropsWithChildren<AddClipDialogProps>) => {
  return (
    <Dialog
      style={props.style}
      visible={!!props.visible}
      onDismiss={props.onDismiss}
    >
      <Dialog.Title>Add clip</Dialog.Title>
      <Dialog.Content>
        <List.Item
          onPress={() => props.onSelected(SelectedAddClipAction.FromClipboard)}
          title="From clipboard"
          left={itemProps => <List.Icon {...itemProps} icon="clipboard" color={Colors.pink500} />}
        />
      </Dialog.Content>
    </Dialog>
  );
};

export default AddClipDialog;
