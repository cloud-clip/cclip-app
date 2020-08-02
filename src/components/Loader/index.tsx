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
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';

interface LoaderProps {
  text?: string;
}

const Loader = (props: PropsWithChildren<LoaderProps>) => {
  return (
    <View style={[styles.container]}>
      <ActivityIndicator animating={true} color={Colors.blue800} size="large" />
      {props.text ? (
        <Text style={styles.text}>{props.text}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height - 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 8,
  },
});

export default Loader;
