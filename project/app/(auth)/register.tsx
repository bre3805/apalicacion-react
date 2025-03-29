import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';

export default function RegisterScreen() {
  const [nombre, setNombre] = useState('');
  const [torre, setTorre] = useState('');
  const [numero, setNumero] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [claveUnica, setClaveUnica] = useState('');
  const [loading, setLoading] = useState(false);

  // Corregir el manejo de errores y las referencias a estilos
  async function handleRegistro() {
    // Validaciones básicas
    if (!nombre || !torre || !numero || !correo || !contrasena || !claveUnica) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
  
    if (contrasena !== confirmarContrasena) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }
  
    setLoading(true);
    try {
      // Aquí iría la lógica para verificar la clave única con el backend
      // y registrar al usuario en la base de datos
      
      // Ejemplo de verificación de clave única (simulado)
      await verificarClaveUnica(claveUnica);
      
      // Ejemplo de registro de usuario (simulado)
      await registrarUsuario({
        nombre,
        torre,
        numero,
        correo,
        contrasena,
        claveUnica
      });
      
      Alert.alert(
        'Registro exitoso', 
        'Tu cuenta ha sido creada correctamente',
        [{ text: 'OK', onPress: () => router.replace('/login') }]
      );
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }

  // Función simulada para verificar la clave única
  async function verificarClaveUnica(clave: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // Simulación de verificación con el servidor
      setTimeout(() => {
        // Aquí se verificaría con el backend si la clave es válida
        if (clave === '123456') { // Ejemplo de clave válida
          resolve(true);
        } else {
          reject(new Error('La clave única no es válida o ya ha sido utilizada'));
        }
      }, 1000);
    });
  }

  // Función simulada para registrar al usuario
  async function registrarUsuario(userData: any): Promise<void> {
    return new Promise((resolve) => {
      // Simulación de registro en la base de datos
      setTimeout(() => {
        console.log('Usuario registrado:', userData);
        resolve();
      }, 1000);
    });
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Registro de Residente</Text>
        
        <Text style={styles.label}>Nombre completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu nombre completo"
          value={nombre}
          onChangeText={setNombre}
        />
        
        <Text style={styles.label}>Torre</Text>
        <TextInput
          style={styles.input}
          placeholder="Número o nombre de torre"
          value={torre}
          onChangeText={setTorre}
        />
        
        <Text style={styles.label}>Número de departamento</Text>
        <TextInput
          style={styles.input}
          placeholder="Número de departamento"
          value={numero}
          onChangeText={setNumero}
          keyboardType="number-pad"
        />
        
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
          placeholder="Crea una contraseña"
          value={contrasena}
          onChangeText={setContrasena}
          secureTextEntry
        />
        
        <Text style={styles.label}>Confirmar contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirma tu contraseña"
          value={confirmarContrasena}
          onChangeText={setConfirmarContrasena}
          secureTextEntry
        />
        
        <Text style={styles.label}>Clave única de registro</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa la clave proporcionada por administración"
          value={claveUnica}
          onChangeText={setClaveUnica}
        />
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handleRegistro}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Procesando...' : 'Registrarme'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.linkButton}
          onPress={() => router.replace('/login')}
        >
          <Text style={styles.linkText}>
            ¿Ya tienes cuenta? Inicia sesión
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  formContainer: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
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
    fontWeight: '600',
  },
  linkButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  linkText: {
    color: '#007AFF',
    fontSize: 14,
  }
});