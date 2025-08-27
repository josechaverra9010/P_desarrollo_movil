import React from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import {
  Surface,
  Text,
  Card,
  Avatar,
  Badge,
  Button,
  Icon,
  TouchableRipple,
  Chip,
  LinearProgress,
} from 'react-native-paper';

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
}

export default function DriverDashboard({ user, searchQuery }: DriverDashboardProps) {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#28A745';
      case 'full': return '#FFC107';
      case 'completed': return '#17A2B8';
      case 'cancelled': return '#DC3545';
      default: return '#6C757D';
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

  const renderTripCard = ({ item: trip }) => (
    <Card style={styles.tripCard} key={trip.id}>
      <View style={styles.cardHeader}>
        <View style={styles.tripHeaderInfo}>
          <Icon source="car" size={24} color="#003366" />
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
          <View style={styles.routePoint}>
            <View style={[styles.routeIcon, styles.originIcon]}>
              <Icon source="circle" size={12} color="white" />
            </View>
            <Text variant="bodyMedium" style={styles.routeText} numberOfLines={2}>
              {trip.origin}
            </Text>
          </View>
          
          <View style={styles.routeLine}>
            <View style={styles.dottedLine} />
            <Icon source="arrow-right" size={16} color="#6C757D" />
          </View>
          
          <View style={styles.routePoint}>
            <View style={[styles.routeIcon, styles.destinationIcon]}>
              <Icon source="map-marker" size={14} color="white" />
            </View>
            <Text variant="bodyMedium" style={styles.routeText} numberOfLines={2}>
              {trip.destination}
            </Text>
          </View>
        </View>

        <View style={styles.tripMetrics}>
          <View style={styles.metricItem}>
            <Icon source="clock-outline" size={18} color="#003366" />
            <Text variant="bodySmall" style={styles.metricText}>{trip.departureTime}</Text>
          </View>
          
          <View style={styles.metricItem}>
            <Icon source="account-multiple" size={18} color="#003366" />
            <Text variant="bodySmall" style={styles.metricText}>
              {trip.passengers.length}/{trip.totalSeats}
            </Text>
          </View>
          
          <View style={styles.metricItem}>
            <Icon source="cash" size={18} color="#003366" />
            <Text variant="bodySmall" style={styles.metricText}>
              ${trip.price.toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <Text variant="bodySmall" style={styles.progressLabel}>
            Ocupación del vehículo
          </Text>
          <LinearProgress 
            progress={trip.passengers.length / trip.totalSeats} 
            color="#28A745"
            style={styles.progressBar}
          />
          <Text variant="bodySmall" style={styles.progressText}>
            {Math.round((trip.passengers.length / trip.totalSeats) * 100)}% ocupado
          </Text>
        </View>

        <Surface style={styles.meetingContainer}>
          <Icon source="map-marker-radius" size={16} color="#003366" />
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
                      <Icon source="star" size={12} color="#FFD700" />
                      <Text variant="bodySmall" style={styles.ratingText}>
                        {request.passengerRating}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.requestActions}>
                    <Button 
                      mode="contained" 
                      compact 
                      style={styles.acceptButton}
                      labelStyle={styles.actionButtonText}
                    >
                      Aceptar
                    </Button>
                    <Button 
                      mode="outlined" 
                      compact 
                      style={styles.declineButton}
                      labelStyle={styles.declineButtonText}
                    >
                      Rechazar
                    </Button>
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
                </View>
                <View style={styles.passengerActions}>
                  <TouchableRipple style={styles.actionIcon}>
                    <Icon source="phone" size={16} color="#003366" />
                  </TouchableRipple>
                  <TouchableRipple style={styles.actionIcon}>
                    <Icon source="message-outline" size={16} color="#003366" />
                  </TouchableRipple>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={styles.cardActions}>
          <Button
            mode="outlined"
            style={styles.secondaryButton}
            labelStyle={styles.secondaryButtonText}
            compact
          >
            Ver Detalles
          </Button>
          <Button
            mode="contained"
            style={styles.primaryButton}
            compact
          >
            Gestionar
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  const activeTrips = myTrips.filter(t => t.status === 'active').length;
  const totalRequests = myTrips.reduce((sum, trip) => sum + trip.requests.length, 0);
  const totalPassengers = myTrips.reduce((sum, trip) => sum + trip.passengers.length, 0);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.welcomeText}>
          Panel de Conductor
        </Text>
        <Text variant="bodyMedium" style={styles.subtitleText}>
          Gestiona tus viajes y pasajeros
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <Surface style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Icon source="car-multiple" size={24} color="#003366" />
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
            <Icon source="account-clock" size={24} color="#FFC107" />
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
            <Icon source="account-group" size={24} color="#28A745" />
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  welcomeText: {
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 4,
  },
  subtitleText: {
    color: '#6C757D',
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 2,
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
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 4,
  },
  statLabel: {
    color: '#6C757D',
    textAlign: 'center',
  },
  tripsList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  tripCard: {
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  tripHeaderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tripTitle: {
    fontWeight: '600',
    color: '#003366',
  },
  statusBadge: {
    borderRadius: 16,
  },
  cardContent: {
    paddingTop: 0,
  },
  routeContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
    backgroundColor: '#28A745',
  },
  destinationIcon: {
    backgroundColor: '#DC3545',
  },
  routeText: {
    flex: 1,
    color: '#003366',
    fontWeight: '500',
  },
  routeLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 12,
  },
  dottedLine: {
    width: 2,
    height: 20,
    backgroundColor: '#DEE2E6',
    marginRight: 8,
  },
  tripMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metricText: {
    color: '#003366',
    fontWeight: '500',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressLabel: {
    color: '#6C757D',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 4,
  },
  progressText: {
    color: '#6C757D',
    textAlign: 'right',
  },
  meetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    gap: 8,
  },
  meetingText: {
    flex: 1,
    color: '#003366',
    fontWeight: '500',
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
    color: '#003366',
    fontWeight: '600',
  },
  countBadge: {
    backgroundColor: '#003366',
  },
  requestItem: {
    backgroundColor: '#FFF3CD',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  requestContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requestAvatar: {
    backgroundColor: '#FFC107',
  },
  requestInfo: {
    flex: 1,
    marginLeft: 12,
  },
  requestName: {
    fontWeight: '600',
    color: '#003366',
  },
  requestProgram: {
    color: '#6C757D',
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  ratingText: {
    color: '#6C757D',
    fontWeight: '500',
  },
  requestActions: {
    gap: 8,
  },
  acceptButton: {
    backgroundColor: '#28A745',
    minWidth: 80,
  },
  declineButton: {
    borderColor: '#DC3545',
    minWidth: 80,
  },
  declineButtonText: {
    color: '#DC3545',
  },
  actionButtonText: {
    fontSize: 12,
  },
  passengerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D4EDDA',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  passengerAvatar: {
    backgroundColor: '#003366',
  },
  passengerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  passengerName: {
    fontWeight: '600',
    color: '#003366',
  },
  passengerProgram: {
    color: '#6C757D',
    marginTop: 2,
  },
  passengerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#003366',
  },
  secondaryButton: {
    flex: 1,
    borderColor: '#003366',
  },
  secondaryButtonText: {
    color: '#003366',
  },
});