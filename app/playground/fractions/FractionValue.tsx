
type FractionValueProps = {
  n: number
}

export const FractionValue: React.FC<FractionValueProps> = ({n}) => {
  const decimal = n.toFixed(5)
  return (
    <>
    <p>{+decimal}</p>
    <p>or</p>
    <p>{`${+(+((decimal))*100).toFixed(5)}%`}</p>
    </>
  )
}
