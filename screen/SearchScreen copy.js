import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Text, FlatList } from 'react-native';
import { Appbar, Card, List } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import supabase from '../supabase';

import NotFoundRuteScreen from './NotFoundRuteScreen';

function SearchScreen({ navigation, route }) {
  const [data, setData] = useState([]);

  const idKotaAsal = route.params.idKotaAsal;
  const idKotaTujuan = route.params.idKotaTujuan;
  const kelas = route.params.kelas;
  const tanggal = route.params.tanggalBerangkat;
  const dewasa = route.params.jumlahDewasa;
  const bayi = route.params.jumlahBayi;

  useEffect(() => {
    getData();
  }, [data]);

  const getData = async () => {
    //data : hasil query, error : pesan error
    const { data, error } = await supabase
      .from('jadwal_rute_perjalanan')
      .select('*, kereta:kode_kereta(nama_kereta), kota_asal:id_kota_asal(nama_kota_asal), kota_tujuan:id_kota_tujuan(nama_kota_tujuan)')
      // .eq('kota_asal.nama_kota_asal', 'jakarta')
      .eq('tanggal_perjalanan', tanggal)
      .match({ id_kota_asal: idKotaAsal, id_kota_tujuan: idKotaTujuan })
      .order('id_jadwal', { ascending: true });
    //mengisi state data
    setData(data);
  }

  const countDate = (a) => {
    let number = a + 1;
    if (number < 10) {
      return '0' + number.toString();
    }
    return number;
  }

  if (data == null) {
    return (
      <>
        <Appbar.Header >
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Jadwal Perjalanan" color='white' />
        </Appbar.Header>
        <NotFoundRuteScreen />
      </>
    )

  } else {
    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Jadwal Perjalanan" style={{ justifyContent: 'center', alignItems: 'center', color: 'white' }} />
        </Appbar.Header>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View key={index}>
              <Card style={{ margin: 10, borderRadius: 15, }}
                onPress={() => navigation.navigate('OrderScreen', {
                  id: item.id_jadwal,
                  asal: item.id_kota_asal,
                  tujuan: item.id_kota_tujuan,
                  kodeKereta: item.kode_kereta,
                  kelas: kelas,
                  tanggal: tanggal,
                  harga: item.harga,
                  dewasa: dewasa,
                  bayi: bayi,
                })}
              >
                <Image style={{ margin: 20, height: 30, width: 100 }} source={require('../assets/kailogowarna.png')} />
                <Text style={
                  {
                    margin: 10,
                    color: 'blue',
                    fontWeight: 'bold',
                    fontSize: 20,
                    width: '50%'
                  }
                }>{item.kereta.nama_kereta}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{
                    marginHorizontal: 10,
                    color: 'black',

                    fontSize: 15,
                    width: '50%'
                  }
                  }>{kelas}</Text>
                  <Text style={
                    {
                      margin: 10,
                      width: '40%',
                      textAlign: 'right',
                      color: 'blue',
                      fontWeight: 'bold',
                      fontSize: 15,
                    }
                  }>Rp.{item.harga}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      width: '50%',
                      margin: 10,
                      textAlign: 'left'
                    }}>{item.kota_asal.nama_kota_asal}
                  </Text>
                  <Text style={{
                    width: '40%',
                    margin: 10,
                    textAlign: 'right'
                  }}>{item.kota_tujuan.nama_kota_tujuan}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      width: '33.3%',
                      marginLeft: 10,
                      textAlign: 'left',
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: 'blue'
                    }}>{item.jam_keberangkatan}
                  </Text>
                  <Text style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    width: '33.3%',
                    textAlign: 'center'
                  }}><MaterialIcons name="keyboard-arrow-right" size={24} color="black" /></Text>
                  <Text style={{
                    width: '25%',
                    marginLeft: 10,
                    textAlign: 'right',
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'blue'

                  }}>{item.jam_sampai}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ width: '50%', margin: 10 }}>{item.tanggal_perjalanan}</Text>
                  <Text style={{ width: '40%', margin: 10, textAlign: 'right', }}>{item.tanggal_perjalanan.toString().slice(0, 8)}{countDate(parseFloat(item.tanggal_perjalanan.toString().slice(8)))}</Text>

                </View>
              </Card>
            </View>
          )}
        />

        {/* <List.Section>{data.map( post => <List.item key={post.id_kota_asal}>{post.id_kota_asal}</List.item>)}</List.Section> */}
        {/* <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View key={index}>
            <Card style={{margin: 10,}} onPress={() => console.log('test')}>
              <Text>{item.kereta.nama_kereta}</Text>
              <Text>{item.kota_asal.nama_kota_asal} <MaterialIcons name="keyboard-arrow-right" size={24} color="black" /> {item.kota_tujuan.nama_kota_tujuan}</Text>
              <Text>{item.jam_keberangkatan} <MaterialIcons name="keyboard-arrow-right" size={24} color="black" /> {item.jam_sampai}</Text>
              <Text>Tanggal berangkat : {item.tanggal_perjalanan}</Text>
              <Text>Tanggal sampai : {item.tanggal_perjalanan.toString().slice(0, 9)}{countDate(parseFloat(item.tanggal_perjalanan.toString().slice(8)))}</Text>
              <Text>Rp.{item.harga*0.5}</Text>
      <Text>X : {id_X}</Text>
      <Text>Y : {id_Y}</Text>
            </Card>
          </View>
        )}
      /> */}
      </>
    );
  }

}

export default SearchScreen;




{/* <ScrollView horizontal={true}> */ }
{/* <Tab.Navigator tabBarOptions={{
                        
                        indicatorStyle:{
                                backgroundColor:'orange',
                                height:3,
                                },
                        labelStyle:{
                                fontWeight:'bold',
                                fontSize:12,
                                color:'orange',
                                }
                                }}>
      <Tab.Screen name="Senin" component={SeninScreen} />
      <Tab.Screen name="Selasa" component={SelasaScreen} />
      <Tab.Screen name="Rabu" component={RabuScreen} />
      <Tab.Screen name="Kamis" component={KamisScreen} />
      <Tab.Screen name="Jumat" component={JumatScreen} />
      <Tab.Screen name="Sabtu" component={SabtuScreen} />
      <Tab.Screen name="Minggu" component={MingguScreen} />
    </Tab.Navigator> */}
{/* </ScrollView> */ }
