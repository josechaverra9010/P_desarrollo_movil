import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
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
  Switch,
} from 'react-native-paper';

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
  const [isFlexible, setIsFlexible] = useState(false);
  const [maxPrice, setMaxPrice] = useState('');
  
  const timeSlots = ['6:00 AM', '7:00 AM', '8:00 AM', '12:00 PM', '1:00 PM', '5:00 PM', '6:00 PM'];
  const flexibleRanges = ['± 15 min', '± 30 min', '± 1 hora'];

  const handleCreateRequest = () => {
    if (!tripData.origin || !selectedTimeSlot) {
      showSnackbar('Por favor completa todos los campos obligatorios');
      return;
    }
    showSnackbar('Solicitud de chompi creada exitosamente');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Surface style={styles.header}>
        <View style={styles.headerContent}>
          <IconButton
            icon="arrow-left"
            iconColor="white"
            size={24}
            onPress={onBack}
            style={styles.backButton}
          />
          
          <View style={styles.headerInfo}>
            <View style={styles.avatarContainer}>
              <Avatar.Icon 
                size={56} 
                icon="map-search" 
                style={styles.headerAvatar}
              />
            </View>
            <Text variant="headlineSmall" style={styles.headerTitle}>
              Solicitar chompi
            </Text>
            <Text variant="bodyMedium" style={styles.headerSubtitle}>
              Encuentra tu transporte ideal
            </Text>
          </View>
        </View>
      </Surface>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Location Details */}
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconContainer}>
                <IconButton icon="map-marker-multiple" size={20} iconColor="#003366" />
              </View>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Ubicaciones
              </Text>
            </View>

            <TextInput
              label="Ubicación de origen"
              value={tripData.origin}
              onChangeText={(text) => setTripData({ ...tripData, origin: text })}
              mode="outlined"
              style={styles.textInput}
              left={<TextInput.Icon icon="map-marker" />}
              placeholder="Ej: Barrio Kennedy, Calle 25"
              outlineStyle={styles.inputOutline}
            />

            <View style={styles.destinationContainer}>
              <Text variant="bodyMedium" style={styles.inputLabel}>
                Destino
              </Text>
              <RadioButton.Group 
                onValueChange={(value) => setTripData({ ...tripData, destination: value })} 
                value={tripData.destination}
              >
                <View style={styles.radioOption}>
                  <View style={styles.radioRow}>
                    <RadioButton 
                      value="universidad" 
                      color="#003366"
                    />
                    <View style={styles.radioContent}>
                      <View style={styles.radioIconContainer}>
                        <IconButton icon="school" size={16} iconColor="#003366" />
                      </View>
                      <View style={styles.radioTextContainer}>
                        <Text variant="bodyLarge" style={styles.radioLabel}>
                          Universidad UTCH
                        </Text>
                        <Text variant="bodySmall" style={styles.radioDescription}>
                          Campus principal
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                
                <View style={styles.radioOption}>
                  <View style={styles.radioRow}>
                    <RadioButton 
                      value="casa" 
                      color="#003366"
                    />
                    <View style={styles.radioContent}>
                      <View style={styles.radioIconContainer}>
                        <IconButton icon="home" size={16} iconColor="#003366" />
                      </View>
                      <View style={styles.radioTextContainer}>
                        <Text variant="bodyLarge" style={styles.radioLabel}>
                          A Casa
                        </Text>
                        <Text variant="bodySmall" style={styles.radioDescription}>
                          Vuelta a casa desde la universidad
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </RadioButton.Group>
            </View>
          </Card.Content>
        </Card>

        {/* Time Configuration */}
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconContainer}>
                <IconButton icon="clock-outline" size={20} iconColor="#003366" />
              </View>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Horario preferido
              </Text>
            </View>

            <View style={styles.chipsGrid}>
              {timeSlots.map((time) => (
                <Chip
                  key={time}
                  selected={selectedTimeSlot === time}
                  onPress={() => setSelectedTimeSlot(time)}
                  style={[
                    styles.timeChip,
                    selectedTimeSlot === time && styles.selectedTimeChip
                  ]}
                  textStyle={[
                    styles.chipText,
                    selectedTimeSlot === time && styles.selectedChipText
                  ]}
                  showSelectedCheck={false}
                >
                  {time}
                </Chip>
              ))}
            </View>

            {/* Flexible Time Toggle */}
            <View style={styles.switchContainer}>
              <View style={styles.switchInfo}>
                <Text variant="bodyLarge" style={styles.switchLabel}>
                  Horario flexible
                </Text>
                <Text variant="bodySmall" style={styles.switchDescription}>
                  Aceptar variaciones en el horario
                </Text>
              </View>
              <Switch
                value={isFlexible}
                onValueChange={setIsFlexible}
                thumbColor={isFlexible ? '#003366' : '#f4f3f4'}
                trackColor={{ false: '#E0E0E0', true: '#B3D9FF' }}
              />
            </View>

            {isFlexible && (
              <View style={styles.flexibilityContainer}>
                <Text variant="bodyMedium" style={styles.flexibilityLabel}>
                  Rango de flexibilidad:
                </Text>
                <View style={styles.flexibilityChips}>
                  {flexibleRanges.map((range) => (
                    <Chip
                      key={range}
                      style={styles.flexibilityChip}
                      textStyle={styles.flexibilityChipText}
                      onPress={() => showSnackbar(`Flexibilidad configurada: ${range}`)}
                    >
                      {range}
                    </Chip>
                  ))}
                </View>
              </View>
            )}
          </Card.Content>
        </Card>

       

        {/* Additional Information */}
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconContainer}>
                <IconButton icon="message-text-outline" size={20} iconColor="#003366" />
              </View>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Información adicional
              </Text>
            </View>

            <TextInput
              label="Observaciones especiales"
              value={tripData.observations}
              onChangeText={(text) => setTripData({ ...tripData, observations: text })}
              mode="outlined"
              multiline
              numberOfLines={4}
              style={styles.textAreaInput}
              placeholder="Ej: Tengo equipaje, prefiero música suave, soy estudiante de último semestre..."
              outlineStyle={styles.inputOutline}
            />

            <View style={styles.infoCard}>
              <View style={styles.infoIconContainer}>
                <IconButton icon="lightbulb-outline" size={20} iconColor="#FFC107" />
              </View>
              <View style={styles.infoContent}>
                <Text variant="bodyMedium" style={styles.infoTitle}>
                  Consejo
                </Text>
                <Text variant="bodySmall" style={styles.infoText}>
                  Mientras más detalles proporciones, más fácil será encontrar el chompi perfecto para ti.
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <Button
            mode="outlined"
            style={styles.cancelButton}
            labelStyle={styles.cancelButtonText}
            onPress={onBack}
            icon="close"
          >
            Cancelar
          </Button>
          <Button
            mode="contained"
            style={styles.createButton}
            onPress={handleCreateRequest}
            icon="send"
          >
            Crear Solicitud
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#003366',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  backButton: {
    margin: 0,
  },
  headerInfo: {
    flex: 1,
    alignItems: 'center',
    marginRight: 40,
  },
  avatarContainer: {
    marginBottom: 12,
  },
  headerAvatar: {
    backgroundColor: '#0066CC',
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: '#B3D9FF',
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  card: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardContent: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F3F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    color: '#003366',
    fontWeight: '600',
  },
  textInput: {
    marginBottom: 16,
    backgroundColor: '#FAFAFA',
  },
  textAreaInput: {
    marginBottom: 16,
    backgroundColor: '#FAFAFA',
  },
  inputOutline: {
    borderColor: '#E0E0E0',
  },
  inputLabel: {
    color: '#003366',
    fontWeight: '500',
    marginBottom: 12,
  },
  destinationContainer: {
    marginTop: 8,
  },
  radioOption: {
    marginBottom: 8,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radioIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioTextContainer: {
    flex: 1,
  },
  radioLabel: {
    color: '#003366',
    fontWeight: '500',
  },
  radioDescription: {
    color: '#6C757D',
    marginTop: 2,
  },
  chipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeChip: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedTimeChip: {
    backgroundColor: '#003366',
    borderColor: '#003366',
  },
  chipText: {
    color: '#6C757D',
    fontWeight: '500',
  },
  selectedChipText: {
    color: 'white',
    fontWeight: '600',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F3F4',
  },
  switchInfo: {
    flex: 1,
  },
  switchLabel: {
    color: '#003366',
    fontWeight: '500',
  },
  switchDescription: {
    color: '#6C757D',
    marginTop: 2,
  },
  flexibilityContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F3F4',
  },
  flexibilityLabel: {
    color: '#003366',
    fontWeight: '500',
    marginBottom: 12,
  },
  flexibilityChips: {
    flexDirection: 'row',
    gap: 8,
  },
  flexibilityChip: {
    backgroundColor: '#FFF3CD',
    borderWidth: 1,
    borderColor: '#FFEAA7',
  },
  flexibilityChipText: {
    color: '#856404',
    fontSize: 12,
  },
  preferencesLabel: {
    color: '#003366',
    fontWeight: '500',
    marginBottom: 12,
    marginTop: 8,
  },
  preferencesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  preferenceChip: {
    backgroundColor: '#E8F4FD',
    borderWidth: 1,
    borderColor: '#B3D9FF',
  },
  preferenceChipText: {
    color: '#0066CC',
    fontSize: 12,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF9E6',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#FFE066',
  },
  infoIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFEB99',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    color: '#856404',
    fontWeight: '600',
    marginBottom: 4,
  },
  infoText: {
    color: '#856404',
    lineHeight: 18,
  },
  actionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    borderColor: '#6C757D',
    borderRadius: 12,
  },
  cancelButtonText: {
    color: '#6C757D',
  },
  createButton: {
    flex: 2,
    backgroundColor: '#003366',
    borderRadius: 12,
  },
});