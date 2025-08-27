import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import {
  Provider as PaperProvider,
  DefaultTheme,
  Appbar,
  Surface,
  TextInput,
  Button,
  Text,
  Card,
  Avatar,
  Chip,
  Switch,
  ActivityIndicator,
  Snackbar,
  Dialog,
  Portal,
  TouchableRipple,
  Badge,
  Icon,
  Tooltip
} from 'react-native-paper';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1B4332',
    accent: '#40916C',
    surface: '#F8F9FA',
    background: '#FFFFFF',
  },
};

export default function UTCHCarpoolingApp() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);

  // Estados para Login
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Estados para Registro
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

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const validateEmail = (email) => {
    return email.endsWith('@utch.edu.co');
  };

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      showSnackbar('Por favor complete todos los campos');
      return;
    }

    if (!validateEmail(loginData.email)) {
      showSnackbar('Debe usar su correo institucional @utch.edu.co');
      return;
    }

    setLoading(true);
    
    // Simular autenticación
    setTimeout(() => {
      setLoading(false);
      showSnackbar('¡Bienvenido a UTCH Chompi!');
    }, 2000);
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
    
    // Simular registro
    setTimeout(() => {
      setLoading(false);
      showSnackbar('Registro exitoso. Revise su correo para verificar su cuenta');
      setCurrentScreen('login');
    }, 2000);
  };

  const LoginScreen = () => (
    <ScrollView style={styles.container}>
      <Surface style={styles.headerSurface}>
        <Avatar.Icon size={80} icon="car" style={styles.avatar} />
        <Text variant="headlineMedium" style={styles.title}>
          UTCH Chompi
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Comparte tu viaje, cuida el planeta
        </Text>
      </Surface>

      <Card style={styles.loginCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.cardTitle}>Iniciar Sesión</Text>
          
          <TextInput
            label="Correo Institucional"
            value={loginData.email}
            onChangeText={(text) => setLoginData({...loginData, email: text})}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            left={<TextInput.Icon icon="email" />}
          />

          <TextInput
            label="Contraseña"
            value={loginData.password}
            onChangeText={(text) => setLoginData({...loginData, password: text})}
            mode="outlined"
            secureTextEntry
            style={styles.input}
            left={<TextInput.Icon icon="lock" />}
          />

          <TouchableRipple
            onPress={() => setDialogVisible(true)}
            rippleColor="rgba(0, 0, 0, .32)"
            style={styles.forgotPassword}
          >
            <Text variant="bodySmall" style={styles.linkText}>
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableRipple>

          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.button}
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>

          <View style={styles.registerPrompt}>
            <Text variant="bodyMedium">¿No tienes cuenta? </Text>
            <TouchableRipple onPress={() => setCurrentScreen('register')}>
              <Text variant="bodyMedium" style={styles.linkText}>Regístrate</Text>
            </TouchableRipple>
          </View>
        </Card.Content>
      </Card>

      {loading && (
        <Surface style={styles.loadingOverlay}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Verificando credenciales...</Text>
        </Surface>
      )}
    </ScrollView>
  );

  const RegisterScreen = () => (
    <ScrollView style={styles.container}>
      <Surface style={styles.headerSurface}>
        <Avatar.Icon size={60} icon="account-plus" style={styles.avatar} />
        <Text variant="headlineSmall" style={styles.title}>
          Únete a UTCH Chompi
        </Text>
      </Surface>

      <Card style={styles.registerCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.cardTitle}>Crear Cuenta</Text>
          
          <View style={styles.chipContainer}>
            <Chip 
              icon="school" 
              mode="outlined"
              style={styles.chip}
            >
              Solo estudiantes UTCH
            </Chip>
          </View>

          <View style={styles.nameRow}>
            <TextInput
              label="Nombres"
              value={registerData.nombres}
              onChangeText={(text) => setRegisterData({...registerData, nombres: text})}
              mode="outlined"
              style={[styles.input, styles.halfInput]}
            />
            <TextInput
              label="Apellidos"
              value={registerData.apellidos}
              onChangeText={(text) => setRegisterData({...registerData, apellidos: text})}
              mode="outlined"
              style={[styles.input, styles.halfInput]}
            />
          </View>

          <TextInput
            label="Número de Carnet"
            value={registerData.carnet}
            onChangeText={(text) => setRegisterData({...registerData, carnet: text})}
            mode="outlined"
            style={styles.input}
            keyboardType="numeric"
            left={<TextInput.Icon icon="card-account-details" />}
          />

          <TextInput
            label="Correo Institucional (@utch.edu.co)"
            value={registerData.email}
            onChangeText={(text) => setRegisterData({...registerData, email: text})}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            left={<TextInput.Icon icon="email" />}
          />

          <TextInput
            label="Teléfono"
            value={registerData.telefono}
            onChangeText={(text) => setRegisterData({...registerData, telefono: text})}
            mode="outlined"
            style={styles.input}
            keyboardType="phone-pad"
            left={<TextInput.Icon icon="phone" />}
          />

          <View style={styles.academicRow}>
            <View style={styles.programContainer}>
              <Text variant="bodySmall" style={styles.fieldLabel}>Programa Académico</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.programScroll}>
                {programas.map((programa, index) => (
                  <Chip
                    key={index}
                    mode={registerData.programa === programa ? 'flat' : 'outlined'}
                    selected={registerData.programa === programa}
                    onPress={() => setRegisterData({...registerData, programa})}
                    style={styles.programChip}
                    compact
                  >
                    {programa}
                  </Chip>
                ))}
              </ScrollView>
            </View>
          </View>

          <TextInput
            label="Semestre Actual"
            value={registerData.semestre}
            onChangeText={(text) => setRegisterData({...registerData, semestre: text})}
            mode="outlined"
            style={styles.input}
            keyboardType="numeric"
            left={<TextInput.Icon icon="book-open-variant" />}
          />

          <TextInput
            label="Contraseña"
            value={registerData.password}
            onChangeText={(text) => setRegisterData({...registerData, password: text})}
            mode="outlined"
            secureTextEntry
            style={styles.input}
            left={<TextInput.Icon icon="lock" />}
          />

          <TextInput
            label="Confirmar Contraseña"
            value={registerData.confirmPassword}
            onChangeText={(text) => setRegisterData({...registerData, confirmPassword: text})}
            mode="outlined"
            secureTextEntry
            style={styles.input}
            left={<TextInput.Icon icon="lock-check" />}
          />

          <View style={styles.switchContainer}>
            <Switch
              value={registerData.acceptTerms}
              onValueChange={(value) => setRegisterData({...registerData, acceptTerms: value})}
            />
            <TouchableRipple onPress={() => setDialogVisible(true)} style={styles.termsText}>
              <Text variant="bodySmall">
                Acepto los términos y condiciones de uso
              </Text>
            </TouchableRipple>
            <Tooltip title="Información sobre términos">
              <Icon source="information" size={20} />
            </Tooltip>
          </View>

          <Button
            mode="contained"
            onPress={handleRegister}
            style={styles.button}
            disabled={loading}
          >
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </Button>

          <View style={styles.registerPrompt}>
            <Text variant="bodyMedium">¿Ya tienes cuenta? </Text>
            <TouchableRipple onPress={() => setCurrentScreen('login')}>
              <Text variant="bodyMedium" style={styles.linkText}>Inicia sesión</Text>
            </TouchableRipple>
          </View>
        </Card.Content>
      </Card>

      {loading && (
        <Surface style={styles.loadingOverlay}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Creando tu cuenta...</Text>
        </Surface>
      )}
    </ScrollView>
  );

  return (
    <PaperProvider theme={theme}>
      <View style={styles.appContainer}>
        <Appbar.Header>
          <Appbar.Content 
            title="UTCH Chompi" 
            subtitle={currentScreen === 'login' ? 'Iniciar Sesión' : 'Registro'}
          />
          {currentScreen === 'register' && (
            <Appbar.Action 
              icon="arrow-left" 
              onPress={() => setCurrentScreen('login')} 
            />
          )}
          <Badge visible={true} style={styles.badge}>v1.0</Badge>
        </Appbar.Header>

        {currentScreen === 'login' ? <LoginScreen /> : <RegisterScreen />}

        <Portal>
          <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
            <Dialog.Title>Información</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">
                {currentScreen === 'login' 
                  ? 'Para recuperar tu contraseña, contacta al administrador del sistema o visita la oficina de sistemas de la UTCH.'
                  : 'Al crear una cuenta, aceptas compartir tu información de contacto con otros usuarios de la aplicación para facilitar el Chompi entre estudiantes de la UTCH.'
                }
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setDialogVisible(false)}>Entendido</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          style={styles.snackbar}
        >
          {snackbarMessage}
        </Snackbar>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F0F7FF',
  },
  headerSurface: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#1B4332',
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
  registerCard: {
    margin: 20,
    elevation: 4,
    marginBottom: 40,
  },
  cardTitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#1B4332',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 15,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  academicRow: {
    marginBottom: 15,
  },
  programContainer: {
    marginBottom: 10,
  },
  fieldLabel: {
    marginBottom: 8,
    color: '#1B4332',
    fontWeight: 'bold',
  },
  programScroll: {
    flexDirection: 'row',
  },
  programChip: {
    marginRight: 8,
    marginBottom: 5,
  },
  chipContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  chip: {
    backgroundColor: '#E8F5E8',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  termsText: {
    flex: 1,
    marginLeft: 10,
    marginRight: 5,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
  },
  registerPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 15,
    padding: 5,
  },
  linkText: {
    color: '#40916C',
    fontWeight: 'bold',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  loadingText: {
    marginTop: 10,
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  snackbar: {
    backgroundColor: '#1B4332',
  },
});