import {createStackNavigator, createAppContainer} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen'
import MedsScreen from '../screens/MedsScreen'

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Meds: {screen: MedsScreen},
});

const App = createAppContainer(MainNavigator);

export default App;