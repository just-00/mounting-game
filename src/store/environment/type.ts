import dayjs from "dayjs";

export enum Weather {
  Sun = "Sun",
  Rain = "Rain",
  Snow = 'Snow'
}

export enum Time {
  Day = 'Day',
  Dusk = 'Dusk',
  Night = 'Night'
}

export enum Direction {
  Up = 'Up',
  Down = 'Down'
}


export const START_TIME = dayjs('1995-07-12 08:00')
export const END_TIME = dayjs('1995-07-12 24:00')

export const DEFAULT_DISTANCE = 18