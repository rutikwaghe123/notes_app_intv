import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootNavigationProps } from '../AppNavigator'
import apiCall from '../utils/Services'
import Loader from '../components/Loader'
import { useRoute } from '@react-navigation/native'

//getting navigation props
interface MyProps {
    navigation: NativeStackNavigationProp<RootNavigationProps, 'AddNote'>
}

interface NoteData {
    title?: string;
    description?: string;
    postedBy?: string
}

const AddNote = ({ navigation }: MyProps) => {
    const route = useRoute()

    const [title, setTitle] = useState<string>(route.params?.type === 'EDIT' ? route.params?.data?.title : '');
    const [description, setDescription] = useState<string>(route.params?.type === 'EDIT' ? route.params?.data?.description : '');
    const [postedById, setPostedById] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const addNoteToApi = async (data: NoteData) => {
        try {
            let noteData;
            if (route.params?.type === 'EDIT') {
                noteData = await apiCall({ method: 'put', endpoint: '/notes/updateNote/' + route.params?.data?._id, data });
            } else {
                noteData = await apiCall({ method: 'post', endpoint: '/notes/addNote', data });
            }
            console.log('Add Note Data:', noteData);
            setIsLoading(false)
            navigation.goBack()
        } catch (error) {
            setIsLoading(false)
            console.error('Error adding note data:', error);
        }
    }

    const handleSaveNote = async () => {
        if (!title) {
            alert('Please enter a note title')
        } else if (!description) {
            alert('Please enter a note description')
        } else {
            setIsLoading(true)
            const obj: NoteData = {
                title: title,
                description: description,
                postedBy: route.params?.id
            }
            addNoteToApi(obj)
        }
    };

    return (
        <View style={styles.mContainer}>
            <TextInput
                style={styles.input}
                placeholder="Enter note title"
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                style={styles.contentInput}
                multiline
                placeholder="Enter note description"
                value={description}
                onChangeText={setDescription}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleSaveNote} style={{ backgroundColor: "#000", padding: 10, borderRadius: 10, width: "30%" }}>
                    <Text style={{ color: "#fff", textAlign: "center" }}>{route.params?.type === 'EDIT' ? 'Update' : 'Save'}</Text>
                </TouchableOpacity>
            </View>

            <Loader isVisible={isLoading} />
        </View>
    )
}

export default AddNote

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
        padding: 20,
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