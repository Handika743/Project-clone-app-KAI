import React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import { Appbar } from 'react-native-paper';

function NotFoundScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={{fontWeight: '900', fontSize: 32, color: 'grey'}}>Ups !</Text>
      <Image
        style={styles.stretch}
        source={require('../assets/logo_not_found_kai.png')}
      />
      <Text style={styles.text}>Kamu belum memiliki tiket</Text>
      <Text style={styles.text}>Ayo pesan tiket keberangkatan sekarang! Tiket kamu akan ditampilkan disini</Text>
    </View>
  );
}

export default NotFoundScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height:600,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stretch: {
    width: 200,
    height: 200,
    resizeMode: 'stretch',
  },
  text: {
    color: 'grey',
    fontSize: 24,
    fontWeight: '400',
  }
});