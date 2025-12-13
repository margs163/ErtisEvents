import { create } from "zustand";
import { EventType, UserSignInType, UserSignUpType, UserType } from "./types";
import { persist, createJSONStorage } from "zustand/middleware";

type EventsStoreType = {
  events: EventType[];
  createdEvents: EventType[];
  recommendedEvents: EventType[];
  setEvents: (data: EventType[]) => void;
  setRecommendations: (data: EventType[]) => void;
  addEvent: (data: EventType) => void;
};

export const useEventsStore = create<EventsStoreType>()(
  persist(
    (set) => ({
      events: [],
      createdEvents: [],
      recommendedEvents: [],
      setEvents: (data) => set({ events: data }),
      setRecommendations: (data) => set({ recommendedEvents: data }),
      addEvent: (data) => set((prev) => ({ events: [...prev.events, data] })),
    }),
    {
      name: "events-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
