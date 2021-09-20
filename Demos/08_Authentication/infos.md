yarn add jsonwebtoken jwks-rsa express-openid-connect express-jwt


jsonwebtoken axios jwk-to-pem

PW: gHy!HTWX*F6WT


# Apollo

yarn add jwk-to-pem

## .env

```
// ...

AUTH_OPTIONS_INTROSPECT_JWKS_URI=https://meyer-consulting.eu.auth0.com/.well-known/jwks.json
AUTH0_AUDIENCE=https://keepinmind-packlist-dev.azurewebsites.net/api/
AUTH0_SECRET=tJUkfQGCDnHbsH6aQWMhXn4mzFDtdLqm8BGmvbGW2uS-aqV7HKDxG8KA5rhtWJWJ
AUTH0_CLIENTID=gLjwiO0CH0u0oRTIgga4BbqS4TO4FeLQ
AUTH0_DOMAIN=meyer-consulting.eu.auth0.com
```

## auth0.ts

```
import { AuthenticationError } from 'apollo-server-core';
import jwt from 'jsonwebtoken';
import * as Axios from 'axios';
import jwkToPem from 'jwk-to-pem';

export const verifyAuth0Token = async (token: string): Promise<IAuth0Context> => {
  const options = {
    audience: process.env.AUTH0_AUDIENCE,
    jwksUri: process.env.AUTH_OPTIONS_INTROSPECT_JWKS_URI,
  };
  let tokenInfo: any;
  try {
    const publicKeys = await Axios.default.get<PublicKeys>(options.jwksUri!);
    const pem = jwkToPem(publicKeys.data.keys[0]);

    const jwtToken = token.split(' ')[1];
    tokenInfo = jwt.verify(jwtToken, pem);

    let isAuthorized = true;
    if (Date.now() >= tokenInfo.exp * 1000) {
      isAuthorized = false;
    }

    if (!tokenInfo.aud.includes(options.audience)) {
      isAuthorized = false;
    }

    if (isAuthorized) {
      return {
        isAuthorized,
        userId: tokenInfo.sub,
        token: jwtToken,
      } as IAuth0Context;
    }
    throw new AuthenticationError('Invalid jwt token.');
  } catch (error) {
    throw new AuthenticationError("Can't verify jwt token. User must be logged in!");
  }
};

interface PublicKeys {
  keys: {
    alg: string;
    e: string;
    kid: string;
    kty: string;
    n: string;
    use: string;
  }[];
}

export interface IAuth0Context {
  userId: string;
  isAuthorized: boolean;
  token: string;
}

```

## server.ts

```
const server = new ApolloServer({
  // ...
   context: async ({ req, connection }) => {
    let token = '';
    if (connection) {
      token = connection.context.Authorization || connection.context.headers.Authorization;
    } else if (req) {
      token = req.headers.authorization || '';
    }

    if (!token) throw new AuthenticationError('You are not authorized.');
    const user = await verifyAuth0Token(token);

    return { user };
  },
  // ...
});

// ...

server.applyMiddleware({ app, path: '/graphql' });

app.get('/token', async (req, res) => {
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', process.env.AUTH0_CLIENTID!);
  params.append('client_secret', process.env.AUTH0_SECRET!);
  params.append('audience', process.env.AUTH0_AUDIENCE!);

  const result = await axios.post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, params);

  res.send(result.data.access_token);
});

```

## data/attendeeData.ts

```
willSendRequest(request) {
    request.headers.set('Authorization', `Bearer ${this.context.user.token}`);
  }
```

# Client App

## AuthorizedApolloProvider.tsx

```
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, NormalizedCacheObject, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import axios from 'axios';

const AuthorizedApolloProvider: React.FC = (props) => {
  const getAccessToken = async () => {
    if (localStorage['apitoken'] == null) {
      const params = new URLSearchParams();
      params.append('grant_type', 'client_credentials');
      params.append('client_id', 'gLjwiO0CH0u0oRTIgga4BbqS4TO4FeLQ');
      params.append('client_secret', 'tJUkfQGCDnHbsH6aQWMhXn4mzFDtdLqm8BGmvbGW2uS-aqV7HKDxG8KA5rhtWJWJ');
      params.append('audience', 'https://keepinmind-packlist-dev.azurewebsites.net/api/');

      const result = await axios.post(`https://meyer-consulting.eu.auth0.com/oauth/token`, params);

      localStorage['apitoken'] = result.data.access_token;
      return result.data.access_token;
    }

    return localStorage['apitoken'];
  };
  const httpLink = new HttpLink({
    uri: 'http://localhost:3000/graphql',
  });

  const wsLink = new WebSocketLink({
    uri: 'ws://localhost:3000/graphql',
    options: {
      reconnect: true,
      connectionParams: async () => {
        const apiAccessToken = await getAccessToken();
        return {
          headers: {
            Authorization: apiAccessToken ? `Bearer ${apiAccessToken}` : '',
          },
        };
      },
    },
  });

  const authLink = setContext(async (_, { headers }) => {
    const apiAccessToken = await getAccessToken();

    return {
      headers: {
        ...headers,
        authorization: `Bearer ${apiAccessToken}`,
      },
    };
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    authLink.concat(httpLink),
  );

  const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
    return new ApolloClient({
      link: splitLink,
      cache: new InMemoryCache(),
    });
  };

  const apolloClient = createApolloClient();

  return <ApolloProvider client={apolloClient}>{props.children}</ApolloProvider>;
};

export default AuthorizedApolloProvider;

```


## index.tsx

```
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider domain="meyer-consulting.eu.auth0.com" clientId="et4oDR3H20lRf06uGEhiYnlkTqjuXWd3" redirectUri={window.location.origin}>
      <AuthorizedApolloProvider>
        <Router>
          <App />
        </Router>
      </AuthorizedApolloProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

```