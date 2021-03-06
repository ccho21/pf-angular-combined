require('dotenv').config();

const mongoose = require('mongoose');

// const config = require('config');
const db = process.env.MONGO_URI.replace('<PASSWORD>', process.env.MONGO_PW);

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    // eslint-disable-next-line no-console
    // console.log(con.connections);

    // eslint-disable-next-line no-console
    console.log('MongoDB Connected...');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);

    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
