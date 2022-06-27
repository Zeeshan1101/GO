import React, { useState, useContext, createContext, useEffect } from 'react';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} from '@apollo/client';
import { getCookie } from 'cookies-next';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (getCookie('token')) {
      setAuthToken(getCookie('token'));
    }
    if (authToken) {
      getUser();
    }
  }, [authToken]);

  const query = gql`
    query {
      user: Viewer {
        id
        name
        avatar {
          large
        }
      }
    }
  `;
  const getUser = async () => {
    const client = createApolloClient();
    const { data } = await client.query({
      query: query,
    });
    setUser(data.user);
  };

  const getAuthHeaders = () => {
    if (!authToken) return null;

    return {
      authorization: `Bearer ${authToken}`,
    };
  };

  function createApolloClient() {
    const link = new HttpLink({
      uri: 'https://graphql.anilist.co/graphql',
      headers: getAuthHeaders(),
    });

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  }

  const signOut = () => {
    setAuthToken(null);
    setUser(null);
  };

  const isSignedIn = () => {
    if (authToken) {
      return true;
    } else {
      return false;
    }
  };

  return {
    createApolloClient,
    user,
    signOut,
    isSignedIn,
  };
}

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  cache: new InMemoryCache(),
});

export default client;
