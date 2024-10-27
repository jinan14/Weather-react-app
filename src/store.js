

// store.js
    import {create} from 'zustand';

export const useWeatherStore = create((set) => ({
    weather: null,
    setWeather: (data) => set({ weather: data }),
}));
