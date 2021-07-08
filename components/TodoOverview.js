import React, { useState } from 'react';
import TodoDetail from './todoDetail';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';

import COLORS from '../assets/constants/colors';
import LABELS from '../assets/languages/en';

export default function TodoOverview(props) {
    const [showTaskList, setShowTaskList] = useState(false)
    const { todo } = props;

    toggleShowTaskList = () => {
        setShowTaskList(!showTaskList);
    }

    const completedCount = todo.tasks.filter(task => task.isCompleted).length;
    const remainningCount = todo.tasks.length - completedCount;

    return (
        <View>
            <Modal animationType="slide"
                visible={showTaskList}
                onRequestClose={() => toggleShowTaskList()}
            >
                <TodoDetail
                    todo={todo}
                    closeModal={() => toggleShowTaskList()}
                />
            </Modal>

            <TouchableOpacity style={[styles.listContainer, { backgroundColor: todo.color }]}
                onPress={() => toggleShowTaskList()}
            >
                <View style={{
                    position: 'absolute',
                    right: 15,
                    top: 15
                }}>
                    <TouchableOpacity onPress={() => { props.deleteTodo(todo.id) }}>
                        <AntDesign name="close" size={24} color={COLORS.White} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.listTitle} numberOfLines={1}>
                    {todo.name}
                </Text>

                <View style={{ marginTop: 15 }}>
                    <View style={{ alignItems: "center", marginBottom: 10 }}>
                        <Text style={styles.count}>{completedCount}</Text>
                        <Text style={styles.subTitle}>{LABELS.Completed}</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.count}>{remainningCount}</Text>
                        <Text style={styles.subTitle}>{LABELS.Remainning}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        paddingVertical: 30,
        paddingHorizontal: 35,
        borderRadius: 8,
        marginHorizontal: 10,
        alignItems: "center",
        width: 200
    },

    listTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: COLORS.White,
        marginBottom: 10
    },

    count: {
        fontSize: 40,
        fontWeight: "200",
        color: COLORS.White
    },

    subTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: COLORS.White
    }
});