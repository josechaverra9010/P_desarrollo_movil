import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, LoginData } from './types';
import usuariosData from './usuarios.json';

const AUTH_TOKEN_KEY = '@utch_chompi_token';
const USER_DATA_KEY = '@utch_chompi_user';

export class AuthService {
  // Simular autenticación con datos locales
  static async login(credentials: LoginData): Promise<{ success: boolean; user?: User; message?: string }> {
    try {
      // Buscar usuario en los datos locales
      const userFound = usuariosData.find(
        (user: any) => user.email === credentials.email && user.password === credentials.password
      );

      if (!userFound) {
        return {
          success: false,
          message: 'Correo o contraseña incorrectos'
        };
      }

      if (!userFound.activo) {
        return {
          success: false,
          message: 'Tu cuenta está desactivada. Contacta al administrador.'
        };
      }

      // Generar token simulado
      const token = this.generateToken(userFound.email);
      
      // Guardar token y datos del usuario
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userFound));

      return {
        success: true,
        user: userFound as User
      };

    } catch (error) {
      return {
        success: false,
        message: 'Error al iniciar sesión. Inténtalo de nuevo.'
      };
    }
  }

  // Cerrar sesión
  static async logout(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, USER_DATA_KEY]);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  // Verificar si el usuario está autenticado
  static async isAuthenticated(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      return token !== null;
    } catch (error) {
      return false;
    }
  }

  // Obtener datos del usuario actual
  static async getCurrentUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(USER_DATA_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  }

  // Obtener token actual
  static async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    } catch (error) {
      return null;
    }
  }

  // Generar token simulado
  private static generateToken(email: string): string {
    const timestamp = Date.now().toString();
    const randomString = Math.random().toString(36).substring(2);
    return `${email}_${timestamp}_${randomString}`;
  }

  // Validar formato de email institucional
  static validateInstitutionalEmail(email: string): boolean {
    return email.toLowerCase().endsWith('@utch.edu.co');
  }

  // Validar fortaleza de contraseña
  static validatePassword(password: string): { isValid: boolean; message?: string } {
    if (password.length < 6) {
      return {
        isValid: false,
        message: 'La contraseña debe tener al menos 6 caracteres'
      };
    }
    return { isValid: true };
  }
}