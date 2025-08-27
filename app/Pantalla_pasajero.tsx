import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert, StatusBar } from 'react-native';
import {
  Surface,
  Text,
  Card,
  Avatar,
  Chip,
  Badge,
  Button,
  FAB,
  TouchableRipple,
  Tooltip,
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

interface PassengerDashboardProps {
  user: User;
  searchQuery: string;
  showSnackbar?: (message: string) => void;
  onNavigateToSearch?: () => void;
  onNavigateToChat?: () => void;
}

export default function PassengerDashboard({ 
  user, 
  searchQuery,
  showSnackbar = (msg: string) => console.log(msg),
  onNavigateToSearch = () => {},
  onNavigateToChat = () => {}
}: PassengerDashboardProps) {
  const [refreshing, setRefreshing] = useState(false);

  // Datos estáticos - con funcionalidad simulada
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
      tags: ['Mañana', 'Campus', 'Confiable'],
      verified: true
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
      tags: ['Tarde', 'Cerca', 'Económico'],
      verified: true
    },
    {
      id: '3',
      driverId: 'driver3',
      driverName: 'Miguel Córdoba',
      driverRating: 4.6,
      driverProgram: 'Ingeniería Ambiental',
      origin: 'UTCH Campus',
      destination: 'Centro de Quibdó',
      departureTime: '17:45',
      availableSeats: 3,
      totalSeats: 4,
      price: 3500,
      distance: '8.5 km',
      estimatedDuration: '18 min',
      meetingPoint: 'Portería Principal UTCH',
      status: 'available',
      tags: ['Regreso', 'Centro', 'Disponible'],
      verified: false
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

  // Funciones con funcionalidad simulada
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#F39C12';
      case 'matched': return '#2E7D32';
      case 'cancelled': return '#E74C3C';
      default: return '#7F8C8D';
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

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      showSnackbar('Lista actualizada');
    }, 1500);
  };

  const handleRequestTrip = (trip: any) => {
    Alert.alert(
      "Solicitar Chompi",
      `¿Deseas solicitar el  Chompi con ${trip.driverName}?\n\nRuta: ${trip.origin} → ${trip.destination}\nHora: ${trip.departureTime}\n`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Solicitar",
          onPress: () => {
            showSnackbar(`Solicitud enviada a ${trip.driverName}`);
          }
        }
      ]
    );
  };

  const handleContactDriver = (driverName: string) => {
    Alert.alert(
      "Contactar Conductor",
      `¿Cómo deseas contactar a ${driverName}?`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Chat",
          onPress: () => {
            onNavigateToChat();
            showSnackbar(`Iniciando chat con ${driverName}`);
          }
        },
        {
          text: "Llamar",
          onPress: () => {
            showSnackbar(`Llamando a ${driverName}...`);
          }
        }
      ]
    );
  };

  const handleCancelRequest = (requestId: string) => {
    Alert.alert(
      "Cancelar Solicitud",
      "¿Estás seguro de que deseas cancelar esta solicitud?",
      [
        {
          text: "No",
          style: "cancel"
        },
        {
          text: "Sí, cancelar",
          style: "destructive",
          onPress: () => {
            showSnackbar('Solicitud cancelada');
          }
        }
      ]
    );
  };

  const handleViewConfirmedTrip = (tripId: string) => {
    showSnackbar('Mostrando detalles del  Chompi confirmado');
  };

  // Componente de tarjeta de  Chompi mejorado
  const renderTripCard = ({ item: trip }) => (
    <Card style={styles.tripCard} key={trip.id}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.tripHeader}>
          <View style={styles.driverInfo}>
            <Avatar.Text 
              size={56} 
              label={trip.driverName.split(' ').map(n => n[0]).join('')}
              style={styles.driverAvatar}
            />
            <View style={styles.driverDetails}>
              <View style={styles.nameRow}>
                <Text variant="titleMedium" style={styles.driverName}>
                  {trip.driverName}
                </Text>
                {trip.verified && (
                  <MaterialIcons name="verified" size={18} color="#2E7D32" />
                )}
              </View>
              <Text variant="bodySmall" style={styles.driverProgram}>
                {trip.driverProgram}
              </Text>
              <View style={styles.ratingContainer}>
                <MaterialIcons name="star" size={16} color="#FFD700" />
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
          <MaterialIcons name="alt-route" size={24} color="#1B5E96" />
          <View style={styles.routeDetails}>
            <View style={styles.routeItem}>
              <MaterialIcons name="radio-button-checked" size={16} color="#2E7D32" />
              <Text variant="bodyMedium" style={styles.routeText}>
                {trip.origin}
              </Text>
            </View>
            
            <View style={styles.routeArrow}>
              <MaterialIcons name="arrow-downward" size={16} color="#7F8C8D" />
            </View>
            
            <View style={styles.routeItem}>
              <MaterialIcons name="location-on" size={16} color="#E74C3C" />
              <Text variant="bodyMedium" style={styles.routeText}>
                {trip.destination}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.tripDetails}>
          <View style={styles.detailItem}>
            <MaterialIcons name="schedule" size={18} color="#7F8C8D" />
            <Text variant="bodySmall" style={styles.detailText}>
              {trip.departureTime}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <MaterialIcons name="people" size={18} color="#7F8C8D" />
            <Text variant="bodySmall" style={styles.detailText}>
              {trip.availableSeats}/{trip.totalSeats} cupos
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <MaterialIcons name="straighten" size={18} color="#7F8C8D" />
            <Text variant="bodySmall" style={styles.detailText}>
              {trip.distance} • {trip.estimatedDuration}
            </Text>
          </View>
        </View>

        <View style={styles.meetingPoint}>
          <MaterialIcons name="location-on" size={18} color="#1B5E96" />
          <Text variant="bodySmall" style={styles.meetingText}>
            Encuentro: {trip.meetingPoint}
          </Text>
        </View>

        <View style={styles.tagsContainer}>
          {trip.tags.map((tag, index) => (
            <Chip key={index} compact style={styles.tripTag} textStyle={styles.tagText}>
              {tag}
            </Chip>
          ))}
        </View>

        <View style={styles.tripActions}>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => handleContactDriver(trip.driverName)}
          >
            <MaterialIcons name="chat" size={18} color="#1B5E96" />
            <Text style={styles.contactButtonText}>Contactar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.requestButton, trip.availableSeats === 0 && styles.disabledButton]}
            onPress={() => trip.availableSeats > 0 && handleRequestTrip(trip)}
            disabled={trip.availableSeats === 0}
          >
            <MaterialIcons 
              name="waving-hand" 
              size={18} 
              color={trip.availableSeats > 0 ? "#FFFFFF" : "#7F8C8D"} 
            />
            <Text style={[styles.requestButtonText, trip.availableSeats === 0 && styles.disabledButtonText]}>
              {trip.availableSeats > 0 ? 'Solicitar' : 'Sin cupos'}
            </Text>
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  );

  // Componente de tarjeta de solicitud mejorado
  const renderRequestCard = ({ item: request }) => (
    <Card style={styles.requestCard} key={request.id}>
      <Card.Content style={styles.requestContent}>
        <View style={styles.requestHeader}>
          <Text variant="titleMedium" style={styles.requestTitle}>Mi Solicitud</Text>
          <Badge 
            style={[styles.statusBadge, { backgroundColor: getStatusColor(request.status) }]}
          >
            {getStatusText(request.status)}
          </Badge>
        </View>

        <View style={styles.requestRoute}>
          <View style={styles.routeItem}>
            <MaterialIcons name="radio-button-checked" size={16} color="#2E7D32" />
            <Text variant="bodyMedium" style={styles.requestRouteText}>
              {request.origin}
            </Text>
          </View>
          
          <MaterialIcons name="arrow-downward" size={16} color="#7F8C8D" />
          
          <View style={styles.routeItem}>
            <MaterialIcons name="location-on" size={16} color="#E74C3C" />
            <Text variant="bodyMedium" style={styles.requestRouteText}>
              {request.destination}
            </Text>
          </View>
        </View>

        <View style={styles.requestDetails}>
          <Text variant="bodySmall" style={styles.requestTime}>
            Hora: {request.requestedTime}
          </Text>
          <Text variant="bodySmall" style={styles.requestDate}>
            Creado: {new Date(request.createdAt).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.requestActions}>
          {request.status === 'pending' && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => handleCancelRequest(request.id)}
            >
              <MaterialIcons name="cancel" size={16} color="#E74C3C" />
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          )}

          {request.status === 'matched' && request.matchedTripId && (
            <TouchableOpacity
              style={styles.viewTripButton}
              onPress={() => handleViewConfirmedTrip(request.matchedTripId)}
            >
              <MaterialIcons name="visibility" size={16} color="#FFFFFF" />
              <Text style={styles.viewTripButtonText}>Ver  Chompi</Text>
            </TouchableOpacity>
          )}
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <PaperProvider theme={customTheme}>
      <View style={styles.container}>
        <StatusBar backgroundColor="#1B5E96" barStyle="light-content" />
        
        {/* Header con gradiente */}
        <LinearGradient
          colors={['#1B5E96', '#2980B9']}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerIconContainer}>
              <MaterialIcons name="person" size={32} color="#FFFFFF" />
            </View>
            <Text variant="headlineMedium" style={styles.headerTitle}>
              Mi Dashboard
            </Text>
            <Text variant="bodyMedium" style={styles.headerSubtitle}>
              Encuentra tu Chompi ideal
            </Text>
          </View>
        </LinearGradient>

        {/* Mis solicitudes activas */}
        {myRequests.length > 0 && (
          <View style={styles.section}>
            <Surface style={styles.sectionHeader}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Mis Solicitudes
              </Text>
              <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
                <MaterialIcons 
                  name={refreshing ? "hourglass-empty" : "refresh"} 
                  size={20} 
                  color="#1B5E96" 
                />
              </TouchableOpacity>
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

        {/*  Chompis disponibles */}
        <View style={styles.section}>
          <Surface style={styles.sectionHeader}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
               Chompis Disponibles
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

        {/* FAB para búsqueda avanzada */}
        <FAB
          icon={() => <MaterialIcons name="search" size={24} color="#FFFFFF" />}
          style={styles.fab}
          onPress={onNavigateToSearch}
          label="Buscar"
          color="#FFFFFF"
        />
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
    elevation: 2,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    color: '#2C3E50',
    fontWeight: '700',
  },
  refreshButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
  },
  countBadge: {
    backgroundColor: '#1B5E96',
  },
  requestsList: {
    paddingHorizontal: 15,
  },
  requestCard: {
    width: 280,
    marginRight: 15,
    elevation: 4,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  requestContent: {
    padding: 16,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  requestTitle: {
    color: '#2C3E50',
    fontWeight: '600',
  },
  statusBadge: {
    color: 'white',
    borderRadius: 12,
  },
  requestRoute: {
    alignItems: 'center',
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  requestRouteText: {
    marginLeft: 8,
    color: '#2C3E50',
    fontWeight: '500',
  },
  requestDetails: {
    marginBottom: 12,
  },
  requestTime: {
    color: '#7F8C8D',
    marginBottom: 2,
  },
  requestDate: {
    color: '#BDC3C7',
    fontSize: 11,
  },
  requestActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E74C3C',
    gap: 4,
  },
  cancelButtonText: {
    color: '#E74C3C',
    fontWeight: '600',
    fontSize: 12,
  },
  viewTripButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#2E7D32',
    gap: 4,
  },
  viewTripButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  },
  tripsList: {
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
  tripCard: {
    marginBottom: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  cardContent: {
    padding: 20,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  driverInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  driverAvatar: {
    backgroundColor: '#1B5E96',
    elevation: 4,
  },
  driverDetails: {
    marginLeft: 16,
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  driverName: {
    fontWeight: '700',
    color: '#2C3E50',
  },
  driverProgram: {
    color: '#7F8C8D',
    fontSize: 12,
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  rating: {
    color: '#7F8C8D',
    fontWeight: '600',
  },
  priceContainer: {
    alignItems: 'center',
  },
  price: {
    fontWeight: '700',
    color: '#2E7D32',
  },
  priceLabel: {
    color: '#7F8C8D',
    fontSize: 10,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8F0',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  routeDetails: {
    flex: 1,
    marginLeft: 12,
  },
  routeText: {
    marginLeft: 8,
    color: '#2C3E50',
    fontWeight: '500',
  },
  routeArrow: {
    alignItems: 'center',
    marginVertical: 4,
  },
  tripDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    color: '#7F8C8D',
    fontSize: 12,
    fontWeight: '500',
  },
  meetingPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F4FD',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  meetingText: {
    marginLeft: 8,
    color: '#2C3E50',
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 6,
  },
  tripTag: {
    backgroundColor: '#E8F4FD',
    elevation: 1,
  },
  tagText: {
    fontSize: 11,
    color: '#1B5E96',
  },
  tripActions: {
    flexDirection: 'row',
    gap: 12,
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#1B5E96',
    elevation: 2,
    gap: 6,
  },
  contactButtonText: {
    color: '#1B5E96',
    fontWeight: '600',
  },
  requestButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#2E7D32',
    elevation: 4,
    gap: 6,
  },
  requestButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#BDC3C7',
    elevation: 1,
  },
  disabledButtonText: {
    color: '#7F8C8D',
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: '#F39C12',
    borderRadius: 16,
    elevation: 8,
  },
});