import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Switch, TextInput, Text, TouchableOpacity } from 'react-native';
import { Title, Card, } from 'react-native-paper';
import { Picker } from "@react-native-picker/picker";
import DatePicker from 'react-native-neat-date-picker';
import { AntDesign } from '@expo/vector-icons';
import supabase from '../supabase';
import HistoryScreen from './HistoryScreen';

function KAlokalkota({ navigation }) {
  const [selectedValue, setSelectedValue] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  //state list data picker
  const [dataPicker, setDataPicker] = useState([]);
  const [dataPicker2, setDataPicker2] = useState([]);
  //state picker yang dipilih
  const [idKotaAsal, setKotaAsal] = useState('1');
  const [idKotaTujuan, setKotaTujuan] = useState('2');
  const [jumlahDewasa, setJumlahDewasa] = useState('');
  // const [kelas, setkelas] = useState('');
  // const [dewasa, setDewasa] = useState('');
  // const [bayi, setBayi] = useState('');
  // const [tanggal, setTanggal] = useState('');
  // const [tanggalBerangkat, setTanggalBerangkat] = useState('');
  // const [tanggalSampai, setTanggalSampai] = useState('');
  // const [jumlahBayi, setJumlahBayi] = useState('');
  

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tanggal, setTanggal] = useState('');

  const openDatePicker = () => {
    setShowDatePicker(true)
  }

  const onCancel = () => {
    // You should close the modal in here
    setShowDatePicker(false)
  }

  const onConfirm = (output) => {
    // You should close the modal in here
    setShowDatePicker(false)
    setTanggal(output.dateString)

    // The parameter 'output' is an object containing date and dateString (for single mode).
    // For range mode, the output contains startDate, startDateString, endDate, and EndDateString
    // console.log(output.date)
    // console.log(output.dateString)
  }

  useEffect(() => {
    getKotaAsal();
  }, []);

  //list data picker
  const getKotaAsal = async () => {
    const { data, error } = await supabase
      .from('kota_asal')
      .select('id_kota_asal, nama_kota_asal');
    //   .order('nama_kota_asal', {ascending:true});
    setDataPicker(data);

  }
  useEffect(() => {
    getKotaTujuan();
  }, []);

  //list data picker
  const getKotaTujuan = async () => {
    const { data, error } = await supabase
      .from('kota_tujuan')
      .select('id_kota_tujuan, nama_kota_tujuan')
    //   .order('nama_kota_tujuan', {ascending:true});
    setDataPicker2(data);

  }

  return (
    <>
      <Card style={{ margin: 10, borderRadius: 10, height: 400 }}>
        <View style={{ flexDirection: 'row' }}>
          <Card.Content style={{ alignItems: 'flex-start' }}>
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
          <Card.Content style={{ alignItems: 'flex-end' }}>
            <Title style={{ fontSize: 20, fontWeight: 'bold' }}>Tujuan</Title>
            <Picker
              idkota="1"
              style={{ height: 50, width: 150 }}
              selectedValue={idKotaTujuan}
              onValueChange={(value) => setKotaTujuan(value)}
            >

              {dataPicker2.map((row) =>
                <Picker.Item label={row.nama_kota_tujuan} value={row.id_kota_tujuan} />
              )}
            </Picker>
          </Card.Content>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Card.Content style={{ alignItems: 'flex-start' }}>
            <Title style={{ fontSize: 15, fontWeight: 'bold' }}>Tanggal Berangkat</Title>
            <TouchableOpacity onPress={openDatePicker} >
              <AntDesign name="calendar" size={48} color="blue" />
              {/* <Button onPress={openDatePicker} /> */}
              <DatePicker
                isVisible={showDatePicker}
                mode={'single'}
                onCancel={onCancel}
                onConfirm={onConfirm}
              />
            </TouchableOpacity>
            {/* <TextInput 
              label="tanggalBerangkat"
              value={tanggalBerangkat}
              onChangeText={text => setTanggalBerangkat(text)}
              placeholder='Tanggal'
              style={{ backgroundColor: '#edf2ef', height: 40, width: 150, borderRadius: 10 }}
            >
            </TextInput> */}
          </Card.Content>
          
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          
          <Card.Content style={{ alignItems: 'flex-start' }}>
            <Title style={{ fontSize: 17, fontWeight: 'bold' }}>Penumpang</Title>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  style={{ backgroundColor: '#edf2ef', height: 40, width: 100, borderRadius: 10 }}
                  placeholder="Dewasa"
                  value={jumlahDewasa}
                  onChangeText={text => setJumlahDewasa(text)}
                />
              </View>
          </Card.Content>
        </View>
        <Text style={{ marginTop: 20, marginLeft: 10, fontSize: 10, color: 'grey' }}>Penumpang bayi tidak mendapatkan kursi sendiri</Text>
        <TouchableOpacity
          style={{ backgroundColor: 'orange', margin: 10, borderRadius: 12, height: 50, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => navigation.navigate('SearchScreen', {idKotaAsal, idKotaTujuan, tanggal, jumlahDewasa,})}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', margin: 10, fontSize: 20, }} >Cari</Text>
        </TouchableOpacity>
      </Card>
    </>
  );
}

export default KAlokalkota;