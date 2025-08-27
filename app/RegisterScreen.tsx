import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, StatusBar } from 'react-native';
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
} from 'react-native-paper';

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

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0D4A2B" barStyle="light-content" />
      
      {/* Header */}
      <Surface style={styles.headerSurface}>
        <View style={styles.headerContent}>
          <Avatar.Icon size={80} icon="school" style={styles.avatar} />
          <Text variant="displaySmall" style={styles.title}>
            UTCH Chompi
          </Text>
          <Text variant="titleMedium" style={styles.subtitle}>
            Únete a la comunidad universitaria
          </Text>
        </View>
      </Surface>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Card style={styles.registerCard}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.formHeader}>
              <Text variant="headlineMedium" style={styles.formTitle}>Crear Cuenta</Text>
              <Chip 
                icon="shield-check" 
                mode="flat"
                style={styles.verifiedChip}
                textStyle={styles.verifiedChipText}
              >
                Solo estudiantes UTCH
              </Chip>
            </View>

            <Divider style={styles.divider} />

            {/* Nombres y Apellidos */}
            <View style={styles.rowContainer}>
              <TextInput
                label="Nombres"
                value={registerData.nombres}
                onChangeText={(text) => setRegisterData({...registerData, nombres: text})}
                mode="outlined"
                style={[styles.input, styles.halfInput]}
                theme={{ colors: { primary: '#2E7D32' } }}
              />
              <TextInput
                label="Apellidos"
                value={registerData.apellidos}
                onChangeText={(text) => setRegisterData({...registerData, apellidos: text})}
                mode="outlined"
                style={[styles.input, styles.halfInput]}
                theme={{ colors: { primary: '#2E7D32' } }}
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
              left={<TextInput.Icon icon="card-account-details" />}
              theme={{ colors: { primary: '#2E7D32' } }}
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
              left={<TextInput.Icon icon="email" />}
              helper="@utch.edu.co"
              theme={{ colors: { primary: '#2E7D32' } }}
            />

            {/* Teléfono */}
            <TextInput
              label="Teléfono"
              value={registerData.telefono}
              onChangeText={(text) => setRegisterData({...registerData, telefono: text})}
              mode="outlined"
              style={styles.input}
              keyboardType="phone-pad"
              left={<TextInput.Icon icon="phone" />}
              theme={{ colors: { primary: '#2E7D32' } }}
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
              left={<TextInput.Icon icon="book-open-variant" />}
              theme={{ colors: { primary: '#2E7D32' } }}
            />

            {/* Contraseñas */}
            <TextInput
              label="Contraseña"
              value={registerData.password}
              onChangeText={(text) => setRegisterData({...registerData, password: text})}
              mode="outlined"
              secureTextEntry
              style={styles.input}
              left={<TextInput.Icon icon="lock" />}
              theme={{ colors: { primary: '#2E7D32' } }}
            />

            <TextInput
              label="Confirmar Contraseña"
              value={registerData.confirmPassword}
              onChangeText={(text) => setRegisterData({...registerData, confirmPassword: text})}
              mode="outlined"
              secureTextEntry
              style={styles.input}
              left={<TextInput.Icon icon="lock-check" />}
              theme={{ colors: { primary: '#2E7D32' } }}
            />

            {/* Términos y Condiciones */}
            <View style={styles.termsContainer}>
              <Switch
                value={registerData.acceptTerms}
                onValueChange={(value) => setRegisterData({...registerData, acceptTerms: value})}
                color="#2E7D32"
              />
              <TouchableRipple onPress={onShowTerms} style={styles.termsTextContainer}>
                <Text variant="bodyMedium" style={styles.termsText}>
                  Acepto los términos y condiciones de uso
                </Text>
              </TouchableRipple>
            </View>

            {/* Botón de Registro */}
            <Button
              mode="contained"
              onPress={handleRegister}
              style={styles.registerButton}
              disabled={loading}
              loading={loading}
              contentStyle={styles.buttonContent}
            >
              {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </Button>

            {/* Link para Login */}
            <View style={styles.loginPrompt}>
              <Text variant="bodyMedium" style={styles.promptText}>¿Ya tienes cuenta? </Text>
              <TouchableRipple onPress={onGoToLogin}>
                <Text variant="bodyMedium" style={styles.linkText}>Inicia sesión</Text>
              </TouchableRipple>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      {loading && (
        <Surface style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#2E7D32" />
          <Text style={styles.loadingText}>Creando tu cuenta...</Text>
        </Surface>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  headerSurface: {
    backgroundColor: '#0D4A2B',
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  headerContent: {
    alignItems: 'center',
    paddingTop: 20,
  },
  avatar: {
    backgroundColor: '#2E7D32',
    marginBottom: 16,
  },
  title: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: 8,
  },
  scrollView: {
    flex: 1,
  },
  registerCard: {
    margin: 20,
    marginTop: -20,
    elevation: 12,
    borderRadius: 24,
    backgroundColor: 'white',
  },
  cardContent: {
    padding: 24,
  },
  formHeader: {
    alignItems: 'center',
    marginBottom: 8,
  },
  formTitle: {
    color: '#0D4A2B',
    fontWeight: '700',
    marginBottom: 16,
  },
  verifiedChip: {
    backgroundColor: '#E8F5E8',
  },
  verifiedChipText: {
    color: '#2E7D32',
    fontWeight: '600',
  },
  divider: {
    marginVertical: 24,
    backgroundColor: '#E0E0E0',
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '47%',
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#0D4A2B',
    fontWeight: '600',
    marginBottom: 12,
  },
  chipsContainer: {
    paddingVertical: 4,
  },
  programChip: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#F5F5F5',
    borderColor: '#E0E0E0',
  },
  selectedChip: {
    backgroundColor: '#2E7D32',
  },
  chipText: {
    color: '#666',
  },
  selectedChipText: {
    color: 'white',
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
    color: '#666',
    lineHeight: 20,
  },
  registerButton: {
    backgroundColor: '#2E7D32',
    marginBottom: 20,
    borderRadius: 16,
    elevation: 4,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  promptText: {
    color: '#666',
  },
  linkText: {
    color: '#2E7D32',
    fontWeight: '600',
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
    color: '#2E7D32',
    fontSize: 16,
    fontWeight: '500',
  },
});