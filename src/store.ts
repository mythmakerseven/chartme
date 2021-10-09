import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { Chart } from './types'

export interface State {
  chart: Chart
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol('store')

const initialState = {
  chart: {
    title: '',
    items: [],
    size: {
      x: 5,
      y: 5
    },
    color: '#000000',
    showTitles: false,
    gap: 0
  }
}

export const store = createStore<State>({
  state () {
    return { ...initialState }
  },
  mutations: {
    addItem (state: State, item) {
      state.chart.items.push(item)
    },
    changeTitle (state: State, newTitle: string) {
      state.chart.title = newTitle
    },
    changeColor (state: State, newColor: string) {
      state.chart.color = newColor
    },
    changeSize (state: State, payload: { axis: string, value: number }) {
      switch (payload.axis) {
        case 'x':
          state.chart.size.x = payload.value
          break
        case 'y':
          state.chart.size.y = payload.value
          break
        default:
          state.chart.size = { ...state.chart.size }
      }
    },
    changeGap (state: State, newGap: number) {
      state.chart.gap = newGap
    },
    toggleTitles (state: State, showTitles: boolean) {
      state.chart.showTitles = showTitles
    },
    setEntireChart (state: State, payload: Chart) {
      state.chart = payload
    },
    reset (state: State) {
      state.chart = { ...initialState.chart }
    }
  }
})

export const useStore = (): Store<State> => {
  return baseUseStore(key)
}
