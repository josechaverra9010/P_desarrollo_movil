import React from 'react';
import { View, ScrollView, StyleSheet, Alert, StatusBar } from 'react-native';
import {
  Surface,
  Card,
  Text,
  Avatar,
  Button,
  Chip,
  Divider,
  Icon,
  TouchableRipple,
} from 'react-native-paper';
import { User } from './types';
import { AuthService } from './authService';

interface HomeScreenProps {
  user: User;
  onLogout: () => void;
  showSnackbar: (message: string) => void;
}

export default function HomeScreen({ user, onLogout, showSnackbar }: HomeScreenProps) {
  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            try {
              await AuthService.logout();
              showSnackbar('Sesión cerrada correctamente');
              onLogout();
            } catch (error) {
              showSnackbar('Error al cerrar sesión');
            }
          }
        }
      ]
    );
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  const getInitials = (nombre: string, apellido: string) => {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
  };

  const quickActions = [
    {
      id: 'search',
      title: 'Buscar Viaje',
      subtitle: 'Encuentra tu transporte ideal',
      icon: 'magnify',
      color: '#1976D2',
      backgroundColor: '#E3F2FD',
    },
    {
      id: 'offer',
      title: 'Ofrecer Viaje',
      subtitle: 'Comparte tu ruta y ahorra',
      icon: 'car-plus',
      color: '#2E7D32',
      backgroundColor: '#E8F5E8',
    },
    {
      id: 'request',
      title: 'Solicitar Viaje',
      subtitle: 'Publica tu necesidad de transporte',
      icon: 'hand-wave',
      color: '#FF9800',
      backgroundColor: '#FFF3E0',
    },
    {
      id: 'messages',
      title: 'Mensajes',
      subtitle: 'Chatea con otros usuarios',
      icon: 'message',
      color: '#9C27B0',
      backgroundColor: '#F3E5F5',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0D4A2B" barStyle="light-content" />
      
      {/* Header */}
      <Surface style={styles.headerSurface}>
        <View style={styles.headerContent}>
          <View style={styles.userSection}>
            <Avatar.Text 
              size={72} 
              label={getInitials(user.nombre, user.apellido)}
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text variant="bodyLarge" style={styles.greeting}>
                {getGreeting()},
              </Text>
              <Text variant="headlineMedium" style={styles.userName}>
                {user.nombre}
              </Text>
              <View style={styles.userBadge}>
                <Icon source="shield-check" size={16} color="#2E7D32" />
                <Text variant="bodyMedium" style={styles.verifiedText}>
                  Estudiante Verificado
                </Text>
              </View>
            </View>
          </View>
          
          <Button
            mode="outlined"
            onPress={handleLogout}
            icon="logout"
            style={styles.logoutButton}
            labelStyle={styles.logoutButtonText}
            contentStyle={styles.logoutButtonContent}
          >
            Salir
          </Button>
        </View>
      </Surface>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Perfil Card */}
        <Card style={styles.profileCard}>
          <Card.Content style={styles.profileContent}>
            <View style={styles.profileHeader}>
              <Text variant="headlineSmall" style={styles.profileTitle}>
                Tu Perfil
              </Text>
              <TouchableRipple style={styles.editButton}>
                <Icon source="pencil" size={20} color="#2E7D32" />
              </TouchableRipple>
            </View>
            
            <View style={styles.profileGrid}>
              <View style={styles.profileItem}>
                <Icon source="school" size={20} color="#2E7D32" />
                <View style={styles.profileItemContent}>
                  <Text variant="bodySmall" style={styles.profileLabel}>Programa</Text>
                  <Text variant="bodyLarge" style={styles.profileValue}>{user.programa}</Text>
                </View>
              </View>
              
              <View style={styles.profileItem}>
                <Icon source="book-open-variant" size={20} color="#2E7D32" />
                <View style={styles.profileItemContent}>
                  <Text variant="bodySmall" style={styles.profileLabel}>Semestre</Text>
                  <Chip mode="flat" style={styles.semesterChip} textStyle={styles.semesterChipText}>
                    {user.semestre}°
                  </Chip>
                </View>
              </View>
              
              <View style={styles.profileItem}>
                <Icon source="phone" size={20} color="#2E7D32" />
                <View style={styles.profileItemContent}>
                  <Text variant="bodySmall" style={styles.profileLabel}>Teléfono</Text>
                  <Text variant="bodyLarge" style={styles.profileValue}>{user.telefono}</Text>
                </View>
              </View>
              
              <View style={styles.profileItem}>
                <Icon source="calendar" size={20} color="#2E7D32" />
                <View style={styles.profileItemContent}>
                  <Text variant="bodySmall" style={styles.profileLabel}>Miembro desde</Text>
                  <Text variant="bodyLarge" style={styles.profileValue}>
                    {new Date(user.fechaRegistro).toLocaleDateString('es-CO', {
                      month: 'short',
                      year: 'numeric'
                    })}
                  </Text>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text variant="headlineSmall" style={styles.sectionTitle}>
            Acciones Rápidas
          </Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <TouchableRipple
                key={action.id}
                style={[styles.actionCard, { backgroundColor: action.backgroundColor }]}
                onPress={() => showSnackbar(`${action.title} - Próximamente`)}
              >
                <View style={styles.actionContent}>
                  <Icon source={action.icon} size={32} color={action.color} />
                  <Text variant="titleMedium" style={[styles.actionTitle, { color: action.color }]}>
                    {action.title}
                  </Text>
                  <Text variant="bodySmall" style={styles.actionSubtitle}>
                    {action.subtitle}
                  </Text>
                </View>
              </TouchableRipple>
            ))}
          </View>
        </View>

        {/* Estadísticas */}
        <Card style={styles.statsCard}>
          <Card.Content>
            <Text variant="headlineSmall" style={styles.cardTitle}>
              Tu Actividad
            </Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text variant="displaySmall" style={styles.statNumber}>0</Text>
                <Text variant="bodyMedium" style={styles.statLabel}>Viajes Compartidos</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text variant="displaySmall" style={styles.statNumber}>0</Text>
                <Text variant="bodyMedium" style={styles.statLabel}>Compañeros de Viaje</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text variant="displaySmall" style={styles.statNumber}>$0</Text>
                <Text variant="bodyMedium" style={styles.statLabel}>Dinero Ahorrado</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* About UTCH Chompi */}
        <Card style={styles.aboutCard}>
          <Card.Content>
            <View style={styles.aboutHeader}>
              <Avatar.Icon size={48} icon="car-multiple" style={styles.aboutIcon} />
              <Text variant="headlineSmall" style={styles.cardTitle}>
                UTCH Chompi
              </Text>
            </View>
            
            <Text variant="bodyLarge" style={styles.aboutDescription}>
              La plataforma oficial de carpooling de la Universidad Tecnológica del Chocó. 
              Conectamos estudiantes para compartir viajes de forma segura y económica.
            </Text>
            
            <Divider style={styles.aboutDivider} />
            
            <View style={styles.featuresContainer}>
              {[
                { icon: 'shield-check', text: 'Solo estudiantes verificados' },
                { icon: 'cash', text: 'Ahorra en transporte' },
                { icon: 'earth', text: 'Reduce tu huella de carbono' },
                { icon: 'account-group', text: 'Conoce nuevos compañeros' },
              ].map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Icon source={feature.icon} size={18} color="#2E7D32" />
                  <Text variant="bodyMedium" style={styles.featureText}>{feature.text}</Text>
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
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
    paddingTop: 40,
    paddingBottom: 32,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    elevation: 8,
  },
  headerContent: {
    marginTop: 20,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    backgroundColor: '#2E7D32',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  userName: {
    color: 'white',
    fontWeight: '700',
    marginBottom: 8,
  },
  userBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  verifiedText: {
    color: 'white',
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '500',
  },
  logoutButton: {
    borderColor: 'rgba(255,255,255,0.3)',
    borderWidth: 1,
    borderRadius: 12,
    alignSelf: 'flex-end',
  },
  logoutButtonText: {
    color: 'white',
  },
  logoutButtonContent: {
    paddingVertical: 4,
  },
  scrollContent: {
    flex: 1,
    marginTop: -16,
  },
  profileCard: {
    margin: 20,
    elevation: 6,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  profileContent: {
    padding: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileTitle: {
    color: '#0D4A2B',
    fontWeight: '700',
  },
  editButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#E8F5E8',
  },
  profileGrid: {
    gap: 16,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  profileItemContent: {
    marginLeft: 12,
    flex: 1,
  },
  profileLabel: {
    color: '#666',
    marginBottom: 2,
  },
  profileValue: {
    color: '#0D4A2B',
    fontWeight: '600',
  },
  semesterChip: {
    backgroundColor: '#E8F5E8',
    alignSelf: 'flex-start',
  },
  semesterChipText: {
    color: '#2E7D32',
    fontWeight: '600',
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#0D4A2B',
    fontWeight: '700',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionCard: {
    width: '48%',
    borderRadius: 16,
    elevation: 4,
  },
  actionContent: {
    padding: 20,
    alignItems: 'center',
  },
  actionTitle: {
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  actionSubtitle: {
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  statsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 6,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  cardTitle: {
    color: '#0D4A2B',
    fontWeight: '700',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    color: '#2E7D32',
    fontWeight: '700',
    marginBottom: 8,
  },
  statLabel: {
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
  },
  aboutCard: {
    marginHorizontal: 20,
    marginBottom: 40,
    elevation: 6,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  aboutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  aboutIcon: {
    backgroundColor: '#E8F5E8',
    marginRight: 12,
  },
  aboutDescription: {
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  aboutDivider: {
    backgroundColor: '#E0E0E0',
    marginBottom: 20,
  },
  featuresContainer: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
});