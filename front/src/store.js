import { atom } from "recoil";

export let weatherState = atom({
  key: "weatherState",
  default: null
})

export let doLocationState = atom({
  key: "doLocationState",
  default: null
})

export let guLocationState = atom({
  key: "guLocationState",
  default: null
})

export let getAllPlantListState = atom({
  key: "getAllPlantList",
  default: null
})

export let getPlantDetailState = atom({
  key: "getPlantDetailState",
  default: null
})

