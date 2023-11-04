import { LogicalReplicationService, Wal2Json, Wal2JsonPlugin } from "pg-logical-replication";

// We need to create a logical replication slot before subscribing.
// SELECT * FROM pg_create_logical_replication_slot('tslogical_slot_wal2json', 'wal2json')
const slotName = 'tslogical_slot_wal2json';

const service = new LogicalReplicationService(
  /**
   * node-postgres Client options for connection
   * https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/pg/index.d.ts#L16
   */
  {
    database: 'payment_db',
    host: 'localhost',
    user: 'postgresuser',
    password: 'postgrespw',
    port: 5432,
    // ...
  },
  /**
   * Logical replication service config
   * https://github.com/kibae/pg-logical-replication/blob/main/src/logical-replication-service.ts#L9
   */
  {
    acknowledge: {
      auto: true,
      timeoutSeconds: 10
    }
  }
);

// `TestDecodingPlugin` for test_decoding and `ProtocolBuffersPlugin` for decoderbufs are also available.
const plugin = new Wal2JsonPlugin({
  /**
   * Plugin options for wal2json
   * https://github.com/kibae/pg-logical-replication/blob/main/src/output-plugins/wal2json/wal2json-plugin-options.type.ts
   */
  //...
});

/**
 * Wal2Json.Output
 * https://github.com/kibae/pg-logical-replication/blob/ts-main/src/output-plugins/wal2json/wal2json-plugin-output.type.ts
 */
service.on('data', (lsn: string, log: Wal2Json.Output) => {
  log.change.map((change) => {
    console.log({ lsn, data: change });
  });
});

(async () => {
  console.log("Starting CDC service...");
  await service.subscribe(plugin, slotName)
})()