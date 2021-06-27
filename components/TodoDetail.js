import { AntDesign, Ionicons } from '@expo/vector-icons';
import React, { Component } from 'react'
import {
    View, Text, SafeAreaView, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, TextInput
} from 'react-native';
import COLORS from '../assets/constants/colors';

export default class TodoDetail extends React.Component {
    state = {
        newTask: "",
    }

    // Check/Uncheck task to mark it is completed or not
    onToggleTaskCompleted = index => {
        let todo = this.props.todo;
        todo.tasks[index].isCompleted = !todo.tasks[index].isCompleted;
        // Request Update Todo
        this.props.updateTodo(todo.id, todo);
    }

    // Create new task and add to
    onAddNewTask = async () => {
        let todo = this.props.todo;
        todo.tasks.push({ title: this.state.newTask, isCompleted: false });

        // Request Update Todo
        await this.props.updateTodo(todo.id, todo);
        this.setState({ newTask: "" })
    }

    renderTaskList = (task, index) => {
        return (
            <View style={styles.taskContainer}>
                <TouchableOpacity onPress={() => this.onToggleTaskCompleted(index)}>
                    <Ionicons name={task.isCompleted ? "ios-square" : "ios-square-outline"} size={24} color={this.props.todo.color} style={{ width: 32 }} />
                </TouchableOpacity>
                <Text style={[
                    styles.task,
                    {
                        textDecorationLine: task.isCompleted ? "line-through" : "none",
                        color: task.isCompleted ? COLORS.Gray : COLORS.Black
                    }]}
                >
                    {task.title}
                </Text>
            </View>
        )
    }
    render() {
        const todo = this.props.todo;
        const taskCount = todo.tasks.length;
        const completedCount = todo.tasks.filter(task => task.isCompleted).length;

        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                <SafeAreaView style={styles.container}>
                    <TouchableOpacity
                        style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
                        onPress={this.props.closeModal}
                    >
                        <AntDesign name="close" size={24} color={COLORS.Black}></AntDesign>
                    </TouchableOpacity>

                    <View style={[styles.section, styles.header, { borderBottomColor: todo.color }]}>
                        <View>
                            <Text style={styles.title}>{todo.name}</Text>
                            <Text style={styles.taskCount}>{`${completedCount} of ${taskCount} Tasks`}</Text>
                        </View>
                    </View>

                    <View style={{ flex: 3, alignSelf: "stretch" }}>
                        <FlatList
                            data={todo.tasks}
                            keyExtractor={item => item.name}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => this.renderTaskList(item, index)}
                            contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }}
                        ></FlatList>
                    </View>

                    <View
                        style={[styles.footer, { flex: 1 }]}
                        behavior="padding"
                    >
                        <TextInput
                            style={[styles.input, { borderColor: todo.color }]}
                            onChangeText={text => this.setState({ newTask: text })}
                            value={this.state.newTask}
                        />
                        <TouchableOpacity
                            style={[styles.addTask, { backgroundColor: todo.color }]}
                            onPress={() => this.onAddNewTask()}
                        >
                            <AntDesign name="plus" size={16} color={COLORS.White} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
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
        flexDirection: "row",
        alignItems: "center"
    },

    task: {
        fontSize: 16,
        fontWeight: "800"
    }
})