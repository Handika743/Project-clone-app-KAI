import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, FlatList } from 'react-native';
import { Appbar, Card, Divider, } from 'react-native-paper';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import supabase from '../supabase';

import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { ScrollView } from 'react-native-web';

function TiketScreen({ navigation, route }) {
  const [data, setData] = useState('');
  const [penumpang, setPenumpang] = useState('');

  useEffect(() => {
    getData();
    getPenumpang();
  }, []);
  //list data 
  const getData = async () => {
    const { data, error } = await supabase
      .from('ticket')
      .select('*, kereta:kode_kereta(nama_kereta), kota_asal:id_kota_asal(nama_kota_asal), kota_tujuan:id_kota_tujuan(nama_kota_tujuan), jadwal_rute_perjalanan:id_jadwal(jam_keberangkatan,jam_sampai)')
      // .order('id_ticket', { ascending: false });
      .eq('id_ticket', route.params.id);
    setData(data);
  }
  const getPenumpang = async () => {
    const { data, error } = await supabase
      .from('rls_ticket_penumpang')
      .select('*,penumpang:fk_id_penumpang(*)')
      // .order('id_ticket', { ascending: false });
      .eq('fk_id_ticket', route.params.id);
    setPenumpang(data);
  }

  const countDate = (a) => {
    let number = a + 1;
    if (number < 10) {
      return '0' + number.toString();
    }
    return number;
  }

  const onPrint = async (data, penumpang) => {

    //content 
    let html = `
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <div class="container" style="width: 18cm; height: auto; margin: 0; padding: 20px; border: 2px solid black; display: inline-flex; justify-content: center;" >
      <div class="item" style="margin: 0 10px; border: 0px solid black; width: 30%; fontsize:12">
        ${data[0].kereta.nama_kereta}
        <p>Nama Penumpang</p>
          ${penumpang[1].penumpang.nama_penumpang}
        <p>keberangkatan : </p>
          ${penumpang[1].penumpang.no_telp_penumpang}
        <p>keberangkatan : </p>
          ${penumpang[1].penumpang.gender}
          <p style="color:blue;">Keberangkatan : </p>
          ${data[0].kota_asal.nama_kota_asal}
        </div>
        </div>
            <div class="item" style="margin: 0 10px; border: 0px solid black; width: 30%;">
            <p style="color:blue;">Id Tiket : </p>
        ${data[0].id_ticket}
        <p style="color:blue;">Harga : </p>
        ${data[0].harga_tiket}
        <p style="color:blue;">Jumlah Penumpang : </p>
        ${data[0].jumlah_penumpang}
        <p style="color:blue;">Tanggal : </p>
        ${data[0].tanggal_tiket}
        <p style="color:blue;">Tujuan : </p>
        ${data[0].kota_tujuan.nama_kota_tujuan}
        </div>
            <div class="item" style="margin: 0 10px; border: 0px solid black; width: 30%;">
              <img src="https://cdn.discordapp.com/attachments/973623989689794667/991742143171412178/kailogowarna.png" alt="qr code tiket" width="200px">
            </div>
            </div></body></html>`;
    console.log('click print');
    //print file
    const { uri } = await Print.printToFileAsync({
      html
    });
    //share file
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    // onPrintPenumpang();
  }

  const onPrint1 = async (penumpang) => {

    //content 
    let html = `
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
    <p>${penumpang[0].penumpang.nama_penumpang}</p>
      <div class="container" style="width: 18cm; height: auto; margin: 0; padding: 20px; border: 2px solid black; display: inline-flex; justify-content: center;" >`
    // <img src=# alt="logo KAI">`
    // penumpang.map((item) => {
    //   html += `<div class="item" style="margin: 0 10px; border: 0px solid black; width: 30%;">`
    //   `<p>Nama Penumpang</p>` +
    //     + item.penumpang.nama_penumpang +
    //     `<p>keberangkatan : </p>`
    //     + item.penumpang.no_telp_penumpang +
    //     `<p>keberangkatan : </p>`
    //     + item.penumpang.gender +
    //     `</div>
    //     <div class="item" style="margin: 0 10px; border: 0px solid black; width: 30%;">
    //       <img src="https://cdn.discordapp.com/attachments/973623989689794667/991742143171412178/kailogowarna.png" alt="qr code tiket" width="200px">
    //     </div>`
    // });

    html += `</div></body></html>`;
    console.log('click print');
    //print file
    const { uri } = await Print.printToFileAsync({
      html
    });
    //share file
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    // onPrintPenumpang();
  }

  const onPrintPenumpang = async (penumpang) => {
    data.map((item) => {
      html += `<div class="item" style="margin: 0 10px; border: 0px solid black; width: 30%;">`
        `<p>Nama Penumpang</p>` +
        + item.penumpang.nama_penumpang +
        `<p>keberangkatan : </p>`
        + item.penumpang.no_telp_penumpang +
        `<p>keberangkatan : </p>`
        + item.penumpang.gender +
        `</div>`
    });

    html += `</div></body></html>`;

    //print file
    const { uri } = await Print.printToFileAsync({
      html
    });
    //share file
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  }

  return (
    <>
      <Appbar.Header >
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Tiket" color='white' />
        <Appbar.Action icon="printer" onPress={() => onPrint(data, penumpang)} />
      </Appbar.Header>
      <View style={{ borderColor: 'red', borderWidth: 0, }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id_ticket}
          renderItem={({ item, index }) => (
            <View key={index}>
              <Card style={{ margin: 10, borderRadius: 10, padding: 0 }}>
                <Image style={{ margin: 20, height: 20, width: 50 }} source={require('../assets/kailogowarna.png')} />
                <View style={{ flexDirection: 'row', marginLeft: 10, marginBottom: 10 }}>
                  <Ionicons name="train-outline" size={40} color="black" />
                  <Text style={{ fontSize: 25, fontWeight: 'bold' }}> ID Tiket : {item.id_ticket}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: 18 }}>
                  <View style={{ flexDirection: 'column', }}>
                    <Text style={styles.itemColumn}>Kelas Kereta</Text>
                    <Text style={styles.itemColumn}>Penumpang</Text>
                    <Text style={styles.itemColumn}>Harga</Text>
                  </View>
                  <View style={{ flexDirection: 'column', }}>
                    <Text style={styles.itemColumn}> : </Text>
                    <Text style={styles.itemColumn}> : </Text>
                    <Text style={styles.itemColumn}> : </Text>
                  </View>
                  <View style={{ flexDirection: 'column', }}>
                    <Text style={styles.itemColumn}>{item.kelas_kereta}</Text>
                    <Text style={styles.itemColumn}>{item.jumlah_penumpang} Dewasa</Text>
                    <Text style={styles.itemColumn}>Rp.{item.harga_tiket}</Text>
                  </View>
                </View>

                <Divider style={{ height: 3, alignSelf: 'center', width: '90%', marginVertical: 10 }} />

                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ margin: 10, width: '45%', fontSize: 16, fontWeight: 'bold' }}>{item.kota_asal.nama_kota_asal}</Text>
                  <Text style={{ margin: 10, width: '45%', textAlign: 'right', fontSize: 16, fontWeight: 'bold' }}>{item.kota_tujuan.nama_kota_tujuan}</Text>
                </View>

                <View style={{ flexDirection: 'row', margin: 10 }}>
                  <Text style={{
                    width: '45%',
                    textAlign: 'left',
                    fontWeight: 'bold',
                    fontSize: 25,
                  }}>{item.jadwal_rute_perjalanan.jam_keberangkatan}</Text>
                  <MaterialIcons style={{ width: '10%', textAlign: 'center' }} name="keyboard-arrow-right" size={40} color="black" />
                  <Text
                    style={{
                      width: '45%',
                      textAlign: 'right',
                      fontWeight: 'bold',
                      fontSize: 25,
                    }}>{item.jadwal_rute_perjalanan.jam_sampai}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      width: '45%',
                      textAlign: 'left',
                      fontWeight: 'bold',
                      margin: 10
                    }}>{item.tanggal_tiket}</Text>
                  <Text style={{
                    width: '45%',
                    textAlign: 'right',
                    fontWeight: 'bold',
                    margin: 10
                  }}>{item.tanggal_tiket.toString().slice(0, 8)}{countDate(parseFloat(item.tanggal_tiket.toString().slice(8)))}</Text>
                </View>
              </Card>
            </View>
          )}
        />
      </View>
      <View>
        {/* <ScrollView> */}
        <Text style={{ textAlign: 'center', fontSize: 32, fontWeight: '700', color: '', }}>Daftar Penumpang</Text>
        <FlatList
          data={penumpang}
          keyExtractor={(item) => item.id_penumpang}
          renderItem={({ item, index }) => (
            <View key={index}>
              <Card style={{ margin: 10, borderRadius: 10, padding: 20 }}>
                {/* <Image style={{ margin: 20, height: 20, width: 50 }} source={require('../assets/kailogowarna.png')} /> */}
                <View style={{ flexDirection: 'row', marginLeft: 18 }}>
                  <View style={{ flexDirection: 'column', }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Nama Penumpang</Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>No telp</Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Gender</Text>
                  </View>
                  <View style={{ flexDirection: 'column', }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}> : </Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}> : </Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}> : </Text>
                  </View>
                  <View style={{ flexDirection: 'column', }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.penumpang.nama_penumpang}</Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.penumpang.no_telp_penumpang}</Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.penumpang.gender}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={{ backgroundColor: 'orange', margin: 10, borderRadius: 12, height: 50, justifyContent: 'center', alignItems: 'center' }}
                  onPress={() => onPrint(data, penumpang)}
                // onPress={() => console.log(user, noTelp, gender)}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold', margin: 10, fontSize: 20, }} >print</Text>
                </TouchableOpacity>
              </Card>
            </View>
          )}
        />
        {/* </ScrollView> */}
      </View>
    </>
  )
}

export default TiketScreen;
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