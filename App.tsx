import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import { Provider as PaperProvider } from 'react-native-paper'

import HomeScreen from './src/screens/HomeScreen'
import ProductScreen from './src/screens/ProductScreen'
import addProduct from './src/screens/addProduct'
import Search from './src/screens/Search'


const Stack = createSharedElementStackNavigator()

function App() {

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="UPayments Store" component={HomeScreen}
            options={{
              headerStyle: { backgroundColor: '#3699CC' },
              headerTintColor: 'white',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
          <Stack.Screen name="Product" component={ProductScreen}
            sharedElements={(route) => { return [route.params._id] }}
          />
          <Stack.Screen name="addProduct" component={addProduct}
            options={{
              headerTintColor: 'white', headerStyle: { backgroundColor: '#43B05C' }
            }}
          />
          <Stack.Screen name="Search" component={Search}
            options={{
              headerStyle: { backgroundColor: '#3699CC' },
              headerTintColor: 'white',
              headerTitleStyle: { fontWeight: 'bold' },
              headerBackTitleVisible: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}


export default App