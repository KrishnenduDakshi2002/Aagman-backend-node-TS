import config from 'config';
import mongoose from 'mongoose';


async function connect(){
    const dbUri = config.get('DB_URI') as string;

    try {
        await mongoose.connect(dbUri);
        console.log("Database is connected");
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

export default connect;