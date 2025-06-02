import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import React from 'react';

// Screens renamed to English
import ContractScreen from '../screens/lender/ContractScreen';
import PaymentHistoryScreen from '../screens/lender/PaymentHistoryScreen';
import PersonalInfoScreen from '../screens/lender/PersonalInfoScreen';
import QuotationScreen from '../screens/lender/QuotationScreen';
import MyLoanScreen from '../screens/lender/MyLoanScreen';
import AccountScreen from '../screens/lender/AccountScreen';
import CustomDrawerLender from "../screens/lender/CustomDrawerLender";

const Drawer = createDrawerNavigator();

export default function LenderDrawerNavigator() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerLender {...props} />}
            screenOptions={{
                headerStyle: { backgroundColor: '#111745' },
                headerTintColor: '#fff',
                drawerStyle: { backgroundColor: '#111745' },
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#ccc',
                drawerLabelStyle: { marginLeft: 0, fontSize: 16 },
            }}
        >
            <Drawer.Screen
                name="Contratos"
                component={ContractScreen}
                options={{
                    drawerIcon: ({ color }) => <Icon name="file-text" type="feather" color={color} />,
                }}
            />
            <Drawer.Screen
                name="Historial de Pagos"
                component={PaymentHistoryScreen}
                options={{
                    drawerIcon: ({ color }) => <Icon name="bar-chart" type="feather" color={color} />,
                }}
            />
            <Drawer.Screen
                name="Mi Información"
                component={PersonalInfoScreen}
                options={{
                    drawerIcon: ({ color }) => <Icon name="user" type="feather" color={color} />,
                }}
            />
            <Drawer.Screen
                name="Cotizador"
                component={QuotationScreen}
                options={{
                    drawerIcon: ({ color }) => <Icon name="sliders" type="feather" color={color} />,
                }}
            />
            <Drawer.Screen
                name="Mi Préstamo"
                component={MyLoanScreen}
                options={{
                    drawerIcon: ({ color }) => <Icon name="dollar-sign" type="feather" color={color} />,
                }}
            />
            <Drawer.Screen
                name="Cuenta"
                component={AccountScreen}
                options={{
                    drawerIcon: ({ color }) => <Icon name="settings" type="feather" color={color} />,
                }}
            />
        </Drawer.Navigator>
    );
}
