import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootNavigationProps } from '../AppNavigator'
import apiCall from '../utils/Services'
import Loader from '../components/Loader'

//getting navigation props
interface MyProps {
  navigation: NativeStackNavigationProp<RootNavigationProps, 'Login'>
}

interface LoginData {
  email: string;
  password: string;
}

const Login = ({ navigation }: MyProps) => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const postDataToApi = async (data: LoginData) => {
    try {
      const userData = await apiCall({ method: 'post', endpoint: '/auth/login', data });
      console.log('Created Data:', userData);
      setIsLoading(false)
      navigation.replace('Home', { id: userData._id })
    } catch (error) {
      setIsLoading(false)
      console.error('Error creating data:', error);
    }
  };

  const onPressLogin = async () => {
    if (!email) {
      alert("Please enter email")
    } else if (!password) {
      alert("Please enter password")
    } else {
      setIsLoading(true)
      const bodyContent: LoginData = {
        email: email,
        password: password
      }

      postDataToApi(bodyContent)
    }
  };

  const onPressForgotPassword = () => {
  };

  const onPressSignUp = () => {
    setTimeout(() => {
      navigation.navigate('Signup')
    }, 500);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}> Login</Text>
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
        onPress={onPressForgotPassword}>
        <Text style={styles.forgotAndSignUpText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressLogin}
        style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressSignUp}>
        <Text style={styles.forgotAndSignUpText}>Don't have an account? Signup Here</Text>
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

export default Login

