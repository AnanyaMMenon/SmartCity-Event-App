import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  rsvp?: boolean;
}

interface EventsState { events: Event[] }

const initialState: EventsState = { events: [] };

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    },
    toggleRsvp: (state, action: PayloadAction<string>) => {
      const event = state.events.find(e => e.id === action.payload);
      if(event) event.rsvp = !event.rsvp;
    }
  }
});

export const { setEvents, toggleRsvp } = eventsSlice.actions;
export default eventsSlice.reducer;
