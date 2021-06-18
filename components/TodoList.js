import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Modal, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import TodoOverview from './TodoOverview';
import AddTodo from './AddTodo';

import COLORS from '../assets/constants/colors';
import LABELS from '../assets/languages/en';
import tempData from '../tempData';
import { to } from 'color-string';
import FireBase from '../core/firebaseConfig';

export default class App extends React.Component {
    state = {
        addTodoVisible: false,
        todoLists: tempData,
        user: {}
    }

    componentDidMount() {
        firebase = new FireBase((error, user) => {
            if (error) {
                return alert('Oops, something went wrong mann!');
            }

            this.setState({ user: uid })
        })
    }

    // Show/hide new todo screen
    toggleAddTodoModal() {
        this.setState({
            addTodoVisible: !this.state.addTodoVisible
        })
    }

    // Render todo overview list
    renderTodoOverviewList = (todo) => {
        return (
            <TodoOverview todo={todo} updateTodo={this.updateTodo} />
        )
    }

    // Add new todo from availale todoLists with inscrease id and empty tasks list
    addTodo = todo => {
        this.setState({
            todoLists: [
                ...this.state.todoLists,
                { ...todo, id: this.state.todoLists.length + 1, tasks: [] }
            ]
        });
    }

    updateTodo = todo => {
        this.setState({
            todoLists: this.state.todoLists.map(todoItem => todo.id === todoItem ? todo : todoItem)
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Modal animationType="slide"
                    visible={this.state.addTodoVisible}
                    tranparent={true}
                    onRequestClose={() => this.toggleAddTodoModal()}
                >
                    <AddTodo closeModal={() => this.toggleAddTodoModal()} addTodo={this.addTodo}></AddTodo>
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
                        onPress={() => this.toggleAddTodoModal()}
                    >
                        <AntDesign name="plus" size={16} color={COLORS.Blue} />
                    </TouchableOpacity>

                    <Text style={styles.addLabel}>{LABELS.AddList}</Text>
                </View>

                <View style={{ height: 275, paddingLeft: 30 }}>
                    <FlatList
                        data={this.state.todoLists}
                        keyExtractor={item => item.name}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyboardShouldPersistTaps="always"
                        renderItem={({ item }) => this.renderTodoOverviewList(item)}
                    />
                </View>
            </View>
        );
    }
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
