import { View, Text, StyleSheet, Button, TextInput, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootNavigationProps } from '../AppNavigator'
import apiCall from '../utils/Services'
import Loader from '../components/Loader'
import { useIsFocused, useRoute } from '@react-navigation/native'

//getting navigation props
interface MyProps {
  navigation: NativeStackNavigationProp<RootNavigationProps, 'Home'>
}

export type NoteType = {
  title: string,
  description: string,
  _id: string
}

const Home = ({ navigation }: MyProps) => {
  const route = useRoute()
  const isFocused = useIsFocused()

  const [notes, setNotes] = useState<NoteType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const isConfirmToEdit = (noteData: NoteType) => {
    navigation.navigate('AddNote', { id: route.params?.id, type: 'EDIT', data: noteData })
  }

  const onNoteDelete = async (_id: string) => {
    try {
      setIsLoading(true)
      const isDeleteNote = await apiCall({ method: 'delete', endpoint: '/notes/deleteNote/' + _id });
      console.log('isDeleteNote Data:', isDeleteNote);
      getNotes()
    } catch (error) {
      setIsLoading(false)
      console.error('Error creating data:', error);
    }
  }

  const isConfirmToDelete = (_id: string) => {
    Alert.alert('Confirm', 'Are you sure, you want to delete this note?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => onNoteDelete(_id) },
    ]);

  }

  const handleAddNote = () => {
    navigation.navigate('AddNote', { id: route.params?.id, type: 'NEW' })
  }

  const getNotes = async () => {
    try {
      const notesData = await apiCall({ method: 'get', endpoint: '/notes/getNote/' + route.params?.id });
      console.log('Created Data:', notesData);
      setNotes(notesData)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error('Error creating data:', error);
    }
  };

  useEffect(() => {
    setIsLoading(true)
    getNotes()
  }, [isFocused])


  return (
    <View style={styles.mContainer}>

      <Text style={{ fontWeight: "bold", fontSize: 24, borderBottomWidth: 0.5 }}>Notes</Text>

      {notes.length > 0 ?
        <FlatList
          data={notes}
          renderItem={({ item, index }: { item: NoteType, index: number }) => {
            return (
              <View style={{ margin: 10, borderWidth: 0.5, borderRadius: 10, padding: 10 }}>

                <View style={{ flexDirection: "row", marginVertical: 2 }}>
                  <Text style={{ color: "gray", fontWeight: "bold" }}>{'Title : '}</Text>
                  <Text style={{ color: "gray", fontWeight: "bold" }}>{item.title}</Text>
                </View>

                <View style={{ flexDirection: "row", marginVertical: 10 }}>
                  <Text style={{ color: "gray", fontWeight: "bold" }}>{'Description : '}</Text>
                  <Text style={{ color: "gray", fontWeight: "bold" }}>{item.description}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                  <TouchableOpacity
                    onPress={() => isConfirmToEdit(item)}
                    style={{ backgroundColor: "#000", padding: 10, borderRadius: 10, width: "30%" }}>
                    <Text style={{ color: "#fff", textAlign: "center" }}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => isConfirmToDelete(item._id)}
                    style={{ backgroundColor: "red", padding: 10, borderRadius: 10, width: "30%" }}>
                    <Text style={{ color: "#fff", textAlign: "center" }}>Delete</Text>
                  </TouchableOpacity>
                </View>

              </View>
            )
          }}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => {
                getNotes()
              }} />
          }
        />
        :
        isLoading ?
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
          :
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>Notes not found</Text>
          </View>
      }

      {notes.length > 0 &&
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleAddNote} style={{ backgroundColor: "#000", padding: 10, borderRadius: 10, width: "40%" }}>
            <Text style={{ color: "#fff", textAlign: "center" }}>Add New Note</Text>
          </TouchableOpacity>
        </View>
      }

    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#e6e6e6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  noteList: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 15,
    marginBottom: 10,
    fontWeight: "bold",
    color: "black",
    backgroundColor: "white",
    height: 40,
    width: "100%",
    padding: 10,
    borderRadius: 8,
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  mContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  contentInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    height: 150,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});