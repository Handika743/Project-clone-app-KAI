import React from 'react';
import { Appbar, Button, List, Title, Paragraph, Card } from 'react-native-paper';
import { FlatList, StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ActiveScreen from './ActiveScreen';
import WaitingScreen from './WaitingScreen';

function BookingScreen({navigation}) {
  const Tab = createMaterialTopTabNavigator();
  return (
    <>
<Appbar.Header>
  <Appbar.Content title="Tiket +" color='white' />
</Appbar.Header>
<Tab.Navigator tabBarOptions={{
                        style:{backgroundColor:'blue', 
                                
                                }, 
                        indicatorStyle:{
                                backgroundColor:'white',
                                height:3,
                                },
                        labelStyle:{
                                fontWeight:'bold',
                                color:'white',
                                }
                                }}>
      <Tab.Screen name="Aktif" component={ActiveScreen} />
      <Tab.Screen name="Menunggu" component={WaitingScreen} />
    </Tab.Navigator>


    </>
  );
}

export default BookingScreen;
