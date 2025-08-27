import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import {
  Provider as PaperProvider,
  DefaultTheme,
  Surface,
  TextInput,
  Button,
  Text,
  Card,
  Avatar,
} from 'react-native-paper';

// Tema personalizado
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#40916C',
    secondary: '#1B4332',
    background: '#F0F7FF',
  },
};

// Datos de usuarios
const USERS = [
  {
    id: "1",
    email: "juan.perez@utch.edu.co",
    password: "123456",
    nombre: "Juan",
    apellido: "Pérez",
    programa: "Ingeniería de Sistemas",
    semestre: 8
  },
  {
    id: "2",
    email: "maria.garcia@utch.edu.co",
    password: "password123",
    nombre: "María",
    apellido: "García",
    programa: "Administración de Empresas",
    semestre: 6
  },
  {
    id: "3",
    email: "carlos.lopez@utch.edu.co",
    password: "carlos2024",
    nombre: "Carlos",
    apellido: "López",
    programa: "Ingeniería Civil",
    semestre: 4
  }
];

interface User {
  id: string;
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  programa: string;
  semestre: number;
}

// Componente de Login
function LoginScreen({ onLogin }: { onLogin: (user: User) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string): boolean => {
    if (!email) {
      setEmailError('El correo es obligatorio');
      return false;
    }
    if (!email.endsWith('@utch.edu.co')) {
      setEmailError('Debe usar correo institucional @utch.edu.co');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError('La contraseña es obligatoria');
      return false;
    }
    if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleLogin = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setLoading(true);

    // Simular delay de autenticación
    setTimeout(() => {
      const user = USERS.find(u => u.email === email && u.password === password);
      
      setLoading(false);

      if (user) {
        onLogin(user);
      } else {
        Alert.alert('Error', 'Correo o contraseña incorrectos');
      }
    }, 1500);
  };

  const fillTestCredentials = (userEmail: string, userPassword: string) => {
    setEmail(userEmail);
    setPassword(userPassword);
    setEmailError('');
    setPasswordError('');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Surface style={styles.header}>
        <Avatar.Icon size={80} icon="car" style={styles.avatar} />
        <Text variant="headlineSmall" style={styles.title}>
          UTCH Chompi
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Sistema de Carpooling Universitario
        </Text>
      </Surface>

      {/* Formulario */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.cardTitle}>
            Iniciar Sesión
          </Text>

          {/* Email Input */}
          <TextInput
            label="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            error={!!emailError}
            right={<TextInput.Icon icon="email" />}
            disabled={loading}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          {/* Password Input */}
          <TextInput
            label="Contraseña"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
            style={styles.input}
            error={!!passwordError}
            right={<TextInput.Icon icon="lock" />}
            disabled={loading}
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

          {/* Login Button */}
          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            icon="login"
            style={styles.button}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>

          {/* Test Credentials */}
          <View style={styles.testSection}>
            <Text variant="bodyMedium" style={styles.testTitle}>
              👥 Usuarios de Prueba
            </Text>
            
            <Button
              mode="outlined"
              onPress={() => fillTestCredentials('juan.perez@utch.edu.co', '123456')}
              style={styles.testButton}
              disabled={loading}
            >
              👨‍🎓 Juan Pérez - Estudiante
            </Button>
            
            <Button
              mode="outlined"
              onPress={() => fillTestCredentials('maria.garcia@utch.edu.co', 'password123')}
              style={styles.testButton}
              disabled={loading}
            >
              👩‍💼 María García - Administradora
            </Button>
            
            <Button
              mode="outlined"
              onPress={() => fillTestCredentials('carlos.lopez@utch.edu.co', 'carlos2024')}
              style={styles.testButton}
              disabled={loading}
            >
              👨‍🔧 Carlos López - Ingeniero
            </Button>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

// Componente de Home
function HomeScreen({ user, onLogout }: { user: User; onLogout: () => void }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Surface style={styles.header}>
        <Avatar.Text 
          size={70} 
          label={`${user.nombre[0]}${user.apellido[0]}`}
          style={styles.avatar}
        />
        <Text variant="headlineSmall" style={styles.welcomeText}>
          ¡Bienvenido, {user.nombre}!
        </Text>
        <Text variant="bodyMedium" style={styles.emailText}>
          {user.email}
        </Text>
      </Surface>

      {/* Información del Usuario */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.cardTitle}>
            📋 Información del Perfil
          </Text>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>👤 Nombre Completo:</Text>
              <Text style={styles.value}>{user.nombre} {user.apellido}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>🎓 Programa:</Text>
              <Text style={styles.value}>{user.programa}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>📚 Semestre:</Text>
              <Text style={styles.value}>{user.semestre}° Semestre</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>📧 Email:</Text>
              <Text style={styles.value}>{user.email}</Text>
            </View>
          </View>

          <Button
            mode="outlined"
            onPress={onLogout}
            icon="logout"
            style={styles.logoutButton}
          >
            🔒 Cerrar Sesión
          </Button>
        </Card.Content>
      </Card>

      {/* Funcionalidades Futuras */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            🚗 Próximamente en UTCH Chompi
          </Text>
          
          <View style={styles.featuresList}>
            <Text style={styles.feature}>🔍 Buscar viajes disponibles</Text>
            <Text style={styles.feature}>➕ Publicar tus viajes</Text>
            <Text style={styles.feature}>💬 Chat con compañeros de viaje</Text>
            <Text style={styles.feature}>⭐ Sistema de calificaciones</Text>
            <Text style={styles.feature}>📱 Notificaciones en tiempo real</Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

// Componente Principal
export default function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <PaperProvider theme={theme}>
      {user ? (
        <HomeScreen user={user} onLogout={handleLogout} />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </PaperProvider>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7FF',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: '#1B4332',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
    elevation: 4,
  },
  avatar: {
    backgroundColor: '#40916C',
    marginBottom: 15,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#E8F5E8',
    textAlign: 'center',
  },
  welcomeText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  emailText: {
    color: '#E8F5E8',
    textAlign: 'center',
  },
  card: {
    margin: 20,
    elevation: 4,
    borderRadius: 15,
    marginBottom: 15,
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
    marginBottom: 15,
    marginLeft: 5,
  },
  button: {
    marginTop: 15,
    backgroundColor: '#40916C',
    borderRadius: 8,
  },
  testSection: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  testTitle: {
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 15,
    color: '#1B4332',
  },
  testButton: {
    marginBottom: 10,
    borderColor: '#40916C',
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  label: {
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  value: {
    color: '#1B4332',
    fontWeight: '500',
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
    borderColor: '#B00020',
  },
  featuresList: {
    gap: 8,
  },
  feature: {
    color: '#666',
    paddingVertical: 4,
    fontSize: 14,
  },
});