import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Image, ScrollView } from 'react-native';
import { Appbar, Button, List, Title, Paragraph, Card, TextInput, Searchbar,Avatar, Divider } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import KAantarkota from './KAantarkotaScreen';
import KALokal from './KAlokalScreen';

const Tab = createMaterialTopTabNavigator();

function HomeScreen({ navigation }) {
   
    return (
        <>
    <Appbar.Header  style={{height:100, alignItems:'center', justifyContent:'center'}} >
        {/* <Appbar.Content title="Akun" color='white'/> */}
        <Image  style={{height:60, width:100,  }} source={require('../assets/logo_kai_transparent.png')} />
    </Appbar.Header>
    <ScrollView>
    <Card style={{margin:20, borderRadius:20, height:80}}>
        <View style={{flexDirection:'row'}}>
            {/* <Card style={styles.cardkaipay}> */}
                <List.Item style={{width:'50%'}}    
                    title="KAIPay"
                    titleStyle={{color:'black', fontSize:12}}
                    description="Aktivasi"
                    descriptionStyle={{color:'green', fontWeight:'bold'}}
                    
                    left={props => <Image style={styles.kaipaypointlogo} source={require('../assets/kaipaylogo.png')} />}
                 />
            {/* </Card> */}
            
            <Divider/>
            {/* <Card style={styles.cardpoint}> */}
                 <List.Item style={{width:'50%'}}
                    title="Poin Anda"
                    titleStyle={{color:'black', fontSize:12}}
                    description="-- Poin"
                    descriptionStyle={{color:'blue', fontWeight:'bold'}}
                   
                    left={props => <Image  style={styles.kaipaypointlogo} source={require('../assets/kaipointlogo.png')} />}
                />
            {/* </Card> */}
        </View>
    </Card>
    <Tab.Navigator tabBarOptions={{
                        style:{backgroundColor:'#f2eded', 
                                margin:10
                                }, 
                        indicatorStyle:{
                                backgroundColor:'blue',
                                height:3,
                                },
                        labelStyle:{
                                fontWeight:'bold',
                                color:'blue',
                                }
                                }}>
      <Tab.Screen name="KA Antar Kota" component={KAantarkota} />
      <Tab.Screen name="KA Lokal" component={KALokal} />
    </Tab.Navigator>
    </ScrollView>
        </>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height:'100%',
    },
    cardkaipay:{
        borderTopLeftRadius:20,
        borderBottomLeftRadius:20,
        height:80,
        width:'50%',
        backgroundColor:'white',
    },
    cardpoint:{
        borderTopRightRadius:20,
        borderBottomRightRadius:20,
        height:80,
        width:'50%',
        backgroundColor:'white',
    },
    kaipaypointlogo:{
        marginHorizontal:14, 
        marginVertical: 4, 
        height:50, 
        width:50
    }
});