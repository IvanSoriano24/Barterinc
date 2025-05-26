import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InvestorDashboardScreen from '../screens/investor/InvestorDashboardScreen';

const Stack = createNativeStackNavigator();

export default function InvestorNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="InvestorDashboard"
                component={InvestorDashboardScreen}
                options={{ title: 'Inicio Inversionista' }}
            />
        </Stack.Navigator>
    );
}
