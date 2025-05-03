import { Platform } from 'react-native';


const PORT = '3000';

export const BASE_URL =
  Platform.OS === 'web'
    ? `http://localhost:${PORT}` 
    : `https://7844579b-86ee-4cc9-b505-0f2065c5e56b-dev.e1-us-east-azure.choreoapis.dev/radio-app-project/backend/v1.0`; 
