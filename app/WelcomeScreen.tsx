import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import {
  Surface,
  Text,
  Button,
  Avatar,
  Card,
} from 'react-native-paper';

interface WelcomeScreenProps {
  onContinue: () => void;
}

export default function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  return (
    <View style={styles.container}>
      <Surface style={styles.header}>
        <Avatar.Icon size={120} icon="car" style={styles.logo} />
        <Text variant="displaySmall" style={styles.title}>
          UTCH Chompi
        </Text>
        <Text variant="titleMedium" style={styles.subtitle}>
          Comparte tu viaje, cuida el planeta
        </Text>
      </Surface>

      <View style={styles.content}>
        <Card style={styles.infoCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              ¡Bienvenido a tu plataforma de carpooling!
            </Text>
            
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <Avatar.Icon size={40} icon="account-group" style={styles.featureIcon} />
                <Text variant="bodyMedium" style={styles.featureText}>
                  Conecta con otros estudiantes de la UTCH
                </Text>
              </View>

              <View style={styles.featureItem}>
                <Avatar.Icon size={40} icon="currency-usd" style={styles.featureIcon} />
                <Text variant="bodyMedium" style={styles.featureText}>
                  Comparte gastos y ahorra dinero
                </Text>
              </View>

              <View style={styles.featureItem}>
                <Avatar.Icon size={40} icon="leaf" style={styles.featureIcon} />
                <Text variant="bodyMedium" style={styles.featureText}>
                  Contribuye al cuidado del medio ambiente
                </Text>
              </View>

              <View style={styles.featureItem}>
                <Avatar.Icon size={40} icon="shield-check" style={styles.featureIcon} />
                <Text variant="bodyMedium" style={styles.featureText}>
                  Viaja seguro con estudiantes verificados
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={onContinue}
          style={styles.continueButton}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          Comenzar
        </Button>

        <Text variant="bodySmall" style={styles.versionText}>
          Versión 1.0 - Universidad Tecnológica del Chocó
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7FF',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#1B4332',
  },
  logo: {
    backgroundColor: '#40916C',
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#E8F5E8',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  infoCard: {
    elevation: 4,
    marginBottom: 20,
  },
  cardTitle: {
    color: '#1B4332',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  featureList: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    backgroundColor: '#40916C',
    marginRight: 16,
  },
  featureText: {
    flex: 1,
    color: '#333',
  },
  continueButton: {
    backgroundColor: '#40916C',
    marginVertical: 20,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  versionText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
});