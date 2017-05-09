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
  },
   webpack: {
    rules: {
      sass: {
        data: '@import "_variables"'
      }
    }
  }
}
