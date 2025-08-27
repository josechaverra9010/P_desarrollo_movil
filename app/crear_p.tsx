import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, TouchableOpacity, Alert } from 'react-native';
import {
  Surface,
  TextInput,
  Button,
  Text,
  Card,
  Avatar,
  RadioButton,
  Chip,
  IconButton,
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

interface CreateTripRequestProps {
  onBack: () => void;
  showSnackbar: (message: string) => void;
}

export default function CreateTripRequestScreen({ 
  onBack, 
  showSnackbar 
}: CreateTripRequestProps) {
  const [tripData, setTripData] = useState({
    origin: '',
    destination: 'universidad',
    time: '',
    date: '',
    observations: ''
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const timeSlots = ['6:00 AM', '7:00 AM', '8:00 AM', '12:00 PM', '1:00 PM', '5:00 PM', '6:00 PM'];

  const handleCreateRequest = () => {
    if (!tripData.origin || !selectedTimeSlot) {
      Alert.alert(
        "Campos requeridos",
        "Por favor completa todos los campos obligatorios:\n• Ubicación de origen\n• Horario preferido",
        [{ text: "Entendido", style: "default" }]
      );
      return;
    }

    setIsLoading(true);
    
    // Simular proceso de creación
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        "¡Solicitud Creada!",
        `Tu solicitud de Chompi ha sido publicada exitosamente.\n\nDetalles:\n• Origen: ${tripData.origin}\n• Destino: ${tripData.destination === 'universidad' ? 'Universidad UTCH' : 'Casa'}\n• Horario: ${selectedTimeSlot}`,
        [
          {
            text: "Ver Solicitudes",
            onPress: () => showSnackbar('Redirigiendo a tus solicitudes...')
          },
          {
            text: "Nueva Solicitud",
            onPress: () => {
              // Reset form
              setTripData({
                origin: '',
                destination: 'universidad',
                time: '',
                date: '',
                observations: ''
              });
              setSelectedTimeSlot('');
              showSnackbar('Formulario reiniciado');
            }
          }
        ]
      );
    }, 2000);
  };

  const handleSaveAsDraft = () => {
    Alert.alert(
      "Guardar Borrador",
      "¿Deseas guardar esta solicitud como borrador para completarla más tarde?",
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

  const handleQuickFill = () => {
    Alert.alert(
      "Autocompletar",
      "¿Deseas usar la información de tu último viaje?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Sí",
          onPress: () => {
            setTripData({
              ...tripData,
              origin: 'Barrio Kennedy, Calle 25',
              observations: 'Prefiero música suave'
            });
            setSelectedTimeSlot('7:00 AM');
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
                <MaterialIcons name="waving-hand" size={32} color="#FFFFFF" />
              </View>
              <Text variant="headlineMedium" style={styles.headerTitle}>
                Solicitar Chompi
              </Text>
              <Text variant="bodyMedium" style={styles.headerSubtitle}>
                Encuentra tu transporte ideal
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
                Detalles de tu solicitud
              </Text>

              <View style={styles.inputSection}>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  <MaterialIcons name="location-on" size={18} color="#1B5E96" />
                  {" "}Ubicación de origen *
                </Text>
                <TextInput
                  label="¿Desde dónde viajas?"
                  value={tripData.origin}
                  onChangeText={(text) => setTripData({ ...tripData, origin: text })}
                  mode="outlined"
                  style={styles.input}
                  right={<TextInput.Icon icon="map-marker" />}
                  placeholder="Ej: Barrio Kennedy, Calle 25"
                  theme={{ colors: { primary: '#1B5E96' } }}
                />
              </View>

              <View style={styles.inputSection}>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  <MaterialIcons name="flag" size={18} color="#1B5E96" />
                  {" "}Destino
                </Text>
                <Card style={styles.radioCard}>
                  <Card.Content style={styles.radioContent}>
                    <RadioButton.Group 
                      onValueChange={(value) => setTripData({ ...tripData, destination: value })} 
                      value={tripData.destination}
                    >
                      <TouchableOpacity
                        style={[styles.radioOption, tripData.destination === 'universidad' && styles.radioOptionSelected]}
                        onPress={() => setTripData({ ...tripData, destination: 'universidad' })}
                      >
                        <RadioButton value="universidad" color="#1B5E96" />
                        <MaterialIcons name="school" size={20} color={tripData.destination === 'universidad' ? '#1B5E96' : '#7F8C8D'} />
                        <Text variant="bodyLarge" style={[styles.radioLabel, tripData.destination === 'universidad' && styles.radioLabelSelected]}>
                          Universidad UTCH
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.radioOption, tripData.destination === 'casa' && styles.radioOptionSelected]}
                        onPress={() => setTripData({ ...tripData, destination: 'casa' })}
                      >
                        <RadioButton value="casa" color="#1B5E96" />
                        <MaterialIcons name="home" size={20} color={tripData.destination === 'casa' ? '#1B5E96' : '#7F8C8D'} />
                        <Text variant="bodyLarge" style={[styles.radioLabel, tripData.destination === 'casa' && styles.radioLabelSelected]}>
                          Casa
                        </Text>
                      </TouchableOpacity>
                    </RadioButton.Group>
                  </Card.Content>
                </Card>
              </View>

              <View style={styles.inputSection}>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  <MaterialIcons name="schedule" size={18} color="#1B5E96" />
                  {" "}Horario preferido *
                </Text>
                <View style={styles.chipContainer}>
                  {timeSlots.map((time) => (
                    <TouchableOpacity
                      key={time}
                      onPress={() => setSelectedTimeSlot(time)}
                    >
                      <Chip
                        selected={selectedTimeSlot === time}
                        style={[
                          styles.timeChip,
                          selectedTimeSlot === time && styles.selectedChip
                        ]}
                        textStyle={[
                          styles.chipText,
                          selectedTimeSlot === time && styles.selectedChipText
                        ]}
                      >
                        {time}
                      </Chip>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputSection}>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  <MaterialIcons name="note" size={18} color="#1B5E96" />
                  {" "}Observaciones especiales
                </Text>
                <TextInput
                  label="Información adicional"
                  value={tripData.observations}
                  onChangeText={(text) => setTripData({ ...tripData, observations: text })}
                  mode="outlined"
                  multiline
                  numberOfLines={3}
                  style={styles.textArea}
                  placeholder="Ej: Tengo equipaje, prefiero música suave..."
                  theme={{ colors: { primary: '#1B5E96' } }}
                />
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.draftButton}
                  onPress={handleSaveAsDraft}
                >
                  <MaterialIcons name="save" size={20} color="#7F8C8D" />
                  <Text style={styles.draftButtonText}>Guardar Borrador</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.primaryButton, isLoading && styles.primaryButtonDisabled]}
                  onPress={handleCreateRequest}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <MaterialIcons name="hourglass-empty" size={20} color="#FFFFFF" />
                      <Text style={styles.primaryButtonText}>Creando...</Text>
                    </>
                  ) : (
                    <>
                      <MaterialIcons name="send" size={20} color="#FFFFFF" />
                      <Text style={styles.primaryButtonText}>Crear Solicitud</Text>
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
    minHeight: 100,
  },
  radioCard: {
    backgroundColor: '#F8F9FA',
    elevation: 2,
    borderRadius: 12,
  },
  radioContent: {
    padding: 12,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 4,
  },
  radioOptionSelected: {
    backgroundColor: 'rgba(27, 94, 150, 0.1)',
  },
  radioLabel: {
    marginLeft: 12,
    color: '#7F8C8D',
    fontSize: 16,
  },
  radioLabelSelected: {
    color: '#1B5E96',
    fontWeight: '600',
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
  },
  selectedChip: {
    backgroundColor: '#1B5E96',
    elevation: 4,
  },
  chipText: {
    color: '#7F8C8D',
    fontWeight: '500',
  },
  selectedChipText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  draftButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E8E8E8',
    elevation: 2,
    gap: 8,
  },
  draftButtonText: {
    color: '#7F8C8D',
    fontWeight: '600',
    fontSize: 16,
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