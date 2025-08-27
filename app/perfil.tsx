import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
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
  ProgressBar,
  Badge,
} from 'react-native-paper';

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

  const [userProfile, setUserProfile] = useState({
    name: 'Juan Carlos Pérez',
    email: 'juan.perez@utch.edu.co',
    phone: '+57 314 555 0123',
    program: 'Ingeniería de Sistemas',
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

  const handleSaveProfile = () => {
    setEditMode(false);
    showSnackbar('Perfil actualizado exitosamente');
  };

  const addLocation = () => {
    showSnackbar('Función para agregar ubicación');
  };

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.headerSurface}>
        <View style={styles.headerRow}>
          <IconButton
            icon="arrow-left"
            iconColor="white"
            size={24}
            onPress={onBack}
          />
          <View style={styles.headerContent}>
            <Avatar.Image
              size={70}
              source={{ uri: 'https://via.placeholder.com/150' }}
              style={styles.avatar}
            />
            <Text variant="headlineSmall" style={styles.userName}>
              {userProfile.name}
            </Text>
            <View style={styles.ratingContainer}>
              <IconButton icon="star" size={16} iconColor="#FFD700" style={styles.starIcon} />
              <Text variant="bodyMedium" style={styles.rating}>
                {userProfile.rating} ({userProfile.completedTrips} viajes)
              </Text>
            </View>
          </View>
          <IconButton
            icon={editMode ? "check" : "pencil"}
            iconColor="white"
            size={24}
            onPress={editMode ? handleSaveProfile : () => setEditMode(true)}
          />
        </View>
      </Surface>

      {/* Estadísticas */}
      <Card style={styles.statsCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Tu impacto
          </Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <IconButton icon="currency-usd" size={24} iconColor="#4CAF50" />
              <Text variant="bodySmall" style={styles.statLabel}>Dinero ahorrado</Text>
              <Text variant="titleMedium" style={styles.statValue}>
                ${userProfile.savedMoney.toLocaleString()}
              </Text>
            </View>
            <View style={styles.statItem}>
              <IconButton icon="leaf" size={24} iconColor="#8BC34A" />
              <Text variant="bodySmall" style={styles.statLabel}>CO2 reducido</Text>
              <Text variant="titleMedium" style={styles.statValue}>
                {userProfile.co2Reduced} kg
              </Text>
            </View>
            <View style={styles.statItem}>
              <IconButton icon="car-multiple" size={24} iconColor="#FF9800" />
              <Text variant="bodySmall" style={styles.statLabel}>Viajes completados</Text>
              <Text variant="titleMedium" style={styles.statValue}>
                {userProfile.completedTrips}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Información Personal */}
      <Card style={styles.formCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
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
          />

          <TextInput
            label="Correo electrónico"
            value={userProfile.email}
            mode="outlined"
            style={styles.input}
            disabled={true}
            right={<TextInput.Icon icon="email" />}
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
              />
            </View>
            <View style={styles.halfWidth}>
              <TextInput
                label="Semestre"
                value={userProfile.semester}
                mode="outlined"
                style={styles.input}
                disabled={true}
                right={<TextInput.Icon icon="calendar" />}
              />
            </View>
          </View>

          <TextInput
            label="Carnet"
            value={userProfile.carnet}
            mode="outlined"
            style={styles.input}
            disabled={true}
            right={<TextInput.Icon icon="card-account-details" />}
          />
        </Card.Content>
      </Card>

      {/* Horarios de Clase */}
      <Card style={styles.formCard}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium" style={styles.cardTitle}>
              Horarios de Clase
            </Text>
            <IconButton
              icon="plus"
              size={20}
              onPress={() => showSnackbar('Agregar horario')}
            />
          </View>
          
          {classSchedule.map((schedule, index) => (
            <List.Item
              key={index}
              title={schedule.subject}
              description={`${schedule.day} - ${schedule.time}`}
              left={() => <List.Icon icon="clock" />}
              right={() => editMode && <IconButton icon="pencil" size={16} />}
              style={styles.scheduleItem}
            />
          ))}
        </Card.Content>
      </Card>

      {/* Ubicaciones Guardadas */}
      <Card style={styles.formCard}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium" style={styles.cardTitle}>
              Ubicaciones Guardadas
            </Text>
            <IconButton
              icon="plus"
              size={20}
              onPress={addLocation}
            />
          </View>
          
          {frequentLocations.map((location) => (
            <List.Item
              key={location.id}
              title={location.name}
              description={location.address}
              left={() => <List.Icon icon={location.icon} />}
              right={() => editMode && <IconButton icon="pencil" size={16} />}
              style={styles.locationItem}
            />
          ))}
        </Card.Content>
      </Card>

      {/* Configuraciones */}
      <Card style={styles.formCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Configuraciones
          </Text>

          <List.Item
            title="Notificaciones"
            description="Recibir alertas de viajes y coincidencias"
            left={() => <List.Icon icon="bell" />}
            right={() => (
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
              />
            )}
          />
          <Divider />

          <List.Item
            title="Ubicación"
            description="Permitir acceso a la ubicación"
            left={() => <List.Icon icon="map-marker" />}
            right={() => (
              <Switch
                value={locationEnabled}
                onValueChange={setLocationEnabled}
              />
            )}
          />
          <Divider />

          <List.Item
            title="Historial de Viajes"
            description="Ver todos tus viajes anteriores"
            left={() => <List.Icon icon="history" />}
            right={() => <List.Icon icon="chevron-right" />}
            onPress={() => showSnackbar('Abrir historial')}
          />
          <Divider />

          <List.Item
            title="Ayuda y Soporte"
            description="Contactar soporte técnico"
            left={() => <List.Icon icon="help-circle" />}
            right={() => <List.Icon icon="chevron-right" />}
            onPress={() => showSnackbar('Contactar soporte')}
          />
        </Card.Content>
      </Card>

      <View style={styles.footer}>
        <Button
          mode="outlined"
          onPress={() => showSnackbar('Cerrando sesión...')}
          icon="logout"
          style={styles.logoutButton}
        >
          Cerrar Sesión
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7FF',
  },
  headerSurface: {
    backgroundColor: '#1B4332',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  avatar: {
    marginBottom: 10,
    borderWidth: 3,
    borderColor: 'white',
  },
  userName: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  starIcon: {
    margin: 0,
    padding: 0,
  },
  rating: {
    color: '#E8F5E8',
  },
  statsCard: {
    margin: 20,
    marginBottom: 15,
    elevation: 4,
  },
  cardTitle: {
    color: '#1B4332',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    textAlign: 'center',
    color: '#666',
    marginTop: 5,
  },
  statValue: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1B4332',
    marginTop: 2,
  },
  formCard: {
    margin: 20,
    marginTop: 0,
    marginBottom: 15,
    elevation: 4,
  },
  input: {
    marginBottom: 15,
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
    marginBottom: 10,
  },
  scheduleItem: {
    paddingVertical: 2,
  },
  locationItem: {
    paddingVertical: 2,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  logoutButton: {
    borderColor: '#B00020',
    color: '#B00020',
  },
});