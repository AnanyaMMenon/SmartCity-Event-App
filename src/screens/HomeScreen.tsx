import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { EventCard } from '../../components/EventCard';
import { useFetchEvents } from '../hooks/useFetchEvents';

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  // add other properties if needed
};

type RootStackParamList = {
  Home: undefined;
  EventDetails: { event: Event };
};

export const HomeScreen = () => {
  const { events, loading, error } = useFetchEvents() as { events: Event[]; loading: boolean; error: string | null };
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  if(loading) return <ActivityIndicator style={{ flex: 1 }} />;
  if(error) return <Text>{error}</Text>;

  return (
    <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <EventCard
            title={item.title}
            date={item.date}
            location={item.location}
            onPress={() => navigation.navigate('EventDetails', { event: item })}
          />
        )}
      />
    </View>
  );
};
