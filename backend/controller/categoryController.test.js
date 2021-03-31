const rewire = require("rewire")
const categoryController = rewire("./categoryController")
const add = categoryController.__get__("add")
// @ponicode
describe("add", () => {
    test("0", () => {
        let result = add(-1, 10)
        expect(result).toBe(9)
    })

    test("1", () => {
        let result = add(-1, "foo bar")
        expect(result).toBe(0)
    })
})
