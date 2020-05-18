const isValidScore = (input: any): boolean => {
  return (
    typeof input === 'number' &&
    Number.isInteger(input) &&
    input > 0 &&
    input <= 10
  )
}

export default isValidScore
