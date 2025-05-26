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

const Drawer = createDrawerNavigator();

export default function LenderDrawerNavigator() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerLender {...props} />}
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
                name="Contract"
                component={ContractScreen}
                options={{
                    drawerIcon: ({ color }) => <Icon name="file-text" type="feather" color={color} />,
                }}
            />
            <Drawer.Screen
                name="Payment History"
                component={PaymentHistoryScreen}
                options={{
                    drawerIcon: ({ color }) => <Icon name="bar-chart" type="feather" color={color} />,
                }}
            />
            <Drawer.Screen
                name="My Information"
                component={PersonalInfoScreen}
                options={{
                    drawerIcon: ({ color }) => <Icon name="user" type="feather" color={color} />,
                }}
            />
            <Drawer.Screen
                name="Quotation"
                component={QuotationScreen}
                options={{
                    drawerIcon: ({ color }) => <Icon name="sliders" type="feather" color={color} />,
                }}
            />
            <Drawer.Screen
                name="My Loan"
                component={MyLoanScreen}
                options={{
                    drawerIcon: ({ color }) => <Icon name="dollar-sign" type="feather" color={color} />,
                }}
            />
            <Drawer.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    drawerIcon: ({ color }) => <Icon name="settings" type="feather" color={color} />,
                }}
            />
        </Drawer.Navigator>
    );
}
