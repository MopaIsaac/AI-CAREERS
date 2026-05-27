export function getTimeAgo(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffMinutes = Math.floor(diffMs / (1000 * 60))

  if (diffMinutes < 1) return 'Just now'
  if (diffMinutes < 60) return `${diffMinutes}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays}d ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export function parseSalaryRange(salaryRange?: string): { min?: number; max?: number; currency?: string } {
  if (!salaryRange) return {}
  const match = salaryRange.match(/^([£$€])(\d+[kK]?)\s*[-–]\s*([£$€]?\d+[kK]?)$/)
  if (match) {
    const currency = match[1]
    const convert = (val: string) => {
      const num = parseInt(val.replace(/[kK]/g, '000'))
      return isNaN(num) ? undefined : num
    }
    return { currency, min: convert(match[2]), max: convert(match[3]) }
  }
  return {}
}