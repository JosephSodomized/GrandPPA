import {createStackNavigator, createAppContainer} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen'
import MedsScreen from '../screens/MedsScreen'
import HelpScreen from '../screens/HelpScreen'
import FindMeScreen from '../screens/FindMeScreen';
import AuthenticationScreen from '../screens/AuthenticationScreen';

const MainTabNavigator = createStackNavigator({
  Authentication: {screen: AuthenticationScreen},
  Home: {screen: HomeScreen},
  Meds: {screen: MedsScreen},
  Help: {screen: HelpScreen},
  FindMe: {screen: FindMeScreen}
});

const App = createAppContainer(MainTabNavigator);

export default App;