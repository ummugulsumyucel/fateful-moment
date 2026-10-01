import { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, StyleSheet, View } from 'react-native';

import * as ScreenOrientation from 'expo-screen-orientation';
import { NavigationBar } from 'expo-navigation-bar';
import { useFonts } from 'expo-font';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
  Inter_900Black_Italic,
} from '@expo-google-fonts/inter';

import {
  JetBrainsMono_400Regular,
  JetBrainsMono_700Bold,
} from '@expo-google-fonts/jetbrains-mono';

import SignInUpScreen from './src/screens/auth/SignInUpScreen';
import CreateAccountScreen from './src/screens/auth/CreateAccountScreen';
import SignInScreen from './src/screens/auth/SignInScreen';
import ResetPasswordScreen from './src/screens/auth/ResetPasswordScreen';

import HomeScreen from './src/screens/home/HomeScreen';
import SimulationScreen from './src/screens/simulation/SimulationScreen';
import DecisionDNAScreen from './src/screens/simulation/DecisionDNAScreen';

import { SCENARIOS } from './src/data/scenarios';
import { colors } from './src/theme/colors';

type Screen =
  | 'signInUp'
  | 'signIn'
  | 'createAccount'
  | 'resetPassword'
  | 'home'
  | 'simulation'
  | 'dna';


type RegisteredUser = {
  name: string;
  email: string;
  password: string;
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
    Inter_900Black_Italic,

    JetBrainsMono_400Regular,
    JetBrainsMono_700Bold,
  });


  const [screen, setScreen] = useState<Screen>('signInUp');

  const [activeScenarioId, setActiveScenarioId] =
    useState<string | null>(null);

  const [registeredUser, setRegisteredUser] =
    useState<RegisteredUser | null>(null);

  const [signInError, setSignInError] = useState('');

  const AUTH_SCREENS: Screen[] = [
    'signInUp',
    'signIn',
    'createAccount',
    'resetPassword',
  ];

  useEffect(() => {
    async function updateOrientation() {
      try {
        const isAuthScreen = AUTH_SCREENS.includes(screen);

        await ScreenOrientation.lockAsync(
          isAuthScreen
            ? ScreenOrientation.OrientationLock.PORTRAIT_UP
            : ScreenOrientation.OrientationLock.LANDSCAPE,
        );
      } catch (error) {
        console.warn('Orientation change failed:', error);
      }
    }

    void updateOrientation();
  }, [screen]);

  useEffect(() => {
    const backAction = () => {
      switch (screen) {
        case 'signIn':
          return true;
        case 'signInUp':
          return true;
        case 'createAccount':
          setScreen('signIn');
          return true;
        case 'resetPassword':
          setScreen('signIn');
          return true;
        case 'home':
          return true;
        case 'simulation':
          setScreen('home');
          return true;
        case 'dna':
          setScreen('home');
          return true;
        default:
          return false;
      }
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => subscription.remove();
  }, [screen]);


  function handleSignUp(
    name: string,
    email: string,
    password: string,
  ) {
    setRegisteredUser({
      name,
      email,
      password,
    });

    setSignInError('');
    setScreen('signIn');
  }


  function handleSignIn(
    email: string,
    password: string,
  ) {
    if (!registeredUser) {
      setSignInError(
        'No account found. Please create an account first.',
      );
      return;
    }

    const emailMatches =
      email.trim().toLowerCase() ===
      registeredUser.email.trim().toLowerCase();

    const passwordMatches =
      password === registeredUser.password;

    if (!emailMatches || !passwordMatches) {
      setSignInError(
        'Your email or password is incorrect. Please try again.',
      );
      return;
    }

    setSignInError('');
    setScreen('home');
  }

  function handleScenarioStart(id: string) {
    setActiveScenarioId(id);
    setScreen('simulation');
  }


  function handleDnaPress() {
    setScreen('dna');
  }


  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />
      </View>
    );
  }


  function renderScreen() {
    switch (screen) {

      case 'signInUp':
        return (
          <SignInUpScreen
            onContinueWithEmail={() => {
              setSignInError('');
              setScreen('signIn');
            }}
          />
        );

      case 'signIn':
        return (
          <SignInScreen
            onBack={() => {
              setSignInError('');
              setScreen('signInUp');
            }}
            onSignUp={() => {
              setSignInError('');
              setScreen('createAccount');
            }}
            onForgotPassword={() => {
              setSignInError('');
              setScreen('resetPassword');
            }}
            onSignIn={handleSignIn}
            passwordError={signInError}
          />
        );

      case 'resetPassword':
        return (
          <ResetPasswordScreen
            onBack={() => {
              setScreen('signIn');
            }}
            onBackToSignIn={() => {
              setSignInError('');
              setScreen('signIn');
            }}
          />
        );

      case 'createAccount':
        return (
          <CreateAccountScreen
            onBack={() => {
              setScreen('signIn');
            }}
            onSignInPress={() => {
              setSignInError('');
              setScreen('signIn');
            }}
            onSignUp={handleSignUp}
          />
        );

      case 'home':
        return (
          <HomeScreen
            onScenarioStart={handleScenarioStart}
            onDnaPress={handleDnaPress}
          />
        );

      case 'simulation': {
        const activeScenario = SCENARIOS.find(
          scenario => scenario.id === activeScenarioId,
        );

        if (!activeScenario) {
          return (
            <HomeScreen
              onScenarioStart={handleScenarioStart}
              onDnaPress={handleDnaPress}
            />
          );
        }

        return (
          <SimulationScreen
            scenarioId={activeScenario.id}
            title={activeScenario.title}
            description={activeScenario.description}
            onBack={() => {
              setScreen('home');
            }}
            onComplete={() => {
              setScreen('dna');
            }}
          />
        );
      }

      case 'dna':
        return (
          <DecisionDNAScreen
            onBack={() => {
              setScreen('home');
            }}
          />
        );

      default:
        return null;
    }
  }

  return (
    <SafeAreaProvider style={styles.safeAreaProvider}>
      <NavigationBar hidden={true} />
      {renderScreen()}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaProvider: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loading: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});