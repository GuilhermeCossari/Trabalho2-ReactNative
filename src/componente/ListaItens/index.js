import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import AsyncStorage from '@react-native-async-storage/async-storage'

import api from '../../services/api'

function ListItem({ data, navigation }) {
    
    
    async function desativar() {

        try {
            Alert.alert('Alerta', 'Deseja mesmo excluir este carro?', [
                { text: 'Não', style: 'cancel' },
                {
                    text: 'Sim', onPress: async () => {
                        await api.delete(`/cars/${data._id}`)
                    }
                },
            ])
        } catch (response) {
            Alert.alert(response.data.error)
        }
    }
   async function handleNavigationUpdate(){
    await AsyncStorage.setItem('id', (data._id))
    navigation.navigate('alterar')
   }


    function rightActions() {
        return (

            <View>
                    <TouchableOpacity style={styles.buttonDesativar} onPress={() => desativar(data._id)}>
                        <Text style={styles.textButton}>Excluir</Text>
                    </TouchableOpacity>
                
            </View>

        )
    }

    return (
        <Swipeable renderRightActions={rightActions}>
            <TouchableOpacity style={styles.container} onPress={()=>handleNavigationUpdate()}>
                
                <View style={styles.divInfo}>
                    <Text style={styles.text}>Marca: {data.marca}</Text>
                    <Text style={styles.text}>Modelo: {data.modelo}</Text>
                    <Text style={styles.text}>Chassis: {data.chassis}</Text>
                    <Text style={styles.text}>Tipo: {data.tipo}</Text>
                    <Text style={styles.text}>Ano: {data.ano}</Text>
                </View>
            </TouchableOpacity>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        height: 100,
    },
    text: {
        fontSize: 17,
    },
    textDesativado: {
        fontSize: 17,
        color: '#ff0000',
    },
    divInfo: {
        flex: 1,
        width: '70%',
        justifyContent: 'center',
    },
    buttonDesativar: {
        backgroundColor: '#ff0000',
        height: 100,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButton: {
        color: '#fff',
        fontSize: 18,
    },
})

export default ListItem