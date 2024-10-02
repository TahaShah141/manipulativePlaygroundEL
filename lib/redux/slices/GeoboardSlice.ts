import { PolygonType } from "@/lib/types";
import { MakePolygon } from "@/lib/utils";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GeoboardState {
  N: number
  polygons: PolygonType[]
  filled: boolean
}

const initialState: GeoboardState = {
  N: 10,
  polygons: [
    MakePolygon([4, 2, 2, 4, 6, 3, 5, 6])
  ],
  filled: true
}

export const GeoboardSlice = createSlice({
  name: "geobaord",
  initialState,
  reducers: {
    toggleFilled: (state) => {
      state.filled = !state.filled
    },

    addPolygon: (state, action: PayloadAction<{polygon: PolygonType}>) => {
      const { polygon } = action.payload
      state.polygons.push(polygon)
    },

    movePoint: (state, action: PayloadAction<{polygonID: string, pointIndex: number, x: number, y: number}>) => {
      const {x, y, polygonID, pointIndex} = action.payload
      state.polygons.map(p => {
        if (p.id === polygonID) {
          p.points[pointIndex] = {x, y}
        }
        return p
      })
    },
  }
})

export const { 
  toggleFilled,
  addPolygon,
  movePoint
} = GeoboardSlice.actions

export default GeoboardSlice.reducer