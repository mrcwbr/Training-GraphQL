# Challenge #6: Error Handling & Analyse
## Ziel

In dieser Übung wollen wir herrausfinden, wie wir Fehler übermitteln und wie wir mit Hilfe des [Apollo Studios](https://studio.apollographql.com/) Telemetry Daten erfassen können.

## Erstellen eines Apollo Studio Account 

Wir erstellen uns unter https://studio.apollographql.com/ einen neuen Apollo Studio Account und legen einen neuen Graph an. Als GraphType wählen wir **Deployed** und kopieren uns die generieren Environemnt Variables.

Wir fügen dem Apollo Server Projekt das Package `dotenv` hinzu und erstellen uns ein `/src/.env` File. Dort fügen wir die 4 Environment Variables vom Apollo Studio ein.

Nun müssen wir noch unsere `server.ts` erweitern um das Apollo Studio zu integrieren:

```typescript
import 'graphql-import-node';
import dotenv from 'dotenv';
// ...

dotenv.config({ path: __dirname + '/.env' });

const server = new ApolloServer({
  // ...
  plugins: [
    ApolloServerPluginUsageReporting({
      sendVariableValues: { all: true },
      sendHeaders: { all: true },
      generateClientInfo: ({ request }) => {
        const headers = request.http && request.http.headers;
        if (headers) {
          return {
            clientName: headers['apollographql-client-name'],
            clientVersion: headers['apollographql-client-version'],
            userAgent: headers['user-agent'],
          };
        } else {
          return {
            clientName: 'Unknown Client',
            clientVersion: 'Unversioned',
            userAgent: 'Unkown userAgent',
          };
        }
      },
    }),
  ],
});
```

Wenn wir nun den Apollo Server starten und ein paar Queries im Playground oder mit der React App ausführen, werden wir diverse Einträge im Apollo Studio finden.

## Fehler übermitteln

Apollo bietet uns verschiedene [Fehlertypen](https://www.apollographql.com/docs/apollo-server/data/errors/#error-codes), die wir je nach Anwendungsfall entsprecht übermitteln können. Außerdem können auch eigene Fehlertypen implementiert werden.

Wir wollen bei dem Resolver `Query.attendee` einen `UserInputError` zurückgeben, wenn die `attendeeId` < 1 oder undefinded ist.

Sollte kein Teilnehmer gefunden werden, geben wir einen Apollo Error zurück.

> Die Lösung findet ihr in `solutions.md`
## Ressourcen

- [Apollo Studio Docu](https://www.apollographql.com/docs/studio/)
- [Errors](https://www.apollographql.com/docs/apollo-server/data/errors/)