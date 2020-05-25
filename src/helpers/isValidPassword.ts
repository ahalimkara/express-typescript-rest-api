export default function isValidPassword(password: any): boolean {
  return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)
}
