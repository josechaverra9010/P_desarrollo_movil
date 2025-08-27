import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { List, Appbar, Provider as PaperProvider } from 'react-native-paper';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function App() {
  const router = useRouter();

  const menuItems = [
    { title: 'Login', icon: 'person', route: '/LoginScreen' },
    { title: 'Registro', icon: 'person', route: '/RegisterScreen' },
    { title: 'Chat', icon: 'person', route: '/chat' },
    { title: 'solicitar chompi', icon: 'person', route: '/createtriprequest' },
    { title: 'perfil', icon: 'person', route: '/perfil' },
    { title: 'Buscar Viajes', icon: 'login', route: '/buscar' },
    { title: 'crear Viajes conductor', icon: 'login', route: '/crear_c' },
    { title: 'crear Viajes pasajero', icon: 'login', route: '/crear_p' },
    { title: 'Dashboard pasajero', icon: 'login', route: '/Pantalla_pasajero' },
    { title: 'Detalles', icon: 'login', route: '/detalles' },
  ];

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Inventario App" />
      </Appbar.Header>
      <ScrollView style={styles.container}>
        {menuItems.map((item, index) => (
          <List.Item
            key={index}
            title={item.title}
            left={() => <MaterialIcons name={item.icon} size={24} />}
            right={() => <MaterialIcons name="chevron-right" size={24} />}
            onPress={() => router.push(item.route)}
            style={styles.listItem}
          />
        ))}
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listItem: {
    backgroundColor: 'white',
    marginVertical: 2,

    fontWeight: '500',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '400',
  },
});