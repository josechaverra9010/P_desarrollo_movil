import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
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
} from 'react-native-paper';

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
      showSnackbar('Por favor completa todos los campos obligatorios');
      return;
    }
    showSnackbar('Oferta de viaje creada exitosamente');
    // Aquí iría la lógica para crear la oferta
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
            <Avatar.Icon size={50} icon="car-plus" style={styles.avatar} />
            <Text variant="headlineSmall" style={styles.title}>
              Ofrecer Viaje
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              Comparte tu ruta y ahorra
            </Text>
          </View>
        </View>
      </Surface>

      <Card style={styles.formCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.cardTitle}>
            Detalles de tu oferta
          </Text>

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Tipo de ruta
          </Text>
          <SegmentedButtons
            value={routeType}
            onValueChange={setRouteType}
            buttons={[
              { value: 'universidad', label: 'A Universidad' },
              { value: 'casa', label: 'A Casa' },
            ]}
            style={styles.segmentedButtons}
          />

          <TextInput
            label="Ruta detallada *"
            value={tripData.route}
            onChangeText={(text) => setTripData({ ...tripData, route: text })}
            mode="outlined"
            style={styles.input}
            multiline
            numberOfLines={2}
            right={<TextInput.Icon icon="map" />}
            placeholder="Ej: Kennedy - Centro - Universidad UTCH"
          />

          <TextInput
            label="Punto de encuentro *"
            value={tripData.meetingPoint}
            onChangeText={(text) => setTripData({ ...tripData, meetingPoint: text })}
            mode="outlined"
            style={styles.input}
            right={<TextInput.Icon icon="map-marker" />}
            placeholder="Ej: Parque Kennedy, frente al semáforo"
          />

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Horarios disponibles *
          </Text>
          <View style={styles.chipContainer}>
            {timeSlots.map((time) => (
              <Chip
                key={time}
                selected={selectedTimes.includes(time)}
                onPress={() => toggleTimeSlot(time)}
                style={[
                  styles.timeChip,
                  selectedTimes.includes(time) && styles.selectedChip
                ]}
                textStyle={selectedTimes.includes(time) && styles.selectedChipText}
              >
                {time}
              </Chip>
            ))}
          </View>

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Cupos disponibles
              </Text>
              <View style={styles.chipContainer}>
                {seatOptions.map((seat) => (
                  <Chip
                    key={seat}
                    selected={tripData.availableSeats === seat}
                    onPress={() => setTripData({ ...tripData, availableSeats: seat })}
                    style={[
                      styles.seatChip,
                      tripData.availableSeats === seat && styles.selectedChip
                    ]}
                    textStyle={tripData.availableSeats === seat && styles.selectedChipText}
                  >
                    {seat} {seat === '1' ? 'cupo' : 'cupos'}
                  </Chip>
                ))}
              </View>
            </View>

            <View style={styles.halfWidth}>
              <TextInput
                label="Precio sugerido"
                value={tripData.price}
                onChangeText={(text) => setTripData({ ...tripData, price: text })}
                mode="outlined"
                keyboardType="numeric"
                style={styles.priceInput}
                right={<TextInput.Icon icon="currency-usd" />}
                placeholder="Ej: 2000"
              />
            </View>
          </View>

          <TextInput
            label="Observaciones"
            value={tripData.observations}
            onChangeText={(text) => setTripData({ ...tripData, observations: text })}
            mode="outlined"
            multiline
            numberOfLines={3}
            style={styles.input}
            placeholder="Ej: No fumar, música permitida, aire acondicionado..."
          />

          <Button
            mode="contained"
            onPress={handleCreateOffer}
            icon="car"
            style={styles.button}
          >
            Publicar Oferta
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
  priceInput: {
    marginBottom: 15,
    marginTop: 10,
  },
  sectionTitle: {
    marginTop: 10,
    marginBottom: 10,
    color: '#1B4332',
    fontWeight: '600',
  },
  segmentedButtons: {
    marginBottom: 15,
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
  seatChip: {
    margin: 2,
    backgroundColor: '#E8F5E8',
  },
  selectedChip: {
    backgroundColor: '#40916C',
  },
  selectedChipText: {
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  button: {
    marginTop: 20,
    paddingVertical: 5,
    backgroundColor: '#40916C',
  },
});