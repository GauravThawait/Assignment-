import { app } from "./app.js";
import { PORT } from "./constant.js";
import connectDB from "./db/connectDB.js";

connectDB()
.then( ()=> {
    app.listen(PORT || 9090, () => {
        console.log(`Server is running on PORT ${PORT}`)
      })
})
.catch((err) => {
    console.log("MONGO db Connection failed !!! ", err)
  }) 

  app.get("/", (req, res) => {
    res.send("Server is running")
})