/*
For my colleagues :

If you need to include the dependencies or build artifacts, the process is detailed in the README.md

*/


/* valid express javascript boilerplate code */
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req :any, res:any) => {
  res.send('Hello World!')
})


/*   */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
/* end */

