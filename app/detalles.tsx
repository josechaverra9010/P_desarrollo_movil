// TripDetailsScreen.tsx - Versión Static (Solo Estilos)
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
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
  Divider,
  List,
  Dialog,
  Portal,
  FAB,
} from 'react-native-paper';

interface TripData {
  id: string;
  type: 'offer' | 'request';
  driverId?: string;
  driverName?: string;
  driverRating?: number;
  driverProgram?: string;
  driverAvatar?: string;
  requesterId?: string;
  requesterName?: string;
  requesterProgram?: string;
  origin: string;
  destination: string;
  departureTime: string;
  availableSeats?: number;
  totalSeats?: number;
  price?: number;
  distance: string;
  estimatedDuration: string;
  meetingPoint?: string;
  status: 'available' | 'pending' | 'confirmed' | 'completed' | 'cancelled';
  description?: string;
  tags: string[];
  isRecurrent: boolean;
  recurrentDays?: string[];
  passengers?: any[];
  createdAt: string;
  vehicleInfo?: {
    make: string;
    model: string;
    color: string;
    plate: string;
  };
}

interface TripDetailsScreenProps {
  trip: TripData;
  currentUserId: string;
  userType: 'passenger' | 'driver' | 'both';
}

export default function TripDetailsScreen({ trip, currentUserId, userType }: TripDetailsScreenProps) {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showPassengersDialog, setShowPassengersDialog] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);

  // Datos estáticos para visualización
  const mockPassengers = [
    {
      id: '1',
      name: 'María González',
      program: 'Ingeniería Telecomunicaciones e Informatica',
      rating: 4.7,
      joinedAt: '2025-01-10T08:30:00Z',
      status: 'confirmed'
    },
    {
      id: '2',
      name: 'Juan Ramírez',
      program: 'Administración',
      rating: 4.9,
      joinedAt: '2025-01-09T15:20:00Z',
      status: 'confirmed'
    }
  ];

  const mockTrip: TripData = {
    id: '1',
    type: 'offer',
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
    meetingPoint: 'Parque Centenario - Frente a la fuente principal',
    status: 'available',
    description: 'Viaje diario al campus. Tengo espacio para equipaje pequeño. Prefiero salir puntualmente.',
    tags: ['Mañana', 'Campus', 'Confiable', 'Puntual'],
    isRecurrent: true,
    recurrentDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    passengers: mockPassengers,
    createdAt: '2025-01-08T10:00:00Z',
    vehicleInfo: {
      make: 'Toyota',
      model: 'Corolla',
      color: 'Blanco',
      plate: 'ABC123'
    }
  };

  // Usar datos del mock para visualización
  const currentTrip = trip || mockTrip;
  const isDriver = currentTrip.driverId === currentUserId;
  const isPassenger = currentTrip.passengers?.some(p => p.id === currentUserId);

  // Funciones para obtener colores y estados
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#40916C';
      case 'pending': return '#FF9500';
      case 'confirmed': return '#52B788';
      case 'completed': return '#1B4332';
      case 'cancelled': return '#FF3B30';
      default: return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'pending': return 'Pendiente';
      case 'confirmed': return 'Confirmado';
      case 'completed': return 'Completado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const getDayName = (day: string) => {
    const days = {
      monday: 'Lun',
      tuesday: 'Mar',
      wednesday: 'Mié',
      thursday: 'Jue',
      friday: 'Vie',
      saturday: 'Sáb',
      sunday: 'Dom'
    };
    return days[day] || day;
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header con información básica */}
        <Surface style={styles.header}>
          <View style={styles.statusContainer}>
            <Badge style={[styles.statusBadge, { backgroundColor: getStatusColor(currentTrip.status) }]}>
              {getStatusText(currentTrip.status)}
            </Badge>
            <Text variant="bodySmall" style={styles.tripType}>
              {currentTrip.type === 'offer' ? 'Oferta de viaje' : 'Solicitud de viaje'}
            </Text>
          </View>

          {/* Ruta principal */}
          <View style={styles.routeHeader}>
            <View style={styles.routeItem}>
              <Icon source="map-marker" size={24} color="#40916C" />
              <Text variant="titleMedium" style={styles.routeText}>
                {currentTrip.origin}
              </Text>
            </View>
            
            <View style={styles.routeArrow}>
              <Icon source="arrow-right" size={20} color="#666" />
            </View>
            
            <View style={styles.routeItem}>
              <Icon source="flag-checkered" size={24} color="#FF6B35" />
              <Text variant="titleMedium" style={styles.routeText}>
                {currentTrip.destination}
              </Text>
            </View>
          </View>

          {/* Información de tiempo y distancia */}
          <View style={styles.tripInfo}>
            <View style={styles.infoItem}>
              <Icon source="clock" size={18} color="#1B4332" />
              <Text variant="titleMedium" style={styles.infoText}>
                {currentTrip.departureTime}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Icon source="map-marker-distance" size={18} color="#1B4332" />
              <Text variant="bodyMedium" style={styles.infoText}>
                {currentTrip.distance} • {currentTrip.estimatedDuration}
              </Text>
            </View>
          </View>
        </Surface>

        {/* Información del conductor/solicitante */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              {currentTrip.type === 'offer' ? 'Conductor' : 'Solicitante'}
            </Text>
            
            <View style={styles.userInfo}>
              <Avatar.Text 
                size={50} 
                label={currentTrip.driverName?.split(' ').map(n => n[0]).join('') || 'U'}
                style={styles.userAvatar}
              />
              <View style={styles.userDetails}>
                <Text variant="titleMedium" style={styles.userName}>
                  {currentTrip.driverName || currentTrip.requesterName}
                </Text>
                <Text variant="bodySmall" style={styles.userProgram}>
                  {currentTrip.driverProgram || currentTrip.requesterProgram}
                </Text>
                {currentTrip.driverRating && (
                  <View style={styles.ratingContainer}>
                    <Icon source="star" size={16} color="#FFD700" />
                    <Text variant="bodySmall" style={styles.rating}>
                      {currentTrip.driverRating} • 127 viajes
                    </Text>
                  </View>
                )}
              </View>
              <TouchableRipple
                style={styles.contactButton}
                onPress={() => setShowContactDialog(true)}
              >
                <Icon source="message" size={24} color="#40916C" />
              </TouchableRipple>
            </View>

            {/* Información del vehículo (solo para ofertas) */}
            {currentTrip.type === 'offer' && currentTrip.vehicleInfo && (
              <View style={styles.vehicleInfo}>
                <Text variant="bodyMedium" style={styles.vehicleTitle}>
                  Vehículo:
                </Text>
                <Text variant="bodyMedium" style={styles.vehicleDetails}>
                  {currentTrip.vehicleInfo.make} {currentTrip.vehicleInfo.model} - {currentTrip.vehicleInfo.color}
                </Text>
                <Text variant="bodySmall" style={styles.vehiclePlate}>
                  Placa: {currentTrip.vehicleInfo.plate}
                </Text>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Detalles del viaje */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Detalles del viaje
            </Text>

            {/* Cupos (solo para ofertas) */}
            {currentTrip.type === 'offer' && (
              <View style={styles.detailRow}>
                <Icon source="account-multiple" size={20} color="#666" />
                <Text variant="bodyMedium" style={styles.detailLabel}>
                  Cupos disponibles:
                </Text>
                <Text variant="bodyMedium" style={styles.detailValue}>
                  {currentTrip.availableSeats}/{currentTrip.totalSeats}
                </Text>
              </View>
            )}

            {/* Precio */}
            {currentTrip.price && (
              <View style={styles.detailRow}>
                <Icon source="currency-cop" size={20} color="#666" />
                <Text variant="bodyMedium" style={styles.detailLabel}>
                  Precio por persona:
                </Text>
                <Text variant="titleMedium" style={styles.priceText}>
                  ${currentTrip.price.toLocaleString()}
                </Text>
              </View>
            )}

            {/* Punto de encuentro */}
            {currentTrip.meetingPoint && (
              <View style={styles.meetingPointContainer}>
                <Icon source="map-marker-account" size={20} color="#1B4332" />
                <View style={styles.meetingPointDetails}>
                  <Text variant="bodyMedium" style={styles.meetingPointLabel}>
                    Punto de encuentro:
                  </Text>
                  <Text variant="bodyMedium" style={styles.meetingPointText}>
                    {currentTrip.meetingPoint}
                  </Text>
                </View>
              </View>
            )}

            {/* Viaje recurrente */}
            {currentTrip.isRecurrent && currentTrip.recurrentDays && (
              <View style={styles.recurrentContainer}>
                <Icon source="calendar-refresh" size={20} color="#666" />
                <View style={styles.recurrentDetails}>
                  <Text variant="bodyMedium" style={styles.recurrentLabel}>
                    Viaje recurrente:
                  </Text>
                  <View style={styles.daysContainer}>
                    {currentTrip.recurrentDays.map((day) => (
                      <Chip key={day} compact style={styles.dayChip}>
                        {getDayName(day)}
                      </Chip>
                    ))}
                  </View>
                </View>
              </View>
            )}

            {/* Descripción */}
            {currentTrip.description && (
              <>
                <Divider style={styles.divider} />
                <View style={styles.descriptionContainer}>
                  <Text variant="bodyMedium" style={styles.descriptionLabel}>
                    Descripción:
                  </Text>
                  <Text variant="bodyMedium" style={styles.descriptionText}>
                    {currentTrip.description}
                  </Text>
                </View>
              </>
            )}

            {/* Etiquetas */}
            {currentTrip.tags.length > 0 && (
              <View style={styles.tagsContainer}>
                <Text variant="bodyMedium" style={styles.tagsLabel}>
                  Etiquetas:
                </Text>
                <View style={styles.tagsGrid}>
                  {currentTrip.tags.map((tag, index) => (
                    <Chip key={index} compact style={styles.tagChip}>
                      {tag}
                    </Chip>
                  ))}
                </View>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Lista de pasajeros (solo para conductores en ofertas) */}
        {currentTrip.type === 'offer' && isDriver && currentTrip.passengers && currentTrip.passengers.length > 0 && (
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.passengersHeader}>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  Pasajeros confirmados
                </Text>
                <TouchableRipple
                  style={styles.viewAllButton}
                  onPress={() => setShowPassengersDialog(true)}
                >
                  <Text style={styles.viewAllText}>Ver todos</Text>
                </TouchableRipple>
              </View>

              {currentTrip.passengers.slice(0, 2).map((passenger, index) => (
                <View key={passenger.id} style={styles.passengerItem}>
                  <Avatar.Text 
                    size={40} 
                    label={passenger.name.split(' ').map(n => n[0]).join('')}
                    style={styles.passengerAvatar}
                  />
                  <View style={styles.passengerDetails}>
                    <Text variant="bodyMedium" style={styles.passengerName}>
                      {passenger.name}
                    </Text>
                    <Text variant="bodySmall" style={styles.passengerProgram}>
                      {passenger.program}
                    </Text>
                  </View>
                  <View style={styles.passengerRating}>
                    <Icon source="star" size={14} color="#FFD700" />
                    <Text variant="bodySmall" style={styles.ratingText}>
                      {passenger.rating}
                    </Text>
                  </View>
                </View>
              ))}
            </Card.Content>
          </Card>
        )}

        {/* Información de creación */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="bodySmall" style={styles.createdInfo}>
              Publicado el {new Date(currentTrip.createdAt).toLocaleDateString('es-CO')} a las {new Date(currentTrip.createdAt).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </Card.Content>
        </Card>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Botón de acción flotante */}
      <FAB
        icon={
          isDriver ? "cog" : 
          isPassenger ? "message" : 
          currentTrip.status === 'available' ? "plus" : "clock"
        }
        style={styles.fab}
        onPress={() => {}}
        label={
          isDriver ? "Gestionar" :
          isPassenger ? "Chat" :
          currentTrip.status === 'available' ? "Solicitar" : "En espera"
        }
      />

      {/* Botones de acción inferiores */}
      {!isDriver && !isPassenger && currentTrip.status === 'available' && (
        <Surface style={styles.actionButtons}>
          <Button
            mode="outlined"
            style={styles.actionButton}
            onPress={() => {}}
          >
            Guardar
          </Button>
          <Button
            mode="contained"
            style={[styles.actionButton, styles.primaryButton]}
            onPress={() => {}}
          >
            {currentTrip.type === 'offer' ? 'Solicitar viaje' : 'Contactar'}
          </Button>
        </Surface>
      )}

      {/* Botones para conductor */}
      {isDriver && (
        <Surface style={styles.actionButtons}>
          <Button
            mode="outlined"
            style={styles.actionButton}
            onPress={() => setShowCancelDialog(true)}
            textColor="#FF3B30"
          >
            {currentTrip.status === 'available' ? 'Cancelar' : 'Eliminar'}
          </Button>
          <Button
            mode="contained"
            style={[styles.actionButton, styles.primaryButton]}
            onPress={() => {}}
          >
            Editar viaje
          </Button>
        </Surface>
      )}

      {/* Dialogs */}
      <Portal>
        <Dialog visible={showCancelDialog} onDismiss={() => setShowCancelDialog(false)}>
          <Dialog.Title>Confirmar cancelación</Dialog.Title>
          <Dialog.Content>
            <Text>¿Estás seguro de que quieres cancelar este viaje? Esta acción no se puede deshacer.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowCancelDialog(false)}>No, mantener</Button>
            <Button onPress={() => setShowCancelDialog(false)} textColor="#FF3B30">
              Sí, cancelar
            </Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={showPassengersDialog} onDismiss={() => setShowPassengersDialog(false)}>
          <Dialog.Title>Pasajeros confirmados</Dialog.Title>
          <Dialog.Content>
            <ScrollView style={styles.passengersList}>
              {mockPassengers.map((passenger) => (
                <List.Item
                  key={passenger.id}
                  title={passenger.name}
                  description={passenger.program}
                  left={(props) => (
                    <Avatar.Text 
                      {...props} 
                      size={40}
                      label={passenger.name.split(' ').map(n => n[0]).join('')}
                    />
                  )}
                  right={() => (
                    <View style={styles.passengerActions}>
                      <TouchableRipple style={styles.passengerAction}>
                        <Icon source="message" size={20} color="#40916C" />
                      </TouchableRipple>
                      <TouchableRipple style={styles.passengerAction}>
                        <Icon source="phone" size={20} color="#40916C" />
                      </TouchableRipple>
                    </View>
                  )}
                />
              ))}
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowPassengersDialog(false)}>Cerrar</Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={showContactDialog} onDismiss={() => setShowContactDialog(false)}>
          <Dialog.Title>Contactar conductor</Dialog.Title>
          <Dialog.Content>
            <Text>¿Cómo te gustaría contactar a {currentTrip.driverName}?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowContactDialog(false)}>Cancelar</Button>
            <Button onPress={() => setShowContactDialog(false)}>Chat interno</Button>
            <Button onPress={() => setShowContactDialog(false)}>WhatsApp</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    margin: 15,
    elevation: 3,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusBadge: {
    color: 'white',
  },
  tripType: {
    color: '#666',
    fontStyle: 'italic',
  },
  routeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 10,
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
    marginLeft: 8,
    flex: 1,
    fontWeight: 'bold',
    color: '#1B4332',
  },
  routeArrow: {
    paddingHorizontal: 10,
  },
  tripInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 6,
    fontWeight: 'bold',
    color: '#1B4332',
  },
  card: {
    margin: 15,
    marginBottom: 5,
    elevation: 2,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#1B4332',
    marginBottom: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  userAvatar: {
    backgroundColor: '#40916C',
  },
  userDetails: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    color: '#1B4332',
  },
  userProgram: {
    color: '#666',
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rating: {
    marginLeft: 4,
    color: '#666',
  },
  contactButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#E8F5E8',
  },
  vehicleInfo: {
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  vehicleTitle: {
    fontWeight: 'bold',
    color: '#1B4332',
    marginBottom: 4,
  },
  vehicleDetails: {
    color: '#666',
    marginBottom: 2,
  },
  vehiclePlate: {
    color: '#999',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    marginLeft: 8,
    flex: 1,
    color: '#666',
  },
  detailValue: {
    fontWeight: 'bold',
    color: '#1B4332',
  },
  priceText: {
    fontWeight: 'bold',
    color: '#40916C',
  },
  meetingPointContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#E8F5E8',
    borderRadius: 8,
  },
  meetingPointDetails: {
    marginLeft: 8,
    flex: 1,
  },
  meetingPointLabel: {
    fontWeight: 'bold',
    color: '#1B4332',
    marginBottom: 4,
  },
  meetingPointText: {
    color: '#1B4332',
  },
  recurrentContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  recurrentDetails: {
    marginLeft: 8,
    flex: 1,
  },
  recurrentLabel: {
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayChip: {
    marginRight: 6,
    marginBottom: 4,
    backgroundColor: '#E3F2FD',
  },
  divider: {
    marginVertical: 15,
  },
  descriptionContainer: {
    marginBottom: 15,
  },
  descriptionLabel: {
    fontWeight: 'bold',
    color: '#1B4332',
    marginBottom: 8,
  },
  descriptionText: {
    color: '#666',
    lineHeight: 20,
  },
  tagsContainer: {
    marginTop: 15,
  },
  tagsLabel: {
    fontWeight: 'bold',
    color: '#1B4332',
    marginBottom: 8,
  },
  tagsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagChip: {
    marginRight: 6,
    marginBottom: 4,
    backgroundColor: '#FFF3E0',
  },
  passengersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  viewAllButton: {
    padding: 4,
  },
  viewAllText: {
    color: '#40916C',
    fontWeight: 'bold',
  },
  passengerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  passengerAvatar: {
    backgroundColor: '#52B788',
  },
  passengerDetails: {
    marginLeft: 12,
    flex: 1,
  },
  passengerName: {
    fontWeight: 'bold',
    color: '#1B4332',
  },
  passengerProgram: {
    color: '#666',
    marginTop: 2,
  },
  passengerRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 2,
    color: '#666',
  },
  createdInfo: {
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 100,
    backgroundColor: '#40916C',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 15,
    elevation: 8,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  primaryButton: {
    backgroundColor: '#40916C',
  },
  passengersList: {
    maxHeight: 250,
  },
  passengerActions: {
    flexDirection: 'row',
  },
  passengerAction: {
    padding: 8,
    marginLeft: 4,
    borderRadius: 16,
    backgroundColor: '#E8F5E8',
  },
});