import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { List, Appbar, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';

// Tema personalizado con colores de la UTCH
const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1B5E96', // Azul institucional UTCH
    accent: '#F39C12', // Amarillo/naranja complementario
    background: '#F8F9FA',
    surface: '#FFFFFF',
    text: '#2C3E50',
  },
};

export default function App() {
  const router = useRouter();

  const menuItems = [
    { 
      title: 'Iniciar Sesión', 
      icon: 'login', 
      route: '/LoginScreen',
      description: 'Accede a tu cuenta UTCH',
      color: '#1B5E96'
    },
    { 
      title: 'Registro', 
      icon: 'person-add', 
      route: '/RegisterScreen',
      description: 'Crea tu cuenta estudiantil',
      color: '#27AE60'
    },
    { 
      title: 'Chat', 
      icon: 'chat', 
      route: '/chat',
      description: 'Comunícate con otros estudiantes',
      color: '#8E44AD'
    },
    { 
      title: 'Mi Perfil', 
      icon: 'account-circle', 
      route: '/perfil',
      description: 'Gestiona tu información personal',
      color: '#E74C3C'
    },
    { 
      title: 'Buscar Chompi', 
      icon: 'search', 
      route: '/buscar',
      description: 'Encuentra Chompi disponibles',
      color: '#3498DB'
    },
    { 
      title: 'Ofrecer Chompi', 
      icon: 'directions-car', 
      route: '/crear_c',
      description: 'Comparte tu vehículo con otros',
      color: '#F39C12'
    },
    { 
      title: 'Solicitar Chompi', 
      icon: 'person', 
      route: '/crear_p',
      description: 'Únete a un Chompi existente',
      color: '#16A085'
    },
    { 
      title: 'Dashboard Pasajero', 
      icon: 'dashboard', 
      route: '/Pantalla_pasajero',
      description: 'Panel de control personal',
      color: '#9B59B6'
    },
    { 
      title: 'Dashboard Conductor', 
      icon: 'dashboard', 
      route: '/Pantalla_conductor',
      description: 'Panel de control personal',
      color: '#b101f6ff'
    },
    { 
      title: 'Detalles de Chompi', 
      icon: 'info', 
      route: '/detalles',
      description: 'Información detallada de Chompi',
      color: '#34495E'
    },
  ];

  return (
    <PaperProvider theme={customTheme}>
      {/* Header con gradiente */}
      <LinearGradient
        colors={['#1B5E96', '#2980B9']}
        style={styles.headerGradient}
      >
        <Appbar.Header style={styles.transparentHeader}>
          <Appbar.Content 
            title="UTCH Chompi" 
            titleStyle={styles.headerTitle}
          />
          <Appbar.Action 
            icon="account-circle" 
            onPress={() => {}}
            iconColor="#FFFFFF"
          />
        </Appbar.Header>
      </LinearGradient>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <MaterialIcons name="commute" size={48} color="#1B5E96" />
        <Text style={styles.heroTitle}>Conecta y Comparte</Text>
        <Text style={styles.heroSubtitle}>
          Viaja de forma inteligente y sostenible con la comunidad UTCH
        </Text>
      </View>

      {/* Menu Items */}
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Servicios Disponibles</Text>
          
          {menuItems.map((item, index) => (
            <View key={index} style={styles.listItemContainer}>
              <List.Item
                title={item.title}
                description={item.description}
                left={() => (
                  <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                    <MaterialIcons 
                      name={item.icon} 
                      size={28} 
                      color={item.color} 
                    />
                  </View>
                )}
                right={() => (
                  <MaterialIcons 
                    name="chevron-right" 
                    size={24} 
                    color="#BDC3C7" 
                  />
                )}
                onPress={() => router.push(item.route)}
                style={styles.listItem}
                titleStyle={styles.itemTitle}
                descriptionStyle={styles.itemDescription}
              />
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <MaterialIcons name="school" size={32} color="#1B5E96" />
          <Text style={styles.footerTitle}>Universidad Tecnológica del Chocó</Text>
          <Text style={styles.footerSubtitle}>Diego Luis Córdoba</Text>
          <Text style={styles.footerText}>
            Conectando estudiantes para un transporte más eficiente y económico
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
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  transparentHeader: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 20,
    letterSpacing: 0.5,
  },
  heroSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1B5E96',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 280,
  },
  menuSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 16,
    marginLeft: 8,
  },
  listItemContainer: {
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    overflow: 'hidden',
  },
  listItem: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 20,
    minHeight: 72,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 18,
  },
  footer: {
    backgroundColor: '#FFFFFF',
    marginTop: 24,
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B5E96',
    marginTop: 12,
    textAlign: 'center',
  },
  footerSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F39C12',
    marginBottom: 12,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },
});