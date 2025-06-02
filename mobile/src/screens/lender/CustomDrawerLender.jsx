import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export default function CustomDrawerLender(props) {
    const { navigation } = props;

    const handleLogout = () => {
        // Aquí puedes limpiar async storage, context, etc.
        navigation.replace('Auth'); // Redirige al stack del login
    };

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />

            <TouchableOpacity style={styles.logoutContainer} onPress={handleLogout}>
                <Icon name="log-out" type="feather" color="#fff" size={20} />
                <Text style={styles.logoutText}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    logoutContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#111745',
        marginTop: 20,
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 10,
    },
});
