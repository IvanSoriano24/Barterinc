import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './TwoFactorScreen.styles';
import { Alert } from 'react-native';

export default function TwoFactorScreen({ navigation }) {
  const [code, setCode] = useState(['', '', '', '']);
  const [touched, setTouched] = useState([false, false, false, false]);
  const inputRefs = useRef([]);

  const handleChange = (text, index) => {
    const newCode = [...code];
    const newTouched = [...touched];

    if (/^\d?$/.test(text)) {
      newCode[index] = text;
      newTouched[index] = true;
      setCode(newCode);
      setTouched(newTouched);

      if (text && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const getBorderColor = (value, isTouched) => {
    return isTouched
        ? /^\d$/.test(value)
            ? '#00bd56'
            : '#e74c3c'
        : '#bbb';
  };

  const userRole = ''; // cambiar según prueba

  const handleSubmit = () => {
    const isValid = code.every((digit) => /^\d$/.test(digit));
    if (!isValid) {
      Alert.alert('Código incompleto', 'Por favor ingresa los 4 dígitos correctamente.');
      return;
    }

    if (userRole === 'inversionista') {
      navigation.replace('Investor');
    } else {
      navigation.replace('Lender');
    }
  };

  return (
      <KeyboardAvoidingView
          style={styles.background}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            <View style={styles.container}>
              <Text style={styles.title}>Barterinc</Text>
              <Text style={styles.subtitle}>Verificación en dos pasos</Text>
              <Text style={styles.message}>
                Ingresa el código que enviamos{'\n'}a tu correo electrónico
              </Text>
              <Text style={styles.label}>Código</Text>

              <View style={styles.codeContainer}>
                {code.map((value, i) => (
                    <TextInput
                        key={i}
                        ref={(ref) => (inputRefs.current[i] = ref)}
                        style={[styles.codeInput, { borderColor: getBorderColor(value, touched[i]) }]}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={value}
                        onChangeText={(text) => handleChange(text, i)}
                        onKeyPress={(e) => handleKeyPress(e, i)}
                    />
                ))}
              </View>

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Continuar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.returnText}>Regresar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
}
