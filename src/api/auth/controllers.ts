import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../../config";
import UserModel from "../user/models";

let tokenList = [];
interface AuthToken {
  userLoggedIn: boolean;
  accessToken?: string;
  refreshToken?: string;
  troubleshoot?: string;
}

export async function login(
  username: string,
  password: string
): Promise<AuthToken> {
  const user = await UserModel.findOne({ where: { username } });
  if (user) {
    const validPassword = bcrypt.compareSync(password, user.get().password);
    if (validPassword) {
      const { userId } = user.get();
      const accessToken = jwt.sign({ userId }, config.auth.accessSecret, {
        expiresIn: config.auth.expiration,
      });
      const refreshToken = jwt.sign({ userId }, config.auth.refreshSecret, {
        expiresIn: "30d",
      });
      tokenList.push(refreshToken);
      return {
        userLoggedIn: true,
        accessToken,
        refreshToken,
      };
    }
    return { userLoggedIn: false };
  }
  return { userLoggedIn: false };
}

export async function logout(refreshToken: string) {
  tokenList = tokenList.filter((token) => token !== refreshToken);
  return true;
}

export function refreshAccessToken(oldToken: string): AuthToken {
  // check token exists
  if (tokenList.includes(oldToken)) {
    const decode = JSON.parse(
      JSON.stringify(jwt.verify(oldToken, config.auth.refreshSecret))
    );
    const { userId } = decode;
    const expiration = decode.exp;

    // check token is not expired
    if (expiration > Date.now() / 1000) {
      const accessToken = jwt.sign({ userId }, config.auth.accessSecret, {
        expiresIn: config.auth.expiration,
      });
      const refreshToken = jwt.sign({ userId }, config.auth.refreshSecret, {
        expiresIn: "30d",
      });
      tokenList.push(refreshToken);
      return { userLoggedIn: true, accessToken, refreshToken };
    }
    tokenList = tokenList.filter((token) => token !== oldToken);
    return {
      userLoggedIn: false,
      troubleshoot: `expiration: ${expiration}, and date: ${Date.now() / 1000}`,
    };
  }
  return { userLoggedIn: false, troubleshoot: "not found" };
}
