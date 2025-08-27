import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, TouchableOpacity, Alert } from 'react-native';
import {
  Surface,
  TextInput,
  Button,
  Text,
  Card,
  Avatar,
  Chip,
  IconButton,
  SegmentedButtons,
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

interface CreateTripOfferProps {
  onBack: () => void;
  showSnackbar: (message: string) => void;
}

export default function CreateTripOfferScreen({ 
  onBack, 
  showSnackbar 
}: CreateTripOfferProps) {
  const [tripData, setTripData] = useState({
    route: '',
    meetingPoint: '',
    availableSeats: '1',
    price: '',
    observations: ''
  });
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [routeType, setRouteType] = useState('universidad');
  const [isLoading, setIsLoading] = useState(false);
  
  const timeSlots = ['6:00 AM', '7:00 AM', '8:00 AM', '12:00 PM', '1:00 PM', '5:00 PM', '6:00 PM'];
  const seatOptions = ['1', '2', '3', '4'];

  const toggleTimeSlot = (time: string) => {
    setSelectedTimes(prev => 
      prev.includes(time) 
        ? prev.filter(t => t !== time)
        : [...prev, time]
    );
  };

  const handleCreateOffer = () => {
    if (!tripData.route || selectedTimes.length === 0 || !tripData.meetingPoint) {
      Alert.alert(
        "Campos requeridos",
        "Por favor completa todos los campos obligatorios:\n• Ruta detallada\n• Punto de encuentro\n• Al menos un horario",
        [{ text: "Entendido", style: "default" }]
      );
      return;
    }

    setIsLoading(true);

    // Simular proceso de creación
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        "¡Oferta Publicada!",
        `Tu oferta de Chompi ha sido publicada exitosamente.\n\nDetalles:\n• Ruta: ${tripData.route}\n• Punto: ${tripData.meetingPoint}\n• Horarios: ${selectedTimes.join(', ')}\n• Cupos: ${tripData.availableSeats}`,
        [
          {
            text: "Ver Ofertas",
            onPress: () => showSnackbar('Redirigiendo a tus ofertas...')
          },
          {
            text: "Compartir",
            onPress: () => {
              Alert.alert(
                "Compartir Oferta",
                "¿Cómo deseas compartir tu oferta?",
                [
                  { text: "WhatsApp", onPress: () => showSnackbar('Compartiendo por WhatsApp...') },
                  { text: "Redes Sociales", onPress: () => showSnackbar('Compartiendo en redes...') },
                  { text: "Cancelar", style: "cancel" }
                ]
              );
            }
          }
        ]
      );
    }, 2000);
  };

  const handleSaveAsDraft = () => {
    Alert.alert(
      "Guardar Borrador",
      "¿Deseas guardar esta oferta como borrador para completarla más tarde?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Guardar",
          onPress: () => {
            showSnackbar('Borrador guardado exitosamente');
          }
        }
      ]
    );
  };

  const handlePreviewOffer = () => {
    if (!tripData.route || !tripData.meetingPoint) {
      showSnackbar('Completa los campos principales para ver la vista previa');
      return;
    }

    Alert.alert(
      "Vista Previa de tu Oferta",
      `Así verán tu oferta otros usuarios:\n\n🚗 Ruta: ${tripData.route || 'No especificada'}\n📍 Encuentro: ${tripData.meetingPoint || 'No especificado'}\n⏰ Horarios: ${selectedTimes.length ? selectedTimes.join(', ') : 'No seleccionados'}\n👥 Cupos: ${tripData.availableSeats}\n📝 Observaciones: ${tripData.observations || 'Ninguna'}`,
      [{ text: "Cerrar", style: "default" }]
    );
  };

  const handleQuickFill = () => {
    Alert.alert(
      "Autocompletar",
      "¿Deseas usar la información de tu última oferta?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Sí",
          onPress: () => {
            setTripData({
              route: 'Kennedy - Centro - Universidad UTCH',
              meetingPoint: 'Parque Kennedy, frente al semáforo',
              availableSeats: '2',
              price: '2000',
              observations: 'Aire acondicionado, música suave'
            });
            setSelectedTimes(['7:00 AM', '5:00 PM']);
            showSnackbar('Información autocompletada');
          }
        }
      ]
    );
  };

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
                <MaterialIcons name="directions-car" size={32} color="#FFFFFF" />
              </View>
              <Text variant="headlineMedium" style={styles.headerTitle}>
                Ofrecer Chompi
              </Text>
              <Text variant="bodyMedium" style={styles.headerSubtitle}>
                Comparte tu ruta y ahorra
              </Text>
            </View>
            
            <TouchableOpacity onPress={handleQuickFill} style={styles.backButton}>
              <MaterialIcons name="auto-fix-high" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Card style={styles.formCard}>
            <Card.Content style={styles.cardContent}>
              <Text variant="titleLarge" style={styles.cardTitle}>
                Detalles de tu oferta
              </Text>

              <View style={styles.inputSection}>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  <MaterialIcons name="alt-route" size={18} color="#1B5E96" />
                  {" "}Tipo de ruta
                </Text>
                <SegmentedButtons
                  value={routeType}
                  onValueChange={setRouteType}
                  buttons={[
                    { 
                      value: 'universidad', 
                      label: 'A Universidad',
                      icon: 'school'
                    },
                    { 
                      value: 'casa', 
                      label: 'A Casa',
                      icon: 'home'
                    },
                  ]}
                  style={styles.segmentedButtons}
                  theme={{ colors: { secondaryContainer: '#1B5E96', onSecondaryContainer: '#FFFFFF' } }}
                />
              </View>

              <View style={styles.inputSection}>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  <MaterialIcons name="map" size={18} color="#1B5E96" />
                  {" "}Ruta detallada *
                </Text>
                <TextInput
                  label="Describe tu ruta"
                  value={tripData.route}
                  onChangeText={(text) => setTripData({ ...tripData, route: text })}
                  mode="outlined"
                  style={styles.textArea}
                  multiline
                  numberOfLines={2}
                  right={<TextInput.Icon icon="map" />}
                  placeholder="Ej: Kennedy - Centro - Universidad UTCH"
                  theme={{ colors: { primary: '#1B5E96' } }}
                />
              </View>

              <View style={styles.inputSection}>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  <MaterialIcons name="location-on" size={18} color="#1B5E96" />
                  {" "}Punto de encuentro *
                </Text>
                <TextInput
                  label="¿Dónde recogerás a los pasajeros?"
                  value={tripData.meetingPoint}
                  onChangeText={(text) => setTripData({ ...tripData, meetingPoint: text })}
                  mode="outlined"
                  style={styles.input}
                  right={<TextInput.Icon icon="map-marker" />}
                  placeholder="Ej: Parque Kennedy, frente al semáforo"
                  theme={{ colors: { primary: '#1B5E96' } }}
                />
              </View>

              <View style={styles.inputSection}>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  <MaterialIcons name="schedule" size={18} color="#1B5E96" />
                  {" "}Horarios disponibles * ({selectedTimes.length} seleccionados)
                </Text>
                <View style={styles.chipContainer}>
                  {timeSlots.map((time) => (
                    <TouchableOpacity
                      key={time}
                      onPress={() => toggleTimeSlot(time)}
                    >
                      <Chip
                        selected={selectedTimes.includes(time)}
                        style={[
                          styles.timeChip,
                          selectedTimes.includes(time) && styles.selectedChip
                        ]}
                        textStyle={[
                          styles.chipText,
                          selectedTimes.includes(time) && styles.selectedChipText
                        ]}
                      >
                        {time}
                      </Chip>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.halfWidth}>
                  <Text variant="titleMedium" style={styles.sectionTitle}>
                    <MaterialIcons name="people" size={18} color="#1B5E96" />
                    {" "}Cupos disponibles
                  </Text>
                  <View style={styles.chipContainer}>
                    {seatOptions.map((seat) => (
                      <TouchableOpacity
                        key={seat}
                        onPress={() => setTripData({ ...tripData, availableSeats: seat })}
                      >
                        <Chip
                          selected={tripData.availableSeats === seat}
                          style={[
                            styles.seatChip,
                            tripData.availableSeats === seat && styles.selectedChip
                          ]}
                          textStyle={[
                            styles.chipText,
                            tripData.availableSeats === seat && styles.selectedChipText
                          ]}
                        >
                          {seat} {seat === '1' ? 'cupo' : 'cupos'}
                        </Chip>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                
              </View>

              <View style={styles.inputSection}>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  <MaterialIcons name="note" size={18} color="#1B5E96" />
                  {" "}Observaciones
                </Text>
                <TextInput
                  label="Información adicional"
                  value={tripData.observations}
                  onChangeText={(text) => setTripData({ ...tripData, observations: text })}
                  mode="outlined"
                  multiline
                  numberOfLines={3}
                  style={styles.textArea}
                  placeholder="Ej: No fumar, música permitida, aire acondicionado..."
                  theme={{ colors: { primary: '#1B5E96' } }}
                />
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={handleSaveAsDraft}
                >
                  <MaterialIcons name="save" size={20} color="#7F8C8D" />
                  <Text style={styles.secondaryButtonText}>Borrador</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={handlePreviewOffer}
                >
                  <MaterialIcons name="visibility" size={20} color="#7F8C8D" />
                  <Text style={styles.secondaryButtonText}>Vista Previa</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.primaryButton, isLoading && styles.primaryButtonDisabled]}
                  onPress={handleCreateOffer}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <MaterialIcons name="hourglass-empty" size={20} color="#FFFFFF" />
                      <Text style={styles.primaryButtonText}>Publicando...</Text>
                    </>
                  ) : (
                    <>
                      <MaterialIcons name="publish" size={20} color="#FFFFFF" />
                      <Text style={styles.primaryButtonText}>Publicar Chompi</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>
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
  scrollView: {
    flex: 1,
    marginTop: -10,
  },
  formCard: {
    margin: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  cardContent: {
    padding: 24,
  },
  cardTitle: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#2C3E50',
    fontWeight: '700',
  },
  inputSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    color: '#2C3E50',
    fontWeight: '600',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  textArea: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
    minHeight: 80,
  },
  priceInput: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
    marginTop: 8,
  },
  segmentedButtons: {
    backgroundColor: '#F8F9FA',
    elevation: 2,
    borderRadius: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeChip: {
    backgroundColor: '#F8F9FA',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    margin: 2,
  },
  seatChip: {
    backgroundColor: '#F8F9FA',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    margin: 2,
  },
  selectedChip: {
    backgroundColor: '#1B5E96',
    elevation: 4,
    borderColor: '#1B5E96',
  },
  chipText: {
    color: '#7F8C8D',
    fontWeight: '500',
  },
  selectedChipText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  halfWidth: {
    width: '48%',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E8E8E8',
    elevation: 2,
    gap: 6,
  },
  secondaryButtonText: {
    color: '#7F8C8D',
    fontWeight: '600',
    fontSize: 14,
  },
  primaryButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#1B5E96',
    elevation: 6,
    shadowColor: '#1B5E96',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    gap: 8,
  },
  primaryButtonDisabled: {
    backgroundColor: '#BDC3C7',
    elevation: 2,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});