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

import React, { PropsWithChildren, useState } from 'react';
import { Dimensions, ScrollView, StyleProp, StyleSheet, View, ViewStyle, Text } from 'react-native';
import { Appbar, FAB } from 'react-native-paper';
import { BackAction, CanBeNil, FabButton } from '../../models';

interface PageProps {
  backAction?: CanBeNil<BackAction>;
  dialogContent?: CanBeNil;
  fabButtons?: CanBeNil<FabButton[]>;
  style?: CanBeNil<StyleProp<ViewStyle>>;
  title?: CanBeNil<string>;
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    height: windowHeight - 24,
  },
  contentContainer: {
    height: windowHeight - 24,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});

const Page = (props: PropsWithChildren<PageProps>) => {
  const [isFabButtonOpen, setIsFabButtonOpen] = useState(false);

  let fabButtonContent: any;
  if (props.fabButtons?.length) {
    if (props.fabButtons.length > 1) {
      fabButtonContent = (
        <FAB.Group
          style={styles.fab}
          open={isFabButtonOpen}
          icon={isFabButtonOpen ? 'calendar-today' : 'plus'}
          visible
          actions={props.fabButtons.map(fb => {
            return {
              icon: fb.icon,
              onPress: fb.onPress,
            };
          })}
          onStateChange={({ open }) => {
            setIsFabButtonOpen(open);
          }}
        />
      );
    } else {
      fabButtonContent = (
        <FAB
          style={styles.fab}
          icon={props.fabButtons[0].icon}
          onPress={props.fabButtons[0].onPress}
        />
      );
    }
  }

  return (
    <View style={[styles.container]}>
      <Appbar.Header>
        {props.backAction ? (
          <Appbar.BackAction onPress={props.backAction} />
        ) : null}
        <Appbar.Content title="Cloud Clip" subtitle={props.title} />
      </Appbar.Header>
      <ScrollView style={[styles.contentContainer, props.style]}>
        {props.children}
      </ScrollView>
      {fabButtonContent}
      {props.dialogContent}
    </View>
  );
};

export default Page;
