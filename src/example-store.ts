// store.ts
import {create} from 'zustand';

type ExampleState = {
  count: number;
  increment: () => void;
  decrement: () => void;
};
// set gan nhu useState, annetaan sille statetille uusi arvo
// gan nhu python
// setin parametri funktion ja increment kutsu set funktio
export const useExampleStore = create<ExampleState>((set) => ({
  count: 0,
  increment: () => {set((state) => {
    return { count: state.count + 1
    };
  })
  },
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
