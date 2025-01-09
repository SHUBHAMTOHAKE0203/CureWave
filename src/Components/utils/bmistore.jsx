import {create} from 'zustand';

const useBMIStore = create((set) => ({
  weight: '',
  height: '',
  age: '',
  gender: 'male',
  bmi: null,
  setWeight: (weight) => set({ weight }),
  setHeight: (height) => set({ height }),
  setAge: (age) => set({ age }),
  setGender: (gender) => set({ gender }),
  calculateBMI: () =>
    set((state) => {
      const heightInMeters = state.height / 100;
      const bmi = (state.weight / (heightInMeters ** 2)).toFixed(1);
      return { bmi: parseFloat(bmi) };
    }),
  getBMICategory: () => {
    const { bmi } = useBMIStore.getState();
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi <= 24.9) return 'Normal weight';
    if (bmi >= 25 && bmi <= 29.9) return 'Overweight';
    if (bmi >= 30) return 'Obese';
    return 'Unknown';
  },
}));

export default useBMIStore;