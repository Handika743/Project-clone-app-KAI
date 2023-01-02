import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, FlatList } from 'react-native';
import { Appbar, Button, Card, Divider, TextInput,RadioButton, Title } from 'react-native-paper';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import NotFoundScreen from './NotFoundScreen';
import supabase from '../supabase';
function HistoryScreen({ navigation }) {
  // const [datax, setDatax] = useState('');
  // const [idTiket, setIdTiket] = useState('');

  // useEffect(() => {
  //   getDatatest();
  // }, [datax]);
  // //list data 
  // const getDatatest = async () => {
  //   const { data, error } = await supabase
  //     .from('test-tiket')
  //     .select('*');
  //   // .order('id_ticket', { ascending: false });
  //   setDatax(data);
  //   setIdTiket(data.id_tiket);
  // }

  // const [user, setUser] = useState([]);
  // const [userName, setUserName] = useState("");

  // const [noTelp, setnoTelp] = useState([]);
  // const [NewNoTelp, setNewNoTelp] = useState("");

  // const [gender, setGender] = React.useState([]);
  // const [checked, setChecked] = React.useState('');

  // let x = 1;

  // const addItem = () => {
  //     setUser([...user, userName]);
  //     setUserName("");
  
  //     setnoTelp([...noTelp, NewNoTelp]);
  //     setNewNoTelp("");

  //     setGender([...gender, checked]);
  //     setChecked("");
  // };

  // const onSimpan = async () => {
  //   // let a = ["test arr1", "text arr2"];
  //   for (let i = 0; i < 2; i++) {
  //     const { data, error } = await supabase
  //       .from('penumpang')
  //       .insert({
  //         nama_penumpang: user [i],
  //         no_telp: noTelp [i],
  //       });
  //     console.log(error);      
  //   }
  //   console.log(user);
  //   setUser([]);
  //   setnoTelp([]);
  //   setGender([]);
  // }

  // const inputData = () => {
  //   let output = [];
  //   for (let i = 0; i < 2;i++) {
  //     output.push(
  //       <Card style={{margin: 10,}}>
  //         <Text>data ke-{i+1}</Text>
  //         <TextInput
  //           style={{ backgroundColor: '#edf2ef', height: 40, width: '100%', borderRadius: 10, marginHorizontal: 10 }}
  //           placeholder="user"
  //           value={user [i]}
  //           onChangeText={text => setUserName(text)}
  //         />
  //         <TextInput
  //           style={{ backgroundColor: '#edf2ef', height: 40, width: '100%', borderRadius: 10, marginHorizontal: 10 }}
  //           placeholder="no telepon"
  //           value={noTelp [i]}
  //           onChangeText={text => setNewNoTelp(text)}
  //         />
  //         <View style={{ flexDirection: 'row' }}>
  //             <RadioButton
  //                 label="Laki-Laki"
  //                 value={gender [i]}
  //                 status={gender[i] === 'Laki-Laki' || checked === 'Laki-Laki' ? 'checked' : 'unchecked'}
  //                 onPress={() => setChecked('Laki-Laki')}
  //             /><Title>Laki-Laki</Title>
  //         </View>
  //         <View style={{ flexDirection: 'row' }}>
  //             <RadioButton
  //                 label="Perempuan"
  //                 value={gender [i]}
  //                 status={gender [i] === 'Perempuan' || checked === 'Perempuan' ? 'checked' : 'unchecked'}
  //                 onPress={() => setChecked('Perempuan')}
  //             /><Title>Perempuan</Title>
  //         </View>
  //         <TouchableOpacity
  //         style={{ backgroundColor: 'orange', margin: 10, borderRadius: 12, height: 30, justifyContent: 'center', alignuser: 'center', width: 60, }}
  //         onPress={() => addItem()}
  //       >
  //         <Text style={{ color: 'white', fontWeight: 'bold', margin: 10, fontSize: 20, }} >add</Text>
  //       </TouchableOpacity>
  //       </Card>
  //     );
  //   }
  //   return output
  // }


  return (
    <>
      <Appbar.Header >
        <Appbar.Content title="Riwayat +" color='white' />
      </Appbar.Header>
      <NotFoundScreen/>
      {/* {inputData()}
          <TouchableOpacity
          style={{ backgroundColor: 'orange', margin: 10, borderRadius: 12, height: 50, justifyContent: 'center', alignuser: 'center' }}
          onPress={() => console.log(user, noTelp, gender)}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', margin: 10, fontSize: 20, }} >print</Text>
        </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: 'orange', margin: 10, borderRadius: 12, height: 50, justifyContent: 'center', alignuser: 'center' }}
        onPress={() => onSimpan()}
      // console.log(user)}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', margin: 10, fontSize: 20, }} >Simpan</Text>
      </TouchableOpacity> */}
    </>
  )
}

export default HistoryScreen;