import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import React from 'react';
import CustomDrawerInvestor from '../screens/investor/CustomDrawerInvestor'; // Asegúrate que esta sea la ruta correcta

// Screens (renamed in English)
import EnterprisesScreen from '../screens/investor/EnterprisesScreen';
import InvestmentHistoryScreen from '../screens/investor/InvestmentHistoryScreen';
import LegalInfoScreen from '../screens/investor/LegalInfoScreen';
import ReportsScreen from '../screens/investor/ReportsScreen';
import FinancialBoxScreen from '../screens/investor/FinancialBoxScreen';
import AccountScreen from '../screens/investor/AccountScreen';

const Drawer = createDrawerNavigator();

export default function InvestorDrawerNavigator() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerInvestor {...props} />}
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
                name="Empresas"
                component={EnterprisesScreen}
                options={{
                    drawerIcon: ({ color }) => <Icon name="briefcase" type="feather" color={color} />,
                }}
            />
            <Drawer.Screen
                name="Historial de Inversiones"
                component={InvestmentHistoryScreen}
                options={{
                    drawerIcon: ({ color }) => <Icon name="bar-chart" type="feather" color={color} />,
                }}
            />
            <Drawer.Screen
                name="Información Legal"
                component={LegalInfoScreen}
                options={{
                    drawerIcon: ({ color }) => <Icon name="file-text" type="feather" color={color} />,
                }}
            />
            <Drawer.Screen
                name="Reportes"
                component={ReportsScreen}
                options={{
                    drawerIcon: ({ color }) => <Icon name="clipboard" type="feather" color={color} />,
                }}
            />
            <Drawer.Screen
                name="Caja Financiera"
                component={FinancialBoxScreen}
                options={{
                    drawerIcon: ({ color }) => <Icon name="dollar-sign" type="feather" color={color} />,
                }}
            />
            <Drawer.Screen
                name="Cuenta"
                component={AccountScreen}
                options={{
                    drawerIcon: ({ color }) => <Icon name="user" type="feather" color={color} />,
                }}
            />
        </Drawer.Navigator>
    );
}
