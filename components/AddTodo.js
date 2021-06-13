
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

import { KeyboardAvoidingView, TouchableOpacity, StyleSheet, View, Text, TextInput } from 'react-native'
import COLORS from '../assets/constants/colors';
import LABELS from '../assets/languages/en';
import tempData from '../tempData';

export default class AddTodo extends React.Component {
    // Color list to set for a todo list
    backgroundColor = ["#5CD859", "#24A6D9", "#595BD9", "#8022D9", "#D159D8", "#D85963", "#D88559"]

    state = {
        name: "",
        mainColor: this.backgroundColor[0]
    }

    // Render maincolor list to UI.
    renderColorList() {
        return this.backgroundColor.map((color, index) => {
            return <TouchableOpacity
                key={index}
                style={[styles.colorSelect, { backgroundColor: color }]}
                onPress={() => { this.setState({ mainColor: color }) }}
            ></TouchableOpacity>
        })
    }

    // Create a new Todo
    createTodo = () => {
        const { name, mainColor } = this.state;

        // Add to Todo List.
        tempData.push({
            name: name,
            color: mainColor,
            todos: []
        })

        // Reset Todo Title
        this.setState({ name: "" });
        // Close modal and back to Overview screen.
        this.props.closeModal();
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <TouchableOpacity style={styles.xButton}
                    onPress={this.props.closeModal}
                >
                    <AntDesign name="close" size={24} color={COLORS.Black} />
                </TouchableOpacity>

                <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
                    <Text style={styles.title}>{LABELS.CreateTodoList}</Text>

                    <TextInput style={[styles.input, { borderColor: this.state.mainColor }]}
                        placeholder={LABELS.TodoTitle}
                        onChangeText={(text) => this.setState({ name: text })}
                    />

                    <View style={styles.colorContainer}>{this.renderColorList()}</View>

                    <TouchableOpacity style={[styles.createButton, { backgroundColor: this.state.mainColor }]}
                        onPress={() => this.createTodo()}
                    >
                        <Text style={{ color: COLORS.White, fontWeight: "700", fontSize: 16 }}>{LABELS.Create}</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
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