import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, FlatList } from 'react-native';
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
} from 'react-native-paper';

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
      content: 'Perfecto. Nos encontramos en el Parque Kennedy, frente al semáforo principal. El costo sería $2500 pesos.',
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
    program: 'Ingeniería de Sistemas',
    semester: '8vo Semestre',
    rating: 4.8,
    tripsCompleted: 25
  };

  const tripInfo = {
    route: 'Kennedy → Universidad UTCH',
    time: '7:00 AM',
    date: 'Mañana, 26 de Agosto',
    price: '$2,500',
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
    <View style={styles.container}>
      <Surface style={styles.headerSurface}>
        <View style={styles.headerRow}>
          <IconButton
            icon="arrow-left"
            iconColor="white"
            size={24}
            onPress={onBack}
          />
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
            <IconButton
              icon="phone"
              iconColor="white"
              size={20}
              onPress={() => showSnackbar('Función de llamada no disponible')}
            />
            <IconButton
              icon="information"
              iconColor="white"
              size={20}
              onPress={() => showSnackbar('Información del usuario')}
            />
          </View>
        </View>
      </Surface>

      <Card style={styles.tripInfoCard}>
        <Card.Content>
          <View style={styles.tripInfoHeader}>
            <Text variant="titleMedium" style={styles.tripInfoTitle}>
              Detalles del viaje
            </Text>
            <Chip icon="car" style={styles.statusChip}>
              Confirmado
            </Chip>
          </View>
          <View style={styles.tripDetailsGrid}>
            <View style={styles.tripDetail}>
              <IconButton icon="map-marker-path" size={16} />
              <Text variant="bodySmall">{tripInfo.route}</Text>
            </View>
            <View style={styles.tripDetail}>
              <IconButton icon="clock" size={16} />
              <Text variant="bodySmall">{tripInfo.time}</Text>
            </View>
            <View style={styles.tripDetail}>
              <IconButton icon="calendar" size={16} />
              <Text variant="bodySmall">{tripInfo.date}</Text>
            </View>
            <View style={styles.tripDetail}>
              <IconButton icon="currency-usd" size={16} />
              <Text variant="bodySmall">{tripInfo.price}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        showsVerticalScrollIndicator={false}
        inverted
      />

      <View style={styles.inputContainer}>
        <TextInput
          value={messageText}
          onChangeText={setMessageText}
          placeholder="Escribe un mensaje..."
          mode="outlined"
          style={styles.messageInput}
          multiline
          right={
            <TextInput.Icon
              icon="send"
              onPress={sendMessage}
              disabled={!messageText.trim()}
            />
          }
        />
        <View style={styles.quickActions}>
          <Button
            mode="outlined"
            compact
            onPress={() => showSnackbar('Viaje confirmado')}
            style={styles.quickActionButton}
          >
            Confirmar
          </Button>
          <Button
            mode="outlined"
            compact
            onPress={() => showSnackbar('Viaje cancelado')}
            style={styles.quickActionButton}
          >
            Cancelar
          </Button>
          <Button
            mode="outlined"
            compact
            onPress={() => showSnackbar('Ubicación compartida')}
            style={styles.quickActionButton}
          >
            Ubicación
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7FF',
  },
  headerSurface: {
    backgroundColor: '#1B4332',
    paddingBottom: 15,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  headerAvatar: {
    backgroundColor: '#40916C',
    marginLeft: 10,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  contactName: {
    color: 'white',
    fontWeight: 'bold',
  },
  contactProgram: {
    color: '#E8F5E8',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
  },
  tripInfoCard: {
    margin: 15,
    elevation: 3,
  },
  tripInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tripInfoTitle: {
    color: '#1B4332',
    fontWeight: 'bold',
  },
  statusChip: {
    backgroundColor: '#4CAF50',
  },
  tripDetailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tripDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 5,
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 15,
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
    backgroundColor: '#40916C',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  myMessageBubble: {
    backgroundColor: '#40916C',
    borderBottomRightRadius: 4,
  },
  otherMessageBubble: {
    backgroundColor: '#E8F5E8',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  myMessageText: {
    color: 'white',
  },
  otherMessageText: {
    color: '#333',
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
    color: '#666',
  },
  systemMessage: {
    alignItems: 'center',
    marginVertical: 8,
  },
  systemMessageText: {
    color: '#666',
    fontStyle: 'italic',
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  inputContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 15,
    elevation: 8,
  },
  messageInput: {
    marginBottom: 10,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickActionButton: {
    borderColor: '#40916C',
    flex: 1,
    marginHorizontal: 5,
  },
});