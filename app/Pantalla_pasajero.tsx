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
  // Datos estÃ¡ticos - sin funcionalidad
  const availableTrips = [
    {
      id: '1',
      driverId: 'driver1',
      driverName: 'Carlos Mosquera',
      driverRating: 4.8,
      driverProgram: 'IngenierÃ­a Civil',
      origin: 'Centro de QuibdÃ³',
      destination: 'UTCH Campus',
      departureTime: '07:30',
      availableSeats: 2,
      totalSeats: 4,
      price: 3000,
      distance: '8.5 km',
      estimatedDuration: '15 min',
      meetingPoint: 'Parque Centenario',
      status: 'available',
      tags: ['MaÃ±ana', 'Campus', 'Confiable']
    },
    {
      id: '2',
      driverId: 'driver2',
      driverName: 'Ana Patricia RenterÃ­a',
      driverRating: 4.9,
      driverProgram: 'AdministraciÃ³n de Empresas',
      origin: 'Barrio NiÃ±o JesÃºs',
      destination: 'UTCH Campus',
      departureTime: '13:00',
      availableSeats: 1,
      totalSeats: 3,
      price: 2500,
      distance: '5.2 km',
      estimatedDuration: '12 min',
      meetingPoint: 'Terminal de Transporte',
      status: 'available',
      tags: ['Tarde', 'Cerca', 'EconÃ³mico']
    },
    {
      id: '3',
      driverId: 'driver3',
      driverName: 'Miguel CÃ³rdoba',
      driverRating: 4.6,
      driverProgram: 'IngenierÃ­a Ambiental',
      origin: 'UTCH Campus',
      destination: 'Centro de QuibdÃ³',
      departureTime: '17:45',
      availableSeats: 3,
      totalSeats: 4,
      price: 3500,
      distance: '8.5 km',
      estimatedDuration: '18 min',
      meetingPoint: 'PorterÃ­a Principal UTCH',
      status: 'available',
      tags: ['Regreso', 'Centro', 'Disponible']
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

  // Funciones auxiliares para estilos - sin lÃ³gica de negocio
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

  // Componente de tarjeta de viaje - solo visual
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
              {trip.distance} â€¢ {trip.estimatedDuration}
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

  // Componente de tarjeta de solicitud - solo visual
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
      {/* Mis solicitudes activas - solo visual */}
      {myRequests.length > 0 && (
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
      )}

      {/* Viajes disponibles - solo visual */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});