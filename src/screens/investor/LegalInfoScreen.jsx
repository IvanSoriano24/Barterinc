import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LegalInfoScreen() {
    return (
        <View style={styles.container}>
            <Text>Legal Information Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
