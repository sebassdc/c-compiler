
export default tokens => {
  const ast = {}
  let current = 0
  const genAst = (tokens, current, ast) => {
    while (current < tokens.length) {
      const { type, value } = tokens[current]
      console.log(type, value)
      current++
    }
  }
  return genAst(tokens, current, ast)
}