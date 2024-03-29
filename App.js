import React, { createContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './src/Dashboard';
import Setup from './src/Setup';
import { initDatabase, checkIfDatabaseExists, getTable } from './database';
import { Image, LogBox, StatusBar, View } from 'react-native';


const Stack = createNativeStackNavigator();
export const myContext = createContext()
LogBox.ignoreAllLogs();

function App() {
  const [loading, setLoading] = useState(true)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [lang, setLang] = useState('eng')


  useEffect(() => {
    const setupDatabase = async () => {
      try {
        setLoading(true)
        // Check if the database exists
        const databaseExists = await checkIfDatabaseExists();
        if (databaseExists) {
          setLang(databaseExists);
          setIsSignedIn(true)
        } else {
          initDatabase()
        }
      } catch (error) {
        console.error('Error setting up database:', error);
      } finally {
        setLoading(false)
      }
    };

    setupDatabase();
  }, []);

  function toogleLanguage() {
    setLang(lang === 'eng' ? 'ar' : 'eng')
  }

  function redirectToDashboard() {
    setIsSignedIn(true);
  }

  function LeaveDashboard() {
    setIsSignedIn(false);
  }
  return (
    <myContext.Provider value={{ lang, toogleLanguage, redirectToDashboard, LeaveDashboard }} >
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        {loading ?
          (<View className="h-screen bg-white flex items-center justify-center">
            <Image source={require('./assets/gif/loader.gif')} className="w-64" />
          </View>)
          :
          (<NavigationContainer>
            <Stack.Navigator initialRouteName={isSignedIn ? 'dashboard' : 'setup'} screenOptions={{ headerShown: false }}>
              {isSignedIn ?
                <Stack.Screen name='dashboard' component={Dashboard} />
                :
                <Stack.Screen name='setup' component={Setup} />
              }
            </Stack.Navigator>
          </NavigationContainer>)
        }
      </View>
    </myContext.Provider>
  )
}




export default App;
