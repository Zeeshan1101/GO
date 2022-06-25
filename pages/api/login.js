import axios from 'axios';
import oauth from 'axios-oauth-client';
import { setCookies } from 'cookies-next';
export default async function handler(req, res) {
  const { code } = req.query;
  const getAuthorizationCode = oauth.client(axios.create(), {
    url: 'https://anilist.co/api/v2/oauth/token',
    grant_type: 'authorization_code',
    client_id: '8618',
    client_secret: '2WbSXEXDtmd6Hb6JQO6pUWIItWurjSQkJav6pVuv',
    redirect_uri: 'http://localhost:3000/api/login',
    code: code,
  });
  const token = await getAuthorizationCode();
  setCookies('token', token.access_token, { req, res });
  res.redirect('/');
}
