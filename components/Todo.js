import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import COLORS from '../assets/constants/colors';
import LABELS from '../assets/languages/en';

export default Todo = ({ task }) => {
    const completedCount = task.todos.filter(task => task.isCompleted).length;
    const remainningCount = task.todos.length - completedCount;

    return (
        <View style={[styles.listContainer, { backgroundColor: task.color }]}>
            <Text style={styles.listTitle} numberOfLines={1}>
                {task.name}
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
        </View >
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