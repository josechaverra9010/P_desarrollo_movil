import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {
  Surface,
  TextInput,
  Button,
  Text,
  Card,
  Avatar,
  IconButton,
  List,
  Divider,
  Switch,
  Chip,
  Badge,
  Provider as PaperProvider,
  DefaultTheme,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Tema personalizado consistente con chat.tsx
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

interface ProfileScreenProps {
  onBack: () => void;
  showSnackbar: (message: string) => void;
}

export default function ProfileScreen({ 
  onBack, 
  showSnackbar 
}: ProfileScreenProps) {
  const [editMode, setEditMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [userProfile, setUserProfile] = useState({
    name: 'Juan Carlos Pérez',
    email: 'juan.perez@utch.edu.co',
    phone: '+57 314 555 0123',
    program: 'Ingeniería de Telecomunicaciones e informatica',
    semester: '8vo Semestre',
    carnet: '2020-101-234',
    rating: 4.7,
    completedTrips: 42,
    savedMoney: 126000,
    co2Reduced: 84.5
  });

  const frequentLocations = [
    { id: '1', name: 'Casa', address: 'Barrio Kennedy, Calle 25 #15-30', icon: 'home' },
    { id: '2', name: 'Universidad UTCH', address: 'Carrera 1 #25-80', icon: 'school' },
    { id: '3', name: 'Centro Comercial', address: 'Centro, Carrera 5 #20-15', icon: 'store' }
  ];

  const classSchedule = [
    { day: 'Lunes', time: '7:00 AM - 11:00 AM', subject: 'Programación Avanzada' },
    { day: 'Martes', time: '2:00 PM - 6:00 PM', subject: 'Base de Datos' },
    { day: 'Miércoles', time: '7:00 AM - 11:00 AM', subject: 'Redes de Computadores' },
    { day: 'Jueves', time: '2:00 PM - 6:00 PM', subject: 'Ingeniería de Software' },
    { day: 'Viernes', time: '7:00 AM - 9:00 AM', subject: 'Ética Profesional' }
  ];

  const handleSaveProfile = async () => {
    setIsLoading(true);
    // Simular llamada a API
    setTimeout(() => {
      setEditMode(false);
      setIsLoading(false);
      showSnackbar('✅ Perfil actualizado exitosamente');
    }, 1500);
  };

  const addLocation = () => {
    Alert.alert(
      "Agregar Ubicación",
      "¿Deseas agregar una nueva ubicación frecuente?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Agregar",
          onPress: () => {
            showSnackbar('📍 Función para agregar ubicación habilitada');
          }
        }
      ]
    );
  };

  const addSchedule = () => {
    Alert.alert(
      "Agregar Horario",
      "¿Deseas agregar un nuevo horario de clase?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Agregar",
          onPress: () => {
            showSnackbar('📅 Función para agregar horario habilitada');
          }
        }
      ]
    );
  };

  const handleHistoryPress = () => {
    Alert.alert(
      "Historial de Viajes",
      "Ver todos tus viajes anteriores y estadísticas detalladas.",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Ver Historial",
          onPress: () => {
            showSnackbar('📊 Abriendo historial de viajes...');
          }
        }
      ]
    );
  };

  const handleSupportPress = () => {
    Alert.alert(
      "Ayuda y Soporte",
      "¿Cómo podemos ayudarte?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Chat en vivo",
          onPress: () => {
            showSnackbar('💬 Conectando con soporte...');
          }
        },
        {
          text: "Enviar email",
          onPress: () => {
            showSnackbar('📧 Abriendo cliente de email...');
          }
        }
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que deseas cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Cerrar Sesión",
          style: "destructive",
          onPress: () => {
            showSnackbar('👋 Cerrando sesión...');
            // Aquí podrías navegar a la pantalla de login
            setTimeout(() => {
              onBack(); // Por ahora solo regresa
            }, 1000);
          }
        }
      ]
    );
  };

  const editSchedule = (index: number) => {
    const schedule = classSchedule[index];
    Alert.alert(
      "Editar Horario",
      `Modificar: ${schedule.subject}`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Editar",
          onPress: () => {
            showSnackbar('✏️ Editando horario...');
          }
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            showSnackbar('🗑️ Horario eliminado');
          }
        }
      ]
    );
  };

  const editLocation = (locationId: string) => {
    const location = frequentLocations.find(loc => loc.id === locationId);
    Alert.alert(
      "Editar Ubicación",
      `Modificar: ${location?.name}`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Editar",
          onPress: () => {
            showSnackbar('📍 Editando ubicación...');
          }
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            showSnackbar('🗑️ Ubicación eliminada');
          }
        }
      ]
    );
  };

  return (
    <PaperProvider theme={customTheme}>
      <View style={styles.container}>
        {/* Header con gradiente (mismo estilo que chat.tsx) */}
        <LinearGradient
          colors={['#1B5E96', '#2980B9']}
          style={styles.headerGradient}
        >
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <View style={styles.headerContent}>
              <Avatar.Image
                size={80}
                source={{ uri: 'https://via.placeholder.com/150' }}
                style={styles.avatar}
              />
              <Text variant="headlineMedium" style={styles.userName}>
                {userProfile.name}
              </Text>
              <View style={styles.ratingContainer}>
                <MaterialIcons name="star" size={18} color="#FFD700" />
                <Text variant="bodyMedium" style={styles.rating}>
                  {userProfile.rating} ({userProfile.completedTrips} viajes)
                </Text>
              </View>
            </View>
            
            <TouchableOpacity 
              onPress={editMode ? handleSaveProfile : () => setEditMode(true)} 
              style={styles.backButton}
              disabled={isLoading}
            >
              <MaterialIcons 
                name={editMode ? "check" : "edit"} 
                size={24} 
                color="#FFFFFF" 
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Estadísticas */}
          <Card style={styles.statsCard}>
            <Card.Content style={styles.statsContent}>
              <Text variant="titleLarge" style={styles.cardTitle}>
                Tu impacto 🌱
              </Text>
              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <View style={[styles.statIconContainer, { backgroundColor: '#27AE60' }]}>
                    <MaterialIcons name="attach-money" size={28} color="#FFFFFF" />
                  </View>
                  <Text variant="bodySmall" style={styles.statLabel}>Dinero ahorrado</Text>
                  <Text variant="titleLarge" style={[styles.statValue, { color: '#27AE60' }]}>
                    ${userProfile.savedMoney.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <View style={[styles.statIconContainer, { backgroundColor: '#2ECC71' }]}>
                    <MaterialIcons name="eco" size={28} color="#FFFFFF" />
                  </View>
                  <Text variant="bodySmall" style={styles.statLabel}>CO2 reducido</Text>
                  <Text variant="titleLarge" style={[styles.statValue, { color: '#2ECC71' }]}>
                    {userProfile.co2Reduced} kg
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <View style={[styles.statIconContainer, { backgroundColor: '#F39C12' }]}>
                    <MaterialIcons name="directions-car" size={28} color="#FFFFFF" />
                  </View>
                  <Text variant="bodySmall" style={styles.statLabel}>Viajes completados</Text>
                  <Text variant="titleLarge" style={[styles.statValue, { color: '#F39C12' }]}>
                    {userProfile.completedTrips}
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Información Personal */}
          <Card style={styles.formCard}>
            <Card.Content style={styles.cardContent}>
              <Text variant="titleLarge" style={styles.cardTitle}>
                Información Personal
              </Text>

              <TextInput
                label="Nombre completo"
                value={userProfile.name}
                onChangeText={(text) => setUserProfile({ ...userProfile, name: text })}
                mode="outlined"
                style={styles.input}
                disabled={!editMode}
                right={<TextInput.Icon icon="account" />}
                outlineColor="#BDC3C7"
                activeOutlineColor="#1B5E96"
              />

              <TextInput
                label="Correo electrónico"
                value={userProfile.email}
                mode="outlined"
                style={styles.input}
                disabled={true}
                right={<TextInput.Icon icon="email" />}
                outlineColor="#BDC3C7"
                activeOutlineColor="#1B5E96"
              />

              <TextInput
                label="Teléfono"
                value={userProfile.phone}
                onChangeText={(text) => setUserProfile({ ...userProfile, phone: text })}
                mode="outlined"
                style={styles.input}
                disabled={!editMode}
                keyboardType="phone-pad"
                right={<TextInput.Icon icon="phone" />}
                outlineColor="#BDC3C7"
                activeOutlineColor="#1B5E96"
              />

              <View style={styles.academicInfo}>
                <View style={styles.halfWidth}>
                  <TextInput
                    label="Programa"
                    value={userProfile.program}
                    mode="outlined"
                    style={styles.input}
                    disabled={true}
                    right={<TextInput.Icon icon="school" />}
                    outlineColor="#BDC3C7"
                    activeOutlineColor="#1B5E96"
                  />
                </View>
                <View style={styles.halfWidth}>
                  <TextInput
                    label="Semestre"
                    value={userProfile.semester}
                    mode="outlined"
                    style={styles.input}
                    disabled={true}
                    right={<TextInput.Icon icon="calendar-today" />}
                    outlineColor="#BDC3C7"
                    activeOutlineColor="#1B5E96"
                  />
                </View>
              </View>

              <TextInput
                label="Carnet"
                value={userProfile.carnet}
                mode="outlined"
                style={styles.input}
                disabled={true}
                right={<TextInput.Icon icon="badge" />}
                outlineColor="#BDC3C7"
                activeOutlineColor="#1B5E96"
              />
            </Card.Content>
          </Card>

          {/* Horarios de Clase */}
          <Card style={styles.formCard}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.sectionHeader}>
                <Text variant="titleLarge" style={styles.cardTitle}>
                  Horarios de Clase 📚
                </Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={addSchedule}
                >
                  <MaterialIcons name="add" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              
              {classSchedule.map((schedule, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.listItem}
                  onPress={() => editMode && editSchedule(index)}
                  disabled={!editMode}
                >
                  <View style={styles.listItemContent}>
                    <View style={[styles.listItemIcon, { backgroundColor: '#1B5E96' }]}>
                      <MaterialIcons name="schedule" size={20} color="#FFFFFF" />
                    </View>
                    <View style={styles.listItemText}>
                      <Text variant="titleMedium" style={styles.listItemTitle}>
                        {schedule.subject}
                      </Text>
                      <Text variant="bodyMedium" style={styles.listItemSubtitle}>
                        {schedule.day} - {schedule.time}
                      </Text>
                    </View>
                    {editMode && (
                      <MaterialIcons name="edit" size={20} color="#7F8C8D" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </Card.Content>
          </Card>

          {/* Ubicaciones Guardadas */}
          <Card style={styles.formCard}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.sectionHeader}>
                <Text variant="titleLarge" style={styles.cardTitle}>
                  Ubicaciones Guardadas 📍
                </Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={addLocation}
                >
                  <MaterialIcons name="add" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              
              {frequentLocations.map((location) => (
                <TouchableOpacity
                  key={location.id}
                  style={styles.listItem}
                  onPress={() => editMode && editLocation(location.id)}
                  disabled={!editMode}
                >
                  <View style={styles.listItemContent}>
                    <View style={[styles.listItemIcon, { backgroundColor: '#F39C12' }]}>
                      <MaterialIcons name={location.icon} size={20} color="#FFFFFF" />
                    </View>
                    <View style={styles.listItemText}>
                      <Text variant="titleMedium" style={styles.listItemTitle}>
                        {location.name}
                      </Text>
                      <Text variant="bodyMedium" style={styles.listItemSubtitle}>
                        {location.address}
                      </Text>
                    </View>
                    {editMode && (
                      <MaterialIcons name="edit" size={20} color="#7F8C8D" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </Card.Content>
          </Card>

          {/* Configuraciones */}
          <Card style={styles.formCard}>
            <Card.Content style={styles.cardContent}>
              <Text variant="titleLarge" style={styles.cardTitle}>
                Configuraciones ⚙️
              </Text>

              <View style={styles.settingItem}>
                <View style={styles.settingContent}>
                  <View style={[styles.settingIcon, { backgroundColor: '#E74C3C' }]}>
                    <MaterialIcons name="notifications" size={20} color="#FFFFFF" />
                  </View>
                  <View style={styles.settingText}>
                    <Text variant="titleMedium" style={styles.settingTitle}>
                      Notificaciones
                    </Text>
                    <Text variant="bodyMedium" style={styles.settingSubtitle}>
                      Recibir alertas de viajes y coincidencias
                    </Text>
                  </View>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={(value) => {
                    setNotificationsEnabled(value);
                    showSnackbar(value ? '🔔 Notificaciones activadas' : '🔕 Notificaciones desactivadas');
                  }}
                  thumbColor={notificationsEnabled ? '#1B5E96' : '#BDC3C7'}
                  trackColor={{ false: '#ECF0F1', true: '#AED6F1' }}
                />
              </View>

              <Divider style={styles.settingDivider} />

              <View style={styles.settingItem}>
                <View style={styles.settingContent}>
                  <View style={[styles.settingIcon, { backgroundColor: '#27AE60' }]}>
                    <MaterialIcons name="location-on" size={20} color="#FFFFFF" />
                  </View>
                  <View style={styles.settingText}>
                    <Text variant="titleMedium" style={styles.settingTitle}>
                      Ubicación
                    </Text>
                    <Text variant="bodyMedium" style={styles.settingSubtitle}>
                      Permitir acceso a la ubicación
                    </Text>
                  </View>
                </View>
                <Switch
                  value={locationEnabled}
                  onValueChange={(value) => {
                    setLocationEnabled(value);
                    showSnackbar(value ? '📍 Ubicación activada' : '📍 Ubicación desactivada');
                  }}
                  thumbColor={locationEnabled ? '#1B5E96' : '#BDC3C7'}
                  trackColor={{ false: '#ECF0F1', true: '#AED6F1' }}
                />
              </View>

              <Divider style={styles.settingDivider} />

              <TouchableOpacity style={styles.settingItem} onPress={handleHistoryPress}>
                <View style={styles.settingContent}>
                  <View style={[styles.settingIcon, { backgroundColor: '#9B59B6' }]}>
                    <MaterialIcons name="history" size={20} color="#FFFFFF" />
                  </View>
                  <View style={styles.settingText}>
                    <Text variant="titleMedium" style={styles.settingTitle}>
                      Historial de Viajes
                    </Text>
                    <Text variant="bodyMedium" style={styles.settingSubtitle}>
                      Ver todos tus viajes anteriores
                    </Text>
                  </View>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#7F8C8D" />
              </TouchableOpacity>

              <Divider style={styles.settingDivider} />

              <TouchableOpacity style={styles.settingItem} onPress={handleSupportPress}>
                <View style={styles.settingContent}>
                  <View style={[styles.settingIcon, { backgroundColor: '#3498DB' }]}>
                    <MaterialIcons name="help" size={20} color="#FFFFFF" />
                  </View>
                  <View style={styles.settingText}>
                    <Text variant="titleMedium" style={styles.settingTitle}>
                      Ayuda y Soporte
                    </Text>
                    <Text variant="bodyMedium" style={styles.settingSubtitle}>
                      Contactar soporte técnico
                    </Text>
                  </View>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#7F8C8D" />
              </TouchableOpacity>
            </Card.Content>
          </Card>

          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <MaterialIcons name="logout" size={20} color="#E74C3C" />
              <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerGradient: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  avatar: {
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    elevation: 4,
  },
  userName: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  rating: {
    color: '#FFFFFF',
    marginLeft: 4,
    fontWeight: '600',
  },
  scrollContainer: {
    flex: 1,
  },
  statsCard: {
    margin: 20,
    marginTop: -10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  statsContent: {
    padding: 20,
  },
  cardTitle: {
    color: '#2C3E50',
    fontWeight: '700',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    elevation: 4,
  },
  statLabel: {
    textAlign: 'center',
    color: '#7F8C8D',
    marginBottom: 8,
    fontSize: 12,
  },
  statValue: {
    textAlign: 'center',
    fontWeight: '700',
  },
  formCard: {
    margin: 20,
    marginTop: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  cardContent: {
    padding: 20,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  academicInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#1B5E96',
    padding: 8,
    borderRadius: 20,
    elevation: 4,
  },
  listItem: {
    marginBottom: 12,
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    elevation: 2,
  },
  listItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  listItemText: {
    flex: 1,
  },
  listItemTitle: {
    color: '#2C3E50',
    fontWeight: '600',
    marginBottom: 4,
  },
  listItemSubtitle: {
    color: '#7F8C8D',
    fontSize: 13,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    color: '#2C3E50',
    fontWeight: '600',
    marginBottom: 4,
  },
  settingSubtitle: {
    color: '#7F8C8D',
    fontSize: 13,
  },
  settingDivider: {
    backgroundColor: '#ECF0F1',
    marginVertical: 8,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E74C3C',
    elevation: 4,
  },
  logoutButtonText: {
    color: '#E74C3C',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
});