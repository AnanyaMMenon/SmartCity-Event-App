import { useEffect, useState } from 'react';
import axios from 'axios';

export const useFetchEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('https://my-json-server.typicode.com/typicode/demo/posts');
        setEvents(data.map((d: any) => ({ id: d.id.toString(), title: d.title, date: '2025-08-17', location: 'City Center' })));
      } catch(e) { setError('Failed to load events'); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  return { events, loading, error };
};
