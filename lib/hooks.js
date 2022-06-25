import * as jose from 'jose';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { gql } from '@apollo/client';
import client from '../pages/apollo-client';
export const useAuth = async () => {
  const [user, setUser] = useState();
  let tokenUser;
  const token = getCookie('token');
  if (token) {
    tokenUser = jose.decodeJwt(token);
  }

  useEffect(() => {
    (async () => {
      if (token) {
        const { data } = await client.query({
          query: gql`
            query ($id: Int) {
              user: User(id: $id) {
                name
                avatar {
                  large
                  medium
                }
              }
            }
          `,
          variables: {
            id: tokenUser.sub,
          },
        });
        setUser(data);
      }
    })();
  }, []);

  return user;
};
