import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MyLoanScreen() {
    return (
        <View style={styles.container}>
            <Text>My Loan Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
