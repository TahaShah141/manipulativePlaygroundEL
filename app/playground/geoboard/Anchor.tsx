
type AnchorProps = {
  hovering: boolean
  setHovered: () => void
}

export const Anchor: React.FC<AnchorProps> = ({hovering, setHovered}) => {
  return (
    <div onMouseEnter={setHovered} className="size-full flex justify-center items-center">
      <div className={`rounded-full border xs:border-2 border-white ${hovering ? "bg-red-400" : "bg-neutral-400"} size-2 xs:size-3 md:size-4`}>

      </div>
    </div>
  )
}
