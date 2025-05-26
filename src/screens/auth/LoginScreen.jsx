import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './LoginScreen.styles';

export default function LoginScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Barterinc</Text>
        <Text style={styles.subtitle}>Inicia sesión</Text>

        <Text style={styles.label}>Usuario</Text>
        <TextInput
          placeholder=""
          style={styles.input}
        />

        <Text style={styles.label}>Contraseña</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder=""
            secureTextEntry={!showPassword}
            style={styles.passwordInput}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              type="feather"
              size={20}
              color="#333"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TwoFactor')}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.registerText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

