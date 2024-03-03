import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Splash from './screens/Splash'
import Signup from './screens/Signup'
import Login from './screens/Login'
import Home, { NoteType } from './screens/Home'
import AddNote from './screens/AddNote'

// Define screen names with its props
export type RootNavigationProps = {
    Splash: undefined,
    Login: undefined,
    Signup: undefined,
    Home: { id: string }
    AddNote: { id: string, type: string, data: NoteType }
}

const Stack = createNativeStackNavigator()

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="AddNote" component={AddNote} options={{ title: "Add New Note" }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator