import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import InvestorNavigator from './InvestorNavigator';
import LenderNavigator from './LenderNavigator';
import InvestorDrawerNavigator from "./InvestorDrawerNavigator";
import LenderDrawerNavigator from "./LenderDrawerNavigator";

const RootStack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Auth" component={AuthNavigator} />
            <RootStack.Screen name="Investor" component={InvestorDrawerNavigator} />
            <RootStack.Screen name="Lender" component={LenderDrawerNavigator} />
        </RootStack.Navigator>
      </NavigationContainer>
  );
}
