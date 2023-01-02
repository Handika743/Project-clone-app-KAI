import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { Appbar, Card, TextInput, RadioButton, Title } from 'react-native-paper';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import NotFoundScreen from './NotFoundScreen';
import supabase from '../supabase';

function OrderScreen({ navigation, route }) {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [dataTiket, setDataTiket] = useState([]);
    const [namaCustomer, setNamaCustomer] = useState('');
    const [akun, setAkun] = useState('1');
    // const [noTelp, setNoTelp] = useState('');
    // const [pembayaran, setPembayaran] = useState('false');
    // const [digunakan, setDigunakan] = useState('false');
    // const [checked, setChecked] = React.useState('');
    // const [tiket, setTiket] = useState('5');
    // const [jadwal, setJadwal] = useState('');

    const jadwal = route.params.id;
    const asal = route.params.asal;
    const tujuan = route.params.tujuan;
    const kodeKereta = route.params.kodeKereta;
    const kelas = route.params.kelas;
    const tanggal = route.params.tanggal;
    const harga = route.params.harga;
    const dewasa = route.params.dewasa;
    const bayi = route.params.bayi;

    const [user, setUser] = useState([]);
    const [userName, setUserName] = useState("");

    const [noTelp, setnoTelp] = useState([]);
    const [NewNoTelp, setNewNoTelp] = useState("");

    const [gender, setGender] = React.useState([]);
    const [checked, setChecked] = React.useState('');

    useEffect(() => {
        getData();
        getData1();
        getData2();
        // getDataTiket();
    }, [data, data1, data2]);

    const getData = async () => {
        //data : hasil query, error : pesan error
        const { data, error } = await supabase
            .from('jadwal_rute_perjalanan')
            .select('*, kereta:kode_kereta(nama_kereta), kota_asal:id_kota_asal(nama_kota_asal), kota_tujuan:id_kota_tujuan(nama_kota_tujuan)')
            .eq('id_jadwal', route.params.id)
        // .eq('kota_asal.nama_kota_asal', 'jakarta')
        // .eq('tanggal_perjalanan', '2022-06-01 ')
        // .match({ id_kota_asal: idKotaAsal, id_kota_tujuan: idKotaTujuan })
        // .order('id_jadwal', { ascending: true });
        //mengisi state data
        setData(data);
        // setJadwal(data.id_jadwal);
    }
    // ==========

    // const getDataTiket = async () => {
    //     const { data, error } = await supabase
    //         .from('ticket')
    //         .select('*')
    //         .order('id_ticket', { ascending: false });
    //     // .limit(last);
    //     setDataTiket(data.length);
    // }
    const getData1 = async () => {
        const { data, error } = await supabase
            .from('ticket')
            .select('*');
        setData1(data.length);
    }
    const getData2 = async () => {
        const { data, error } = await supabase
            .from('penumpang')
            .select('*');
        setData2(data.length);
    }


    const countDate = (a) => {
        let number = a + 1;
        if (number < 10) {
            return '0' + number.toString();
        }
        return number;
    }

    const clear = () => {
        setUser([]);
        setnoTelp([]);
        setGender([]);
    }

    const onSimpan = async () => {
        for (let i = 1; i == 1 ; i++) {
            const { data, error } = await supabase
                .from('ticket')
                .insert({
                    // id_ticket: tiket,
                    id_user: akun,
                    id_jadwal: jadwal,
                    kode_kereta: kodeKereta,
                    id_kota_asal: asal,
                    id_kota_tujuan: tujuan,
                    tanggal_tiket: tanggal,
                    kelas_kereta: kelas,
                    harga_tiket: harga,
                    // status_pembayaran: pembayaran,
                    // status_digunakan: digunakan,
                    jumlah_penumpang: dewasa,
                    // bayi: bayi,
                });
            console.log(error);    
        };
        // Alert("Pesan", "Data berhasil disimpan");
        // navigation.goBack();
        // navigation.navigate('TiketTab');

        for (let i = 0; i < route.params.dewasa; i++) {
            const { data, error } = await supabase
                .from('penumpang')
                .insert({
                    nama_penumpang: user[i],
                    no_telp_penumpang: noTelp[i],
                    gender: gender[i],
                });
            console.log(error);
            // console.log(user, noTelp, gender);
        };

        for (let i = 0; i < 1; i++) {
            const { data, error } = await supabase
              .from('test-tiket')
              .insert({
                // nama_penumpang: user [i],
                jurusan: 'jakarta - solo',
                // fk_tiket: 1,
              });
            console.log(error);
          };  
          onSimpan1();
    }
    const onSimpan1 = async () => {
        let a = data2+1;
        let b = data1+1;
        for (let i = 0; i < route.params.dewasa; i++) {
            const { data, error } = await supabase
              .from('rls_ticket_penumpang')
              .insert({
                fk_id_ticket: b,
                fk_id_penumpang: a++,
              });
            console.log(error);
          };
          
        //   console.log(user, noTelp, gender);
        setUser([]);
        setnoTelp([]);
        setGender([]);
        // Alert("Pesan", "Data berhasil disimpan");
        // navigation.goBack();
        navigation.navigate('TiketTab');
    }

    const addItem = () => {
        setUser([...user, userName]);
        setUserName("");

        setnoTelp([...noTelp, NewNoTelp]);
        setNewNoTelp("");

        setGender([...gender, checked]);
        setChecked("");
    };

    const inputData = () => {
        let output = [];
        for (let i = 0; i < route.params.dewasa; i++) {
            output.push(
                <Card style={{ margin: 10, }}>
                    <Text style={{textAlign:'center', fontWeight:'bold', fontSize:20}}>Penumpang {i + 1}</Text>
                    <TextInput
                        style={{ backgroundColor: '#edf2ef', height: 40, width: '90%', borderRadius: 10, borderTopLeftRadius:10, borderTopRightRadius:10,  marginHorizontal: 10, marginTop:10 }}
                        placeholder="Nama Penumpang"
                        value={user[i]}
                        onChangeText={text => setUserName(text)}
                        // onChangeText={text => setUser([...user, (text)])}
                    />
                    <TextInput
                        style={{ backgroundColor: '#edf2ef', height: 40, width: '90%', borderRadius: 10, borderTopLeftRadius:10, borderTopRightRadius:10,marginHorizontal: 10, marginTop:10}}
                        placeholder="Nomor Telepon"
                        value={noTelp[i]}
                        onChangeText={text => setNewNoTelp(text)}
                        // onChangeText={text => setnoTelp([...noTelp, NewNoTelp])}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <RadioButton
                            label="Laki-Laki"
                            value={gender[i]}
                            status={gender[i] === 'Laki-Laki' || checked === 'Laki-Laki' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('Laki-Laki')}
                        /><Title>Laki-Laki</Title>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <RadioButton
                            label="Perempuan"
                            value={gender[i]}
                            status={gender[i] === 'Perempuan' || checked === 'Perempuan' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('Perempuan')}
                        /><Title>Perempuan</Title>
                    </View>
                    <TouchableOpacity
                        style={{ backgroundColor: 'orange', margin: 10, borderRadius: 12, height: 50, justifyContent: 'center', alignuser: 'center', width: 120, left:'30%' }}
                        onPress={() => addItem()}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold', margin: 10, fontSize: 20, textAlign:'center' }} >Tambah</Text>
                    </TouchableOpacity>
                </Card>
            );
        }
        return output;
    }
// const datax1 = setData2;
    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Pesan Tiket" color='white' />
            </Appbar.Header>
            {/* <NotFoundScreen /> */}
            {/* <Text>{data.length} -- {data2}</Text> */}
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <View key={index}>
                        <Card style={{ margin: 10, borderRadius: 8 }}>
                            <Image style={{ margin: 20, height: 30, width: 100 }} source={require('../assets/kailogowarna.png')} />
                            <Text style={{ marginHorizontal: 10, fontWeight: 'bold', fontSize: 18 }}>No ID : {item.id_jadwal}</Text>
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
                                <Text style={{ marginHorizontal: 10, width: '50%' }}>{kelas}</Text>
                                <Text style={
                                    {
                                        marginHorizontal: 10,
                                        width: '40%',
                                        textAlign: 'right',
                                        color: 'blue',
                                        fontWeight: 'bold',
                                        fontSize: 18,
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
                        <Card style={{ margin: 10, borderRadius: 8, }}>
                            {inputData()}
                            <TouchableOpacity
                                style={{ backgroundColor: 'orange', margin: 10, borderRadius: 12, height: 50, justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => onSimpan()}
                            // onPress={() => console.log(user, noTelp, gender)}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold', margin: 10, fontSize: 20, }} >Beli</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ backgroundColor: 'orange', margin: 10, borderRadius: 12, height: 50, justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => console.log(user, noTelp, gender)}
                            // onPress={() => console.log(user, noTelp, gender)}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold', margin: 10, fontSize: 20, }} >print</Text>
                            </TouchableOpacity>
                        </Card>
                        {/* <View>
                            <Text>jadwal       : {jadwal}</Text>
                            <Text>kodeKereta   : {kodeKereta}</Text>
                            <Text>asal         : {asal}</Text>
                            <Text>tujuan       : {tujuan}</Text>
                            <Text>-----------------------</Text>
                            <Text>kelas        : {kelas}</Text>
                            <Text>tanggal      : {tanggal}</Text>
                            <Text>harga        : {harga}</Text>
                            <Text>dewasa       : {dewasa}</Text>
                            <Text>bayi         : {bayi}</Text>
                        </View> */}
                    </View>
                )}
            />

        </>
    );
}

export default OrderScreen;