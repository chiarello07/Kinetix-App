export const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors = []

  if (password.length < 8) errors.push('Mínimo 8 caracteres')
  if (!/[A-Z]/.test(password)) errors.push('Pelo menos 1 letra maiúscula')
  if (!/[a-z]/.test(password)) errors.push('Pelo menos 1 letra minúscula')
  if (!/[0-9]/.test(password)) errors.push('Pelo menos 1 número')
  if (!/[!@#$%^&*]/.test(password)) errors.push('Pelo menos 1 caractere especial (!@#$%^&*)')

  return {
    valid: errors.length === 0,
    errors,
  }
}

export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}
