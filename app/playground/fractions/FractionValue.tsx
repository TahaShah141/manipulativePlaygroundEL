import { composeFraction, getFractionArraySum, getFractionString } from "@/lib/fractions"
import { NumberFraction } from "@/lib/types"

type FractionValueProps = {
  showFraction?: boolean
  fractionArray: NumberFraction[]
}

export const FractionValue: React.FC<FractionValueProps> = ({showFraction=false, fractionArray}) => {
  const n = getFractionArraySum(fractionArray)
  const decimal = n.toFixed(5)
  return (
    <>
    {showFraction && 
    <>
    <p>{getFractionString(composeFraction(fractionArray))}</p>
    <p>or</p>
    </>}
    <p>{+decimal}</p>
    <p>or</p>
    <p>{`${+(+((decimal))*100).toFixed(5)}%`}</p>
    </>
  )
}
