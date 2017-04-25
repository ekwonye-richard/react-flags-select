module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactFlagsSelect',
      externals: {
        react: 'React'
      }
    }
  }
}
