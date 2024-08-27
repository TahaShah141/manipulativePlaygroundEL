export const Heights = [
  'h-[calc(100vh-64px)]',
  'h-[calc(50vh-36px)]',
  'h-[calc(33vh-24px)]',
]

type Layout = {
  size: number
  windowsPerRow: number[]
}

export const layouts: Layout[] = [
  {
    size: 1,
    windowsPerRow: [1]
  },
  {
    size: 2,
    windowsPerRow: [2]
  },
  {
    size: 3,
    windowsPerRow: [3]
  },
  {
    size: 4,
    windowsPerRow: [2, 2]
  },
  {
    size: 5,
    windowsPerRow: [2, 3]
  },
  {
    size: 6,
    windowsPerRow: [3, 3]
  },
  {
    size: 7,
    windowsPerRow: [2, 2, 3]
  },
  {
    size: 8,
    windowsPerRow: [2, 3, 3]
  },
  {
    size: 9,
    windowsPerRow: [3, 3, 3]
  },
]