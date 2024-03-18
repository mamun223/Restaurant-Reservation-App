/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require('dotenv').config();
const path = require("path");

const {
  DATABASE_URL="postgres://navsrnys:pkFMzbe2SUOzvV9dE-2V1T5OWt_s5ous@drona.db.elephantsql.com/navsrnys",
DATABASE_URL_DEVELOPMENT="postgres://lwuzpejc:DCwet7vLbbJUv9CJTnw2q2vwf-agYbdT@drona.db.elephantsql.com/lwuzpejc",
DATABASE_URL_TEST="postgres://jhergnpg:O1VbriZ_COKjtsO4PnK75i6Q8S4kJg8I@drona.db.elephantsql.com/jhergnpg",
DATABASE_URL_PREVIEW="postgres://rdhjctix:CV5Eo_H0O_UETanVPiSMmVhMl57jFnnU@drona.db.elephantsql.com/rdhjctix",
  DEBUG,
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_DEVELOPMENT,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  test: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_TEST,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  preview: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_PREVIEW,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  production: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
};
