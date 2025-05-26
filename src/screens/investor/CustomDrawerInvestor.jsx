import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export default function CustomDrawerInvestor(props) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />

            <TouchableOpacity style={styles.logoutContainer} onPress={() => {}}>
                <Icon name="log-out" type="feather" color="#fff" size={20} />
                <Text style={styles.logoutText}>Log out</Text>
            </TouchableOpacity>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    logoutContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#0b0f4d',
        marginTop: 20,
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 10,
    },
});
