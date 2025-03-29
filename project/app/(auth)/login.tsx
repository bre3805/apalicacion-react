import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!correo || !contrasena) {
      Alert.alert('Error', 'Por favor ingresa tu correo y contraseña');
      return;
    }

    setLoading(true);
    try {
      // Aquí iría la lógica para verificar las credenciales con el backend
      await iniciarSesion(correo, contrasena);
      
      // Si la autenticación es exitosa, redirigir al usuario a la app
      router.replace('/(app)');
    } catch (error: any) {
      Alert.alert('Error de inicio de sesión', error.message);
    } finally {
      setLoading(false);
    }
  }

  // Función simulada para iniciar sesión
  async function iniciarSesion(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Simulación de verificación con el servidor
      setTimeout(() => {
        // Aquí se verificaría con el backend si las credenciales son válidas
        if (email === 'usuario@ejemplo.com' && password === '123456') {
          resolve();
        } else {
          reject(new Error('Correo o contraseña incorrectos'));
        }
      }, 1000);
    });
  }

  return (


<View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu correo electrónico"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu contraseña"
          value={contrasena}
          onChangeText={setContrasena}
          secureTextEntry
        />
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.linkButton}
          onPress={() => router.push('/register.tsx')}
        >
          <Text style={styles.linkText}>
            ¿No tienes cuenta? Regístrate aquí
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontFamily: 'Inter_400Regular',
  },
  button: {
    backgroundColor: '#007AFF',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#007AFF',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  }
});