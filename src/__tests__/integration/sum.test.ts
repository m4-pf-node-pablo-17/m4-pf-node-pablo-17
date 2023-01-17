const sum = ( a: number, b: number, ): number => {
    return a + b
}

describe('Tests for sum function', () => {
    it('Deve ser capaz de somar 2 números', () => {
        const result =  sum(3, 5)
        const expectedResult = 3 + 5

        expect(typeof result).toBe('number')
        expect(result).toBe(expectedResult)
    })

    it('Capaz de somar 2 números. Espero algum resultado', () => {
        const result =  sum(5, 5)
        const wrongResult = 3 + 5

        expect(typeof result).toBe('number')
        expect(result).not.toBe(wrongResult)
    })
})