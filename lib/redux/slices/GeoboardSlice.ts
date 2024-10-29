import { PolygonType } from "@/lib/types";
import { flattenPoints, getRandomShape, isSamePoints, MakePolygon, mod, randInt } from "@/lib/utils";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GeoboardState {
  N: number
  polygons: PolygonType[]
  filled: boolean
  selectedType?: string
  selectedPolygon?: string
  selectedIndex?: number
  mode: string
}

const initialState: GeoboardState = {
  N: 10,
  polygons: [
    MakePolygon([4, 2, 5, 2, 6, 5, 2, 5, 2, 4, 7, 4, 4, 3])
  ],
  filled: true,
  mode: 'sandbox'
}

export const GeoboardSlice = createSlice({
  name: "geobaord",
  initialState,
  reducers: {
    changeMode: (state, action: PayloadAction<{mode: string}>) => {
      const { mode } = action.payload
      state.mode = mode

      const size = randInt(state.N, 4)

      if (mode === 'sandbox') {
        state.polygons = []
      } else if (mode === 'area' || mode === 'perimeter') {
        state.polygons = [MakePolygon(flattenPoints(getRandomShape(size, randInt(6, 3), mode === 'perimeter')))]
      }
    },

    toggleFilled: (state) => {
      state.filled = !state.filled
    },

    clearBoard: (state) => {
      state.polygons = []
    },

    selectType: (state, action: PayloadAction<{type: string}>) => {
      state.selectedType = action.payload.type
    },

    selectPoint: (state, action: PayloadAction<{polygon: string, index: number}>) => {
      const { polygon, index } = action.payload
      state.selectedPolygon = polygon
      state.selectedIndex = index
    },
    
    addPoint: (state, action: PayloadAction<{x: number, y: number}>) => {
      const { x, y } = action.payload
      const { selectedPolygon, selectedIndex } = state

      if (!selectedPolygon || selectedIndex === undefined) return;

      //insert {x, y} after selectedIndex
      state.polygons = state.polygons.map(p =>
        p.id === selectedPolygon
          ? {...p, 
            points: [...p.points.slice(0, selectedIndex), {x, y}, ...p.points.slice(selectedIndex)]}
          : p
      )
    },

    clearSelection: (state) => {
      state.selectedPolygon = undefined
      state.selectedIndex = undefined
    },

    addPolygon: (state, action: PayloadAction<{polygon: PolygonType}>) => {
      const { polygon } = action.payload
      state.polygons.push(polygon)
    },

    movePoint: (state, action: PayloadAction<{x: number, y: number, dropped?: boolean}>) => {
      const {x, y, dropped} = action.payload
      const {selectedIndex, selectedPolygon} = state

      if (!selectedPolygon || selectedIndex === undefined) return;

      if (dropped) {
        const polygonPoints = state.polygons.find(p => p.id === selectedPolygon)!.points
        const leftPointIndex = selectedIndex === 0 ? polygonPoints.length - 1 : selectedIndex - 1
        const rightPointIndex = selectedIndex === polygonPoints.length - 1 ? 0 : selectedIndex + 1

        const isRightPoint = isSamePoints(polygonPoints[rightPointIndex], {x, y})
        const isLeftPoint = isSamePoints(polygonPoints[leftPointIndex], {x, y})

        if (isRightPoint || isLeftPoint) {
          state.polygons = state.polygons.map(p => 
            p.id === selectedPolygon ? 
            ({
              ...p,
              points: p.points.filter((pt, i) => i !== selectedIndex)
            }) : p
          )
          state.polygons = state.polygons.filter(p => p.points.length >= 2)
          return;
        } 
      }

      state.polygons = state.polygons.map(p => 
        p.id === selectedPolygon ? 
        ({
          ...p,
          points: p.points.map((pt, i) => i === selectedIndex ? {x, y} : pt)
        }) : p
      )
    },

    addRandomShape: (state) => {

      const size = randInt(state.N, 4)
      state.polygons = [MakePolygon(flattenPoints(getRandomShape(size, randInt(6, 3), state.mode === 'perimeter')))]
    }
  }
})

export const { 
  toggleFilled,
  addPolygon,
  movePoint,
  selectPoint,
  clearSelection,
  selectType,
  addPoint,
  clearBoard,
  addRandomShape,
  changeMode
} = GeoboardSlice.actions

export default GeoboardSlice.reducer