import User from '../../users/User'

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}
