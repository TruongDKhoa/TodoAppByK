import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AntDesign, Ionicons } from '@expo/vector-icons';
import {
    View, Text, SafeAreaView, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, TextInput
} from 'react-native';
import COLORS from '../assets/constants/colors';
import LABELS from '../assets/languages/en';
import Spinner from 'react-native-loading-spinner-overlay';

import { actUpdateTodoRequest } from '../redux/actions/todoAction';

export default function TodoDetail(props) {
    const isLoading = useSelector(state => state.TodoReducer.isLoading);
    const todo = useSelector(state => state.TodoReducer.todo ? state.TodoReducer.todo : props.todo);
    const dispatch = useDispatch();

    const [newTask, setNewTask] = useState('')

    // Check/Uncheck task to mark it is completed or not
    onToggleTaskCompleted = index => {
        todo.tasks[index].isCompleted = !todo.tasks[index].isCompleted;

        // Request Update Todo
        dispatch(actUpdateTodoRequest(todo.id, todo));
    }

    // Create new task and add to
    onAddNewTask = async () => {
        todo.tasks.push({ title: newTask, isCompleted: false });

        // Request Update Todo
        await dispatch(actUpdateTodoRequest(todo.id, todo));

        // Reset input
        setNewTask('');
    }

    renderTaskList = (task, index) => {
        return (
            <View style={styles.taskContainer}>
                <TouchableOpacity onPress={() => onToggleTaskCompleted(index)}>
                    <Ionicons name={task.isCompleted ? "ios-square" : "ios-square-outline"} size={24} color={todo.color} style={{ width: 32 }} />
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
    const taskCount = todo.tasks.length;
    const completedCount = todo.tasks.filter(task => task.isCompleted).length;

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <Spinner
                visible={isLoading}
                textStyle={{ color: COLORS.White }}
            />
            <SafeAreaView style={styles.container}>
                <TouchableOpacity
                    style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
                    onPress={props.closeModal}
                >
                    <AntDesign name="close" size={24} color={COLORS.Black}></AntDesign>
                </TouchableOpacity>

                <View style={[styles.section, styles.header, { borderBottomColor: todo.color }]}>
                    <View>
                        <Text style={styles.title}>{todo.name}</Text>
                        <Text style={styles.taskCount}>{`${completedCount} ${LABELS.of} ${taskCount} ${LABELS.Tasks}`}</Text>
                    </View>
                </View>

                <View style={{ flex: 3, alignSelf: "stretch" }}>
                    <FlatList
                        data={todo.tasks}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => renderTaskList(item, index)}
                        contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }}
                    ></FlatList>
                </View>

                <View
                    style={[styles.footer, { flex: 1 }]}
                    behavior="padding"
                >
                    <TextInput
                        style={[styles.input, { borderColor: todo.color }]}
                        onChangeText={text => setNewTask(text)}
                        value={newTask}
                    />
                    <TouchableOpacity
                        style={[styles.addTask, { backgroundColor: todo.color }]}
                        onPress={() => onAddNewTask()}
                    >
                        <AntDesign name="plus" size={16} color={COLORS.White} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
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