
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { AntDesign } from '@expo/vector-icons';
import { KeyboardAvoidingView, TouchableOpacity, StyleSheet, View, Text, TextInput } from 'react-native'
import COLORS from '../assets/constants/colors';
import LABELS from '../assets/languages/en';
import Spinner from 'react-native-loading-spinner-overlay';

import { actAddNewTodoRequest } from '../redux/actions/todoAction';

export default function AddTodo(props) {
    // Color list to set for a todo list
    backgroundColor = ["#5CD859", "#24A6D9", "#595BD9", "#8022D9", "#D159D8", "#D85963", "#D88559"];

    const todoList = useSelector(state => state.TodoReducer.data);
    const isLoading = useSelector(state => state.TodoReducer.isLoading);
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [mainColor, setMainColor] = useState(backgroundColor[0]);

    // Render maincolor list to UI.
    renderColorList = () => {
        return backgroundColor.map((color, index) => {
            return <TouchableOpacity
                key={index}
                style={[styles.colorSelect, { backgroundColor: color }]}
                onPress={() => { setMainColor(color) }}
            ></TouchableOpacity>
        })
    }

    // Create a new Todo
    createTodo = async () => {
        // Add to Todo List.
        const todo = { name, mainColor };

        // Dispatch action Add Todo
        await dispatch(actAddNewTodoRequest(todo))

        // Reset Todo Title
        setName('');
        // Close modal and back to Overview screen.
        props.closeModal();
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Spinner
                visible={isLoading}
                textStyle={{ color: COLORS.White }}
            />

            <TouchableOpacity style={styles.xButton}
                onPress={props.closeModal}
            >
                <AntDesign name="close" size={24} color={COLORS.Black} />
            </TouchableOpacity>

            <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
                <Text style={styles.title}>{LABELS.CreateTodoList}</Text>

                <TextInput style={[styles.input, { borderColor: mainColor }]}
                    placeholder={LABELS.TodoTitle}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />

                <View style={styles.colorContainer}>{renderColorList()}</View>

                <TouchableOpacity style={[styles.createButton, { backgroundColor: mainColor }]}
                    onPress={() => createTodo()}
                >
                    <Text style={{ color: COLORS.White, fontWeight: "700", fontSize: 16 }}>{LABELS.Create}</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    xButton: {
        position: "absolute",
        top: 65,
        right: 34
    },

    title: {
        fontSize: 28,
        fontWeight: "800",
        color: COLORS.Black,
        alignSelf: "center",
        marginBottom: 16
    },

    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        height: 50,
        marginTop: 0,
        paddingHorizontal: 16,
        fontSize: 18
    },

    createButton: {
        height: 50,
        marginTop: 24,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },

    colorContainer: {
        flexDirection: "row",
        marginTop: 12,
        justifyContent: "space-between"
    },

    colorSelect: {
        height: 30,
        width: 30,
        borderRadius: 10
    }
})