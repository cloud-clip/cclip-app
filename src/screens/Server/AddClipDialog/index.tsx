import React, { PropsWithChildren } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Dialog, Paragraph } from 'react-native-paper';
import { CanBeNil } from '../../../models';

interface AddClipDialogProps {
  onDismiss: () => void;
  style?: CanBeNil<StyleProp<ViewStyle>>;
  visible?: CanBeNil<boolean>
}

const AddClipDialog = (props: PropsWithChildren<AddClipDialogProps>) => {
  return (
    <Dialog
      style={props.style}
      visible={!!props.visible}
      onDismiss={props.onDismiss}
    >
      <Dialog.Content>
        <Paragraph>This is simple dialog</Paragraph>
      </Dialog.Content>
    </Dialog>
  );
};

export default AddClipDialog;
