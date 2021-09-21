# Challenge #8: Schema & Resolver erstellen

## Ziel

In dieser Übung wollen wir uns der Sicherheit zuwenden. Dazu erweitern wir unseren Apollo Server um eine OAuth2 Authentifizierung. Somit können nur noch autorisierte Aufrufer den Apollo Server nutzen.

## Authentication im Apollo Server implementieren

Zu erst müssen wir im Apollo Server ein Package installieren, um den JSON Web Key to einem PEM zu konvertieren:

```bash
yarn add jwk-to-pem
```

Als nächstes müssen wir unsere `.env` Konfiguration mit den Werten aus dem Notion Board erweitern.

Um uns nicht im Detail mit Auth0 zu beschäftigen, findet ihr die Funktion zum validieren des Access Token im File `auth0.ts`. Importiert dies in den `src` Folder eures GraphQL Servers.

Nun erweitern wir die `context` Funktion in `server.ts` des ApolloServers um bei jeden Aufruf den Token zu evaluieren und die UserInformationen zurück zu geben.

```typescript
import { verifyAuth0Token } from './auth0';
import axios from 'axios';

// ...

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
  }
});
```

Damit wir ein Token zum Testen generieren können, erweitern wir den express um die Route `/token`, welche uns später das Test-Token ausgibt. Dazu fügen wir dem `server.ts` folgendes hinzu:

```typescript
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

**Nicht in Produktion nachmachen!**

### REST DataSource absichern

Um den Token über die RESTDataSource an die REST API weiterzuleiten, kann man die Function `willSendRequest` nutzen. Die Implementierung würde wie folgt aussehen:

```typescript
willSendRequest(request) {
    request.headers.set('Authorization', `Bearer ${this.context.user.token}`);
}
```


## Authentication im React nutzen

In der React Application muss nun der `ApolloProvider` durch einen `AuthorizedApolloProvider` ersetzt werden. Dieser erstellt uns einen API Access Token, welchen wir für den Aufruf des Apollo Server benötigen.

Dazu importiert bitte `AuthorizedApolloProvider.tsx` in den `src` Folder eurer React Application.

Danach ersetzt in `index.tsx` den `ApolloProvider` mit dem `AuthorizedApolloProvider`.

> **WICHTIG!** Hierbei handelt es sich um einen Workaround um die Komplexität der Übung nicht zu stark zu erhöhen. Normalerweise würde man hier über `useAuth0.getTokeSilently()` einen API Token generieren lassen. Dazu sind im LOCALHOST Modus jedoch einige aufwendigere Anpassungen nötigt (etc/hosts und SSL).

Nun kann die React App wieder mit dem Apollo Server kommunizieren.

## Ressourcen

- [Apollo Server - Auth](https://www.apollographql.com/docs/apollo-server/security/authentication/)