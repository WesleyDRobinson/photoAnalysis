const getFace = require('./getFace.js')
const getText = require('./getText.js')

// usage
// getFace('http://www.sharegif.com/wp-content/uploads/2013/11/Emma-Stone6.gif')
// getText('https://lh3.googleusercontent.com/YKhTddSXkfT_00rwiF2KZxOH5jNoI6_jrZIk4hu41RV7cCGzTcR8ESgXCmJoTUOWkt0Kpk6ydsvqE0sCpCHCknBZb8UybXoh4pH9WEK6_Q9atnBtwpLBF9CZtgwAJ2dHtX2BL99vrjoC7YRphLRgsFkS_tWXWjkiWcibNxi67V3Od5PptOeWNQMSfs6prpqvjeirqnwhs9DGLXMAdwJ2wru76qo60FUX_AGlqWzCPYcpmfCKhlYP_ZpjONRlWfDvprwhKqq2qGozGiLIbvXfk6faIBmUyli0r0NZAeq8FFYoTZVFajZe8GN4UfutofM8DPivUzBSOOxFdSKl6--X2bmYyCPUEZvZudgFoYR6xLmR8S_TJ0WiV1gXBHv8QIbsh2_V22R4PVjcASG2KL9xhwXXjSGK9ttsXzBiuyViMU9N-2VWOoww4SWnR34wxXL26E1uViwN_qdNRuvXCCrb5VcI6y23pUQO9Sv4FqKS9-hjLfdGkMezclny4zGgFEthhlroNbunnYSjrqDRYlkwHRXVXp2a-pS6bcUsgBo4k27PTMOMTFoFMGpQFi4Oh_jsI8Glset3WNaad9qUTt8PLvo8tbBJfMPa8e4B8Cq-WZQ=w460-h514-no')
//     .then(val => console.log(val))
//     .catch(err => console.error('program failed 😢, but it\'s gonna be ok, find the error here =>', err))

module.exports = {
    getFace,
    getText
}