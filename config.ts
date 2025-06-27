import 'dotenv/config'
import { schemaDefinitions } from './cloud/schema.js';
export const port = process.env.PORT;
export const databaseURI = process.env.DATABASE_URI;
export const appId = process.env.APP_ID;
export const appClientKey = process.env.CLIENT_KEY;
export const javascriptKey = process.env.JAVASCRIPT_KEY;
export const restAPIKey = process.env.REST_API_KEY;
export const masterKey = process.env.MASTER_KEY;
export const serverURL = process.env.SERVER_URL;
export const mountPath = `/client`;

console.log(`/ / / / / / / / / / / / / / / / / / / / / / / / / / / `)
console.log(`port / / / / / / / / `, port)
console.log(`databaseURI / / / / / / / / `, databaseURI)
console.log(`appId / / / / / / / / `, appId)
console.log(`appClientKey / / / / / / / / `, appClientKey)
console.log(`javascriptKey / / / / / / / / `, javascriptKey)
console.log(`restAPIKey / / / / / / / / `, restAPIKey)
console.log(`masterKey / / / / / / / / `, masterKey)
console.log(`serverURL / / / / / / / / `, serverURL)
console.log(`/ / / / / / / / / / / / / / / / / / / / / / / / / / / `)

export const config = {
  port,
  databaseURI,
  appId,
  appClientKey,
  javascriptKey,
  masterKey,
  restAPIKey,
  mountPath,
  allowClientClassCreation: true,
  directAccess: true,
  cloud: () => import('./cloud/main.js'),
  serverURL,
  publicServerURL: serverURL,
  liveQuery: {
    classNames: ['Posts', 'Comments'],
  },
  schema: {
    definitions: schemaDefinitions,
    lockSchemas: false,
    strict: true,
    recreateModifiedFields: false,
    deleteExtraFields: false,
  },
}

