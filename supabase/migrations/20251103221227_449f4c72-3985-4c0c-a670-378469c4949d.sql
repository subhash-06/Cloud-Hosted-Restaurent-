-- Enable pgcrypto extension properly with all functions
DROP EXTENSION IF EXISTS pgcrypto;
CREATE EXTENSION pgcrypto;