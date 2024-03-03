import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootNavigationProps } from '../AppNavigator'
import apiCall from '../utils/Services'
import Loader from '../components/Loader'

//getting navigation props
interface MyProps {
  navigation: NativeStackNavigationProp<RootNavigationProps, 'Signup'>
}

interface RegisterData {
  name: string,
  email: string,
  password: string
}

const Signup = ({ navigation }: MyProps) => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const postDataToApi = async (data: RegisterData) => {
    try {
      const createdData = await apiCall('post', '/auth/register', data);
      console.log('Created Data:', createdData);
      setIsLoading(false)
      navigation.replace('Home', { id: createdData._id })
    } catch (error) {
      setIsLoading(false)
      console.error('Error creating data:', error);
    }
  };

  const onPressLogin = async () => {
    if (!name) {
      alert("Please enter name")
    } else if (!email) {
      alert("Please enter email")
    } else if (!password) {
      alert("Please enter password")
    } else {
      setIsLoading(true)

      const bodyContent: RegisterData = {
        name: name,
        email: email,
        password: password
      }

      postDataToApi(bodyContent)

    }
  };


  const onPressSignUp = () => {
    setTimeout(() => {
      navigation.navigate('Login')
    }, 500);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}> Register</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Name"
          placeholderTextColor="#003f5c"
          onChangeText={text => setName(text)} />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={text => setEmail(text)} />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#003f5c"
          onChangeText={text => setPassword(text)} />
      </View>
      <TouchableOpacity
        onPress={onPressLogin}
        style={styles.loginBtn}>
        <Text style={styles.loginText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressSignUp}>
        <Text style={styles.forgotAndSignUpText}>Have an account? Login</Text>
      </TouchableOpacity>
      <Loader isVisible={isLoading} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4FD3DA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#3AB4BA",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "white"
  },
  forgotAndSignUpText: {
    color: "white",
    fontSize: 11
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
});

export default Signup