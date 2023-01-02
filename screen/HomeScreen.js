import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Image, ScrollView, } from 'react-native';
import { Appbar, Button, List, Title, Paragraph, Card, TextInput, Searchbar, Avatar, Divider } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import KAantarkota from './KAantarkotaScreen';
import KALokal from './KAlokalScreen';

function HomeScreen({ navigation }) {
    const Tab = createMaterialTopTabNavigator();
    return (
      <>
        <Appbar.Header style={{ height: 100, alignItems: 'center', justifyContent: 'center' }} >
                <Image style={{ height: 60, width: 100, }} source={require('../assets/logo_kai_transparent.png')} />
        </Appbar.Header>
            <Card style={{ margin: 20, borderRadius: 20, height: 80 }}>
                <View style={{ flexDirection: 'row' }}>
                    <List.Item style={{ width: '50%' }}
                        title="KAIPay"
                        titleStyle={{ color: 'black', fontSize: 12 }}
                        description="Aktivasi"
                        descriptionStyle={{ color: 'green', fontWeight: 'bold' }}

                        left={props => <Image style={styles.kaipaypointlogo} source={require('../assets/kaipaylogo.png')} />}
                    /><Divider />
                    <List.Item style={{ width: '50%' }}
                        title="Poin Anda"
                        titleStyle={{ color: 'black', fontSize: 12 }}
                        description="-- Poin"
                        descriptionStyle={{ color: 'blue', fontWeight: 'bold' }}

                        left={props => <Image style={styles.kaipaypointlogo} source={require('../assets/kaipointlogo.png')} />}
                    />
                </View>
            </Card>

        <Tab.Navigator
        
  screenOptions={{
    tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold', color: 'blue',},
    tabBarItemStyle: { width: 200,},
    tabBarStyle: { backgroundColor: 'white'},
  }}>
          <Tab.Screen name="KA Antar Kota" component={KAantarkota} />
          <Tab.Screen name="KA Lokal" component={KALokal} />
        </Tab.Navigator>
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