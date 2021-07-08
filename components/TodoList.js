import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actGetTodoListsRequest, actDeleteTodoRequest } from '../redux/actions/todoAction';

import { FlatList, StyleSheet, Text, TouchableOpacity, View, Modal, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import COLORS from '../assets/constants/colors';
import LABELS from '../assets/languages/en';
import Spinner from 'react-native-loading-spinner-overlay';

import TodoOverview from './todoOverview';
import AddToDo from './addTodo';

export default function TodoList() {
    // Get selector from TodoReducer
    const todoList = useSelector(state => state.TodoReducer.data);
    const isLoading = useSelector(state => state.TodoReducer.isLoading);
    // Use for all the dispatch actions
    const dispatch = useDispatch();

    const [visibleAdd, setVisibleAdd] = useState(false);

    useEffect(() => {
        dispatch(actGetTodoListsRequest());
    }, [])
    // componentDidMount() {
    //     // Get todo list
    //     this.props.getTodoList();
    // }

    // Delete a todo
    onDeleteTodo = (id) => {
        dispatch(actDeleteTodoRequest(id));
    }

    // Show/hide new todo screen
    onToggleAddTodoModal = () => {
        setVisibleAdd(!visibleAdd);
    }

    // Render todo overview list
    renderTodoOverviewList = (todo) => <TodoOverview todo={todo} deleteTodo={onDeleteTodo} />;

    return (
        <View style={styles.container}>
            <Spinner
                visible={isLoading}
                textStyle={{ color: COLORS.White }}
            />

            <Modal animationType="slide"
                visible={visibleAdd}
                tranparent={true}
                onRequestClose={() => onToggleAddTodoModal()}
            >
                <AddToDo closeModal={() => onToggleAddTodoModal()} />
            </Modal>

            <View style={{ flexDirection: 'row' }}>
                <View style={styles.divider} />
                <Text style={styles.title}>
                    {LABELS.Todo} <Text style={{ fontWeight: "300", color: COLORS.Blue }}>{LABELS.Lists}</Text>
                </Text>
                <View style={styles.divider} />
            </View>

            <View style={{ marginVertical: 40 }}>
                <TouchableOpacity style={styles.addListButton}
                    onPress={() => onToggleAddTodoModal()}
                >
                    <AntDesign name="plus" size={16} color={COLORS.Blue} />
                </TouchableOpacity>

                <Text style={styles.addLabel}>{LABELS.AddTodo}</Text>
            </View>

            <View style={{ height: 275, paddingLeft: 30 }}>
                <FlatList
                    data={todoList}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyboardShouldPersistTaps="always"
                    renderItem={({ item }) => renderTodoOverviewList(item)}
                />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    divider: {
        backgroundColor: COLORS.LightBlue,
        height: 2,
        flex: 1,
        alignSelf: 'center'
    },

    title: {
        fontSize: 38,
        fontWeight: "800",
        color: COLORS.Black,
        paddingHorizontal: 65
    },

    addListButton: {
        borderWidth: 2,
        borderColor: COLORS.LightBlue,
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: "center"
    },

    addLabel: {
        color: COLORS.Blue,
        fontWeight: "600",
        fontSize: 15,
        marginTop: 10
    },

    modalContainer: {
        borderRadius: 10,
        width: "90%",
        height: "90%",
        alignItems: "center",
        justifyContent: "center"
    },

    modalButton: {
        padding: 30,
        alignItems: "center",
        justifyContent: "center"
    }
});
