import jwt from 'jsonwebtoken'
import config from '../../config'
import {User} from '../user/models'
import bcrypt from 'bcrypt'

let tokenList = []
interface AuthToken {
  accessToken: string
  refreshToken?: string
  tokenList?: string[]
}

export async function login(username: string, password: string):Promise<any> {
  const user = await User.findOne({ where: {username}})
  if (user) {
    const validPassword = bcrypt.compareSync(password, user.get().password)
    if (validPassword) {
      const userId = user.get().userId
      const accessToken = jwt.sign({userId}, config.auth.accessSecret, {expiresIn: config.auth.expiration})
      const refreshToken = jwt.sign({userId}, config.auth.refreshSecret, {expiresIn: '30d'})
      tokenList.push(refreshToken)
      return { 
        accessToken,
        refreshToken,
      }
    } else {
      return 'Invalid password'
    }
  } else {
    return 'User not found'
  }
}

export async function logout(refreshToken: string) {
  tokenList = tokenList.filter(token => token !== refreshToken)
  return true
}

export function refreshToken(refreshToken: string) {
  // check token exists
  if (tokenList.includes(refreshToken)) {
    const decode = JSON.parse(JSON.stringify(jwt.verify(refreshToken, config.auth.refreshSecret)))
    const userId = decode.userId
    const expiration = decode.exp

    // check token is not expired
    if (expiration < Date.now()/1000) {
      const accessToken = jwt.sign({userId}, config.auth.accessSecret, {expiresIn: config.auth.expiration})
      console.log(decode)
      return { accessToken }
    } else { 
      tokenList = tokenList.filter(token => token !== refreshToken)
      return 'Expired token'
    }
  } else {
    return 'Invalid token'
  }
}

