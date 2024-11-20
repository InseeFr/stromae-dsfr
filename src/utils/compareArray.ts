//Remove symbol because not needed in equality comparison
type PrimitiveArray = (string | number | boolean | null | undefined | bigint)[]

export const areArraysEqual = (
  arrayA: PrimitiveArray,
  arrayB: PrimitiveArray,
) => {
  return (
    arrayA.length === arrayB.length &&
    arrayA.every((element, index) => element === arrayB[index])
  )
}
