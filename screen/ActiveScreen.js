import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, FlatList } from 'react-native';
import { Appbar, Card, Divider, } from 'react-native-paper';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import NotFoundScreen from './NotFoundScreen';
import supabase from '../supabase';

function ActiveScreen({ navigation }) {
  const [data, setData] = useState('');
  const [status, setStatus] = useState(true);

  useEffect(() => {
    getData();
  }, [data]);
  //list data 
  const getData = async () => {
    const { data, error } = await supabase
      .from('ticket')
      .select('*, kereta:kode_kereta(nama_kereta), kota_asal:id_kota_asal(nama_kota_asal), kota_tujuan:id_kota_tujuan(nama_kota_tujuan), jadwal_rute_perjalanan:id_jadwal(jam_keberangkatan,jam_sampai)')
      .order('id_ticket', { ascending: false });
    setData(data);
  }

  const countDate = (a) => {
    let number = a + 1;
    if (number < 10) {
      return '0' + number.toString();
    }
    return number;
  }

  const bayi = (a) => {
    if (a == null) {
      return;
    }
    return ", " + a + " Bayi";
  }

  const sortir = (a, idTiket, nama, noTelp, kelas, dewasa, bayi, asal, tujuan, jamBerangkat, jamSampai, tanggalTiket, x, y) => {
    // let id = b;
    if (!a) {
      return;
    }
    return (
      <Card style={{ margin: 10, borderRadius: 10, padding: 20 }}>
        <Image style={{ margin: 20, height: 20, width: 50 }} source={require('../assets/kailogowarna.png')} />
        <View style={{ flexDirection: 'row', marginLeft: 10, marginBottom: 10 }}>
          <Ionicons name="train-outline" size={40} color="black" />
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}> ID Tiket : {idTiket}</Text>
        </View>

        <View style={{ flexDirection: 'row', marginLeft: 18 }}>
          <View style={{ flexDirection: 'column', }}>
            <Text style={styles.itemColumn}>Nama</Text>
            <Text style={styles.itemColumn}>No Telepon</Text>
            <Text style={styles.itemColumn}>Kelas Kereta</Text>
            <Text style={styles.itemColumn}>Penumpang</Text>
          </View>
          <View style={{ flexDirection: 'column', }}>
            <Text style={styles.itemColumn}>:</Text>
            <Text style={styles.itemColumn}>:</Text>
            <Text style={styles.itemColumn}>:</Text>
            <Text style={styles.itemColumn}>:</Text>
          </View>
          <View style={{ flexDirection: 'column', }}>
            <Text style={styles.itemColumn}>{nama}</Text>
            <Text style={styles.itemColumn}>{noTelp}</Text>
            <Text style={styles.itemColumn}>{kelas}</Text>
            <Text style={styles.itemColumn}>{dewasa} Dewasa{bayi}</Text>
          </View>
        </View>

        {/* <Text> Nama Kereta : {item.kota_asal.nama_kota_asal}</Text> */}
        <Divider style={{ height: 3, alignSelf: 'center', width: '90%', marginVertical: 10 }} />

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ margin: 10, width: '50%', fontSize: 16, fontWeight: 'bold' }}>{asal}</Text>
          <Text style={{ margin: 10, width: '50%', textAlign: 'right', fontSize: 16, fontWeight: 'bold' }}>{tujuan}</Text>
        </View>
        
        <View style={{ flexDirection: 'row', margin: 10 }}>
          <Text style={{
            width: '45%',
            textAlign: 'left',
            fontWeight: 'bold',
            fontSize: 25,
          }}>{jamBerangkat}</Text>
          <MaterialIcons style={{ width: '10%', textAlign: 'center' }} name="keyboard-arrow-right" size={40} color="black" />
          <Text
            style={{
              width: '45%',
              textAlign: 'right',
              fontWeight: 'bold',
              fontSize: 25,
            }}>{jamSampai}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              width: '50%',
              textAlign: 'left',
              fontWeight: 'bold',
              margin: 10
            }}>{tanggalTiket}</Text>
          <Text style={{
            width: '50%',
            textAlign: 'right',
            fontWeight: 'bold',
            margin: 10
          }}>{x}{y}</Text>
        </View>
      </Card>
    )
  }

  return (
    <>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id_ticket}
        renderItem={({ item, index }) => (
          <View key={index}>
            {sortir(
              item.status_pembayaran,
              item.id_ticket,
              item.nama_customer,
              item.no_telp_customer,
              item.kelas_kereta,
              item.dewasa,
              bayi(item.bayi),
              item.kota_asal.nama_kota_asal,
              item.kota_tujuan.nama_kota_tujuan,
              item.jadwal_rute_perjalanan.jam_keberangkatan,
              item.jadwal_rute_perjalanan.jam_sampai,
              item.tanggal_tiket,
              item.tanggal_tiket.toString().slice(0, 8),
              countDate(parseFloat(item.tanggal_tiket.toString().slice(8))),
            )}
          </View>
        )}
      />
    </>
  );
}

export default ActiveScreen;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  btn: {
    height: 30,
    width: 'auto',
    marginVertical: 20,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    textAlign: 'center',
    justifyContent: 'center',
    // color: 'black',
    borderWidth: 2,
    borderRadius: 16,
    borderColor: 'blue',
    // backgroundColor: 'blue',
  },
  content: {
    width: '100%',
    // height: '100vh',
    paddingTop: 80,
    // justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  stretch: {
    width: 200,
    height: 200,
    resizeMode: 'stretch',
  },
  text: {
    fontSize: 24,
    fontWeight: '400',
    color: 'grey',
  },
  itemColumn: {
    fontSize: 18,
    fontWeight: '400',
    height: 22,
    margin: 2
  }
});