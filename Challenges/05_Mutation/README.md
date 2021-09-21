# Challenge #2: Mutationen

## Ziel

In den letzten Übungen haben wir uns vor allem mit Abfragen auseinander gesetzt. Jetzt schauen wir uns die Mutationen genauer an, damit wir unsere Daten auch bearbeiten können und die restlichen REST API Calls in unserer React Application los werden.

Außerdem werden wir uns auch Enums und UnionTypes, zwei der wertvolle Features, näher ansehen.

### Erstellen der Mutationen im Apollo Server

Wir wollen folgende Mutationen durchführen können:

- Neuen Teilnehmer anlegen
- Einem Teilnehmer Sessions zuweisen
- Einen Teilnehmer löschen

Dazu legen wir zuerst eine `Mutation` Definition an, dazu erstellt ihr das File `typeDefs/mutation.graphql`. Die baut sich im wesentlichen wie eine Query Definition auf. Infos findet ihr in den [Apollo Docs - Mutations](https://www.apollographql.com/docs/apollo-server/schema/schema/#the-mutation-type)

> Solltet ihr nicht weiterkommen, findet ihr das Mutation Schema in der `solutions.md`

Danach legen wir uns einen `Union Type` an. Der ermöglicht es, das wir als RÜckgabewert für die Mutation, den entsprechenden Teilnehmer oder ein Fehlerobjekt zurückgeben. In dem Fehlerobjekt haben wir einen `MutationOperationType`, welcher angibt um welche Art der Mutation es sich gehandelt hat.

Das `Enum` sollte folgende Werte haben:

- Create
- Delete
- AddSession

Das Fehlerobjekt sollte folgende Werte haben:

- operation: `MutationOperationType`
- attendeeId: `ID`
- errorMessage: `String`

In den Apollo Docs findet ihr mehr zu [Union Type](https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces/#union-type) und [Enums](https://www.apollographql.com/docs/apollo-server/schema/schema/#enum-types).

Nun müsst ihr noch den `resolvers/attendeeResolvers.ts` ensprechend für die Mutationen und das Enum erweitern.

Außerdem benötigt ihr für den Union Type noch einen Resolver, damit der GraphQL Server deuten kann, welchen Type (`Attendee` oder `AttendeeMutationError`) er zurückgeben muss. Die Implementierung ist die folgende:

```typescript
export default {
  Query: {
    // ...
  },
  Mutation: {
    // ...
  },
  Attendee: {
    // ...
  },
  AttendeeMutationOperation: {
    Create: 1,
    Delete: 2,
    AddSession: 3,
  },
  AttendeeMutationResponse: {
    __resolveType(obj: IAttendeeMutationError | IAttendee, context, info) {
      if (obj.hasOwnProperty('errorMessage')) {
        return 'AttendeeMutationError';
      }

      if (obj.hasOwnProperty('id')) {
        return 'Attendee';
      }

      return null;
    },
  },
};
```

## Ersetzen der REST API Calls in der React App

In der React App nutzen die Components `AddAttendee` und `AddSessions` aktuell die REST API um Mutationen durchzuführen.

Ersetzt diese REST API Calls durch den `useMutation` Hook. Informationen zum Hook findet ihr in den [Apollo Docs](https://www.apollographql.com/docs/react/data/mutations/).

Aber auch hier müsst ihr, wie bei den Queries, zuerst die GraphQL Mutation Commands und die `interfaces` anlegen.

Fügt folgende models zu `graphql/models/attendee.ts` hinzu:

```typescript
export interface ICreateAttendeeGraphRequest {
  firstName: string;
  lastName: string;
  emailAddress: string;
  userName: string;
  sessionIds: number[];
}

export interface IAddSessionsToAttendeeRequest {
  attendeeId: number;
  sessionIds: number[];
}
```

Erzeugt das File `graphql/mutations/attendee.ts` und definiert dort eure Mutation Commands (Aufbau ist sehr ähnlich den Queries).

Geht nun in die betroffenen Components, entfernt die REST API Calls und ersetzt Sie durch den `useMutation` Hook.

Es könnte in etwa so aussehen:

```typescript
const [createAttendee] = useMutation<IAttendeeGraphModel>(CREATE_ATTENDEE, {
    onCompleted: (data) => {
      props.onCompleted(data);
    },
  });

// An der gewünschten Stelle kann der Hook dann aufgerufen werden

await createAttendee({
            variables: {
              attendee: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                emailAddress: formData.emailAddress,
                userName: formData.userName,
                sessionIds: [],
              } as ICreateAttendeeGraphRequest,
            },
          });
```

## Ressourcen

- [Mutation - Server](https://www.apollographql.com/docs/apollo-server/schema/schema/#the-mutation-type)
- [Mutation - Client](https://www.apollographql.com/docs/react/data/mutations/)