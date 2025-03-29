import { Redirect } from 'expo-router';

export default function Index() {
  // Cambia la ruta para que apunte al archivo correcto dentro de la estructura de carpetas
  return <Redirect href="/(auth)/login" />;
}