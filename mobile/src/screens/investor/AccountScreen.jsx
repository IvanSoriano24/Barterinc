import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AccountScreen() {
    return (
        <View style={styles.container}>
            <Text>Investor Account Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
