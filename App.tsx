import { NavigationContainer } from '@react-navigation/native/';
import React from 'react';
import MainStack from './src/navigation/MainStack';

const App = () => {
	return (
		<NavigationContainer>
			<MainStack />
		</NavigationContainer>
	);
};

export default App;
