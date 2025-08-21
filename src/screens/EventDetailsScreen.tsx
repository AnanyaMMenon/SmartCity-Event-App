import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { getData, saveData } from '../utils/storage';

export const EventDetailsScreen = ({ route }: any) => {
  const { event } = route.params;
  const [rsvp, setRsvp] = useState(false);

  useEffect(() => {
    const loadRsvp = async () => {
      const saved = await getData(`rsvp_${event.id}`);
      if(saved === 'true') setRsvp(true);
    };
    loadRsvp();
  }, [event.id]);

  const toggleRsvp = async () => {
    setRsvp(!rsvp);
    await saveData(`rsvp_${event.id}`, (!rsvp).toString());
  };

  return (
    <View style={{ flex:1, padding:20 }}>
      <Text style={{ fontSize:20, fontWeight:'bold' }}>{event.title}</Text>
      <Text>{event.date} | {event.location}</Text>
      <Button title={rsvp ? 'RSVPed' : 'RSVP'} onPress={toggleRsvp} />
    </View>
  );
};
