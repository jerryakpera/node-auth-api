// Utils function tests
describe("Testing helper functions", () => {
  const getID = require("./util").getID
  it("getID function should return a value", () => {
    expect(getID).toBeDefined()
  })
})