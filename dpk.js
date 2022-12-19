const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {

  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  // the key is either partitionKey property, or event hash or fallback default 
  // below are the functional-style methods providing basic primitives

  const hash = (s) => {
    return crypto.createHash("sha3-512").update(s).digest("hex")
  }

  const limit = (s) => {
    return s?.length > MAX_PARTITION_KEY_LENGTH ? hash(s): s
  }
  const str = (o) => {
    return typeof o === "string" ? o : JSON.stringify(o)
  }

  // higher-level key derivations
  const getKeyFromProperty = (e) => {
    return str(e?.partitionKey)
  }
  const getKeyFromObject = (data) => {
    return data ? hash(str(data)) : null
  }

  // combine lookups together
  return limit (getKeyFromProperty(event) ?? getKeyFromObject(event) ?? TRIVIAL_PARTITION_KEY)

};
