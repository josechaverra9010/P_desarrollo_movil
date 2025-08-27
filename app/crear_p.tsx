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
  
  const timeSlots = ['6:00 AM', '7:00 AM', '8:00 AM', '12:00 PM', '1:00 PM', '5:00 PM', '6:00 PM'];

  const handleCreateRequest = () => {
    if (!tripData.origin || !selectedTimeSlot) {
      showSnackbar('Por favor completa todos los campos obligatorios');
      return;
    }
    showSnackbar('Solicitud de viaje creada exitosamente');
    // Aquí iría la lógica para crear la solicitud
  };

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.headerSurface}>
        <View style={styles.headerRow}>
          <IconButton
            icon="arrow-left"
            iconColor="white"
            size={24}
            onPress={onBack}
          />
          <View style={styles.headerContent}>
            <Avatar.Icon size={50} icon="map-marker-plus" style={styles.avatar} />
            <Text variant="headlineSmall" style={styles.title}>
              Solicitar Viaje
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              Encuentra tu transporte ideal
            </Text>
          </View>
        </View>
      </Surface>

      <Card style={styles.formCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.cardTitle}>
            Detalles de tu solicitud
          </Text>

          <TextInput
            label="Ubicación de origen *"
            value={tripData.origin}
            onChangeText={(text) => setTripData({ ...tripData, origin: text })}
            mode="outlined"
            style={styles.input}
            right={<TextInput.Icon icon="map-marker" />}
            placeholder="Ej: Barrio Kennedy, Calle 25"
          />

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Destino
          </Text>
          <RadioButton.Group 
            onValueChange={(value) => setTripData({ ...tripData, destination: value })} 
            value={tripData.destination}
          >
            <View style={styles.radioRow}>
              <RadioButton value="universidad" />
              <Text variant="bodyLarge" style={styles.radioLabel}>Universidad UTCH</Text>
            </View>
            <View style={styles.radioRow}>
              <RadioButton value="casa" />
              <Text variant="bodyLarge" style={styles.radioLabel}>Casa</Text>
            </View>
          </RadioButton.Group>

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Horario preferido *
          </Text>
          <View style={styles.chipContainer}>
            {timeSlots.map((time) => (
              <Chip
                key={time}
                selected={selectedTimeSlot === time}
                onPress={() => setSelectedTimeSlot(time)}
                style={[
                  styles.timeChip,
                  selectedTimeSlot === time && styles.selectedChip
                ]}
                textStyle={selectedTimeSlot === time && styles.selectedChipText}
              >
                {time}
              </Chip>
            ))}
          </View>

          <TextInput
            label="Observaciones especiales"
            value={tripData.observations}
            onChangeText={(text) => setTripData({ ...tripData, observations: text })}
            mode="outlined"
            multiline
            numberOfLines={3}
            style={styles.input}
            placeholder="Ej: Tengo equipaje, prefiero música suave..."
          />

          <Button
            mode="contained"
            onPress={handleCreateRequest}
            icon="send"
            style={styles.button}
          >
            Crear Solicitud
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7FF',
  },
  headerSurface: {
    backgroundColor: '#1B4332',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
    marginRight: 40,
  },
  avatar: {
    backgroundColor: '#40916C',
    marginBottom: 5,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#E8F5E8',
    textAlign: 'center',
    marginTop: 5,
  },
  formCard: {
    margin: 20,
    elevation: 4,
  },
  cardTitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#1B4332',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 15,
  },
  sectionTitle: {
    marginTop: 10,
    marginBottom: 10,
    color: '#1B4332',
    fontWeight: '600',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  radioLabel: {
    marginLeft: 8,
    color: '#333',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  timeChip: {
    margin: 4,
    backgroundColor: '#E8F5E8',
  },
  selectedChip: {
    backgroundColor: '#40916C',
  },
  selectedChipText: {
    color: 'white',
  },
  button: {
    marginTop: 20,
    paddingVertical: 5,
    backgroundColor: '#40916C',
  },
});