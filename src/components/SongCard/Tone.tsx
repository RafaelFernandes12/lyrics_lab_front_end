interface tomProps {
  tom: string
}

export function Tone({ tom }: tomProps) {
  return <span className="font-semibold text-white">{tom}</span>
}
