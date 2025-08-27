import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Surface,
  TextInput,
  Button,
  Text,
  Card,
  Avatar,
  TouchableRipple,
} from 'react-native-paper';

// Se importa la interfaz de usuario y los datos de usuarios desde los archivos locales
import { User } from './types';
import usuariosData from './usuarios.json';

interface LoginScreenProps {
  onLoginSuccess: (userData: User) => void; 
  showSnackbar: (message: string) => void;
}

export default function LoginScreen({ 
  onLoginSuccess, 
  showSnackbar 
}: LoginScreenProps) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateEmail = (email: string) => {
    return email.endsWith('@utch.edu.co');
  };

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    if (!loginData.email.trim()) {
      newErrors.email = 'El correo electrÃ³nico es obligatorio';
    } else if (!validateEmail(loginData.email)) {
      newErrors.email = 'Debe usar su correo institucional @utch.edu.co';
    }

    if (!loginData.password.trim()) {
      newErrors.password = 'La contraseÃ±a es obligatoria';
    }
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // SimulaciÃ³n de autenticaciÃ³n con los datos importados
    const userFound = usuariosData.find(
      user => user.email === loginData.email && user.password === loginData.password
    );

    setTimeout(() => {
      setLoading(false);
      if (userFound) {
        onLoginSuccess(userFound as User);
      } else {
        showSnackbar('Correo o contraseÃ±a incorrectos');
      }
    }, 1500);
  };

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.headerSurface}>
        <Avatar.Icon size={60} icon="car" style={styles.avatar} />
        <Text variant="headlineSmall" style={styles.title}>
          Bienvenido a UTCH Chompi
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Inicia sesiÃ³n para compartir tu viaje
        </Text>
      </Surface>

      <Card style={styles.loginCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.cardTitle}>
            Acceder a tu cuenta
          </Text>

          <TextInput
            label="Correo electrÃ³nico"
            value={loginData.email}
            onChangeText={(text) => setLoginData({ ...loginData, email: text })}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            error={!!errors.email}
            right={<TextInput.Icon icon="email" />}
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

          <TextInput
            label="ContraseÃ±a"
            value={loginData.password}
            onChangeText={(text) => setLoginData({ ...loginData, password: text })}
            mode="outlined"
            secureTextEntry
            style={styles.input}
            error={!!errors.password}
            right={<TextInput.Icon icon="lock" />}
          />
          {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            icon="login"
            style={styles.button}
          >
            {loading ? 'Iniciando sesiÃ³n...' : 'Iniciar sesiÃ³n'}
          </Button>
          
          <View style={styles.testCredentials}>
            <Text variant="bodySmall" style={{textAlign: 'center', marginBottom: 5}}>
              Credenciales de prueba:
            </Text>
            <Text variant="bodySmall" style={{textAlign: 'center'}}>
              Usuario: juan.perez@utch.edu.co
            </Text>
            <Text variant="bodySmall" style={{textAlign: 'center'}}>
              ContraseÃ±a: 123456
            </Text>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7FF',
  },
  headerSurface: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#1B4332',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  avatar: {
    backgroundColor: '#40916C',
    marginBottom: 10,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#E8F5E8',
    textAlign: 'center',
    marginTop: 5,
  },
  loginCard: {
    margin: 20,
    elevation: 4,
  },
  cardTitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#1B4332',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 10,
  },
  errorText: {
    color: '#B00020',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
    backgroundColor: '#40916C',
  },
  testCredentials: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  }
});