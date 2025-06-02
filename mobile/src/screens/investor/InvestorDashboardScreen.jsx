import { View, Text, StyleSheet } from 'react-native';

export default function InvestorDashboardScreen() {
  return (
    <View style={styles.container}>
      <Text>Bienvenido, Inversionista</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Cambia a "Lender" si es la otra pantalla