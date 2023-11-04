
CREATE TABLE IF NOT EXISTS payments
(
    payment_id bigint NOT NULL,
    order_id bigint NOT NULL,
    date_created character varying(255) COLLATE pg_catalog."default",
    status character varying(25) COLLATE pg_catalog."default",
    CONSTRAINT payments_pkey PRIMARY KEY (payment_id)
);


INSERT INTO payments values (30500,10500,'2021-01-21','COMPLETED');
INSERT INTO payments values (31500,11500,'2021-04-21','COMPLETED');
INSERT INTO payments values (32500,12500,'2021-05-31','PROCESSING');
INSERT INTO payments values (32500,12501,'2021-06-31','PROCESSING');
INSERT INTO payments values (32600,12502,'2021-07-31','PROCESSING');
INSERT INTO payments values (32700,12503,'2021-08-31','PROCESSING');
INSERT INTO payments values (32800,12504,'2021-09-31','PROCESSING');
INSERT INTO payments values (32900,12505,'2021-10-31','PROCESSING');
INSERT INTO payments values (33000,12506,'2021-11-31','PROCESSING');
-- INSERT INTO payments values (33001,12507,'2021-12-31','PROCESSING');

SELECT * FROM pg_create_logical_replication_slot('tslogical_slot_wal2json', 'wal2json')