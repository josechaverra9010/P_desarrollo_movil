import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import {
  Surface,
  TextInput,
  Button,
  Text,
  Card,
  Avatar,
  IconButton,
  List,
  Divider,
  Badge,
  Chip,
  Provider as PaperProvider,
  DefaultTheme,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

// Tema personalizado con colores de la UTCH (mismo que LoginScreen)
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

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isMe: boolean;
  type: 'text' | 'trip-info' | 'system';
}

interface ChatScreenProps {
  onBack: () => void;
  showSnackbar: (message: string) => void;
}

export default function ChatScreen({ 
  onBack, 
  showSnackbar 
}: ChatScreenProps) {
  const [messageText, setMessageText] = useState('');
  const [tripConfirmed, setTripConfirmed] = useState(false);
  const [locationShared, setLocationShared] = useState(false);
  const router = useRouter();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: '2',
      senderName: 'Ana García',
      content: '¡Hola! Vi tu solicitud de viaje. ¿Todavía necesitas transporte mañana a las 7 AM?',
      timestamp: '10:30 AM',
      isMe: false,
      type: 'text'
    },
    {
      id: '2',
      senderId: '1',
      senderName: 'Yo',
      content: '¡Hola Ana! Sí, todavía lo necesito. ¿Cuál sería el punto de encuentro?',
      timestamp: '10:32 AM',
      isMe: true,
      type: 'text'
    },
    {
      id: '3',
      senderId: 'system',
      senderName: 'Sistema',
      content: 'Ana ha compartido los detalles del viaje',
      timestamp: '10:33 AM',
      isMe: false,
      type: 'system'
    },
    {
      id: '4',
      senderId: '2',
      senderName: 'Ana García',
      content: 'Perfecto. Nos encontramos en el Parque Kennedy, frente al semáforo principal.',
      timestamp: '10:34 AM',
      isMe: false,
      type: 'text'
    },
    {
      id: '5',
      senderId: '1',
      senderName: 'Yo',
      content: 'Excelente, me parece bien. ¿Confirmo entonces para mañana 7 AM?',
      timestamp: '10:35 AM',
      isMe: true,
      type: 'text'
    }
  ]);

  const contactInfo = {
    name: 'Ana García',
    program: 'Ingeniería de Telecomunicaciones e informatica',
    semester: '8vo Semestre',
    rating: 4.8,
    tripsCompleted: 25
  };

  const tripInfo = {
    route: 'Kennedy → Universidad UTCH',
    time: '7:00 AM',
    date: 'Mañana, 26 de Agosto',
    meetingPoint: 'Parque Kennedy'
  };

  const sendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: '1',
      senderName: 'Yo',
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessageText('');
    showSnackbar('Mensaje enviado');

    // Simular respuesta automática
    setTimeout(() => {
      const responses = [
        '¡Perfecto! Nos vemos mañana entonces.',
        'Confirmado, te escribo cuando salga de casa.',
        '¡Genial! ¿Llevas efectivo para el viaje?',
        'Todo listo, hasta mañana.'
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const autoReply: Message = {
        id: (Date.now() + 1).toString(),
        senderId: '2',
        senderName: 'Ana García',
        content: randomResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: false,
        type: 'text'
      };
      
      setMessages(prev => [...prev, autoReply]);
    }, 2000);
  };

  const handleConfirmTrip = () => {
    Alert.alert(
      "Confirmar Viaje",
      "¿Estás seguro de que deseas confirmar este viaje?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Confirmar",
          onPress: () => {
            setTripConfirmed(true);
            const systemMessage: Message = {
              id: Date.now().toString(),
              senderId: 'system',
              senderName: 'Sistema',
              content: '✅ Viaje confirmado. Ambos usuarios han sido notificados.',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isMe: false,
              type: 'system'
            };
            setMessages(prev => [...prev, systemMessage]);
            showSnackbar('¡Viaje confirmado exitosamente!');
          }
        }
      ]
    );
  };

  const handleCancelTrip = () => {
    Alert.alert(
      "Cancelar Viaje",
      "¿Estás seguro de que deseas cancelar este viaje? Esta acción no se puede deshacer.",
      [
        {
          text: "No cancelar",
          style: "cancel"
        },
        {
          text: "Sí, cancelar",
          style: "destructive",
          onPress: () => {
            const systemMessage: Message = {
              id: Date.now().toString(),
              senderId: 'system',
              senderName: 'Sistema',
              content: '❌ Viaje cancelado. Se ha notificado a ambos usuarios.',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isMe: false,
              type: 'system'
            };
            setMessages(prev => [...prev, systemMessage]);
            showSnackbar('Viaje cancelado');
          }
        }
      ]
    );
  };

  const handleShareLocation = () => {
    setLocationShared(true);
    const locationMessage: Message = {
      id: Date.now().toString(),
      senderId: '1',
      senderName: 'Yo',
      content: '📍 He compartido mi ubicación en tiempo real',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      type: 'text'
    };
    setMessages(prev => [...prev, locationMessage]);
    showSnackbar('Ubicación compartida en tiempo real');
  };

  const handleCall = () => {
    Alert.alert(
      "Llamar a Ana García",
      "¿Deseas llamar al conductor?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Llamar",
          onPress: () => {
            showSnackbar('Iniciando llamada...');
            // Aquí simularías la llamada
          }
        }
      ]
    );
  };

  const handleUserInfo = () => {
    Alert.alert(
      "Información del Usuario",
      `Nombre: ${contactInfo.name}\nPrograma: ${contactInfo.program}\nSemestre: ${contactInfo.semester}\nCalificación: ${contactInfo.rating}⭐\nViajes completados: ${contactInfo.tripsCompleted}`,
      [{ text: "Cerrar" }]
    );
  };

  const renderMessage = ({ item }: { item: Message }) => {
    if (item.type === 'system') {
      return (
        <View style={styles.systemMessage}>
          <Text variant="bodySmall" style={styles.systemMessageText}>
            {item.content}
          </Text>
        </View>
      );
    }

    return (
      <View style={[
        styles.messageContainer,
        item.isMe ? styles.myMessage : styles.otherMessage
      ]}>
        {!item.isMe && (
          <Avatar.Text 
            size={32} 
            label={item.senderName.split(' ').map(n => n[0]).join('')}
            style={styles.messageAvatar}
          />
        )}
        <View style={[
          styles.messageBubble,
          item.isMe ? styles.myMessageBubble : styles.otherMessageBubble
        ]}>
          <Text style={[
            styles.messageText,
            item.isMe ? styles.myMessageText : styles.otherMessageText
          ]}>
            {item.content}
          </Text>
          <Text style={[
            styles.messageTime,
            item.isMe ? styles.myMessageTime : styles.otherMessageTime
          ]}>
            {item.timestamp}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <PaperProvider theme={customTheme}>
      <View style={styles.container}>
        {/* Header con gradiente (mismo estilo que LoginScreen) */}
        <LinearGradient
          colors={['#1B5E96', '#2980B9']}
          style={styles.headerGradient}
        >
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <Avatar.Text 
              size={40} 
              label={contactInfo.name.split(' ').map(n => n[0]).join('')}
              style={styles.headerAvatar}
            />
            
            <View style={styles.headerInfo}>
              <Text variant="titleMedium" style={styles.contactName}>
                {contactInfo.name}
              </Text>
              <Text variant="bodySmall" style={styles.contactProgram}>
                {contactInfo.program}
              </Text>
            </View>
            
            <View style={styles.headerActions}>
              <TouchableOpacity onPress={handleCall} style={styles.headerActionButton}>
                <MaterialIcons name="phone" size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleUserInfo} style={styles.headerActionButton}>
                <MaterialIcons name="info" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        {/* Trip Info Card */}
        <Card style={styles.tripInfoCard}>
          <Card.Content style={styles.tripInfoContent}>
            <View style={styles.tripInfoHeader}>
              <MaterialIcons name="directions-car" size={24} color="#1B5E96" />
              <Text variant="titleMedium" style={styles.tripInfoTitle}>
                Detalles del viaje
              </Text>
              <Chip 
                icon={tripConfirmed ? "check-circle" : "clock"} 
                style={[styles.statusChip, tripConfirmed ? styles.confirmedChip : styles.pendingChip]}
                textStyle={styles.statusChipText}
              >
                {tripConfirmed ? "Confirmado" : "Pendiente"}
              </Chip>
            </View>
            
            <View style={styles.tripDetailsGrid}>
              <View style={styles.tripDetail}>
                <MaterialIcons name="route" size={16} color="#7F8C8D" />
                <Text variant="bodySmall" style={styles.tripDetailText}>{tripInfo.route}</Text>
              </View>
              <View style={styles.tripDetail}>
                <MaterialIcons name="schedule" size={16} color="#7F8C8D" />
                <Text variant="bodySmall" style={styles.tripDetailText}>{tripInfo.time}</Text>
              </View>
              <View style={styles.tripDetail}>
                <MaterialIcons name="calendar-today" size={16} color="#7F8C8D" />
                <Text variant="bodySmall" style={styles.tripDetailText}>{tripInfo.date}</Text>
              </View>
              
            </View>

            <Divider style={styles.tripInfoDivider} />

            <View style={styles.meetingPointRow}>
              <MaterialIcons name="location-on" size={18} color="#1B5E96" />
              <Text variant="bodyMedium" style={styles.meetingPointText}>
                Punto de encuentro: {tripInfo.meetingPoint}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Messages List */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          showsVerticalScrollIndicator={false}
          inverted
        />

        {/* Input Container */}
        <View style={styles.inputContainer}>
          <TextInput
            value={messageText}
            onChangeText={setMessageText}
            placeholder="Escribe un mensaje..."
            mode="outlined"
            style={styles.messageInput}
            multiline
            outlineColor="#BDC3C7"
            activeOutlineColor="#1B5E96"
            right={
              <TextInput.Icon
                icon="send"
                onPress={sendMessage}
                disabled={!messageText.trim()}
              />
            }
          />
          
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={[styles.quickActionButton, tripConfirmed ? styles.confirmedButton : styles.confirmButton]}
              onPress={handleConfirmTrip}
              disabled={tripConfirmed}
            >
              <MaterialIcons 
                name={tripConfirmed ? "check-circle" : "check"} 
                size={20} 
                color={tripConfirmed ? "#27AE60" : "#FFFFFF"} 
              />
              <Text style={[styles.quickActionText, tripConfirmed && styles.confirmedText]}>
                {tripConfirmed ? "Confirmado" : "Confirmar"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={handleCancelTrip}
            >
              <MaterialIcons name="cancel" size={20} color="#FFFFFF" />
              <Text style={styles.quickActionText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.locationButton, locationShared && styles.locationSharedButton]}
              onPress={handleShareLocation}
            >
              <MaterialIcons 
                name={locationShared ? "my-location" : "location-on"} 
                size={20} 
                color="#FFFFFF" 
              />
              <Text style={styles.quickActionText}>
                {locationShared ? "Compartiendo" : "Ubicación"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
  headerAvatar: {
    backgroundColor: '#F39C12',
    marginLeft: 12,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  contactName: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  contactProgram: {
    color: '#E3F2FD',
    marginTop: 2,
    opacity: 0.9,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerActionButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  tripInfoCard: {
    margin: 20,
    marginTop: -10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    borderRadius: 16,
  },
  tripInfoContent: {
    padding: 20,
  },
  tripInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  tripInfoTitle: {
    color: '#2C3E50',
    fontWeight: '700',
    flex: 1,
  },
  statusChip: {
    elevation: 2,
  },
  confirmedChip: {
    backgroundColor: '#27AE60',
  },
  pendingChip: {
    backgroundColor: '#F39C12',
  },
  statusChipText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  },
  tripDetailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tripDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 8,
    gap: 8,
  },
  tripDetailText: {
    color: '#7F8C8D',
    flex: 1,
  },
  tripInfoDivider: {
    backgroundColor: '#ECF0F1',
    marginVertical: 12,
  },
  meetingPointRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  meetingPointText: {
    color: '#2C3E50',
    flex: 1,
    fontWeight: '500',
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-end',
  },
  myMessage: {
    justifyContent: 'flex-end',
  },
  otherMessage: {
    justifyContent: 'flex-start',
  },
  messageAvatar: {
    marginRight: 8,
    backgroundColor: '#1B5E96',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  myMessageBubble: {
    backgroundColor: '#1B5E96',
    borderBottomRightRadius: 4,
  },
  otherMessageBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  myMessageText: {
    color: '#FFFFFF',
  },
  otherMessageText: {
    color: '#2C3E50',
  },
  messageTime: {
    fontSize: 12,
    marginTop: 4,
  },
  myMessageTime: {
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'right',
  },
  otherMessageTime: {
    color: '#7F8C8D',
  },
  systemMessage: {
    alignItems: 'center',
    marginVertical: 8,
  },
  systemMessageText: {
    color: '#7F8C8D',
    fontStyle: 'italic',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    elevation: 1,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  messageInput: {
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 8,
  },
  quickActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
  },
  confirmButton: {
    backgroundColor: '#1B5E96',
  },
  confirmedButton: {
    backgroundColor: '#E8F5E8',
    borderWidth: 1,
    borderColor: '#27AE60',
  },
  cancelButton: {
    backgroundColor: '#E74C3C',
  },
  locationButton: {
    backgroundColor: '#F39C12',
  },
  locationSharedButton: {
    backgroundColor: '#27AE60',
  },
  quickActionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  confirmedText: {
    color: '#27AE60',
  },
});