import { Pool } from 'pg';

const connectionString = 'postgresql://postgres:WTMGfiVWGdSujrODSGAPWKaeQpWmiNaK@junction.proxy.rlwy.net:39795/railway';

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false, // Permite conexões SSL não autorizadas
  }
});

export default pool;