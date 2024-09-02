import { useDispatch, useSelector, useStore } from "react-redux"
import { AppDispatch, RootState, AppStore, selectBaseTenState, selectFractionState } from "@/lib/redux/store"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()

export const BaseTenState = () => useAppSelector(selectBaseTenState)
export const FractionState = () => useAppSelector(selectFractionState)