# Challenge #1: Apollo Server erstellen

## Ziel

Wir wollen ein neues Node.js Projekt erstellen, einen Apollo Server hinzufügen und grundlegend konfigurieren.

### Neues Projekt erstellen

Erzeuge mit `npm init` ein neues Projekt und füge folgende Packages hinzu:

**dependencies:**

- apollo-server-express
- compression
- cors
- express
- graphql
- graphql-import-node
- graphql-modules

**devDependencies:**

- @graphql-tools/schema
- @types/compression
- @types/cors
- @types/graphql
- @types/node
- nodemon
- ts-node
- typescript

Ersetze `scripts` in der `package.json` mit folgenden:

```json
"scripts": {
    "start:dev": "npm run build:dev",
    "build:dev": "nodemon 'src/server.ts' --exec 'ts-node' src/server.ts -e ts,graphql --inspect-brk"
},
```

Erstellt nun eine `tsconfig.json` mit folgenden Inhalt:

```json
{
  "compilerOptions": {
    "target": "es2016",
    "lib": ["dom", "es6"],
    "experimentalDecorators": true,
    "module": "commonjs",
    "rootDir": "src",
    "sourceMap": true,
    "outDir": "dist",
    "removeComments": true,
    "importHelpers": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitAny": false,
    "skipLibCheck": true
  }
}
```

Nun braucht ihr nochen `src` Folder, wo alle weiteren Dateien hinterlegt werden.

### Erstes Schema & Resolver implementieren

Erstellt euch im `src` Folder eine `schema.graphql` mit folgender Definition:

```js
type Query {
    hello: String
}
```

Ausserdem einen Resolver `resolver.ts`. Der Rückgabewert für `hello` sollte _world_ sein.

### server.ts erstellen

In `server.ts` implementieren wir den Apollo Server. 

Wichtig ist als erstes `import "graphql-import-node";` einzufügen, damit wir die `.graphql` Dateien direkt importieren können.

Ihr könnt den Apollo Server nach folgenden Leitfaden implementieren. Alternative findet ihr die Lösung dem `final` Folder.

Folgende Konfiguration sollte der Apollo Server aufweisen:

- Er sollte aus `express` basieren
- `cors` und `compression` integriert haben
- Auf **http://localhost:3000/graphql** hören

### Apollo Server starten und ausführen

Ihr könnt den Server nun über `yarn start:dev` bzw. `npm run start:dev` starten. Unter http://localhost:3000/graphql findet ihr den Playground, wo ihr eure Implementierung testen könnt.

## Ressourcen

- [Get started with Apollo Server](https://www.apollographql.com/docs/apollo-server/getting-started/)
- [Basic Apollo Express GraphQL API with TypeScript](https://medium.com/@th.guibert/basic-apollo-express-graphql-api-with-typescript-2ee021dea2c)
