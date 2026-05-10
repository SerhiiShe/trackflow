export const formatSeconds = (totalSeconds: number) => {
  const isNegative = totalSeconds < 0
  const absSeconds = Math.abs(totalSeconds)

  const hours = Math.floor(absSeconds / 3600)
  const minutes = Math.floor((absSeconds % 3600) / 60)
  const seconds = absSeconds % 60

  const parts = []
  if (hours > 0) parts.push(`${hours}h`)
  if (minutes > 0) parts.push(`${minutes}m`)
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`)

  const timeString = parts.join('')

  return isNegative ? `-${timeString}` : timeString
}
