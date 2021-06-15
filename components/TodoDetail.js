import { AntDesign } from '@expo/vector-icons';
import React, { Component } from 'react'
import {
    View, Text, SafeAreaView, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, TextInput
} from 'react-native';
import COLORS from '../assets/constants/colors';

export default class TodoDetail extends React.Component {
    state = {
        name: this.props.task.name,
        color: this.props.task.color,
        todos: this.props.task.todos
    }

    renderTaskList = task => {
        return (
            <View style={styles.taskContainer}>
                <Text>
                    {task.title}
                </Text>
            </View>
        )
    }
    render() {
        const taskCount = this.state.todos.length;
        const completedCount = this.state.todos.filter(task => task.isCompleted).length;

        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity
                    style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
                    onPress={this.props.closeModal}
                >
                    <AntDesign name="close" size={24} color={COLORS.Black}></AntDesign>
                </TouchableOpacity>

                <View style={[styles.section, styles.header, { borderBottomColor: this.state.color }]}>
                    <View>
                        <Text style={styles.title}>{this.state.name}</Text>
                        <Text style={styles.taskCount}>{`${completedCount} of ${taskCount} Tasks`}</Text>
                    </View>
                </View>

                <View style={{ flex: 3, alignSelf: "stretch" }}>
                    <FlatList
                        data={this.state.todos}
                        keyExtractor={item => item.name}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => this.renderTaskList(item)}
                        contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }}
                    ></FlatList>
                </View>

                <KeyboardAvoidingView
                    style={[styles.footer, { flex: 1 }]}
                    behavior="padding"
                >
                    <TextInput style={[styles.input, { borderColor: this.state.color }]} />
                    <TouchableOpacity style={[styles.addTask, { backgroundColor: this.state.color }]}>
                        <AntDesign name="plus" size={16} color={COLORS.White} />
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    section: {
        flex: 1,
        alignSelf: "stretch"
    },

    header: {
        justifyContent: "flex-end",
        marginLeft: 64,
        borderBottomWidth: 3
    },

    title: {
        fontSize: 30,
        fontWeight: "800",
        color: COLORS.Black,
    },

    taskCount: {
        marginTop: 4,
        marginBottom: 12,
        color: COLORS.Gray,
        fontWeight: "600"
    },

    footer: {
        paddingHorizontal: 32,
        flexDirection: "row",
        alignItems: "center"
    },

    input: {
        flex: 1,
        height: 40,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8
    },

    addTask: {
        borderRadius: 4,
        padding: 13,
        alignItems: "center",
        justifyContent: "center"
    },

    taskContainer: {
        paddingVertical: 16,
        justifyContent: "center"
    }
})