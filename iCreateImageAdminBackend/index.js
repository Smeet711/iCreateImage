const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const cors = require("cors");
const xlsx = require("xlsx");
const ObjectId = mongoose.Types.ObjectId;
const dotenv = require("dotenv")


const {
  Invitation,
  Poster,
  ThankYou,
  thankYouLogo,
  DelegateBadge,
  AnniversaryGreeting,
  Placard,
  Certificate,
  CalendarEvent,
  Sticker,
  Label,
  PrescriptionPad,
  ReminderCard,
  BirthdayGreeting,
  WelcomeCard,
  Userinvit,
  Remindertemplate,
  reminderLogo,
} = require("./models/model");

const User = require("./models/user");


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));
dotenv.config()
// app.use(cors());










// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5174");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

mongoose.connect(
  "mongodb+srv://dbdev:KAci4d3B03LHWbGq@cluster0.7m0lwu4.mongodb.net/testcards",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// mongoose.connect(
//   "mongodb+srv://dbdev:KAci4d3B03LHWbGq@cluster0.7m0lwu4.mongodb.net/client",
//   { useNewUrlParser: true, useUnifiedTopology: true }
// );

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("MongoDB connected successfully");
});

// changes

// Second database connection
const secondDb = mongoose.createConnection(
  "mongodb+srv://dbdev:KAci4d3B03LHWbGq@cluster0.7m0lwu4.mongodb.net/client",
  { useNewUrlParser: true, useUnifiedTopology: true }
);



// admin routes

const adminRoutes = require("./routes/admin")
app.use('/api', adminRoutes);


// Multer setup for handling file uploads
const storage2 = multer.memoryStorage();
const upload2 = multer({ storage2: storage2 });

// const SecondDatabaseModel = secondDb.model('SecondDatabaseModel', {
//   // Define your schema for the second database here
//   USERNAME: {
//     type: String,
//     // required: true,

// },
// MRID:{
//     type: String,
//     // required: true,
//     unique: true
// },
// PASSWORD: {
//     type: String,
//     // required: true,
// },
// EMAIL: {
//     type: String,
//     //  required: true,
//     // unique: true,
// },
// ROLE: {
//     type: String,
//     // required: true,
// },
// HQ: {
//     type:String,
//     // required : true,
// },

// REGION: {
//     type:String,
//     // required:true,
// },
// BUSINESSUNIT: {
//     type:String,
//     // required:true

// },
// DOJ:{
//     type:String,
//     // required:true
// },
// SCCODE:{
//     type: String,
//     // required:true,
//     // unique:true
// },

// loginLogs: [
//     {
//         timestamp: {
//             type: Date,
//             default: Date.now,
//         },
//         cnt: {
//             type: Number,
//             required: false,
//             default: 0
//         },
//     },
// ],
// cardCategories: [],

// });

const SecondDatabaseUser = secondDb.model("User", User.schema);

app.post("/createUser", async (req, res) => {
  try {
    // Create a new document using the User model
    const newUser = await SecondDatabaseUser.create(req.body);

    // Respond with the created user
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint for handling POST requests with file upload
app.post("/createUserexcel", upload2.single("file"), async (req, res) => {
  try {
    // Extract data from form fields
    const { file } = req;
    // console.log(file);

    // If a file is uploaded, process it using xlsx library
    let uploadedData = [];
    if (file) {
      const workbook = xlsx.read(file.buffer, { type: "buffer" });

      // Assuming the first sheet is the relevant one
      const sheetName = workbook.SheetNames[0];
      console.log(sheetName);
      const worksheet = workbook.Sheets[sheetName];

      // Convert worksheet to an array of objects
      uploadedData = xlsx.utils.sheet_to_json(worksheet);
      console.log(uploadedData);
    }

    // Create an array of promises for creating users from the uploaded data
    const createPromises = uploadedData.map((data) =>
      SecondDatabaseUser.create(data)
    );

    // Execute all promises in parallel
    const createdUsers = await Promise.all(createPromises);

    // Respond with the created users
    // res.status(201).json(createdUsers);
    return res.json({
      msg: " successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// changes

app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  // fileFilter
});

// Testing for multiple images

app.post("/thankyou-image", upload.single("image"), async (req, res) => {
  try {
    const brandName = req.body.brandName;
    const designName = req.body.designName;
    const thankyou = await new ThankYou({
      brandName,
      design: [{ name: designName, image: req.file.filename }],
      designtype1: [
        {
          brandName,
          designName,
          image: req.file.filename,
        },
      ],
    }).save();

    res.json({
      message: "ThankYou Template Created successfully",
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      res.status(409).json({ error: "Brand name already exists" });
    } else {
      res.status(500).json({ error });
    }
  }
});

app.post("/reminder-template", upload.single("image"), async (req, res) => {
  try {
    const brandName = req.body.brandName;
    const designName = req.body.designName;
    const reminder = await new Remindertemplate({
      brandName,
      design: [{ name: designName, image: req.file.filename }],
      designtype1: [
        {
          brandName,
          designName,
          image: req.file.filename,
        },
      ],
    }).save();
    res.json({
      message: "Reminder Template Created successfully",
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      res.status(409).json({ error: "Brand name already exists" });
    } else {
      res.status(500).json({ error });
    }
  }
});

app.post("/logo", upload.single("image"), async (req, res) => {
  try {
    const logoName = req.body.logoName;
    const logoImage = req.file.filename;
    const logo = new thankYouLogo({
      logos: [{ logoName, logoImage }],
    });
    // Save the logo instance to the database
    const savedLogo = await logo.save();
    // Fetch all data after saving
    const allData = await thankYouLogo.find({});

    res.json({
      message: "Logo Created successfully",
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      res.status(409).json({ error: "Brand name already exists" });
    } else {
      res.status(500).json({ error });
    }
  }
});

app.post("/reminder-logo", upload.single("image"), async (req, res) => {
  try {
    const logoName = req.body.logoName;
    const logoImage = req.file.filename;
    const logo = new reminderLogo({
      logos: [{ logoName, logoImage }],
    });
    // Save the logo instance to the database
    const savedLogo = await logo.save();
    // Fetch all data after saving
    const allData = await thankYouLogo.find({});

    res.json({
      message: "Reminder Logo Created successfully",
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      res.status(409).json({ error: "reminder Logo already exists" });
    } else {
      res.status(500).json({ error });
    }
  }
});

// Route to handle POST requests
app.post("/userinvitations", async (req, res) => {
  try {
    const newUserInvitation = new Userinvit(req.body);

    // Save the new invitation to the database
    await newUserInvitation.save();

    res.status(201).json(newUserInvitation);
  } catch (error) {
    res.status(500).json({ error: "Could not create the invitation" });
  }
});

// Invitation post request
// app.post("/invitations", upload.single('image'), (req, res) => {
//   const { brandname, designName } = req.body;
//   const image = req.file.filename;

//   const newInvitation = new Invitation({
//     brandname,
//     design: { name: designName, image },
//     designtype1: { brandname, designName, image },
//   });

//   newInvitation
//     .save()
//     .then(() => {
//       res.status(201).json({ message: "Invitation created successfully" });
//     })
//     .catch((err) => {
//       res
//         .status(400)
//         .json({ message: "Error while saving the invitation", error: err });
//     });
// });

// developers api 

app.post("/invitations", upload.single("image"), (req, res) => {
  const { brandname, designName, type } = req.body;
  const image = req.file.filename;

  // Modify the structure of design and designtype1 to use arrays
  const newInvitation = new Invitation({
    brandname,
    design: [{ name: designName, image, type: type }], // Add type as needed
    designtype1: [{ brandname, designName, image }],
  });

  newInvitation
    .save()
    .then(() => {
      res.status(201).json({ message: "Invitation created successfully" });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: "Error while saving the invitation", error: err });
    });
});

// poster post request 
app.post("/posters", upload.single('image'), (req, res) => {
  const { brandname, designName } = req.body;
  const image = req.file.filename;

  const newPoster = new Poster({
    brandname,
    design: { name: designName, image },
    designtype1: { brandname, designName, image },
  });

  newPoster
    .save()
    .then(() => {
      res.status(201).json({ message: "Poster created successfully" });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: "Error while saving the poster", error: err });
    });
});















// invitation sub brands get api
app.get("/invitations-brands/:id", (req, res) => {
  Invitation.findById({ _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error", err });
    });
});

app.get("/posters-brands/:id", (req, res) => {
  Poster.findById({ _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error", err });
    });
});

app.get("/certificates-brands/:id", (req, res) => {
  Certificate.findById({ _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error", err });
    });
});
app.get("/reminders-brands/:id", (req, res) => {
  Remindertemplate.findById({ _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error", err });
    });
});

app.get("/thankyou-brands/:id", (req, res) => {
  ThankYou.findById({ _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error", err });
    });
});

app.get("/birthdays-brands/:id", (req, res) => {
  BirthdayGreeting.findById({ _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error", err });
    });
});
app.get("/anniversary-brands/:id", (req, res) => {
  AnniversaryGreeting.findById({ _id: req.params.id })
    .then((data) => {
      console.log({ data });
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error", err });
    });
});

// poster post request
app.post("/posters", upload.single("image"), (req, res) => {
  const { brandname, designName } = req.body;
  const image = req.file.filename;

  const newPoster = new Poster({
    brandname,
    design: { name: designName, image },
    designtype1: { brandname, designName, image },
  });

  newPoster
    .save()
    .then(() => {
      res.status(201).json({ message: "Poster created successfully" });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: "Error while saving the poster", error: err });
    });
});

// birthday post request
app.post("/birthday", upload.single("image"), (req, res) => {
  const { brandname, designName } = req.body;
  const image = req.file.filename;

  const newBirthday = new BirthdayGreeting({
    brandname,
    design: { name: designName, image },
    designtype1: { brandname, designName, image },
  });

  newBirthday
    .save()
    .then(() => {
      res.status(201).json({ message: "birthday card created successfully" });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: "Error while saving the birthday", error: err });
    });
});

// anniversary post request
app.post("/anniversary", upload.single("image"), (req, res) => {
  const { brandname, designName } = req.body;
  const image = req.file.filename;

  const newAnniversary = new AnniversaryGreeting({
    brandname,
    design: { name: designName, image },
    designtype1: { brandname, designName, image },
  });

  newAnniversary
    .save()
    .then(() => {
      res
        .status(201)
        .json({ message: "anniversary card created successfully" });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: "Error while saving the anniversary", error: err });
    });
});

// certificate post request
app.post("/certificate", upload.single("image"), (req, res) => {
  const { brandname, designName } = req.body;
  const image = req.file.filename;

  const newCertificate = new Certificate({
    brandname,
    design: { name: designName, image },
    designtype1: { brandname, designName, image },
  });
  newCertificate
    .save()
    .then(() => {
      res
        .status(201)
        .json({ message: "Certificate card created successfully" });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: "Error while saving the Certificate", error: err });
    });
});

// reminder post request
// app.post('/reminder', upload.single('image'), (req, res) => {
//   const { brandname, designName } = req.body;
//   const image = req.file.filename;

//   const newReminder = new ReminderCard({
//     brandname,
//     design: { name: designName, image },
//     designtype1: { brandname, designName, image },
//   });

//   newReminder
//     .save()
//     .then(() => {
//       res.status(201).json({ message: "Reminder card created successfully" });
//     })
//     .catch((err) => {
//       res
//         .status(400)
//         .json({ message: "Error while saving the Reminder", error: err });
//     });
// });

// getting all brands of invitations
app.get("/invitations", (req, res) => {
  // Use your Mongoose model (Invitation) to query the database and retrieve the data.
  Invitation.find(
    {},
    "brandname design.name design.image design._id  designtype1.brandname designtype1.designName designtype1.image designtype1._id   "
  )
    .then((data) => {
      // Send the data as a JSON response.
      res.json(data);
    })
    .catch((err) => {
      // Handle any errors here.
      res.status(500).json({ error: "Internal Server Error" });
    });
});

//getting all brands of poster
app.get("/posters", (req, res) => {
  Poster.find({}, "brandname design.name design.image design._id")
    .then((data) => {
      // Send the data as a JSON response.
      res.json(data);
    })
    .catch((err) => {
      // Handle any errors here.
      res.status(500).json({ error: "Internal Server Error in poster", err });
    });
});

//getting all brands of birthday
app.get("/birthday", (req, res) => {
  BirthdayGreeting.find({}, "brandname design.name design.image design._id")
    .then((data) => {
      // Send the data as a JSON response.
      res.json(data);
    })
    .catch((err) => {
      // Handle any errors here.
      res.status(500).json({ error: "Internal Server Error in birthday", err });
    });
});

//getting all brands of anniversary
app.get("/anniversary", (req, res) => {
  AnniversaryGreeting.find({}, "brandname design.name design.image design._id")
    .then((data) => {
      // Send the data as a JSON response.
      res.json(data);
    })
    .catch((err) => {
      // Handle any errors here.
      res
        .status(500)
        .json({ error: "Internal Server Error in anniversary", err });
    });
});

//getting all brands of certificate
app.get("/certificate", (req, res) => {
  Certificate.find({}, "brandname design.name design.image design._id")
    .then((data) => {
      // Send the data as a JSON response.
      res.json(data);
    })
    .catch((err) => {
      // Handle any errors here.
      res
        .status(500)
        .json({ error: "Internal Server Error in certificate", err });
    });
});

//getting all brands of reminder
app.get("/reminder", (req, res) => {
  Remindertemplate.find({}, "brandName design.name design.image design._id")
    .then((data) => {
      // Send the data as a JSON response.
      res.json(data);
    })
    .catch((err) => {
      // Handle any errors here.
      res.status(500).json({ error: "Internal Server Error in reminder", err });
    });
});

app.get("/thankyou", (req, res) => {
  ThankYou.find({}, "brandName design.name design.image design._id")
    .then((data) => {
      // Send the data as a JSON response.
      res.json(data);
    })
    .catch((err) => {
      // Handle any errors here.
      res.status(500).json({ error: "Internal Server Error in thankyou", err });
    });
});

app.get("/logos", (req, res) => {
  thankYouLogo
    .find({}, "logos.logoName logos.logoImage logos._id")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Internal server error in Logos",
      });
    });
});

app.get("/reminder-logos", (req, res) => {
  reminderLogo
    .find({}, "logos.logoName logos.logoImage logos._id")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Internal server error in Logos",
      });
    });
});

// This route is only for frontEnd dropdown for thankyou logos

app.get("/logos-name-id", async (req, res) => {
  try {
    const data = await thankYouLogo.find(
      {},
      "logos.logoName logos.logoImage logos._id"
    );

    const options = data.map((item) => ({
      value: item.logos[0].logoName,
      label: item.logos[0].logoName,
      id: item.logos[0]._id,
      image: item.logos[0].logoImage,
    }));

    res.json(options);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal server error in Logos",
    });
  }
});
// This route is only for frontEnd dropdown for reminder logos

app.get("/reminder-logo-name-id", async (req, res) => {
  try {
    const data = await reminderLogo.find(
      {},
      "logos.logoName logos.logoImage logos._id"
    );

    const options = data.map((item) => ({
      value: item.logos[0].logoName,
      label: item.logos[0].logoName,
      id: item.logos[0]._id,
      image: item.logos[0].logoImage,
    }));

    res.json(options);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal server error in Logos",
    });
  }
});

// delete of a single unqiue brand in invitation by giving brandId
app.delete("/invitations/:id", (req, res) => {
  Invitation.deleteOne({ _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// delete of a single unqiue brand in poster by giving brandId
app.delete("/posters/:id", (req, res) => {
  Poster.deleteOne({ _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// delete of a single unqiue brand in birthday by giving brandId
app.delete("/birthday/:id", (req, res) => {
  BirthdayGreeting.deleteOne({ _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// delete of a single unqiue brand in birthday by giving brandId
app.delete("/anniversary/:id", (req, res) => {
  AnniversaryGreeting.deleteOne({ _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// delete of a single unqiue brand in certificate by giving brandId
app.delete("/certificate/:id", (req, res) => {
  Certificate.deleteOne({ _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// delete of a single unqiue brand in certificate by giving brandId
app.delete("/reminder/:id", (req, res) => {
  ReminderCard.deleteOne({ _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// delete of a single unqiue brand in thankyou template  by giving brandId
app.delete("/thankyou/:id", (req, res) => {
  ThankYou.deleteOne({ _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// invitation sub brands for client side
app.get("/invitation-sub-brands", (req, res) => {
  Invitation.find({})
    .select("designtype1._id designtype1.brandname designtype1.image ")
    .then((data) => {
      // Send the data as a JSON response.
      res.json(data);
    })
    .catch((err) => {
      // Handle any errors here.
      res
        .status(500)
        .json({ error: "Internal Server Error in invitation", err });
    });
});

// poster sub brands for client side
app.get("/posters-sub-brands", (req, res) => {
  Poster.find({})
    .select("designtype1._id designtype1.brandname designtype1.image ")
    .then((data) => {
      // Send the data as a JSON response.
      res.json(data);
    })
    .catch((err) => {
      // Handle any errors here.
      res.status(500).json({ error: "Internal Server Error in poster", err });
    });
});

// birthday sub brands for client side
app.get("/birthday-sub-brands", (req, res) => {
  BirthdayGreeting.find({})
    .select("designtype1._id designtype1.brandname designtype1.image ")
    .then((data) => {
      // Send the data as a JSON response.
      res.json(data);
    })
    .catch((err) => {
      // Handle any errors here.
      res.status(500).json({ error: "Internal Server Error in birthday", err });
    });
});

// birthday sub brands for client side
app.get("/anniversary-sub-brands", (req, res) => {
  AnniversaryGreeting.find({})
    .select("designtype1._id designtype1.brandname designtype1.image ")
    .then((data) => {
      // Send the data as a JSON response.
      res.json(data);
    })
    .catch((err) => {
      // Handle any errors here.
      res
        .status(500)
        .json({ error: "Internal Server Error in anniversary", err });
    });
});

// reminder sub brands for client side
app.get("/reminder-sub-brands", (req, res) => {
  ReminderCard.find({})
    .select("designtype1._id designtype1.brandname designtype1.image ")
    .then((data) => {
      // Send the data as a JSON response.
      res.json(data);
    })
    .catch((err) => {
      // Handle any errors here.
      res
        .status(500)
        .json({ error: "Internal Server Error in anniversary", err });
    });
});

app.put(
  "/invitation-sub-brand/:id",
  upload.single("image"),
  async (req, res) => {
    try {
      const id = req.params.id;
      // const designName = req.body.designName;

      // Check if the design exists
      const existingDesign = await Invitation.findOne({ "design._id": id });
      if (!existingDesign) {
        return res.status(404).json({ error: "Design not found" });
      }

      // Update the design image
      const data = await Invitation.findOneAndUpdate(
        { "design._id": id },
        { $set: { "design.$.image": req.file.filename } },
        { new: true }
      );

      return res.json({
        success: true,
        data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: "Internal Server Error", error });
    }
  }
);

app.put("/poster-sub-brand/:id", upload.single("image"), async (req, res) => {
  try {
    const id = req.params.id;
    // const designName = req.body.designName;

    // Check if the design exists
    const existingDesign = await Poster.findOne({ "design._id": id });
    if (!existingDesign) {
      return res.status(404).json({ error: "Design not found" });
    }

    // Update the design image
    const data = await Poster.findOneAndUpdate(
      { "design._id": id },
      { $set: { "design.$.image": req.file.filename } },
      { new: true }
    );

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Internal Server Error", error });
  }
});

app.put(
  "/certificate-sub-brand/:id",
  upload.single("image"),
  async (req, res) => {
    try {
      const id = req.params.id;
      // const designName = req.body.designName;

      // Check if the design exists
      const existingDesign = await Certificate.findOne({ "design._id": id });
      if (!existingDesign) {
        return res.status(404).json({ error: "Design not found" });
      }

      // Update the design image
      const data = await Certificate.findOneAndUpdate(
        { "design._id": id },
        { $set: { "design.$.image": req.file.filename } },
        { new: true }
      );

      return res.json({
        success: true,
        data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: "Internal Server Error", error });
    }
  }
);

app.get("/certificates/brandname", async (req, res) => {
  const brands = await Certificate.find({}).select("brandname");
  return res.status(200).json(brands);
});

app.put("/birthday-sub-brand/:id", upload.single("image"), async (req, res) => {
  try {
    const id = req.params.id;
    // const designName = req.body.designName;

    // Check if the design exists
    const existingDesign = await BirthdayGreeting.findOne({ "design._id": id });
    if (!existingDesign) {
      return res.status(404).json({ error: "Design not found" });
    }

    // Update the design image
    const data = await BirthdayGreeting.findOneAndUpdate(
      { "design._id": id },
      { $set: { "design.$.image": req.file.filename } },
      { new: true }
    );

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Internal Server Error", error });
  }
});

app.put(
  "/anniversary-sub-brand/:id",
  upload.single("image"),
  async (req, res) => {
    try {
      const id = req.params.id;
      // const designName = req.body.designName;

      // Check if the design exists
      const existingDesign = await AnniversaryGreeting.findOne({
        "design._id": id,
      });
      if (!existingDesign) {
        return res.status(404).json({ error: "Design not found" });
      }

      // Update the design image
      const data = await AnniversaryGreeting.findOneAndUpdate(
        { "design._id": id },
        { $set: { "design.$.image": req.file.filename } },
        { new: true }
      );

      return res.json({
        success: true,
        data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: "Internal Server Error", error });
    }
  }
);

// replicate
// app.post("/invitations/replicate/:designId", (req, res) => {
//   const designId = req.params.designId;
//   Invitation.findOne({ 'design._id': designId })
//     .exec()
//     .then((originalInvitation) => {
//       if (!originalInvitation) {
//         return res.status(404).json({ message: "Design not found" });
//       }

//       // Find the index of the design object in the array
//       const designIndex = originalInvitation.design.findIndex(
//         (designItem) => String(designItem._id) === designId
//       );

//       // Validate the designIndex
//       if (designIndex === -1) {
//         return res.status(400).json({ message: "Invalid design ID" });
//       }

//       // Replicate the specific design object with a new ObjectId
//       const replicatedDesign = {
//         name: originalInvitation.design[designIndex].name,
//         image: originalInvitation.design[designIndex].image,
//         type: originalInvitation.design[designIndex].type,
//         _id: new ObjectId(), // Create a new ObjectId for the replicated design
//       };

//       // Add the replicated design object to the same design array
//       originalInvitation.design.push(replicatedDesign);

//       // Save the document with the new design object
//       return originalInvitation.save();
//     })
//     .then((updatedInvitation) => {
//       const replicatedDesignObject = updatedInvitation.design[updatedInvitation.design.length - 1];
//       res.status(201).json({
//         message: "Design object replicated successfully",
//         replicatedDesign: replicatedDesignObject,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({ message: "Error while replicating design object", error: err });
//     });
// });

app.post(
  "/invitations/new-design",
  upload.single("image"),
  async (req, res) => {
    try {
      const name = req.body.name;
      const brandName = req.body.brandName;
      const image = req.file.filename;
      const existingInvitation = await Invitation.findOne({
        brandname: brandName,
      });
      if (!existingInvitation)
        return res.status(400).json({ msg: "Layout Not Found" });
      existingInvitation.design.push({
        name: name,
        image: image,
      });
      await existingInvitation.save();
      res.status(200).json({ msg: "Design added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
);

app.get("/invitations/brandname", async (req, res) => {
  const brands = await Invitation.find({}).select("brandname");
  return res.status(200).json(brands);
});

app.post("/posters/new-design", upload.single("image"), async (req, res) => {
  try {
    const name = req.body.name;
    const brandName = req.body.brandName;
    const image = req.file.filename;
    const existingPoster = await Poster.findOne({ brandname: brandName });
    if (!existingPoster)
      return res.status(400).json({ msg: "Layout Not Found" });
    existingPoster.design.push({
      name: name,
      image: image,
    });
    await existingPoster.save();
    res.status(200).json({ msg: "Design added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

app.get("/posters/brandname", async (req, res) => {
  const brands = await Poster.find({}).select("brandname");
  return res.status(200).json(brands);
});

app.post(
  "/certificates/new-design",
  upload.single("image"),
  async (req, res) => {
    try {
      const name = req.body.name;
      const brandName = req.body.brandName;
      const image = req.file.filename;
      const existingCertificate = await Certificate.findOne({
        brandname: brandName,
      });
      if (!existingCertificate)
        return res.status(400).json({ msg: "Layout Not Found" });
      existingCertificate.design.push({
        name: name,
        image: image,
      });
      await existingCertificate.save();
      res.status(200).json({ msg: "Design added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
);

app.post("/reminders/new-design", upload.single("image"), async (req, res) => {
  try {
    const name = req.body.name;
    const brandName = req.body.brandName;
    const image = req.file.filename;
    const existingTemplate = await Remindertemplate.findOne({
      brandName: brandName,
    });
    if (!existingTemplate)
      return res.status(400).json({ msg: "Layout Not Found" });
    existingTemplate.design.push({
      name: name,
      image: image,
    });
    await existingTemplate.save();
    res.status(200).json({ msg: "Design added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

app.get("/reminders/brandname", async (req, res) => {
  const brands = await Remindertemplate.find({}).select("brandName");
  return res.status(200).json(brands);
});

app.post("/thankyous/new-design", upload.single("image"), async (req, res) => {
  try {
    const name = req.body.name;
    const brandName = req.body.brandName;
    const image = req.file.filename;
    const existingTemplate = await ThankYou.findOne({ brandName: brandName });
    if (!existingTemplate)
      return res.status(400).json({ msg: "Layout Not Found" });
    existingTemplate.design.push({
      name: name,
      image: image,
    });
    await existingTemplate.save();
    res.status(200).json({ msg: "Design added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

app.get("/thankyous/brandname", async (req, res) => {
  const brands = await ThankYou.find({}).select("brandName");
  return res.status(200).json(brands);
});

app.post("/birthday/new-design", upload.single("image"), async (req, res) => {
  try {
    const name = req.body.name;
    const brandName = req.body.brandName;
    const image = req.file.filename;
    console.log({ name, brandName, image });

    const existingTemplate = await BirthdayGreeting.findOne({
      brandname: brandName,
    });
    console.log(existingTemplate);
    if (!existingTemplate)
      return res.status(400).json({ msg: "Layout Not Found" });
    existingTemplate.design.push({
      name: name,
      image: image,
    });
    await existingTemplate.save();
    res.status(200).json({ msg: "Design added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

app.get("/birthday/brandname", async (req, res) => {
  const brands = await BirthdayGreeting.find({}).select("brandname");
  console.log({ brands });
  return res.status(200).json(brands);
});

app.post(
  "/anniversary/new-design",
  upload.single("image"),
  async (req, res) => {
    try {
      const name = req.body.name;
      const brandName = req.body.brandName;
      const image = req.file.filename;
      const existingAnniversary = await AnniversaryGreeting.findOne({
        brandname: brandName,
      });
      if (!existingAnniversary)
        return res.status(400).json({ msg: "Layout Not Found" });
      existingAnniversary.design.push({
        name: name,
        image: image,
      });
      await existingAnniversary.save();
      res.status(200).json({ msg: "Design added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
);

app.get("/anniversary/brandname", async (req, res) => {
  const brands = await AnniversaryGreeting.find({}).select("brandname");
  return res.status(200).json(brands);
});

// // Add a new route to replicate the designtype1 object
// app.post("/invitations/replicate/:invitationId", (req, res) => {
//   const invitationId = req.params.invitationId;

//   Invitation.findById(invitationId)
//     .exec()
//     .then((originalInvitation) => {
//       if (!originalInvitation) {
//         return res.status(404).json({ message: "Invitation not found" });
//       }

//       // Create a new designtype1 object by replicating the properties
//       const replicatedDesign = {
//         name: originalInvitation.design[0].name,
//         // designName: originalInvitation.design[0].designName,
//         image: originalInvitation.design[0].image,
//       };

//       // Add the replicated designtype1 object to the array
//       originalInvitation.design.push(replicatedDesign);

//       // Save the document with the new designtype1 object
//       return originalInvitation.save();
//     })
//     .then((updatedInvitation) => {
//       res
//         .status(201)
//         .json({
//           message: "New designtype1 object created successfully",
//           invitation: updatedInvitation,
//         });
//     })
//     .catch((err) => {
//       res
//         .status(500)
//         .json({ message: "Error while replicating invitation", error: err });
//     });

// });

// Express route to handle GET request to list all collections
app.get("/collections", async (req, res) => {
  const collections = await mongoose.connection.db.listCollections().toArray();
  const cleanedCollections = collections.map((collection) => {
    return { name: collection.name.replace(/s$/, "") }; // Remove the 's' from the end of the collection name
  });
  res.json({ collections: cleanedCollections });
});

// Retrieve all invitations
app.get("/invitations", (req, res) => {
  Invitation.find({}, (err, invitations) => {
    if (err) {
      res.status(500).json({ message: "Error while fetching invitations" });
    } else {
      res.status(200).json(invitations);
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
