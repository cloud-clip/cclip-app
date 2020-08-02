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
import { Dimensions, ScrollView, StyleProp, StyleSheet, ViewStyle } from 'react-native';

interface PageProps {
  style?: StyleProp<ViewStyle> | null | undefined;
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height - 80,
  },
});

const Page = (props: PropsWithChildren<PageProps>) => {
  return (
    <ScrollView style={[styles.container, props.style]}>
      {props.children}
    </ScrollView>
  );
};

export default Page;
