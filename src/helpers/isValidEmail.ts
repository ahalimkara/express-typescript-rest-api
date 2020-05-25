export default function isValidEmail(email: any): boolean {
  return /\S+@\S+\.\S+/.test(email)
}
