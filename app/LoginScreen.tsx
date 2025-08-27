import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Surface,
  TextInput,
  Button,
  Text,
  Card,
  Avatar,
  Divider,
  Provider as PaperProvider,
  DefaultTheme,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

// Se importa la interfaz de usuario y los datos de usuarios desde los archivos locales
import { User } from './types';
import usuariosData from './usuarios.json';

// Tema personalizado con colores de la UTCH
const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1B5E96',
    accent: '#F39C12',
    background: '#F8F9FA',
    surface: '#FFFFFF',
    text: '#2C3E50',
  },
};

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
  const router = useRouter();

  const validateEmail = (email: string) => {
    return email.endsWith('@utch.edu.co');
  };

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    if (!loginData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!validateEmail(loginData.email)) {
      newErrors.email = 'Debe usar su correo institucional @utch.edu.co';
    }

    if (!loginData.password.trim()) {
      newErrors.password = 'La contraseña es obligatoria';
    }
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleLogin = async (userType: 'passenger' | 'driver') => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simulación de autenticación con los datos importados
    const userFound = usuariosData.find(
      user => user.email === loginData.email && user.password === loginData.password
    );

    setTimeout(() => {
      setLoading(false);
      if (userFound) {
        onLoginSuccess(userFound as User);
        // Redirigir según el tipo de usuario
        if (userType === 'passenger') {
          router.push('/pantalla_pasajero');
        } else {
          router.push('/pantalla_conductor');
        }
      } else {
        showSnackbar('Correo o contraseña incorrectos');
      }
    }, 1500);
  };

  return (
    <PaperProvider theme={customTheme}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header con gradiente */}
        <LinearGradient
          colors={['#1B5E96', '#2980B9']}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <MaterialIcons name="school" size={48} color="#FFFFFF" />
            <Text variant="headlineMedium" style={styles.title}>
              UTCH Chompi
            </Text>
            <Text variant="bodyLarge" style={styles.subtitle}>
              Conecta, comparte y viaja inteligente
            </Text>
            <View style={styles.headerIconsRow}>
              <View style={styles.headerIcon}>
                <MaterialIcons name="commute" size={24} color="#F39C12" />
              </View>
              <View style={styles.headerIcon}>
                <MaterialIcons name="eco" size={24} color="#F39C12" />
              </View>
              <View style={styles.headerIcon}>
                <MaterialIcons name="people" size={24} color="#F39C12" />
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Tarjeta de Login */}
        <Card style={styles.loginCard}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.loginHeader}>
              <MaterialIcons name="login" size={32} color="#1B5E96" />
              <Text variant="titleLarge" style={styles.cardTitle}>
                Iniciar Sesión
              </Text>
              <Text variant="bodyMedium" style={styles.cardSubtitle}>
                Accede con tu cuenta institucional UTCH
              </Text>
            </View>

            <TextInput
              label="Correo Institucional"
              value={loginData.email}
              onChangeText={(text) => setLoginData({ ...loginData, email: text })}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              error={!!errors.email}
              right={<TextInput.Icon icon="email" />}
              outlineColor="#BDC3C7"
              activeOutlineColor="#1B5E96"
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

            <TextInput
              label="Contraseña"
              value={loginData.password}
              onChangeText={(text) => setLoginData({ ...loginData, password: text })}
              mode="outlined"
              secureTextEntry
              style={styles.input}
              error={!!errors.password}
              right={<TextInput.Icon icon="lock" />}
              outlineColor="#BDC3C7"
              activeOutlineColor="#1B5E96"
            />
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

            {/* Botones de tipo de usuario */}
            <View style={styles.userTypeSection}>
              <Text variant="titleMedium" style={styles.userTypeTitle}>
                ¿Cómo deseas ingresar?
              </Text>
              
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.userTypeButton, styles.passengerButton]}
                  onPress={() => handleLogin('passenger')}
                  disabled={loading}
                >
                  <MaterialIcons name="person" size={28} color="#FFFFFF" />
                  <Text style={styles.userTypeButtonText}>Pasajero</Text>
                  <Text style={styles.userTypeButtonSubtext}>Buscar viajes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.userTypeButton, styles.driverButton]}
                  onPress={() => handleLogin('driver')}
                  disabled={loading}
                >
                  <MaterialIcons name="directions-car" size={28} color="#FFFFFF" />
                  <Text style={styles.userTypeButtonText}>Conductor</Text>
                  <Text style={styles.userTypeButtonSubtext}>Ofrecer viajes</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Divider style={styles.divider} />

            {/* Link de registro */}
            <TouchableOpacity
              style={styles.registerLink}
              onPress={() => router.push('/RegisterScreen')}
            >
              <Text style={styles.registerText}>
                ¿No tienes cuenta? 
              </Text>
              <Text style={styles.registerLinkText}>
                Regístrate aquí
              </Text>
              <MaterialIcons name="arrow-forward" size={16} color="#1B5E96" />
            </TouchableOpacity>

            {/* Credenciales de prueba */}
            <View style={styles.testCredentials}>
              <Text variant="labelMedium" style={styles.testTitle}>
                Credenciales de Prueba:
              </Text>
              <View style={styles.testCredentialItem}>
                <MaterialIcons name="email" size={16} color="#7F8C8D" />
                <Text variant="bodySmall" style={styles.testText}>
                  juan.perez@utch.edu.co
                </Text>
              </View>
              <View style={styles.testCredentialItem}>
                <MaterialIcons name="lock" size={16} color="#7F8C8D" />
                <Text variant="bodySmall" style={styles.testText}>
                  123456
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Footer informativo */}
        <View style={styles.footer}>
          <MaterialIcons name="security" size={20} color="#7F8C8D" />
          <Text style={styles.footerText}>
            Tus datos están seguros con nosotros
          </Text>
        </View>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 12,
  },
  subtitle: {
    color: '#E3F2FD',
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.9,
  },
  headerIconsRow: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 24,
  },
  headerIcon: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 12,
    borderRadius: 20,
  },
  loginCard: {
    margin: 20,
    marginTop: -20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    borderRadius: 16,
  },
  cardContent: {
    padding: 24,
  },
  loginHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  cardTitle: {
    color: '#2C3E50',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 12,
  },
  cardSubtitle: {
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 4,
  },
  input: {
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  errorText: {
    color: '#E74C3C',
    fontSize: 12,
    marginBottom: 12,
    marginLeft: 8,
  },
  userTypeSection: {
    marginTop: 24,
    marginBottom: 20,
  },
  userTypeTitle: {
    textAlign: 'center',
    color: '#2C3E50',
    fontWeight: '600',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  userTypeButton: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  passengerButton: {
    backgroundColor: '#3498DB',
  },
  driverButton: {
    backgroundColor: '#F39C12',
  },
  userTypeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  userTypeButtonSubtext: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginTop: 4,
  },
  divider: {
    marginVertical: 20,
    backgroundColor: '#ECF0F1',
  },
  registerLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 4,
  },
  registerText: {
    color: '#7F8C8D',
    fontSize: 14,
  },
  registerLinkText: {
    color: '#1B5E96',
    fontSize: 14,
    fontWeight: '600',
  },
  testCredentials: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    borderLeftWidth: 3,
    borderLeftColor: '#1B5E96',
  },
  testTitle: {
    color: '#2C3E50',
    fontWeight: '600',
    marginBottom: 8,
  },
  testCredentialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  testText: {
    color: '#7F8C8D',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  footerText: {
    color: '#7F8C8D',
    fontSize: 12,
  },
});