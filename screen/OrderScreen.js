import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity,Image } from 'react-native';
import { Appbar, Card, TextInput, RadioButton, Title } from 'react-native-paper';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import NotFoundScreen from './NotFoundScreen';
import supabase from '../supabase';

function OrderScreen({ navigation, route }) {
    const [data, setData] = useState([]);
    const [namaCustomer, setNamaCustomer] = useState('');
    const [noTelp, setNoTelp] = useState('');
    const [pembayaran, setPembayaran] = useState(false);
    const [digunakan, setDigunakan] = useState(false);
    const [user, setUser] = useState('1');
    const [checked, setChecked] = React.useState('');
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

    useEffect(() => {
        getData();
    }, [data]);

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


    const countDate = (a) => {
        let number = a + 1;
        if (number < 10) {
            return '0' + number.toString();
        }
        return number;
    }


    const onSimpan = async () => {
        const { data, error } = await supabase
            .from('ticket')
            .insert({
                // id_ticket: tiket,
                id_user: user,
                id_jadwal: jadwal,
                kode_kereta: kodeKereta,
                id_kota_asal: asal,
                id_kota_tujuan: tujuan,
                nama_customer: namaCustomer,
                no_telp_customer: noTelp,
                tanggal_tiket: tanggal,
                kelas_kereta: kelas,
                harga_tiket: harga,
                status_pembayaran: pembayaran,
                status_digunakan: digunakan,
                dewasa:dewasa,
                bayi:bayi,
            });
        console.log(error);
        // Alert("Pesan", "Data berhasil disimpan");
        // navigation.goBack();
        navigation.navigate('TiketTab');
    }

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Pesan Tiket" color='white' />
            </Appbar.Header>
            {/* <NotFoundScreen /> */}
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <View key={index}>
                        <Card style={{ margin: 10, borderRadius: 8 }}>
                        <Image style={{margin:20,height:30, width:100}} source={require('../assets/kailogowarna.png')}/>
                            <Text style={{marginHorizontal:10, fontWeight:'bold', fontSize:18}}>No ID : {item.id_jadwal}</Text>
                            
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
                                <Text style={{marginHorizontal:10,width:'50%'}}>{kelas}</Text>
                                <Text style={
                                    {
                                        marginHorizontal:10,
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
                            <View style={{flexDirection:'row'}}>
                        <MaterialCommunityIcons style={{marginHorizontal: 20, marginVertical:10}} name="seat-passenger" size={40} color="black" />
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 25,
                                fontWeight: 'bold',
                                color: 'black',
                                marginVertical: 10,
                            }}>Penumpang</Text></View>
                            <TextInput
                                style={{ marginHorizontal: 10, backgroundColor:'white',width:'90%' }}
                                placeholder={'Nama Lengkap'}
                                value={namaCustomer}
                                onChangeText={text => setNamaCustomer(text)}
                            />
                            <TextInput
                                style={{ marginHorizontal: 10, backgroundColor:'white',width:'90%' }}
                                placeholder={'Nomor Telpon'}
                                value={noTelp}
                                onChangeText={text => setNoTelp(text)}
                            />
                            <View style={{flexDirection:'row'}}>
                              <RadioButton
                              title="laki"
                              label="Laki-Laki"
                                value="pria"
                                status={ checked === 'pria' ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('pria')}
                              /><Title>Laki-Laki</Title>
                            </View>
                            <View style={{flexDirection:'row'}}>
                              <RadioButton
                              label="Wanita"
                                value="wanita"
                                status={ checked === 'wanita' ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('wanita')}
                              /><Title>Perempuan</Title></View>
                            <TouchableOpacity
                                style={{ backgroundColor: 'orange', margin: 10, borderRadius: 12, height: 50, justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => onSimpan()}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold', margin: 10, fontSize: 20, }} >Beli</Text>
                            </TouchableOpacity>
                        </Card>
                    </View>
                )}
            />

        </>
    );
}

export default OrderScreen;