import React from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Appbar, List, Avatar } from 'react-native-paper';

function AccountScreen({ navigation }) {
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Akun +" color='white' />
      </Appbar.Header>

      <List.Section style={styles.container}>
        <List.Item
          style={{ padding: 10, height: '60%' }}
          title="USERNAME"
          left={props => <Avatar.Image size={50} style={{ margin: 2, }} source={require('../assets/logo_kai_transparent.png')} />}          
          right={props =>
            <TouchableOpacity style={styles.status}>
              <Text style={{color: 'blue', fontWeight: '600', textAlign: 'center',}}>Basic</Text>
            </TouchableOpacity>
          }
        />
        <List.Section style={{ flexDirection: 'row', width: '100%', height: '40%', justifyContent: 'center', alignItems: 'center', textAlign: 'center', borderBottomLeftRadius: 8, borderBottomRightRadius: 8, borderTopColor: 'white', borderTopWidth: 2,}}>
          <TouchableOpacity style={{ width: '70%', textAlign: 'center', height: '60%', borderRightColor: 'white', borderRightWidth: 2,}}>
            <Text style={styles.text}>Lihat Profil Saya</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: '30%', textAlign: 'center', height: '60%'}}>
            <Text style={styles.text}>QR Code</Text>
          </TouchableOpacity>
        </List.Section>
      </List.Section >
      <List.Section style={{height: 'auto', width: '90%', margin: '5%', backgroundColor: '#A1C7F8', padding: 10, borderRadius: 8,}}>
        <Text style={{color: '#0e0e0e'}}>Perhatian nomer id penumpang harus sama dengan nomor id akun KAI Access</Text>
      </List.Section>
      <List.Section style={styles.menu}>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.textItem}>Daftar Penumpang</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.textItem}>Metode Pembayaran</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.textItem}>Bahasa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.textItem}>Pusat Bantuan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.textItem}>Keluar</Text>
          </TouchableOpacity>
      </List.Section>
    </>
  );
}

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    height: 130,
    margin: '5%',
    marginTop: 20,
    width: '90%',
    color: 'white',
    borderRadius: 8,
    textAlign: 'center',
    backgroundColor: '#CED4DA',
  },
  akun: {
    color: 'white',
    padding: 10,
    // height: '70%',
  },
  status: {
    color: 'white',
    marginVertical: 16,
    justifyContent: 'center',
    width: 60,
    height: 20,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  text: {
    color: '#FFF',
  },
  menu: {
    backgroundColor: '#fafafa',
    borderRadius: 8,
    height: 'auto',
    margin: '5%',
    width: '90%',
    padding: 10,
  },
  item: {
    width: '100%',
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#CED4DA',
  },
  textItem: {
    fontSize: 16,
    fontWeight:'bold',
    paddingTop: 14,
    color: '#0a0a0a',
    textAlignVertical: 'bottom',
    // justifyContent: 'center',
    // alignContent: 'center',
  },
});