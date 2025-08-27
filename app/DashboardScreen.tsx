// PassengerDashboard.tsx - Versión Static
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import {
  Surface,
  Text,
  Card,
  Avatar,
  Chip,
  Badge,
  Button,
  Icon,
  TouchableRipple,
  Tooltip,
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

interface PassengerDashboardProps {
  user: User;
  searchQuery: string;
}

export default function PassengerDashboard({ user, searchQuery }: PassengerDashboardProps) {
  // Datos estáticos
  const availableTrips = [
    {
      id: '1',
      driverId: 'driver1',
      driverName: 'Carlos Mosquera',
      driverRating: 4.8,
      driverProgram: 'Ingeniería Civil',
      origin: 'Centro de Quibdó',
      destination: 'UTCH Campus',
      departureTime: '07:30',
      availableSeats: 2,
      totalSeats: 4,
      price: 3000,
      distance: '8.5 km',
      estimatedDuration: '15 min',
      meetingPoint: 'Parque Centenario',
      status: 'available',
      tags: ['Mañana', 'Campus', 'Confiable']
    },
    {
      id: '2',
      driverId: 'driver2',
      driverName: 'Ana Patricia Rentería',
      driverRating: 4.9,
      driverProgram: 'Administración de Empresas',
      origin: 'Barrio Niño Jesús',
      destination: 'UTCH Campus',
      departureTime: '13:00',
      availableSeats: 1,
      totalSeats: 3,
      price: 2500,
      distance: '5.2 km',
      estimatedDuration: '12 min',
      meetingPoint: 'Terminal de Transporte',
      status: 'available',
      tags: ['Tarde', 'Cerca', 'Económico']
    }
  ];

  const myRequests = [
    {
      id: 'req1',
      origin: 'Barrio Kennedy',
      destination: 'UTCH Campus',
      requestedTime: '08:00',
      status: 'pending',
      createdAt: '2025-01-15T10:30:00Z'
    },
    {
      id: 'req2',
      origin: 'UTCH Campus',
      destination: 'Centro',
      requestedTime: '16:30',
      status: 'matched',
      matchedTripId: '3',
      createdAt: '2025-01-14T14:20:00Z'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#FF9500';
      case 'matched': return '#40916C';
      case 'cancelled': return '#FF3B30';
      default: return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Buscando...';
      case 'matched': return 'Confirmado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const renderTripCard = ({ item: trip }) => (
    <Card style={styles.tripCard} key={trip.id}>
      <Card.Content>
        <View style={styles.tripHeader}>
          <View style={styles.driverInfo}>
            <Avatar.Text 
              size={40} 
              label={trip.driverName.split(' ').map(n => n[0]).join('')}
              style={styles.driverAvatar}
            />
            <View style={styles.driverDetails}>
              <Text variant="titleMedium" style={styles.driverName}>
                {trip.driverName}
              </Text>
              <Text variant="bodySmall" style={styles.driverProgram}>
                {trip.driverProgram}
              </Text>
              <View style={styles.ratingContainer}>
                <Icon source="star" size={14} color="#FFD700" />
                <Text variant="bodySmall" style={styles.rating}>
                  {trip.driverRating}
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.priceContainer}>
            <Text variant="titleLarge" style={styles.price}>
              ${trip.price.toLocaleString()}
            </Text>
            <Text variant="bodySmall" style={styles.priceLabel}>
              por persona
            </Text>
          </View>
        </View>

        <View style={styles.routeContainer}>
          <View style={styles.routeItem}>
            <Icon source="map-marker" size={20} color="#40916C" />
            <Text variant="bodyMedium" style={styles.routeText}>
              {trip.origin}
            </Text>
          </View>
          
          <View style={styles.routeArrow}>
            <Icon source="arrow-right" size={16} color="#666" />
          </View>
          
          <View style={styles.routeItem}>
            <Icon source="flag-checkered" size={20} color="#FF6B35" />
            <Text variant="bodyMedium" style={styles.routeText}>
              {trip.destination}
            </Text>
          </View>
        </View>

        <View style={styles.tripDetails}>
          <View style={styles.detailItem}>
            <Icon source="clock" size={16} color="#666" />
            <Text variant="bodySmall" style={styles.detailText}>
              {trip.departureTime}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Icon source="account-multiple" size={16} color="#666" />
            <Text variant="bodySmall" style={styles.detailText}>
              {trip.availableSeats}/{trip.totalSeats} disponibles
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Icon source="map-marker-distance" size={16} color="#666" />
            <Text variant="bodySmall" style={styles.detailText}>
              {trip.distance} • {trip.estimatedDuration}
            </Text>
          </View>
        </View>

        <View style={styles.meetingPoint}>
          <Icon source="map-marker-account" size={16} color="#1B4332" />
          <Text variant="bodySmall" style={styles.meetingText}>
            Punto de encuentro: {trip.meetingPoint}
          </Text>
        </View>

        <View style={styles.tagsContainer}>
          {trip.tags.map((tag, index) => (
            <Chip key={index} compact style={styles.tripTag}>
              {tag}
            </Chip>
          ))}
        </View>

        <View style={styles.tripActions}>
          <Button
            mode="outlined"
            style={styles.detailsButton}
            compact
          >
            Ver detalles
          </Button>
          <Button
            mode="contained"
            disabled={trip.availableSeats === 0}
            style={styles.joinButton}
            compact
          >
            {trip.availableSeats > 0 ? 'Solicitar' : 'Sin cupos'}
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  const renderRequestCard = ({ item: request }) => (
    <Card style={styles.requestCard} key={request.id}>
      <Card.Content>
        <View style={styles.requestHeader}>
          <Text variant="titleMedium">Mi Solicitud</Text>
          <Badge 
            style={[styles.statusBadge, { backgroundColor: getStatusColor(request.status) }]}
          >
            {getStatusText(request.status)}
          </Badge>
        </View>

        <View style={styles.routeContainer}>
          <View style={styles.routeItem}>
            <Icon source="map-marker" size={18} color="#40916C" />
            <Text variant="bodyMedium" style={styles.routeText}>
              {request.origin}
            </Text>
          </View>
          
          <View style={styles.routeArrow}>
            <Icon source="arrow-right" size={16} color="#666" />
          </View>
          
          <View style={styles.routeItem}>
            <Icon source="flag-checkered" size={18} color="#FF6B35" />
            <Text variant="bodyMedium" style={styles.routeText}>
              {request.destination}
            </Text>
          </View>
        </View>

        <View style={styles.requestDetails}>
          <Text variant="bodySmall" style={styles.requestTime}>
            Hora solicitada: {request.requestedTime}
          </Text>
          <Text variant="bodySmall" style={styles.requestDate}>
            Creado: {new Date(request.createdAt).toLocaleDateString()}
          </Text>
        </View>

        {request.status === 'pending' && (
          <Button
            mode="outlined"
            style={styles.cancelButton}
            textColor="#FF3B30"
            compact
          >
            Cancelar solicitud
          </Button>
        )}

        {request.status === 'matched' && request.matchedTripId && (
          <Button
            mode="contained"
            style={styles.viewTripButton}
            compact
          >
            Ver viaje confirmado
          </Button>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Mis solicitudes activas */}
      <View style={styles.section}>
        <Surface style={styles.sectionHeader}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Mis Solicitudes
          </Text>
          <Tooltip title="Actualizar">
            <TouchableRipple style={styles.refreshButton}>
              <Icon source="refresh" size={20} />
            </TouchableRipple>
          </Tooltip>
        </Surface>
        
        <FlatList
          data={myRequests}
          renderItem={renderRequestCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.requestsList}
        />
      </View>

      {/* Viajes disponibles */}
      <View style={styles.section}>
        <Surface style={styles.sectionHeader}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Viajes Disponibles
          </Text>
          <Badge style={styles.countBadge}>
            {availableTrips.length}
          </Badge>
        </Surface>

        <FlatList
          data={availableTrips}
          renderItem={renderTripCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.tripsList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

// DriverDashboard.tsx - Versión Static
export function DriverDashboard({ user, searchQuery }: { user: User; searchQuery: string }) {
  // Datos estáticos
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
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#40916C';
      case 'full': return '#FF9500';
      case 'completed': return '#007AFF';
      case 'cancelled': return '#FF3B30';
      default: return '#666';
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
      <Card.Content>
        <View style={styles.tripHeader}>
          <Text variant="titleMedium" style={styles.tripTitle}>
            Mi Viaje
          </Text>
          <Badge 
            style={[styles.statusBadge, { backgroundColor: getStatusColor(trip.status) }]}
          >
            {getStatusText(trip.status)}
          </Badge>
        </View>

        <View style={styles.routeContainer}>
          <View style={styles.routeItem}>
            <Icon source="map-marker" size={20} color="#40916C" />
            <Text variant="bodyMedium" style={styles.routeText}>
              {trip.origin}
            </Text>
          </View>
          
          <View style={styles.routeArrow}>
            <Icon source="arrow-right" size={16} color="#666" />
          </View>
          
          <View style={styles.routeItem}>
            <Icon source="flag-checkered" size={20} color="#FF6B35" />
            <Text variant="bodyMedium" style={styles.routeText}>
              {trip.destination}
            </Text>
          </View>
        </View>

        <View style={styles.tripDetails}>
          <View style={styles.detailItem}>
            <Icon source="clock" size={16} color="#666" />
            <Text variant="bodySmall" style={styles.detailText}>
              {trip.departureTime}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Icon source="account-multiple" size={16} color="#666" />
            <Text variant="bodySmall" style={styles.detailText}>
              {trip.passengers.length}/{trip.totalSeats} pasajeros
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Icon source="currency-usd" size={16} color="#666" />
            <Text variant="bodySmall" style={styles.detailText}>
              ${trip.price.toLocaleString()} c/u
            </Text>
          </View>
        </View>

        <View style={styles.meetingPoint}>
          <Icon source="map-marker-account" size={16} color="#1B4332" />
          <Text variant="bodySmall" style={styles.meetingText}>
            Punto de encuentro: {trip.meetingPoint}
          </Text>
        </View>

        {/* Solicitudes pendientes */}
        {trip.requests.length > 0 && (
          <View style={styles.requestsSection}>
            <Text variant="titleSmall" style={styles.requestsTitle}>
              Solicitudes Pendientes ({trip.requests.length})
            </Text>
            {trip.requests.map((request) => (
              <TouchableRipple
                key={request.id}
                style={styles.requestItem}
              >
                <View style={styles.requestContent}>
                  <Avatar.Text 
                    size={32} 
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
                  </View>
                  <View style={styles.requestRating}>
                    <Icon source="star" size={14} color="#FFD700" />
                    <Text variant="bodySmall" style={styles.rating}>
                      {request.passengerRating}
                    </Text>
                  </View>
                  <Icon source="chevron-right" size={20} color="#666" />
                </View>
              </TouchableRipple>
            ))}
          </View>
        )}

        {/* Pasajeros confirmados */}
        {trip.passengers.length > 0 && (
          <View style={styles.passengersSection}>
            <Text variant="titleSmall" style={styles.passengersTitle}>
              Pasajeros Confirmados ({trip.passengers.length})
            </Text>
            {trip.passengers.map((passenger) => (
              <View key={passenger.id} style={styles.passengerItem}>
                <Avatar.Text 
                  size={32} 
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
                  <TouchableRipple style={styles.actionButton}>
                    <Icon source="phone" size={16} color="#40916C" />
                  </TouchableRipple>
                  <TouchableRipple style={styles.actionButton}>
                    <Icon source="message" size={16} color="#40916C" />
                  </TouchableRipple>
                  <TouchableRipple style={styles.actionButton}>
                    <Icon source="close" size={16} color="#FF3B30" />
                  </TouchableRipple>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={styles.tripActions}>
          <Button
            mode="outlined"
            style={styles.detailsButton}
            compact
          >
            Ver detalles
          </Button>
          <Button
            mode="contained"
            style={styles.cancelButton}
            buttonColor="#FF3B30"
            compact
          >
            Cancelar
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Estadísticas rápidas */}
      <Surface style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text variant="titleLarge" style={styles.statValue}>2</Text>
          <Text variant="bodySmall" style={styles.statLabel}>Viajes Activos</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text variant="titleLarge" style={styles.statValue}>1</Text>
          <Text variant="bodySmall" style={styles.statLabel}>Solicitudes</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text variant="titleLarge" style={styles.statValue}>3</Text>
          <Text variant="bodySmall" style={styles.statLabel}>Pasajeros</Text>
        </View>
      </Surface>

      {/* Mis viajes */}
      <View style={styles.section}>
        <Surface style={styles.sectionHeader}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Mis Viajes
          </Text>
          <View style={styles.headerActions}>
            <Badge style={styles.countBadge}>
              {myTrips.length}
            </Badge>
            <Tooltip title="Actualizar">
              <TouchableRipple style={styles.refreshButton}>
                <Icon source="refresh" size={20} />
              </TouchableRipple>
            </Tooltip>
          </View>
        </Surface>

        <FlatList
          data={myTrips}
          renderItem={renderTripCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.tripsList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

// DashboardScreen.tsx - Versión Static
export function DashboardScreen({ user, userRole }: { user: User; userRole: 'passenger' | 'driver' | 'both' }) {
  const activeRole = 'passenger'; // Rol fijo para la versión estática
  const searchQuery = '';

  const renderDashboard = () => {
    switch (activeRole) {
      case 'passenger':
        return <PassengerDashboard user={user} searchQuery={searchQuery} />;
      case 'driver':
        return <DriverDashboard user={user} searchQuery={searchQuery} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Encabezado con información del usuario */}
      <Card style={styles.userHeader}>
        <Avatar.Text size={45} label={`${user.nombre[0]}${user.apellido[0]}`} style={styles.userAvatar} />
        <View style={styles.userInfo}>
          <Text variant="titleMedium" style={styles.userName}>
            {`${user.nombre} ${user.apellido}`}
          </Text>
          <Text variant="bodySmall" style={styles.userDetails}>
            {user.programa}
          </Text>
        </View>
        <Button
          icon="logout"
          mode="outlined"
          compact
          style={styles.logoutButton}
          labelStyle={styles.logoutText}
        >
          Salir
        </Button>
      </Card>
      
      {/* Selector de rol (solo visual) */}
      <Surface style={styles.roleSelector} elevation={1}>
        <View style={styles.segmentedButtonsContainer}>
          <Button mode="contained" style={styles.activeSegment}>
            Pasajero
          </Button>
          <Button mode="outlined" style={styles.inactiveSegment}>
            Conductor
          </Button>
        </View>
      </Surface>

      {/* Barra de búsqueda (solo visual) */}
      <Surface style={styles.searchbarContainer} elevation={1}>
        <View style={styles.searchbar}>
          <Icon source="magnify" size={20} color="#666" style={styles.searchIcon} />
          <Text style={styles.searchPlaceholder}>Buscar viajes...</Text>
        </View>
      </Surface>

      {/* Dashboard específico del rol */}
      {renderDashboard()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7FF',
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    margin: 15,
    elevation: 2,
    borderRadius: 8,
  },
  userAvatar: {
    backgroundColor: '#40916C',
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    color: '#1B4332',
  },
  userDetails: {
    color: '#666',
    marginTop: 2,
  },
  logoutButton: {
    borderColor: '#FF3B30',
  },
  logoutText: {
    color: '#FF3B30'
  },
  roleSelector: {
    margin: 15,
    padding: 10,
    elevation: 2,
    borderRadius: 8,
  },
  segmentedButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  activeSegment: {
    flex: 1,
    backgroundColor: '#40916C',
  },
  inactiveSegment: {
    flex: 1,
    borderColor: '#40916C',
  },
  searchbarContainer: {
    marginHorizontal: 15,
    marginBottom: 15,
    elevation: 2,
    borderRadius: 8,
  },
  searchbar: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchPlaceholder: {
    color: '#666',
    fontSize: 16,
  },
  section: {
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    elevation: 1,
  },
  sectionTitle: {
    color: '#1B4332',
    fontWeight: 'bold',
  },
  refreshButton: {
    padding: 5,
    borderRadius: 15,
  },
  countBadge: {
    backgroundColor: '#40916C',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requestsList: {
    paddingHorizontal: 15,
  },
  requestCard: {
    width: 280,
    marginRight: 15,
    elevation: 2,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusBadge: {
    color: 'white',
  },
  requestDetails: {
    marginTop: 10,
  },
  requestTime: {
    color: '#666',
    marginBottom: 2,
  },
  requestDate: {
    color: '#999',
  },
  cancelButton: {
    marginTop: 10,
    borderColor: '#FF3B30',
  },
  viewTripButton: {
    marginTop: 10,
    backgroundColor: '#40916C',
  },
  tripsList: {
    paddingHorizontal: 15,
    paddingBottom: 80,
  },
  tripCard: {
    marginBottom: 15,
    elevation: 2,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  tripTitle: {
    fontWeight: 'bold',
    color: '#1B4332',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  driverAvatar: {
    backgroundColor: '#40916C',
  },
  driverDetails: {
    marginLeft: 12,
    flex: 1,
  },
  driverName: {
    fontWeight: 'bold',
    color: '#1B4332',
  },
  driverProgram: {
    color: '#666',
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  rating: {
    marginLeft: 2,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  priceContainer: {
    alignItems: 'center',
  },
  price: {
    fontWeight: 'bold',
    color: '#1B4332',
  },
  priceLabel: {
    color: '#666',
    fontSize: 10,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  routeText: {
    marginLeft: 6,
    flex: 1,
    fontSize: 14,
  },
  routeArrow: {
    paddingHorizontal: 8,
  },
  tripDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 4,
    color: '#666',
  },
  meetingPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#E8F5E8',
    borderRadius: 6,
  },
  meetingText: {
    marginLeft: 6,
    color: '#1B4332',
    flex: 1,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  tripTag: {
    marginRight: 6,
    marginBottom: 4,
    backgroundColor: '#E3F2FD',
  },
  tripActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsButton: {
    flex: 1,
    marginRight: 8,
  },
  joinButton: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: '#40916C',
  },
  // Estilos adicionales para DriverDashboard
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    margin: 15,
    elevation: 2,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontWeight: 'bold',
    color: '#1B4332',
  },
  statLabel: {
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 15,
  },
  requestsSection: {
    marginBottom: 15,
  },
  requestsTitle: {
    color: '#1B4332',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  requestItem: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#FFF3CD',
    borderRadius: 6,
    marginBottom: 6,
  },
  requestContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requestAvatar: {
    backgroundColor: '#FF9500',
  },
  requestInfo: {
    flex: 1,
    marginLeft: 10,
  },
  requestName: {
    fontWeight: 'bold',
  },
  requestProgram: {
    color: '#666',
    fontSize: 12,
  },
  requestRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  passengersSection: {
    marginBottom: 15,
  },
  passengersTitle: {
    color: '#1B4332',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  passengerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#D4EDDA',
    borderRadius: 6,
    marginBottom: 6,
  },
  passengerAvatar: {
    backgroundColor: '#40916C',
  },
  passengerInfo: {
    flex: 1,
    marginLeft: 10,
  },
  passengerName: {
    fontWeight: 'bold',
  },
  passengerProgram: {
    color: '#666',
    fontSize: 12,
  },
  passengerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 6,
    marginLeft: 4,
    borderRadius: 15,
  },
});