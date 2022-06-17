import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, FlatList } from 'react-native';
import { Appbar, Card, Divider, } from 'react-native-paper';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import NotFoundScreen from './NotFoundScreen';
import supabase from '../supabase';
import { Touchable } from 'react-native';
function HistoryScreen({ navigation }) {
  const [data, setData] = useState('');
  const [status, setStatus] = useState(true);

  useEffect(() => {
    getData();
  }, [data]);
  //list data 
  const getData = async () => {
    const { data, error } = await supabase
      .from('status_pembayaran')
      .select('*')
      .order('id_pembayaran', { ascending: true });
    setData(data);
  }
  const statusX = (a, b) => {
    return (
      <TouchableOpacity style={{ width: 100, height: 'auto', borderColor: 'blue', borderWidth: 2, padding: 2}} onPress={() => onSimpan(b)}>
        <Text>Status false</Text>
      </TouchableOpacity>
    )
  }
  const onSimpan = async (a) => {
    const { data, error } = await supabase
        .from('status_pembayaran')
        .update({
            // id_ticket: tiket,
            status: status,
        })
        .eq('id_pembayaran', a);
    console.log(error);
    // Alert("Pesan", "Data berhasil disimpan");
    // navigation.navigate('') 
}

  const sortir = (a, b, c) => {
    let id = b;
    if (a) {
    return (
      <Card style={{ margin: 10, borderRadius: 15, padding: 10 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column', paddingHorizontal: 10, paddingVertical: 2 }}>
            <Text>Id pembayaran</Text>
            <Text>Keterangan</Text>
            <Text>Status</Text>
          </View>
          <View style={{ flexDirection: 'column', paddingHorizontal: 0, paddingVertical: 2 }}>
            <Text> :  </Text>
            <Text> :  </Text>
            <Text> :  </Text>
          </View>
          <View style={{ flexDirection: 'column', paddingHorizontal: 2, paddingVertical: 2 }}>
            <Text>{id}</Text>
            <Text>Sudah Bayar</Text>
            <Text>True</Text>
          </View>
        </View>{c}
      </Card>
    )
    } else {
      
    return (
      <Card style={{ margin: 10, borderRadius: 15, padding: 10 , backgroundColor: 'grey'}}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column', paddingHorizontal: 10, paddingVertical: 2 }}>
            <Text>Id pembayaran</Text>
            <Text>Keterangan</Text>
            <Text>Status</Text>
          </View>
          <View style={{ flexDirection: 'column', paddingHorizontal: 0, paddingVertical: 2 }}>
            <Text> :  </Text>
            <Text> :  </Text>
            <Text> :  </Text>
          </View>
          <View style={{ flexDirection: 'column', paddingHorizontal: 2, paddingVertical: 2 }}>
            <Text>{id}</Text>
            <Text>Sudah Bayar</Text>
            <Text>True</Text>
          </View>
        </View>{c}
      </Card>
    )
    }
  }

  if (data == null) {
    return (
      <>
        <Appbar.Header >
          <Appbar.Content title="Riwayat +" color='white' />
        </Appbar.Header>
        <NotFoundScreen />
      </>
    )
  } else {
    return (
      <>
        <Appbar.Header >
          <Appbar.Content title="Riwayat +" color='white' />
        </Appbar.Header>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View key={index}>
              {sortir(item.status, item.id_pembayaran, statusX(item.status, item.id_pembayaran))}
            </View>
          )}
        />
      </>
    )
  }
}

export default HistoryScreen;