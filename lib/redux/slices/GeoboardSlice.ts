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
    MakePolygon([1, 2, 4, 2, 4, 6, 3, 5, 2, 4])
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
  }
})

export const { 
  toggleFilled,
  addPolygon
} = GeoboardSlice.actions

export default GeoboardSlice.reducer