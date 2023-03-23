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