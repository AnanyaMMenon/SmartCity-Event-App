import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface Props {
  title: string;
  date: string;
  location: string;
  onSwipeRight: () => void;
}

export const AnimatedEventCard: React.FC<Props> = ({ title, date, location, onSwipeRight }) => {
  const translateX = useSharedValue(0);

  const gestureHandler = (event: PanGestureHandlerGestureEvent) => {
    translateX.value = event.nativeEvent.translationX;
    if (translateX.value > 100) { // swipe threshold
      onSwipeRight();
      translateX.value = withSpring(0);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }]
  }));

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Text style={styles.title}>{title}</Text>
        <Text>{date} | {location}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  card: { padding: 15, marginVertical: 5, marginHorizontal: 10, backgroundColor: '#fff', borderRadius: 8, elevation: 2 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 }
});
