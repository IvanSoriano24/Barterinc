import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './ForgotPasswordScreen.styles';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Barterinc</Text>
        <Text style={styles.subtitle}>Recuperar Cuenta</Text>

        <Text style={styles.label}>Ingresa tu correo electrónico</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TwoFactor')}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.returnText}>Regresar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}