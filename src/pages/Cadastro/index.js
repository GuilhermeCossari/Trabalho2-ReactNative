import React,{useState} from 'react'
import {
  KeyboardAvoidingView,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import DatePicker from 'react-native-datepicker'
import api from '../../services/api'

export default function Cadastro({navigation}){
    const[marca, setMarca] = useState('')
    const[modelo, setModelo] = useState('')
    const[chassis, setChassis] = useState('')
    const[ano, setAno] = useState('')
    const[tipo, setTipo] = useState('')

    async function FirstSubmit(){
      try{
        const response = await api.post('/cars', {
          marca,
          modelo,
          chassis,
          tipo,
          ano
        })

        Alert.alert(response.data.message)
      }catch(response){
        Alert.alert(response.data.error)
      }
    }

    return(
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.form}>
     
        <TextInput
          placeholder="Digite a Marca"
          style={styles.input}
          onChangeText={(value) => setMarca(value)}
        />
        <TextInput
          placeholder="Digite o Modelo"
          style={styles.input}
          onChangeText={(value) => setModelo(value)}
        />
        <TextInput
          placeholder="Digite o número do Chassis"
          style={styles.input}
          onChangeText={(value) => setChassis(value)}
        />

<Picker
        selectedValue ={tipo}
        //selectedValue={selectedValue}
        style={styles.input}
        onValueChange={(itemValue) => setTipo(itemValue)}
      >
        <Picker.Item label="Sedan" value="Sedan" />
        <Picker.Item label="Hatch" value="Hatch" />
      </Picker>

        <DatePicker
          style={styles.datePickerStyle}
          date={ano} 
          mode="date" 
          placeholder="Selecione a Data"
          format="MM-DD-YYYY"
          minDate="01-01-1990"
          maxDate="11-30-2020"
          confirmBtnText="Confirmar"
          cancelBtnText="Cancelar"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            setAno(date);
          }}
        />
        

        <TouchableOpacity style={styles.btnCadastrar} onPress={FirstSubmit}>
          <Text style={styles.btnTextCadastrar}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnVoltar}
          onPress={() => navigation.navigate('home')}
        >
          <Text style={styles.btnTextExcluir}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
     
    )   
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    divLogo: {
      minWidth: '100%',
      alignItems: 'center',
      minHeight: 150,
      justifyContent: 'center',
      padding: 6,
      marginTop: 20,
    },
    form: {
      flex: 1,
      backgroundColor: '#DC143C',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      backgroundColor: '#FFEBCD',
      width: '90%',
      marginBottom: 15,
      color: '#222',
      fontSize: 20,
      borderRadius: 7,
      padding: 15,
    },
    btnCadastrar: {
      marginTop: 15,
      backgroundColor: '#8B0000',
      width: '90%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 7,
    },
    btnTextCadastrar: {
      color: '#F5FFFA',
      fontSize: 30,
    },
    btnVoltar: {
      marginTop: 15,
      backgroundColor: '#FF0000',
      width: '90%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 7,
      marginBottom: 10,
    },
    btnTextVoltar: {
      color: '#F5FFFA',
      fontSize: 30,
    },
  })