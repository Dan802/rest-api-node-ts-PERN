import {exit} from "node:process"
import db from "../config/db"

const clearDB = async () => {
  try {
    await db.sync({force: true})
    console.log("Drop table succesfully")
    exit(0)
  } catch (error) {
    console.log(error)
    exit(1)
  }
}

// process.argv: executed from cli (command line)
if(process.argv[2] === '--clear') {
  clearDB()
}