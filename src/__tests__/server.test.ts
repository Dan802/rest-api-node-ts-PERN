// describe: agrupa
describe('first test', () => {
  it('Debe revisar que 1 + 1 = 2', () => {
    expect(1 + 1).toBe(2);
  })

  it('Debe revisar que 1 + 1 != 3', () => {
    expect(1 + 1).not.toBe(3);
  })
})