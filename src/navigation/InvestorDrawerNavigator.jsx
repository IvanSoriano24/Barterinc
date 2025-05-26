import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import React from 'react';
import CustomDrawerInvestor from '../screens/investor';

// Screens (renamed in English)
import EnterprisesScreen from '../screens/investor/EnterprisesScreen';
import InvestmentHistoryScreen from '../screens/investor/InvestmentHistoryScreen';
import LegalInfoScreen from '../screens/investor/LegalInfoScreen';
import ReportsScreen from '../screens/investor/ReportsScreen';
import FinancialBoxScreen from '../screens/investor/FinancialBoxScreen';
import AccountScreen from '../screens/investor/AccountScreen';
import {View} from "react-native";

const Drawer = createDrawerNavigator();

export default function InvestorDrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#0b0f4d' },
                headerTintColor: '#fff',
                drawerStyle: { backgroundColor: '#0b0f4d' },
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#ccc',
                drawerLabelStyle: { marginLeft: -20 },
            }}
        >
            <Drawer.Screen
                name="Enterprises"
                component={EnterprisesScreen}
                options={{
                    drawerIcon: ({ color }) => <Icon name="briefcase" type="feather" color={color} />,
                }}
            />
            <Drawer.Screen
                name="Investment History"
                component={InvestmentHistoryScreen}
                options={{
                    drawerIcon: ({ color }) => <Icon name="bar-chart" type="feather" color={color} />,
                }}
            />
            <Drawer.Screen
                name="Legal Information"
                component={LegalInfoScreen}
                options={{
                    drawerIcon: ({ color }) => <Icon name="file-text" type="feather" color={color} />,
                }}
            />
            <Drawer.Screen
                name="Reports"
                component={ReportsScreen}
                options={{
                    drawerIcon: ({ color }) => <Icon name="clipboard" type="feather" color={color} />,
                }}
            />
            <Drawer.Screen
                name="Financial Box"
                component={FinancialBoxScreen}
                options={{
                    drawerIcon: ({ color }) => <Icon name="dollar-sign" type="feather" color={color} />,
                }}
            />
            <Drawer.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    drawerIcon: ({ color }) => <Icon name="user" type="feather" color={color} />,
                }}
            />
            drawerContent={(props) => <CustomDrawerInvestor {...props} />}
            screenOptions={{
            headerStyle: { backgroundColor: '#0b0f4d' },
            headerTintColor: '#fff',
            drawerStyle: { backgroundColor: '#0b0f4d' },
            drawerActiveTintColor: '#fff',
            drawerInactiveTintColor: '#ccc',
            drawerLabelStyle: { marginLeft: -20 },
        }}
        </Drawer.Navigator>
    );
}
