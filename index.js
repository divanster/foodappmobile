import { AppRegistry } from 'react-native';
import App from './App'; // Ensure this path is correct based on where App.tsx is located
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
