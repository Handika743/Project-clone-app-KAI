import React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import { Appbar } from 'react-native-paper';

function NotFoundRuteScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Image  style={{height:200,width:200}} source={require('../assets/palang-kereta-unscreen1.gif')}/>
      <Image/>
      <Text style={{color:'orange', marginTop:20}}>Jadwal Tidak Ditemukan</Text>
      <Text style={{}} >Perjalanan yang anda inginkan tidak tersedia saat ini.</Text>
      <Text >Cobalah untuk mencoba perjalanan lain</Text>
    </View>
  );
}


export default NotFoundRuteScreen;

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