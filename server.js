import { connectDB } from './data/database.js';
import {app} from './app.js';


//Connecting Database
connectDB();

console.log();
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });