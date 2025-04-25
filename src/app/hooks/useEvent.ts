'use client';
import { useState, useEffect } from 'react';
import { Event, eventService } from '@/app/services/api/eventService';
export const useEvent = (id: number) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    fetchEvent();
  }, [id]);
  const fetchEvent = async () => {
    try {
      setLoading(true);
      const data = await eventService.getEventById(id);
      setEvent(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };
  return {
    event,
    loading,
    error,
    refetch: fetchEvent
  };
};