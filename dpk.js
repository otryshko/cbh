const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {

  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  // the key is either partitionKey property, or event hash or fallback default 
  // below are the functional-style methods providing basic primitives

  const limit = (s) => {
    return s?.length > MAX_PARTITION_KEY_LENGTH ? crypto.createHash("sha3-512").update(s).digest("hex") : s
  }
  const str = (o) => {
    return typeof o === "string" ? o : JSON.stringify(o)
  }

  // higher-level key derivations
  const getKeyFromProperty = (e) => {
    return str(e?.partitionKey)
  }
  const getKeyFromObject = (data) => {
    return data ? crypto.createHash("sha3-512").update(str(data)).digest("hex") : null
  }

  // combine lookups together
  return limit (getKeyFromProperty(event) ?? getKeyFromObject(event) ?? TRIVIAL_PARTITION_KEY)

};
