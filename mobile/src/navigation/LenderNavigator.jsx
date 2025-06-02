import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LenderDashboardScreen from '../screens/lender/LenderDashboardScreen';

const Stack = createNativeStackNavigator();

export default function LenderNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="LenderDashboard"
                component={LenderDashboardScreen}
                options={{ title: 'Inicio Prestamista' }}
            />
        </Stack.Navigator>
    );
}
