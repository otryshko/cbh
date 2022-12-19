const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns partition key when it is provided", () => {
    const trivialKey = deterministicPartitionKey({'partitionKey': "1"});
    expect(trivialKey).toBe("1");
  });
  it("Returns stringified partition key when it is provided", () => {
    const trivialKey = deterministicPartitionKey({'partitionKey': 1});
    expect(trivialKey).toBe("1");
  });
  it("Returns hash when there is no key", () => {
    const trivialKey = deterministicPartitionKey({'a': 1});
    expect(trivialKey).toBe("c9a6cb6de7eade2b826bdf037b53d731787039c07a68060d340e805d65eb181cdb8f8ff65c3b1196a4f6019f35f4527e5a4c409f62c7d371cb13eb7b7b50b3c3");
  });
  it("Returns stringified partition key when an object", () => {
    const trivialKey = deterministicPartitionKey({'partitionKey': {}});
    expect(trivialKey).toBe("{}");
  });
  it("Returns stringified partition key when an object under than the max length", () => {
    const longKey = Array(127).fill().map(_ => Math.floor((Math.random() * 10)))
    const trivialKey = deterministicPartitionKey({'partitionKey': longKey});
    console.log(longKey)
    expect(trivialKey.length).toBe(255);
  });
  it("Returns hash when an object bigger than the max length", () => {
    const longKey = Array(128).fill().map(_ => Math.floor((Math.random() * 10)))
    const trivialKey = deterministicPartitionKey({'partitionKey': longKey});
    console.log(longKey)
    expect(trivialKey.length).toBe(128);
  });
});

