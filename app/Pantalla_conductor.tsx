import React, { useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, TouchableOpacity, Alert, StatusBar } from 'react-native';
import {
  Surface,
  Text,
  Card,
  Avatar,
  Badge,
  Button,
  FAB,
  TouchableRipple,
  Chip,
  ProgressBar ,
  Provider as PaperProvider,
  DefaultTheme,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Tema personalizado consistente
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

interface User {
  id: string;
  nombre: string;
  apellido: string;
  programa: string;
  avatar?: string;
  isDriver: boolean;
  isPassenger: boolean;
}

interface DriverDashboardProps {
  user: User;
  searchQuery: string;
  showSnackbar?: (message: string) => void;
  onNavigateToCreateTrip?: () => void;
  onNavigateToChat?: () => void;
}

export default function DriverDashboard({ 
  user, 
  searchQuery,
  showSnackbar = (msg: string) => console.log(msg),
  onNavigateToCreateTrip = () => {},
  onNavigateToChat = () => {}
}: DriverDashboardProps) {
  const [refreshing, setRefreshing] = useState(false);

  const myTrips = [
    {
      id: 'trip1',
      origin: 'Centro de Quibdó',
      destination: 'UTCH Campus',
      departureTime: '07:30',
      availableSeats: 1,
      totalSeats: 4,
      price: 3000,
      distance: '8.5 km',
      estimatedDuration: '15 min',
      meetingPoint: 'Parque Centenario',
      status: 'active',
      passengers: [
        {
          id: 'pass1',
          nombre: 'María',
          apellido: 'González',
          programa: 'Derecho',
          telefono: '3001234567',
          rating: 4.7,
          status: 'confirmed'
        },
        {
          id: 'pass2',
          nombre: 'Pedro',
          apellido: 'Martínez',
          programa: 'Ingeniería Civil',
          telefono: '3007654321',
          rating: 4.5,
          status: 'confirmed'
        }
      ],
      requests: [
        {
          id: 'req1',
          passengerId: 'newpass1',
          passengerName: 'Ana Lucía Perea',
          passengerProgram: 'Administración',
          passengerRating: 4.8,
          requestTime: '2025-01-15T10:30:00Z',
          message: 'Hola! Me queda muy bien el horario y el punto de encuentro.',
          status: 'pending'
        }
      ],
      createdAt: '2025-01-14T15:00:00Z'
    },
    {
      id: 'trip2',
      origin: 'UTCH Campus',
      destination: 'Terminal de Transporte',
      departureTime: '17:45',
      availableSeats: 3,
      totalSeats: 4,
      price: 2500,
      distance: '6.2 km',
      estimatedDuration: '12 min',
      meetingPoint: 'Portería Principal UTCH',
      status: 'active',
      passengers: [
        {
          id: 'pass3',
          nombre: 'Luis',
          apellido: 'Rodríguez',
          programa: 'Trabajo Social',
          telefono: '3009876543',
          rating: 4.9,
          status: 'confirmed'
        }
      ],
      requests: [],
      createdAt: '2025-01-13T12:00:00Z'
    }
  ];

  // Funciones con funcionalidad simulada
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#2E7D32';
      case 'full': return '#F39C12';
      case 'completed': return '#1B5E96';
      case 'cancelled': return '#E74C3C';
      default: return '#7F8C8D';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'full': return 'Completo';
      case 'completed': return 'Completado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      showSnackbar('Dashboard actualizado');
    }, 1500);
  };

  const handleAcceptRequest = (requestId: string, passengerName: string) => {
    Alert.alert(
      "Aceptar Solicitud",
      `¿Confirmas que quieres aceptar la solicitud de ${passengerName}?`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Aceptar",
          onPress: () => {
            showSnackbar(`Solicitud de ${passengerName} aceptada`);
          }
        }
      ]
    );
  };

  const handleDeclineRequest = (requestId: string, passengerName: string) => {
    Alert.alert(
      "Rechazar Solicitud",
      `¿Estás seguro de rechazar la solicitud de ${passengerName}?`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Rechazar",
          style: "destructive",
          onPress: () => {
            showSnackbar(`Solicitud de ${passengerName} rechazada`);
          }
        }
      ]
    );
  };

  const handleContactPassenger = (passengerName: string, telefono: string) => {
    Alert.alert(
      "Contactar Pasajero",
      `¿Cómo deseas contactar a ${passengerName}?`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Chat",
          onPress: () => {
            onNavigateToChat();
            showSnackbar(`Iniciando chat con ${passengerName}`);
          }
        },
        {
          text: "Llamar",
          onPress: () => {
            showSnackbar(`Llamando a ${passengerName} (${telefono})...`);
          }
        }
      ]
    );
  };

  const handleManageTrip = (tripId: string) => {
    Alert.alert(
      "Gestionar Viaje",
      "¿Qué acción deseas realizar?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Editar viaje",
          onPress: () => {
            showSnackbar('Editando detalles del viaje...');
          }
        },
        {
          text: "Finalizar viaje",
          onPress: () => {
            showSnackbar('Viaje finalizado exitosamente');
          }
        },
        {
          text: "Cancelar viaje",
          style: "destructive",
          onPress: () => {
            showSnackbar('Viaje cancelado');
          }
        }
      ]
    );
  };

  const handleViewDetails = (tripId: string) => {
    showSnackbar('Mostrando detalles completos del viaje');
  };

  const renderTripCard = ({ item: trip }) => (
    <Card style={styles.tripCard} key={trip.id}>
      <View style={styles.cardHeader}>
        <View style={styles.tripHeaderInfo}>
          <MaterialIcons name="directions-car" size={24} color="#1B5E96" />
          <Text variant="titleMedium" style={styles.tripTitle}>Mi Viaje</Text>
        </View>
        <Badge 
          style={[styles.statusBadge, { backgroundColor: getStatusColor(trip.status) }]}
        >
          {getStatusText(trip.status)}
        </Badge>
      </View>

      <Card.Content style={styles.cardContent}>
        <View style={styles.routeContainer}>
          <MaterialIcons name="alt-route" size={24} color="#1B5E96" />
          <View style={styles.routeDetails}>
            <View style={styles.routePoint}>
              <View style={[styles.routeIcon, styles.originIcon]}>
                <MaterialIcons name="radio-button-checked" size={12} color="white" />
              </View>
              <Text variant="bodyMedium" style={styles.routeText} numberOfLines={2}>
                {trip.origin}
              </Text>
            </View>
            
            <View style={styles.routeLine}>
              <View style={styles.dottedLine} />
              <MaterialIcons name="arrow-downward" size={16} color="#7F8C8D" />
            </View>
            
            <View style={styles.routePoint}>
              <View style={[styles.routeIcon, styles.destinationIcon]}>
                <MaterialIcons name="location-on" size={14} color="white" />
              </View>
              <Text variant="bodyMedium" style={styles.routeText} numberOfLines={2}>
                {trip.destination}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.tripMetrics}>
          <View style={styles.metricItem}>
            <MaterialIcons name="schedule" size={18} color="#1B5E96" />
            <Text variant="bodySmall" style={styles.metricText}>{trip.departureTime}</Text>
          </View>
          
          <View style={styles.metricItem}>
            <MaterialIcons name="people" size={18} color="#1B5E96" />
            <Text variant="bodySmall" style={styles.metricText}>
              {trip.passengers.length}/{trip.totalSeats}
            </Text>
          </View>
          
          
        </View>

        <View style={styles.progressContainer}>
          <Text variant="bodySmall" style={styles.progressLabel}>
            Ocupación del vehículo
          </Text>
          <ProgressBar  
            progress={trip.passengers.length / trip.totalSeats} 
            color="#2E7D32"
            style={styles.progressBar}
          />
          <Text variant="bodySmall" style={styles.progressText}>
            {Math.round((trip.passengers.length / trip.totalSeats) * 100)}% ocupado
          </Text>
        </View>

        <Surface style={styles.meetingContainer}>
          <MaterialIcons name="location-on" size={16} color="#1B5E96" />
          <Text variant="bodySmall" style={styles.meetingText}>
            {trip.meetingPoint}
          </Text>
        </Surface>

        {trip.requests.length > 0 && (
          <View style={styles.requestsSection}>
            <View style={styles.sectionHeader}>
              <Text variant="titleSmall" style={styles.sectionTitle}>
                Solicitudes Pendientes
              </Text>
              <Badge style={styles.countBadge}>{trip.requests.length}</Badge>
            </View>
            
            {trip.requests.map((request) => (
              <TouchableRipple key={request.id} style={styles.requestItem}>
                <View style={styles.requestContent}>
                  <Avatar.Text 
                    size={36} 
                    label={request.passengerName.split(' ').map(n => n[0]).join('')}
                    style={styles.requestAvatar}
                  />
                  <View style={styles.requestInfo}>
                    <Text variant="bodyMedium" style={styles.requestName}>
                      {request.passengerName}
                    </Text>
                    <Text variant="bodySmall" style={styles.requestProgram}>
                      {request.passengerProgram}
                    </Text>
                    <View style={styles.ratingContainer}>
                      <MaterialIcons name="star" size={12} color="#FFD700" />
                      <Text variant="bodySmall" style={styles.ratingText}>
                        {request.passengerRating}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.requestActions}>
                    <TouchableOpacity 
                      style={styles.acceptButton}
                      onPress={() => handleAcceptRequest(request.id, request.passengerName)}
                    >
                      <MaterialIcons name="check" size={16} color="#FFFFFF" />
                      <Text style={styles.actionButtonText}>Aceptar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.declineButton}
                      onPress={() => handleDeclineRequest(request.id, request.passengerName)}
                    >
                      <MaterialIcons name="close" size={16} color="#E74C3C" />
                      <Text style={styles.declineButtonText}>Rechazar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableRipple>
            ))}
          </View>
        )}

        {trip.passengers.length > 0 && (
          <View style={styles.passengersSection}>
            <View style={styles.sectionHeader}>
              <Text variant="titleSmall" style={styles.sectionTitle}>
                Pasajeros Confirmados
              </Text>
              <Badge style={styles.countBadge}>{trip.passengers.length}</Badge>
            </View>
            
            {trip.passengers.map((passenger) => (
              <View key={passenger.id} style={styles.passengerItem}>
                <Avatar.Text 
                  size={36} 
                  label={`${passenger.nombre[0]}${passenger.apellido[0]}`}
                  style={styles.passengerAvatar}
                />
                <View style={styles.passengerInfo}>
                  <Text variant="bodyMedium" style={styles.passengerName}>
                    {passenger.nombre} {passenger.apellido}
                  </Text>
                  <Text variant="bodySmall" style={styles.passengerProgram}>
                    {passenger.programa}
                  </Text>
                  <View style={styles.ratingContainer}>
                    <MaterialIcons name="star" size={12} color="#FFD700" />
                    <Text variant="bodySmall" style={styles.ratingText}>
                      {passenger.rating}
                    </Text>
                  </View>
                </View>
                <View style={styles.passengerActions}>
                  <TouchableOpacity 
                    style={styles.actionIcon}
                    onPress={() => handleContactPassenger(passenger.nombre, passenger.telefono)}
                  >
                    <MaterialIcons name="phone" size={16} color="#1B5E96" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.actionIcon}
                    onPress={() => {
                      onNavigateToChat();
                      showSnackbar(`Chat con ${passenger.nombre}`);
                    }}
                  >
                    <MaterialIcons name="chat" size={16} color="#1B5E96" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => handleViewDetails(trip.id)}
          >
            <MaterialIcons name="visibility" size={16} color="#1B5E96" />
            <Text style={styles.secondaryButtonText}>Ver Detalles</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => handleManageTrip(trip.id)}
          >
            <MaterialIcons name="settings" size={16} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Gestionar</Text>
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  );

  const activeTrips = myTrips.filter(t => t.status === 'active').length;
  const totalRequests = myTrips.reduce((sum, trip) => sum + trip.requests.length, 0);
  const totalPassengers = myTrips.reduce((sum, trip) => sum + trip.passengers.length, 0);

  return (
    <PaperProvider theme={customTheme}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <StatusBar backgroundColor="#1B5E96" barStyle="light-content" />
        
        {/* Header con gradiente */}
        <LinearGradient
          colors={['#1B5E96', '#2980B9']}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerIconContainer}>
              <MaterialIcons name="drive-eta" size={32} color="#FFFFFF" />
            </View>
            <Text variant="headlineMedium" style={styles.headerTitle}>
              Panel de Conductor
            </Text>
            <Text variant="bodyMedium" style={styles.headerSubtitle}>
              Gestiona tus viajes y pasajeros
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.statsGrid}>
          <Surface style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <MaterialIcons name="directions-car" size={24} color="#1B5E96" />
            </View>
            <Text variant="headlineMedium" style={styles.statNumber}>
              {activeTrips}
            </Text>
            <Text variant="bodySmall" style={styles.statLabel}>
              Viajes Activos
            </Text>
          </Surface>

          <Surface style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <MaterialIcons name="pending-actions" size={24} color="#F39C12" />
            </View>
            <Text variant="headlineMedium" style={styles.statNumber}>
              {totalRequests}
            </Text>
            <Text variant="bodySmall" style={styles.statLabel}>
              Solicitudes
            </Text>
          </Surface>

          <Surface style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <MaterialIcons name="group" size={24} color="#2E7D32" />
            </View>
            <Text variant="headlineMedium" style={styles.statNumber}>
              {totalPassengers}
            </Text>
            <Text variant="bodySmall" style={styles.statLabel}>
              Pasajeros
            </Text>
          </Surface>
        </View>

        <FlatList
          data={myTrips}
          renderItem={renderTripCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.tripsList}
          scrollEnabled={false}
        />

        {/* FAB para crear viaje */}
        <FAB
          icon={() => <MaterialIcons name="add" size={24} color="#FFFFFF" />}
          style={styles.fab}
          onPress={onNavigateToCreateTrip}
          label="Nuevo Viaje"
          color="#FFFFFF"
        />
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
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  headerContent: {
    alignItems: 'center',
    paddingTop: 20,
  },
  headerIconContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 12,
    borderRadius: 24,
    marginBottom: 12,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: -20,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F1F3F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 4,
  },
  statLabel: {
    color: '#7F8C8D',
    textAlign: 'center',
    fontSize: 12,
  },
  tripsList: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  tripCard: {
    marginBottom: 16,
    borderRadius: 20,
    backgroundColor: 'white',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  tripHeaderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tripTitle: {
    fontWeight: '700',
    color: '#2C3E50',
  },
  statusBadge: {
    borderRadius: 16,
  },
  cardContent: {
    paddingTop: 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8F0',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  routeDetails: {
    flex: 1,
    marginLeft: 12,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  originIcon: {
    backgroundColor: '#2E7D32',
  },
  destinationIcon: {
    backgroundColor: '#E74C3C',
  },
  routeText: {
    flex: 1,
    color: '#2C3E50',
    fontWeight: '600',
  },
  routeLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 8,
  },
  dottedLine: {
    width: 2,
    height: 20,
    backgroundColor: '#BDC3C7',
    marginRight: 8,
  },
  tripMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metricText: {
    color: '#2C3E50',
    fontWeight: '600',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressLabel: {
    color: '#7F8C8D',
    marginBottom: 8,
    fontSize: 12,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  progressText: {
    color: '#7F8C8D',
    textAlign: 'right',
    fontSize: 12,
  },
  meetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F4FD',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    gap: 8,
  },
  meetingText: {
    flex: 1,
    color: '#2C3E50',
    fontWeight: '600',
    fontSize: 13,
  },
  requestsSection: {
    marginBottom: 16,
  },
  passengersSection: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#2C3E50',
    fontWeight: '700',
  },
  countBadge: {
    backgroundColor: '#1B5E96',
  },
  requestItem: {
    backgroundColor: '#FFF8DC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    elevation: 2,
  },
  requestContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requestAvatar: {
    backgroundColor: '#F39C12',
  },
  requestInfo: {
    flex: 1,
    marginLeft: 12,
  },
  requestName: {
    fontWeight: '700',
    color: '#2C3E50',
  },
  requestProgram: {
    color: '#7F8C8D',
    marginTop: 2,
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  ratingText: {
    color: '#7F8C8D',
    fontWeight: '600',
    fontSize: 12,
  },
  requestActions: {
    gap: 8,
  },
  acceptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E7D32',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  declineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E74C3C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  declineButtonText: {
    color: '#E74C3C',
    fontSize: 12,
    fontWeight: '600',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  passengerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    elevation: 2,
  },
  passengerAvatar: {
    backgroundColor: '#1B5E96',
  },
  passengerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  passengerName: {
    fontWeight: '700',
    color: '#2C3E50',
  },
  passengerProgram: {
    color: '#7F8C8D',
    marginTop: 2,
    fontSize: 12,
  },
  passengerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1B5E96',
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 4,
    gap: 6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#1B5E96',
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 2,
    gap: 6,
  },
  secondaryButtonText: {
    color: '#1B5E96',
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: '#2E7D32',
    borderRadius: 16,
    elevation: 8,
  },
});