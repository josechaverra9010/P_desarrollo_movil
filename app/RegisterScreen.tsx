import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Surface,
  TextInput,
  Button,
  Text,
  Card,
  Avatar,
  Chip,
  Switch,
  ActivityIndicator,
  TouchableRipple,
  Icon,
  Divider,
  Provider as PaperProvider,
  DefaultTheme,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

// Tema personalizado con colores de la UTCH (mismo que LoginScreen)
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

interface RegisterScreenProps {
  onRegisterSuccess: () => void;
  onGoToLogin: () => void;
  onShowTerms: () => void;
  showSnackbar: (message: string) => void;
}

export default function RegisterScreen({
  onRegisterSuccess,
  onGoToLogin,
  onShowTerms,
  showSnackbar
}: RegisterScreenProps) {
  const [registerData, setRegisterData] = useState({
    nombres: '',
    apellidos: '',
    carnet: '',
    email: '',
    telefono: '',
    programa: '',
    semestre: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const programas = [
    'Ingeniería de Telecomunicaciones',
    'Ingeniería Civil', 
    'Ingeniería Agroforestal',
    'Ingeniería Ambiental',
    'Derecho',
    'Administración de Empresas',
    'Contaduría Pública',
    'Trabajo Social'
  ];

  const validateEmail = (email: string) => {
    return email.endsWith('@utch.edu.co');
  };

  const handleRegister = async () => {
    const { nombres, apellidos, carnet, email, telefono, programa, semestre, password, confirmPassword, acceptTerms } = registerData;

    if (!nombres || !apellidos || !carnet || !email || !telefono || !programa || !semestre || !password || !confirmPassword) {
      showSnackbar('Por favor complete todos los campos');
      return;
    }

    if (!validateEmail(email)) {
      showSnackbar('Debe usar su correo institucional @utch.edu.co');
      return;
    }

    if (password !== confirmPassword) {
      showSnackbar('Las contraseñas no coinciden');
      return;
    }

    if (!acceptTerms) {
      showSnackbar('Debe aceptar los términos y condiciones');
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      showSnackbar('Registro exitoso. Revise su correo para verificar su cuenta');
      onRegisterSuccess();
    }, 2000);
  };

  const handleGoToLogin = () => {
    router.push('/LoginScreen');
  };

  return (
    <PaperProvider theme={customTheme}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header con gradiente (mismo estilo que LoginScreen) */}
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
              Únete a la comunidad universitaria
            </Text>
            <View style={styles.headerIconsRow}>
              <View style={styles.headerIcon}>
                <MaterialIcons name="person-add" size={24} color="#F39C12" />
              </View>
              <View style={styles.headerIcon}>
                <MaterialIcons name="security" size={24} color="#F39C12" />
              </View>
              <View style={styles.headerIcon}>
                <MaterialIcons name="verified-user" size={24} color="#F39C12" />
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Tarjeta de Registro (mismo estilo que LoginScreen) */}
        <Card style={styles.registerCard}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.registerHeader}>
              <MaterialIcons name="person-add" size={32} color="#1B5E96" />
              <Text variant="titleLarge" style={styles.cardTitle}>
                Crear Cuenta
              </Text>
              <Text variant="bodyMedium" style={styles.cardSubtitle}>
                Regístrate con tu cuenta institucional UTCH
              </Text>
            </View>

            {/* Nombres y Apellidos */}
            <View style={styles.rowContainer}>
              <TextInput
                label="Nombres"
                value={registerData.nombres}
                onChangeText={(text) => setRegisterData({...registerData, nombres: text})}
                mode="outlined"
                style={[styles.input, styles.halfInput]}
                outlineColor="#BDC3C7"
                activeOutlineColor="#1B5E96"
                right={<TextInput.Icon icon="account" />}
              />
              <TextInput
                label="Apellidos"
                value={registerData.apellidos}
                onChangeText={(text) => setRegisterData({...registerData, apellidos: text})}
                mode="outlined"
                style={[styles.input, styles.halfInput]}
                outlineColor="#BDC3C7"
                activeOutlineColor="#1B5E96"
                right={<TextInput.Icon icon="account-outline" />}
              />
            </View>

            {/* Carnet */}
            <TextInput
              label="Número de Carnet"
              value={registerData.carnet}
              onChangeText={(text) => setRegisterData({...registerData, carnet: text})}
              mode="outlined"
              style={styles.input}
              keyboardType="numeric"
              outlineColor="#BDC3C7"
              activeOutlineColor="#1B5E96"
              right={<TextInput.Icon icon="card-account-details" />}
            />

            {/* Email */}
            <TextInput
              label="Correo Institucional"
              value={registerData.email}
              onChangeText={(text) => setRegisterData({...registerData, email: text})}
              mode="outlined"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              outlineColor="#BDC3C7"
              activeOutlineColor="#1B5E96"
              right={<TextInput.Icon icon="email" />}
            />

            {/* Teléfono */}
            <TextInput
              label="Teléfono"
              value={registerData.telefono}
              onChangeText={(text) => setRegisterData({...registerData, telefono: text})}
              mode="outlined"
              style={styles.input}
              keyboardType="phone-pad"
              outlineColor="#BDC3C7"
              activeOutlineColor="#1B5E96"
              right={<TextInput.Icon icon="phone" />}
            />

            {/* Programa Académico */}
            <View style={styles.sectionContainer}>
              <Text variant="titleMedium" style={styles.sectionTitle}>Programa Académico</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsContainer}>
                {programas.map((programa, index) => (
                  <Chip
                    key={index}
                    mode={registerData.programa === programa ? 'flat' : 'outlined'}
                    selected={registerData.programa === programa}
                    onPress={() => setRegisterData({...registerData, programa})}
                    style={[
                      styles.programChip,
                      registerData.programa === programa && styles.selectedChip
                    ]}
                    textStyle={registerData.programa === programa ? styles.selectedChipText : styles.chipText}
                  >
                    {programa}
                  </Chip>
                ))}
              </ScrollView>
            </View>

            {/* Semestre */}
            <TextInput
              label="Semestre Actual"
              value={registerData.semestre}
              onChangeText={(text) => setRegisterData({...registerData, semestre: text})}
              mode="outlined"
              style={styles.input}
              keyboardType="numeric"
              outlineColor="#BDC3C7"
              activeOutlineColor="#1B5E96"
              right={<TextInput.Icon icon="book-open-variant" />}
            />

            {/* Contraseñas */}
            <TextInput
              label="Contraseña"
              value={registerData.password}
              onChangeText={(text) => setRegisterData({...registerData, password: text})}
              mode="outlined"
              secureTextEntry
              style={styles.input}
              outlineColor="#BDC3C7"
              activeOutlineColor="#1B5E96"
              right={<TextInput.Icon icon="lock" />}
            />

            <TextInput
              label="Confirmar Contraseña"
              value={registerData.confirmPassword}
              onChangeText={(text) => setRegisterData({...registerData, confirmPassword: text})}
              mode="outlined"
              secureTextEntry
              style={styles.input}
              outlineColor="#BDC3C7"
              activeOutlineColor="#1B5E96"
              right={<TextInput.Icon icon="lock-check" />}
            />

            {/* Términos y Condiciones */}
            <View style={styles.termsContainer}>
              <Switch
                value={registerData.acceptTerms}
                onValueChange={(value) => setRegisterData({...registerData, acceptTerms: value})}
                color="#1B5E96"
              />
              <TouchableOpacity onPress={onShowTerms} style={styles.termsTextContainer}>
                <Text variant="bodyMedium" style={styles.termsText}>
                  Acepto los términos y condiciones de uso
                </Text>
              </TouchableOpacity>
            </View>

            {/* Botón de Registro */}
            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
              disabled={loading}
            >
              <MaterialIcons name="person-add" size={28} color="#FFFFFF" />
              <Text style={styles.registerButtonText}>
                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </Text>
            </TouchableOpacity>

            <Divider style={styles.divider} />

            {/* Link para Login */}
            <TouchableOpacity
              style={styles.loginLink}
              onPress={handleGoToLogin}
            >
              <Text style={styles.loginText}>
                ¿Ya tienes cuenta? 
              </Text>
              <Text style={styles.loginLinkText}>
                Inicia sesión
              </Text>
              <MaterialIcons name="arrow-forward" size={16} color="#1B5E96" />
            </TouchableOpacity>

            {/* Información de seguridad */}
            <View style={styles.securityInfo}>
              <Text variant="labelMedium" style={styles.securityTitle}>
                Solo estudiantes UTCH:
              </Text>
              <View style={styles.securityItem}>
                <MaterialIcons name="verified-user" size={16} color="#7F8C8D" />
                <Text variant="bodySmall" style={styles.securityText}>
                  Verificación con correo institucional
                </Text>
              </View>
              <View style={styles.securityItem}>
                <MaterialIcons name="security" size={16} color="#7F8C8D" />
                <Text variant="bodySmall" style={styles.securityText}>
                  Tus datos están protegidos
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Footer informativo */}
        <View style={styles.footer}>
          <MaterialIcons name="security" size={20} color="#7F8C8D" />
          <Text style={styles.footerText}>
            Registro seguro y verificado
          </Text>
        </View>

        {loading && (
          <Surface style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#1B5E96" />
            <Text style={styles.loadingText}>Creando tu cuenta...</Text>
          </Surface>
        )}
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
  registerCard: {
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
  registerHeader: {
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
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#2C3E50',
    fontWeight: '600',
    marginBottom: 12,
  },
  chipsContainer: {
    paddingVertical: 4,
  },
  programChip: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#F8F9FA',
    borderColor: '#BDC3C7',
  },
  selectedChip: {
    backgroundColor: '#1B5E96',
    borderColor: '#1B5E96',
  },
  chipText: {
    color: '#7F8C8D',
  },
  selectedChipText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  termsTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  termsText: {
    color: '#7F8C8D',
    lineHeight: 20,
  },
  registerButton: {
    backgroundColor: '#1B5E96',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    marginVertical: 20,
    backgroundColor: '#ECF0F1',
  },
  loginLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 4,
  },
  loginText: {
    color: '#7F8C8D',
    fontSize: 14,
  },
  loginLinkText: {
    color: '#1B5E96',
    fontSize: 14,
    fontWeight: '600',
  },
  securityInfo: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    borderLeftWidth: 3,
    borderLeftColor: '#1B5E96',
  },
  securityTitle: {
    color: '#2C3E50',
    fontWeight: '600',
    marginBottom: 8,
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  securityText: {
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
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 20,
  },
  loadingText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#1B5E96',
    fontSize: 16,
    fontWeight: '500',
  },
});