import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Sample data for events to simulate the offline-first concept.
const EVENT_DATA = [
  {
    id: '1',
    name: 'Outdoor Yoga Session',
    date: 'August 18, 2025',
    location: 'Lincoln Park',
    description: 'A relaxing morning yoga session. Bring your own mat and water bottle. All skill levels are welcome!',
    rsvp: 15,
    isSaved: false,
  },
  {
    id: '2',
    name: 'Farmers Market Tour',
    date: 'August 19, 2025',
    location: 'Millennium Park',
    description: 'Explore the local produce and artisan goods at the weekly farmers market. We will meet at the main entrance.',
    rsvp: 32,
    isSaved: false,
  },
  {
    id: '3',
    name: 'Live Music at The Shed',
    date: 'August 20, 2025',
    location: 'The Shed Amphitheater',
    description: 'An evening of jazz and blues under the stars. RSVP to guarantee your spot.',
    rsvp: 55,
    isSaved: false,
  },
];

// Component for a single event card.
type Event = {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  rsvp: number;
  isSaved: boolean;
};

type EventCardProps = {
  event: Event;
  onClick: () => void;
};

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => (
  <TouchableOpacity style={styles.card} onPress={onClick}>
    <Text style={styles.cardTitle}>{event.name}</Text>
    <Text style={styles.cardSubtitle}>
      {event.date} - {event.location}
    </Text>
    <Text style={styles.cardRsvp}>
      {event.rsvp} people RSVP'd
    </Text>
  </TouchableOpacity>
);

// Main screen component to display the list of events.
type EventsListScreenProps = {
  events: Event[];
  onSelectEvent: (event: Event) => void;
};

const EventsListScreen: React.FC<EventsListScreenProps> = ({ events, onSelectEvent }) => (
  <ScrollView style={styles.listContainer}>
    <Text style={styles.listTitle}>Upcoming Events</Text>
    <View style={styles.listContent}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} onClick={() => onSelectEvent(event)} />
      ))}
    </View>
  </ScrollView>
);

// Main screen component to display details of a single event.
type EventDetailScreenProps = {
  event: Event;
  onBackPress: () => void;
};

const EventDetailScreen: React.FC<EventDetailScreenProps> = ({ event, onBackPress }) => (
  <ScrollView style={styles.detailContainer}>
    <View style={styles.detailContent}>
      <Text style={styles.detailTitle}>{event.name}</Text>
      <Text style={styles.detailLocation}>Location: {event.location}</Text>
      <Text style={styles.detailDate}>Date: {event.date}</Text>
      <Text style={styles.detailDescription}>{event.description}</Text>
      <View style={styles.detailButtonRow}>
        <TouchableOpacity style={styles.rsvpButton}>
          <Text style={styles.buttonText}>RSVP ({event.rsvp})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatButton}>
          <Text style={styles.buttonText}>Chat with attendees</Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.detailBackRow}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back to List</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
);

// The main application component.
export default function App() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [eventsData] = useState(EVENT_DATA);

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleBackPress = () => {
    setSelectedEvent(null);
  };

  return selectedEvent ? (
    <EventDetailScreen event={selectedEvent} onBackPress={handleBackPress} />
  ) : (
    <EventsListScreen events={eventsData} onSelectEvent={handleSelectEvent} />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
  },
  listTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111827',
    marginBottom: 24,
    marginTop: 8,
  },
  listContent: {
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    padding: 24,
    margin: 8,
    width: '95%',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  cardRsvp: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  detailContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  detailContent: {
    padding: 24,
  },
  detailTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  detailLocation: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#4b5563',
    marginBottom: 4,
  },
  detailDate: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 16,
  },
  detailDescription: {
    fontSize: 18,
    color: '#1f2937',
    marginBottom: 16,
  },
  detailButtonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 24,
  },
  rsvpButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 32,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  chatButton: {
    backgroundColor: '#6b7280',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 32,
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  detailBackRow: {
    alignItems: 'center',
    marginTop: 32,
  },
  backButton: {
    backgroundColor: '#e5e7eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  backButtonText: {
    color: '#374151',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
