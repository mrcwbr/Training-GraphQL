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
