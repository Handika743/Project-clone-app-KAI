import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Switch, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Title, Card, } from 'react-native-paper';
import { Picker } from "@react-native-picker/picker";
import supabase from '../supabase';
import HistoryScreen from './HistoryScreen';

function KAantarkota({ navigation }) {
  //state list data picker
  const [dataPicker, setDataPicker] = useState([]);
  // const [dataPicker2, setDataPicker2] = useState([]);
  //state picker yang dipilih
  const [idKotaAsal, setKotaAsal] = useState('1');
  const [idKotaTujuan, setKotaTujuan] = useState('2');
  const [kelas, setkelas] = useState('Eksekutif');
  const [tanggalBerangkat, setTanggalBerangkat] = useState('');
  const [jumlahDewasa, setJumlahDewasa] = useState('');
  const [jumlahBayi, setJumlahBayi] = useState('');
  

  useEffect(() => {
    getKota();
  }, []);

  //list data picker
  const getKota = async () => {
    const { data, error } = await supabase
      .from('kota_asal')
      .select('id_kota_asal, nama_kota_asal');
    //   .order('nama_kota_asal', {ascending:true});
    setDataPicker(data);

  }
  // useEffect(() => {
  //   getKotaTujuan();
  // }, []);

  //list data picker
  // const getKotaTujuan = async () => {
  //   const { data, error } = await supabase
  //     .from('kota_tujuan')
  //     .select('id_kota_tujuan, nama_kota_tujuan')
  //   //   .order('nama_kota_tujuan', {ascending:true});
  //   setDataPicker2(data);

  // }

  return (
    <>
      <Card style={{ margin: 10, borderRadius: 10, height: 400 }}>
        <View style={{ flexDirection: 'row' }}>
          <Card.Content style={{ alignItems: 'center' }}>
            <Title style={{ fontSize: 20, fontWeight: 'bold' }}>Asal</Title>
            <Picker
              style={{ height: 50, width: 150 }}
              selectedValue={idKotaAsal}
              onValueChange={(value) => setKotaAsal(value)}
            >

              {dataPicker.map((row) =>
                <Picker.Item label={row.nama_kota_asal} value={row.id_kota_asal} />
              )}
            </Picker>
          </Card.Content>
          <Card.Content style={{ alignItems: 'center' }}>
            <Title style={{ fontSize: 20, fontWeight: 'bold' }}>Tujuan</Title>
            <Picker
              idkota="1"
              style={{ height: 50, width: 150 }}
              selectedValue={idKotaTujuan}
              onValueChange={(value) => setKotaTujuan(value)}
            >

              {dataPicker.map((row) =>
                <Picker.Item label={row.nama_kota_asal} value={row.id_kota_asal} />
              )}
            </Picker>
          </Card.Content>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Card.Content style={{ alignItems: 'center' }}>
            <Title style={{ fontSize: 15, fontWeight: 'bold' }}>Tanggal Berangkat</Title>
            <TextInput 
              label="tanggalBerangkat"
              value={tanggalBerangkat}
              onChangeText={text => setTanggalBerangkat(text)}
              placeholder='Tanggal'
              style={{ backgroundColor: '#edf2ef', height: 40, width: 150, borderRadius: 10 }}
            >
            </TextInput>
          </Card.Content>
          
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Card.Content style={{ alignItems: 'center' }}>
            <Title style={{ fontSize: 17, fontWeight: 'bold' }}>Kelas Kereta</Title>
            <Picker
              selectedValue={kelas}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setkelas(itemValue)}>
              <Picker.Item label="Eksekutif" value="Eksekutif" />
              <Picker.Item label="Bisnis" value="Bisnis" />
              <Picker.Item label="Ekonomi" value="Ekonomi" />
            </Picker>
          </Card.Content>

          <Card.Content style={{ alignItems: 'center' }}>
            <Title style={{ fontSize: 17, fontWeight: 'bold' }}>Penumpang</Title>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  style={{ backgroundColor: '#edf2ef', height: 40, width: 70, borderRadius: 10, marginHorizontal: 10 }}
                  placeholder="Dewasa"
                  value={jumlahDewasa}
                  onChangeText={text => setJumlahDewasa(text)}
                />
                <TextInput
                  style={{ backgroundColor: '#edf2ef', height: 40, width: 70, borderRadius: 10 }}
                  placeholder="Bayi"
                  value={jumlahBayi}
                  onChangeText={text => setJumlahBayi(text)}
                />
              </View>
          </Card.Content>
        </View>
        <Text style={{ marginTop: 20, marginLeft: 10, fontSize: 10, color: 'grey' }}>Penumpang bayi tidak mendapatkan kursi sendiri</Text>
        <TouchableOpacity
          style={{ backgroundColor: 'orange', margin: 10, borderRadius: 12, height: 50, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => navigation.navigate('SearchScreen', {idKotaAsal, idKotaTujuan, kelas, tanggalBerangkat, jumlahDewasa, jumlahBayi,})}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', margin: 10, fontSize: 20, }} >Cari</Text>
        </TouchableOpacity>
      </Card>
    </>
  );
}

export default KAantarkota;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  cardkaipay: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    height: 80,
    width: '50%',
    backgroundColor: 'white',
  },
  cardpoint: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    height: 80,
    width: '50%',
    backgroundColor: 'white',
  },
  kaipaypointlogo: {
    marginHorizontal: 14,
    marginVertical: 4,
    height: 50,
    width: 50
  }
});