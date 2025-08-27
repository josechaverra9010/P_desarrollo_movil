import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, FlatList, StatusBar } from 'react-native';
import {
  Surface,
  Searchbar,
  Button,
  Text,
  Card,
  Avatar,
  Chip,
  IconButton,
  FAB,
  Badge,
  List,
  Divider,
  TouchableRipple,
  Icon,
} from 'react-native-paper';

interface Trip {
  id: string;
  driverName: string;
  route: string;
  time: string;
  price: string;
  availableSeats: number;
  program: string;
  rating: number;
  type: 'request' | 'offer';
  distance: string;
  meetingPoint: string;
  verified: boolean;
}

interface SearchTripsScreenProps {
  onBack: () => void;
  showSnackbar: (message: string) => void;
  onNavigateToChompi: () => void; // Añade esta nueva prop para la navegación
}

export default function SearchTripsScreen({ 
  onBack, 
  showSnackbar,
  onNavigateToChompi // Incluye la nueva prop en la desestructuración
}: SearchTripsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const mockTrips: Trip[] = [
    {
      id: '1',
      driverName: 'Ana García',
      route: 'Kennedy → Universidad UTCH',
      time: '7:00 AM',
      price: '2500',
      availableSeats: 2,
      program: 'Ingeniería de Sistemas',
      rating: 4.8,
      type: 'offer',
      distance: '5.2 km',
      meetingPoint: 'Parque Kennedy',
      verified: true
    },
    {
      id: '2',
      driverName: 'Carlos Rodríguez',
      route: 'Centro → Universidad UTCH',
      time: '7:30 AM',
      price: '2000',
      availableSeats: 1,
      program: 'Administración',
      rating: 4.5,
      type: 'offer',
      distance: '3.8 km',
      meetingPoint: 'Terminal de Transporte',
      verified: true
    },
    {
      id: '3',
      driverName: 'María López',
      route: 'Necesito: Universidad → Kennedy',
      time: '5:00 PM',
      price: '2500',
      availableSeats: 1,
      program: 'Derecho',
      rating: 4.9,
      type: 'request',
      distance: '5.2 km',
      meetingPoint: 'Campus Principal',
      verified: true
    }
  ];

  const filterOptions = [
    { id: 'morning', label: 'Mañana (6-12)', icon: 'weather-sunrise', color: '#FF9800' },
    { id: 'afternoon', label: 'Tarde (12-18)', icon: 'weather-sunny', color: '#FFC107' },
    { id: 'evening', label: 'Noche (18-22)', icon: 'weather-night', color: '#9C27B0' },
    { id: 'universidad', label: 'A Universidad', icon: 'school', color: '#2E7D32' },
    { id: 'casa', label: 'A Casa', icon: 'home', color: '#1976D2' },
    { id: 'economico', label: 'Económico', icon: 'currency-usd', color: '#388E3C' },
    { id: 'verificado', label: 'Verificado', icon: 'shield-check', color: '#0D4A2B' }
  ];

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId)
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  const renderTripItem = ({ item }: { item: Trip }) => (
    <Card style={styles.tripCard}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.tripHeader}>
          <View style={styles.driverInfo}>
            <Avatar.Text size={48} label={item.driverName.split(' ').map(n => n[0]).join('')} style={styles.driverAvatar} />
            <View style={styles.driverDetails}>
              <View style={styles.nameRow}>
                <Text variant="titleMedium" style={styles.driverName}>{item.driverName}</Text>
                {item.verified && (
                  <Icon source="shield-check" size={16} color="#2E7D32" />
                )}
              </View>
              <Text variant="bodySmall" style={styles.program}>{item.program}</Text>
              <View style={styles.ratingRow}>
                <Icon source="star" size={14} color="#FFD700" />
                <Text variant="bodySmall" style={styles.rating}>{item.rating}</Text>
              </View>
            </View>
          </View>
          <View style={styles.tripTypeContainer}>
            <Badge 
              style={[
                styles.typeBadge, 
                item.type === 'offer' ? styles.offerBadge : styles.requestBadge
              ]}
            >
              {item.type === 'offer' ? 'Oferta' : 'Solicitud'}
            </Badge>
            <Text variant="titleLarge" style={styles.price}>${item.price}</Text>
          </View>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.routeContainer}>
          <Icon source="map-marker-path" size={20} color="#2E7D32" />
          <Text variant="bodyLarge" style={styles.routeText}>{item.route}</Text>
        </View>

        <View style={styles.tripDetailsGrid}>
          <View style={styles.detailItem}>
            <Icon source="clock" size={16} color="#666" />
            <Text variant="bodyMedium" style={styles.detailText}>{item.time}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon source="account-multiple" size={16} color="#666" />
            <Text variant="bodyMedium" style={styles.detailText}>{item.availableSeats} cupos</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon source="map-marker-distance" size={16} color="#666" />
            <Text variant="bodyMedium" style={styles.detailText}>{item.distance}</Text>
          </View>
        </View>

        <View style={styles.meetingPointContainer}>
          <Icon source="map-marker-account" size={16} color="#0D4A2B" />
          <Text variant="bodySmall" style={styles.meetingPoint}>
            Punto de encuentro: {item.meetingPoint}
          </Text>
        </View>

        <View style={styles.actionButtons}>
          <Button 
            mode="outlined" 
            style={styles.contactButton}
            onPress={() => showSnackbar('Chat iniciado')}
            icon="message"
          >
            Contactar
          </Button>
          <Button 
            mode="contained" 
            style={styles.primaryButton}
            onPress={() => {
              // Lógica modificada: redirigir a 'chompi' si es una oferta
              if (item.type === 'offer') {
                onNavigateToChompi();
              } else {
                showSnackbar('Oferta enviada');
              }
            }}
            icon={item.type === 'offer' ? 'hand-wave' : 'car'}
          >
            {item.type === 'offer' ? 'Solicitar' : 'Ofrecer'}
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0D4A2B" barStyle="light-content" />
      
      {/* Header */}
      <Surface style={styles.headerSurface}>
        <View style={styles.headerRow}>
          <IconButton
            icon="arrow-left"
            iconColor="white"
            size={24}
            onPress={onBack}
          />
          <View style={styles.headerContent}>
            <Avatar.Icon size={48} icon="magnify" style={styles.headerAvatar} />
            <Text variant="headlineMedium" style={styles.headerTitle}>
              Buscar Viajes
            </Text>
            <Text variant="bodyMedium" style={styles.headerSubtitle}>
              Encuentra tu viaje ideal
            </Text>
          </View>
          <IconButton
            icon={viewMode === 'list' ? 'map' : 'view-list'}
            iconColor="white"
            size={24}
            onPress={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
          />
        </View>
      </Surface>

      {/* Search and Filters */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Buscar por ruta, barrio o conductor..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
          iconColor="#2E7D32"
          theme={{ colors: { primary: '#2E7D32' } }}
        />
        
        <View style={styles.filterRow}>
          <Button
            mode={showFilters ? 'contained' : 'outlined'}
            style={[styles.filterButton, showFilters && styles.filterButtonActive]}
            icon="filter"
            onPress={() => setShowFilters(!showFilters)}
          >
            Filtros {selectedFilters.length > 0 && `(${selectedFilters.length})`}
          </Button>
          {selectedFilters.length > 0 && (
            <Button
              mode="text"
              onPress={clearFilters}
              textColor="#666"
            >
              Limpiar
            </Button>
          )}
        </View>

        {showFilters && (
          <Card style={styles.filtersCard}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.filtersTitle}>
                Filtrar resultados
              </Text>
              <View style={styles.filtersContainer}>
                {filterOptions.map((filter) => (
                  <Chip
                    key={filter.id}
                    selected={selectedFilters.includes(filter.id)}
                    onPress={() => toggleFilter(filter.id)}
                    icon={filter.icon}
                    style={[
                      styles.filterChip,
                      selectedFilters.includes(filter.id) && { 
                        backgroundColor: filter.color + '20',
                        borderColor: filter.color 
                      }
                    ]}
                    textStyle={[
                      styles.filterChipText,
                      selectedFilters.includes(filter.id) && { color: filter.color }
                    ]}
                  >
                    {filter.label}
                  </Chip>
                ))}
              </View>
            </Card.Content>
          </Card>
        )}
      </View>

      {/* Content */}
      {viewMode === 'list' ? (
        <FlatList
          data={mockTrips}
          renderItem={renderTripItem}
          keyExtractor={(item) => item.id}
          style={styles.tripsList}
          contentContainerStyle={styles.tripsListContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Card style={styles.mapCard}>
          <Card.Content style={styles.mapPlaceholder}>
            <Icon source="map" size={80} color="#2E7D32" />
            <Text variant="headlineMedium" style={styles.mapTitle}>Vista de Mapa</Text>
            <Text variant="bodyLarge" style={styles.mapText}>
              Aquí se mostraría el mapa interactivo con las rutas y puntos de encuentro
            </Text>
            <Button 
              mode="outlined" 
              style={styles.mapButton}
              icon="map-marker"
            >
              Mostrar en mapa
            </Button>
          </Card.Content>
        </Card>
      )}

      {/* FAB */}
      <FAB
        icon="bell"
        style={styles.fab}
        onPress={() => showSnackbar('Notificaciones de coincidencias activadas')}
        label="Alertas"
        color="white"
      />
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
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingBottom: 20,
    elevation: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerAvatar: {
    backgroundColor: '#2E7D32',
    marginBottom: 8,
  },
  headerTitle: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: 4,
  },
  searchContainer: {
    padding: 20,
    marginTop: -10,
  },
  searchbar: {
    marginBottom: 16,
    elevation: 4,
    borderRadius: 16,
    backgroundColor: 'white',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterButton: {
    borderColor: '#2E7D32',
    borderRadius: 12,
  },
  filterButtonActive: {
    backgroundColor: '#2E7D32',
  },
  filtersCard: {
    elevation: 4,
    borderRadius: 16,
    backgroundColor: 'white',
  },
  filtersTitle: {
    marginBottom: 16,
    color: '#0D4A2B',
    fontWeight: '600',
  },
  filtersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterChip: {
    margin: 4,
    backgroundColor: '#F5F5F5',
  },
  filterChipText: {
    fontSize: 12,
  },
  tripsList: {
    flex: 1,
  },
  tripsListContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  tripCard: {
    marginBottom: 16,
    elevation: 6,
    borderRadius: 20,
    backgroundColor: 'white',
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
    backgroundColor: '#2E7D32',
  },
  driverDetails: {
    marginLeft: 12,
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  driverName: {
    fontWeight: '700',
    color: '#0D4A2B',
  },
  program: {
    color: '#666',
    marginTop: 2,
    fontSize: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 2,
  },
  rating: {
    color: '#FFD700',
    fontWeight: '600',
    fontSize: 12,
  },
  tripTypeContainer: {
    alignItems: 'flex-end',
  },
  typeBadge: {
    marginBottom: 8,
  },
  offerBadge: {
    backgroundColor: '#2E7D32',
  },
  requestBadge: {
    backgroundColor: '#FF9800',
  },
  price: {
    fontWeight: '700',
    color: '#0D4A2B',
  },
  divider: {
    backgroundColor: '#E0E0E0',
    marginBottom: 16,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8F0',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  routeText: {
    marginLeft: 8,
    fontWeight: '600',
    color: '#0D4A2B',
    flex: 1,
  },
  tripDetailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    color: '#666',
    fontSize: 13,
  },
  meetingPointContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  meetingPoint: {
    marginLeft: 6,
    color: '#0D4A2B',
    flex: 1,
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  contactButton: {
    flex: 1,
    borderColor: '#2E7D32',
    borderRadius: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#2E7D32',
    borderRadius: 12,
  },
  mapCard: {
    margin: 20,
    flex: 1,
    elevation: 6,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  mapPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 400,
    padding: 40,
  },
  mapTitle: {
    color: '#0D4A2B',
    fontWeight: '700',
    marginTop: 20,
    textAlign: 'center',
  },
  mapText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 12,
    lineHeight: 24,
  },
  mapButton: {
    marginTop: 24,
    borderColor: '#2E7D32',
    borderRadius: 12,
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: '#2E7D32',
    borderRadius: 16,
  },
});