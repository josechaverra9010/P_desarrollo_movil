import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, FlatList, StatusBar, TouchableOpacity, Alert } from 'react-native';
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
  onNavigateToChompi: () => void;
  onNavigateToChat: () => void; // Añadida la nueva prop de navegación
}

export default function SearchTripsScreen({ 
  onBack, 
  showSnackbar,
  onNavigateToChompi,
  onNavigateToChat // Recibimos la nueva prop
}: SearchTripsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [isSearching, setIsSearching] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(false);

  const mockTrips: Trip[] = [
    {
      id: '1',
      driverName: 'Ana García',
      route: 'Kennedy → Universidad UTCH',
      time: '7:00 AM',
      price: '',
      availableSeats: 2,
      program: 'Ingeniería de Telecomunicaciones e informatica',
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
      price: '',
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
      price: '',
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
    { id: 'morning', label: 'Mañana (6-12)', icon: 'wb-sunny', color: '#FF9800' },
    { id: 'afternoon', label: 'Tarde (12-18)', icon: 'wb-sunny', color: '#FFC107' },
    { id: 'evening', label: 'Noche (18-22)', icon: 'nights-stay', color: '#9C27B0' },
    { id: 'universidad', label: 'A Universidad', icon: 'school', color: '#2E7D32' },
    { id: 'casa', label: 'A Casa', icon: 'home', color: '#1976D2' },
    { id: 'economico', label: 'Económico', icon: 'attach-money', color: '#388E3C' },
    { id: 'verificado', label: 'Verificado', icon: 'verified', color: '#0D4A2B' }
  ];

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId)
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
    showSnackbar(`Filtro ${filterId} ${selectedFilters.includes(filterId) ? 'removido' : 'aplicado'}`);
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    showSnackbar('Filtros limpiados');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      setIsSearching(true);
      setTimeout(() => {
        setIsSearching(false);
        showSnackbar(`Búsqueda realizada: "${query}"`);
      }, 1000);
    }
  };

  const handleContactDriver = (driverName: string) => {
    Alert.alert(
      "Contactar Conductor",
      `¿Deseas iniciar chat con ${driverName}?`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Iniciar Chat",
          onPress: () => {
            onNavigateToChat(); // Navega a la pantalla de chat
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

  const handleTripAction = (item: Trip) => {
    if (item.type === 'offer') {
      Alert.alert(
        "Solicitar Chompi",
        `¿Deseas solicitar el Chompi con ${item.driverName}?\n\nRuta: ${item.route}\nHora: ${item.time}\n`,
        [
          {
            text: "Cancelar",
            style: "cancel"
          },
          {
            text: "Solicitar",
            onPress: () => {
              onNavigateToChompi(); // Navega a la pantalla de Chompi
            }
          }
        ]
      );
    } else {
      Alert.alert(
        "Ofrecer Chompi",
        `¿Deseas ofrecer transporte a ${item.driverName}?\n\nRuta: ${item.route}\nHora: ${item.time}`,
        [
          {
            text: "Cancelar",
            style: "cancel"
          },
          {
            text: "Ofrecer",
            onPress: () => {
              onNavigateToChompi(); // Navega a la pantalla de Chompi
            }
          }
        ]
      );
    }
  };

  const toggleAlerts = () => {
    setAlertsEnabled(!alertsEnabled);
    showSnackbar(alertsEnabled ? 'Alertas desactivadas' : 'Alertas de coincidencias activadas');
  };

  const handleMapView = () => {
    if (viewMode === 'map') {
      Alert.alert(
        "Vista de Mapa",
        "Funciones disponibles en el mapa:",
        [
          {
            text: "Ver ruta",
            onPress: () => showSnackbar('Mostrando ruta en mapa...')
          },
          {
            text: "Puntos de encuentro",
            onPress: () => showSnackbar('Mostrando puntos de encuentro...')
          },
          {
            text: "Cerrar",
            style: "cancel"
          }
        ]
      );
    } else {
      setViewMode('map');
      showSnackbar('Cambiando a vista de mapa...');
    }
  };

  const renderTripItem = ({ item }: { item: Trip }) => (
    <Card style={styles.tripCard}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.tripHeader}>
          <View style={styles.driverInfo}>
            <Avatar.Text 
              size={56} 
              label={item.driverName.split(' ').map(n => n[0]).join('')} 
              style={[styles.driverAvatar, { backgroundColor: '#1B5E96' }]}
            />
            <View style={styles.driverDetails}>
              <View style={styles.nameRow}>
                <Text variant="titleMedium" style={styles.driverName}>{item.driverName}</Text>
                {item.verified && (
                  <MaterialIcons name="verified" size={18} color="#2E7D32" />
                )}
              </View>
              <Text variant="bodySmall" style={styles.program}>{item.program}</Text>
              <View style={styles.ratingRow}>
                <MaterialIcons name="star" size={16} color="#FFD700" />
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
            
          </View>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.routeContainer}>
          <MaterialIcons name="alt-route" size={24} color="#1B5E96" />
          <Text variant="titleMedium" style={styles.routeText}>{item.route}</Text>
        </View>

        <View style={styles.tripDetailsGrid}>
          <View style={styles.detailItem}>
            <MaterialIcons name="schedule" size={18} color="#7F8C8D" />
            <Text variant="bodyMedium" style={styles.detailText}>{item.time}</Text>
          </View>
          <View style={styles.detailItem}>
            <MaterialIcons name="people" size={18} color="#7F8C8D" />
            <Text variant="bodyMedium" style={styles.detailText}>{item.availableSeats} cupos</Text>
          </View>
          <View style={styles.detailItem}>
            <MaterialIcons name="straighten" size={18} color="#7F8C8D" />
            <Text variant="bodyMedium" style={styles.detailText}>{item.distance}</Text>
          </View>
        </View>

        <View style={styles.meetingPointContainer}>
          <MaterialIcons name="location-on" size={18} color="#1B5E96" />
          <Text variant="bodyMedium" style={styles.meetingPoint}>
            Punto de encuentro: {item.meetingPoint}
          </Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => handleContactDriver(item.driverName)}
          >
            <MaterialIcons name="chat" size={18} color="#1B5E96" />
            <Text style={styles.contactButtonText}>Contactar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.primaryButton, item.type === 'offer' ? styles.requestButton : styles.offerButton]}
            onPress={() => handleTripAction(item)}
          >
            <MaterialIcons 
              name={item.type === 'offer' ? 'waving-hand' : 'directions-car'} 
              size={18} 
              color="#FFFFFF" 
            />
            <Text style={styles.primaryButtonText}>
              {item.type === 'offer' ? 'Solicitar' : 'Ofrecer'}
            </Text>
          </TouchableOpacity>
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
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <View style={styles.headerContent}>
              <View style={styles.headerIconContainer}>
                <MaterialIcons name="search" size={32} color="#FFFFFF" />
              </View>
              <Text variant="headlineMedium" style={styles.headerTitle}>
                Buscar Chompi
              </Text>
              <Text variant="bodyMedium" style={styles.headerSubtitle}>
                Encuentra tu Chompi ideal
              </Text>
            </View>
            
            <TouchableOpacity 
              onPress={() => {
                setViewMode(viewMode === 'list' ? 'map' : 'list');
                if (viewMode === 'list') handleMapView();
              }} 
              style={styles.backButton}
            >
              <MaterialIcons 
                name={viewMode === 'list' ? 'map' : 'list'} 
                size={24} 
                color="#FFFFFF" 
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Search and Filters */}
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Buscar por ruta, barrio o conductor..."
            onChangeText={handleSearch}
            value={searchQuery}
            style={styles.searchbar}
            iconColor="#1B5E96"
            loading={isSearching}
            theme={{ colors: { primary: '#1B5E96' } }}
          />
          
          <View style={styles.filterRow}>
            <TouchableOpacity
              style={[styles.filterButton, showFilters && styles.filterButtonActive]}
              onPress={() => setShowFilters(!showFilters)}
            >
              <MaterialIcons 
                name="filter-list" 
                size={20} 
                color={showFilters ? "#FFFFFF" : "#1B5E96"} 
              />
              <Text style={[styles.filterButtonText, showFilters && styles.filterButtonTextActive]}>
                Filtros {selectedFilters.length > 0 && `(${selectedFilters.length})`}
              </Text>
            </TouchableOpacity>
            
            {selectedFilters.length > 0 && (
              <TouchableOpacity onPress={clearFilters}>
                <Text style={styles.clearFiltersText}>Limpiar</Text>
              </TouchableOpacity>
            )}
          </View>

          {showFilters && (
            <Card style={styles.filtersCard}>
              <Card.Content style={styles.filtersContent}>
                <Text variant="titleMedium" style={styles.filtersTitle}>
                  Filtrar resultados
                </Text>
                <View style={styles.filtersContainer}>
                  {filterOptions.map((filter) => (
                    <Chip
                      key={filter.id}
                      selected={selectedFilters.includes(filter.id)}
                      onPress={() => toggleFilter(filter.id)}
                      icon={() => <MaterialIcons name={filter.icon} size={16} color={selectedFilters.includes(filter.id) ? filter.color : '#7F8C8D'} />}
                      style={[
                        styles.filterChip,
                        selectedFilters.includes(filter.id) && { 
                          backgroundColor: filter.color + '20',
                          borderColor: filter.color,
                          borderWidth: 1
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
              <View style={styles.mapIconContainer}>
                <MaterialIcons name="map" size={80} color="#1B5E96" />
              </View>
              <Text variant="headlineMedium" style={styles.mapTitle}>Vista de Mapa</Text>
              <Text variant="bodyLarge" style={styles.mapText}>
                Aquí se mostraría el mapa interactivo con las rutas y puntos de encuentro
              </Text>
              <TouchableOpacity 
                style={styles.mapButton}
                onPress={() => showSnackbar('Cargando mapa interactivo...')}
              >
                <MaterialIcons name="location-on" size={20} color="#1B5E96" />
                <Text style={styles.mapButtonText}>Mostrar en mapa</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        )}

        {/* FAB */}
        <FAB
          icon={() => <MaterialIcons name="notifications" size={24} color="#FFFFFF" />}
          style={[styles.fab, alertsEnabled && styles.fabActive]}
          onPress={toggleAlerts}
          label={alertsEnabled ? "Alertas ON" : "Alertas"}
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
  searchContainer: {
    padding: 20,
    marginTop: -10,
  },
  searchbar: {
    marginBottom: 16,
    elevation: 8,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1B5E96',
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  filterButtonActive: {
    backgroundColor: '#1B5E96',
  },
  filterButtonText: {
    color: '#1B5E96',
    marginLeft: 6,
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  clearFiltersText: {
    color: '#7F8C8D',
    fontSize: 14,
  },
  filtersCard: {
    elevation: 8,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  filtersContent: {
    padding: 20,
  },
  filtersTitle: {
    marginBottom: 16,
    color: '#2C3E50',
    fontWeight: '700',
  },
  filtersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterChip: {
    margin: 4,
    backgroundColor: '#F8F9FA',
    elevation: 2,
  },
  filterChipText: {
    fontSize: 12,
    color: '#7F8C8D',
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
    elevation: 8,
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
  program: {
    color: '#7F8C8D',
    marginTop: 4,
    fontSize: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  rating: {
    color: '#7F8C8D',
    fontWeight: '600',
    fontSize: 13,
  },
  tripTypeContainer: {
    alignItems: 'flex-end',
  },
  typeBadge: {
    marginBottom: 12,
    elevation: 2,
  },
  offerBadge: {
    backgroundColor: '#2E7D32',
  },
  requestBadge: {
    backgroundColor: '#F39C12',
  },
  price: {
    fontWeight: '700',
    color: '#2C3E50',
  },
  divider: {
    backgroundColor: '#ECF0F1',
    marginBottom: 16,
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
  routeText: {
    marginLeft: 12,
    fontWeight: '700',
    color: '#2C3E50',
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
    gap: 6,
  },
  detailText: {
    color: '#7F8C8D',
    fontSize: 13,
    fontWeight: '500',
  },
  meetingPointContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F4FD',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  meetingPoint: {
    marginLeft: 8,
    color: '#2C3E50',
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
  },
  actionButtons: {
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
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    elevation: 4,
    gap: 6,
  },
  requestButton: {
    backgroundColor: '#2E7D32',
  },
  offerButton: {
    backgroundColor: '#F39C12',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  mapCard: {
    margin: 20,
    flex: 1,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  mapPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 400,
    padding: 40,
  },
  mapIconContainer: {
    backgroundColor: '#E8F4FD',
    padding: 24,
    borderRadius: 40,
    marginBottom: 24,
  },
  mapTitle: {
    color: '#2C3E50',
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  mapText: {
    textAlign: 'center',
    color: '#7F8C8D',
    marginBottom: 32,
    lineHeight: 24,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#1B5E96',
    elevation: 4,
    gap: 8,
  },
  mapButtonText: {
    color: '#1B5E96',
    fontWeight: '600',
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
  fabActive: {
    backgroundColor: '#2E7D32',
  },
});