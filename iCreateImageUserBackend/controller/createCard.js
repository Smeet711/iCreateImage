const userModel = require("../models/user");






const createvideocard = async (req, res) => {
  try {
    const { MRID,type, drName, layoutname } = req.body;
    const user = await userModel.findOne({ MRID: MRID });
    console.log(user);
    if (!user)
      return res.status(400).json({ msg: "user not found", success: false });
    if (type !== "videocard")
      return res.status(400).json({
        msg: "type not found",
        success: false,
      });
    await user.cardCategories.push({
      drName,
      layoutname,
      type: type,
      dateOfCreation: Date.now(),
    });
    await user.save();
    return res.json({
      msg: "video card category created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "Internal Server Error",
      success: false,
    });
  }
};














const createInvitation = async (req, res) => {
  try {
    let {
      MRID,
      type,
      brandName,
      drName,
      topic,
      speakerName,
      day,
      date,
      time,
      hotelName,
      hotelAddress,
    } = req.body;

    console.log({ MRID, type, brandName });

    if (type !== "invitation") {
      return res.status(400).json({
        msg: "Invalid card category type",
      });
    }

    // const invitationCategory = {
    //     type: type,
    //     brandName: brandName,
    //     designType: "1",
    //     image: image,
    //     finalPdf: finalpdf,
    // };

    const user = await userModel.findOne({ MRID: MRID });
    if (!user)
      return res.status(400).json({
        msg: "NO User found",
        success: false,
      });

    if (!date) {
      date = Date.now()
    }
    user.cardCategories.push({
      type: type,
      brandName: brandName,
      drName,
      topic: topic,
      speakerName: speakerName,
      day: day,
      date: new Date(date) || Date.now(),
      time: time,
      hotelName: hotelName,
      hotelAddress: hotelAddress,
      dateOfCreation: Date.now(),
    });

    // Save the updated user document
    await user.save();

    return res.status(200).json({
      msg: "Invitation card category created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "Internal Server Error",
    });
  }
};

const createPoster = async (req, res) => {
  try {
    const { MRID, type, drname, brandName, topic } = req.body;
    // console.log(username);
    const user = await userModel.findOne({ MRID: MRID });
    console.log(user);
    console.log("User poster" + user);
    console.log({ MRID, type, drname, brandName, topic });

    if (type !== "poster")
      return res.status(400).json({
        msg: "type not found",
        success: false,
      });

    if (!user)
      return res.status(400).json({ msg: "user not found", success: false });

    user.cardCategories.push({
      type,
      drName: drname,
      brandName: brandName,
      topic,
      dateOfCreation: Date.now(),
    });
    await user.save();
    return res.status(200).json({
      msg: "Poster card category created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "Internal Server Error",
      success: false,
    });
  }
};







const createThankyou = async (req, res) => {
  try {
    const { MRID, drname, type, brandName } = req.body;
    console.log({ MRID, drname, type, brandName });
    const user = await userModel.findOne({ MRID: MRID });
    if (!user)
      return res.status(400).json({ msg: "user not found", success: false });
    if (type !== "thankyou")
      return res.status(400).json({
        msg: "type not found",
        success: false,
      });
    console.log(user);
    const data = {
      type: type,
      drName: drname,
      brandName: brandName,
      dateOfCreation: Date.now(),
    };

    user.cardCategories.push(data);

    await user.save();
    return res.json({
      msg: "Thankyou card category created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      msg: "Internal Server Error",
      success: false,
    });
  }
};

const createBirthday = async (req, res) => {
  try {
    const { MRID, drname, type, name } = req.body;
    const user = await userModel.findOne({ MRID: MRID });
    if (!user)
      return res.status(400).json({ msg: "user not found", success: false });
    if (type !== "birthdaygreeting")
      return res.status(400).json({
        msg: "type not found",
        success: false,
      });
    await user.cardCategories.push({
      type: type,
      brandName: name,
      drName: drname,
      dateOfCreation: Date.now(),
    });
    await user.save();
    return res.json({
      msg: "Birthday card category created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "Internal Server Error",
      success: false,
    });
  }
};

const createCertificate = async (req, res) => {
  try {
    const { name, MRID, drname, type } = req.body;
    const user = await userModel.findOne({ MRID: MRID });
    if (!user)
      return res.status(400).json({ msg: "user not found", success: false });
    if (type !== "certificate")
      return res.status(400).json({
        msg: "type not found",
        success: false,
      });
    await user.cardCategories.push({
      type: type,
      drName: drname,
      brandName: name,
      dateOfCreation: Date.now(),
    });
    await user.save();
    return res.json({
      msg: "certificate card category created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "Internal Server Error",
      success: false,
    });
  }
};

const createAnniversary = async (req, res) => {
  try {
    const { MRID, drname, type, brandName } = req.body;
    const user = await userModel.findOne({ MRID: MRID });
    if (!user)
      return res.status(400).json({ msg: "user not found", success: false });
    if (type !== "anniversary")
      return res.status(400).json({
        msg: "type not found",
        success: false,
      });
    user.cardCategories.push({
      type: type,
      drName: drname,
      brandName: brandName,
      dateOfCreation: Date.now(),
    });
    await user.save();
    return res.json({
      msg: "Anniversary card category created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "Internal Server Error",
      success: false,
    });
  }
};

const createReminder = async (req, res) => {
  try {
    const { MRID, drname, type, brandName } = req.body;
    // console.log({ username, drname, type, brandName })
    const user = await userModel.findOne({ MRID: MRID });
    if (!user)
      return res.status(400).json({ msg: "user not found", success: false });
    if (type !== "reminder")
      return res.status(400).json({
        msg: "type not found",
        success: false,
      });
    console.log(user);
    const data = {
      type: type,
      drName: drname,
      brandName: brandName,
      dateOfCreation: Date.now(),
    };

    user.cardCategories.push(data);

    await user.save();
    return res.json({
      msg: "Reminder card category created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      msg: "Internal Server Error",
      success: false,
    });
  }
};

const getAllCardCount = async (req, res) => {
  try {
    const allCategories = [
      "invitation",
      "poster",
      "calender",
      "thankyou",
      "remindercard",
      ,
      "birthdaygreeting",
    ];

    const pipeline = [
      {
        $unwind: "$cardCategories",
      },
      {
        $group: {
          _id: "$cardCategories.type",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          count: 1,
        },
      },
    ];

    const result = await userModel.aggregate(pipeline);

    const cardCounts = {};

    // Initialize counts for all categories to 0
    allCategories.forEach((category) => {
      cardCounts[category] = 0;
    });

    result.forEach((item) => {
      cardCounts[item.category] = item.count;
    });

    return res.status(200).json(cardCounts);
  } catch (error) {
    console.error("Internal Server Error");
    const errorMessage = error.message;
    return res.status(400).json({
      msg: "Internal Server Error",
      success: false,
      errorMessage,
    });
  }
};

const getInvitationSubBrand = async (req, res) => {
  try {
    const pipeline = [
      {
        $match: { "cardCategories.type": "invitation" },
      },
      {
        $unwind: "$cardCategories",
      },
      {
        $match: { "cardCategories.type": "invitation" },
      },
      {
        $group: {
          _id: "$cardCategories.brandName",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          brandName: "$_id",
          count: 1,
        },
      },
    ];

    const result = await userModel.aggregate(pipeline);

    const invitationCount = result.reduce(
      (total, item) => total + item.count,
      0
    );

    return res.status(200).json({
      invitationCount,
      subBrands: result,
    });
  } catch (error) {
    console.error("Internal Server Error");
    return res.status(400).json({
      msg: "Internal Server Error",
      success: false,
      errorMessage: error.message,
    });
  }
};

const getPosterSubBrand = async (req, res) => {
  try {
    const pipeline = [
      {
        $match: { "cardCategories.type": "poster" },
      },
      {
        $unwind: "$cardCategories",
      },
      {
        $match: { "cardCategories.type": "poster" },
      },
      {
        $group: {
          _id: "$cardCategories.brandName",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          brandName: "$_id",
          count: 1,
        },
      },
    ];

    const result = await userModel.aggregate(pipeline);

    const posterCount = result.reduce((total, item) => total + item.count, 0);

    return res.status(200).json({
      posterCount,
      subBrands: result,
    });
  } catch (error) {
    console.error("Internal Server Error");
    return res.status(400).json({
      msg: "Internal Server Error",
      success: false,
      errorMessage: error.message,
    });
  }
};

const getBirthdaySubBrand = async (req, res) => {
  try {
    const pipeline = [
      {
        $match: { "cardCategories.type": "birthdaygreeting" },
      },
      {
        $unwind: "$cardCategories",
      },
      {
        $match: { "cardCategories.type": "birthdaygreeting" },
      },
      {
        $group: {
          _id: "$cardCategories.brandName",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          brandName: "$_id",
          count: 1,
        },
      },
    ];

    const result = await userModel.aggregate(pipeline);

    const birthdayCount = result.reduce((total, item) => total + item.count, 0);

    return res.status(200).json({
      birthdayCount,
      subBrands: result,
    });
  } catch (error) {
    console.error("Internal Server Error");
    return res.status(400).json({
      msg: "Internal Server Error",
      success: false,
      errorMessage: error.message,
    });
  }
};

const getAnniversarySubBrand = async (req, res) => {
  try {
    const pipeline = [
      {
        $match: { "cardCategories.type": "anniversary" },
      },
      {
        $unwind: "$cardCategories",
      },
      {
        $match: { "cardCategories.type": "anniversary" },
      },
      {
        $group: {
          _id: "$cardCategories.brandName",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          brandName: "$_id",
          count: 1,
        },
      },
    ];
    const result = await userModel.aggregate(pipeline);
    const AnniversaryCount = result.reduce(
      (total, item) => total + item.count,
      0
    );
    return res.status(200).json({
      AnniversaryCount,
      subBrands: result,
    });
  } catch (error) {
    console.error("Internal Server Error");
    return res.status(400).json({
      msg: "Internal Server Error",
      success: false,
      errorMessage: error.message,
    });
  }
};

const getThankYouSubBrand = async (req, res) => {
  try {
    const pipeline = [
      {
        $match: { "cardCategories.type": "thankyou" },
      },
      {
        $unwind: "$cardCategories",
      },
      {
        $match: { "cardCategories.type": "thankyou" },
      },
      {
        $group: {
          _id: "$cardCategories.brandName",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          brandName: "$_id",
          count: 1,
        },
      },
    ];
    const result = await userModel.aggregate(pipeline);
    const ThankyouCount = result.reduce((total, item) => total + item.count, 0);
    return res.status(200).json({
      ThankyouCount,
      subBrands: result,
    });
  } catch (error) {
    console.error("Internal Server Error");
    return res.status(400).json({
      msg: "Internal Server Error",
      success: false,
      errorMessage: error.message,
    });
  }
};

const getReminderSubBrands = async (req, res) => {
  try {
    const pipeline = [
      {
        $match: { "cardCategories.type": "reminder" },
      },
      {
        $unwind: "$cardCategories",
      },
      {
        $match: { "cardCategories.type": "reminder" },
      },
      {
        $group: {
          _id: "$cardCategories.brandName",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          brandName: "$_id",
          count: 1,
        },
      },
    ];

    const result = await userModel.aggregate(pipeline);

    const reminderCount = result.reduce((total, item) => total + item.count, 0);

    return res.status(200).json({
      reminderCount,
      subBrands: result,
    });
  } catch (error) {
    console.error("Internal Server Error");
    return res.status(400).json({
      msg: "Internal Server Error",
      success: false,
      errorMessage: error.message,
    });
  }
};

const getCertificateSubBrands = async (req, res) => {
  try {
    const pipeline = [
      {
        $match: { "cardCategories.type": "certificate" },
      },
      {
        $unwind: "$cardCategories",
      },
      {
        $match: { "cardCategories.type": "certificate" },
      },
      {
        $group: {
          _id: "$cardCategories.brandName",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          brandName: "$_id",
          count: 1,
        },
      },
    ];

    const result = await userModel.aggregate(pipeline);
    const certificateCount = result.reduce(
      (total, item) => total + item.count,
      0
    );
    return res.status(200).json({
      certificateCount,
      subBrands: result,
    });
  } catch (error) {
    console.error("Internal Server Error");
    return res.status(400).json({
      msg: "Internal Server Error",
      success: false,
      errorMessage: error.message,
    });
  }
};

const getInvitationBrands = async (req, res) => {
  try {
    const brands = await userModel.find(
      {
        "cardCategories.type": "poster",
      },
      "cardCategories.brandName cardCategories.image"
    );

    console.log({ brands });
    return res.status(200).json({
      msg: "Invitation Brands Retrieved Successfully",
      brands,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const getCardsByDateRange = async (req, res) => {
  try {
    const { fromDate, toDate, type } = req.body;
    console.log({ fromDate, toDate, type });

    const fromDateObj = new Date(`${fromDate}T00:00:00.000Z`);
    const toDateObj = new Date(`${toDate}T23:59:59.999Z`);

    if (isNaN(fromDateObj.getTime()) || isNaN(toDateObj.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const query = {
      "cardCategories.dateOfCreation": {
        $gte: fromDateObj,
        $lte: toDateObj,
      },
    };

    if (type) {
      query["cardCategories.type"] = type;
    }

    const cards = await userModel.find(query).select("cardCategories -_id");

    // Count total posters and create a map for sub-brands

    const CardCount = cards.length;

    const subBrandMap = new Map();

    cards.forEach((card) => {
      card.cardCategories.forEach((category) => {
        const brandName = category.brandName || "Unknown";
        const count = subBrandMap.get(brandName) || 0;
        subBrandMap.set(brandName, count + 1);
      });
    });

    // Convert subBrandMap to the desired array format
    const subBrands = Array.from(subBrandMap.entries()).map(
      ([brandName, count]) => ({ brandName, count })
    );

    res.json({ type, CardCount, subBrands });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

// const getAllInvitationData = async (req, res) => {
//     try {
//         // Find all users
//         const users = await userModel.find({});

//         if (!users || users.length === 0) {
//             return res.status(404).json({ msg: "No users found", success: false });
//         }

//         // Collect all invitation data from all users
//         const allInvitationData = [];
//         users.forEach(user => {
//             const invitationData = user.cardCategories.filter(category => category.type === 'invitation');
//             allInvitationData.push(...invitationData);
//         });
//         let count = allInvitationData.length;
//         return res.status(200).json({ count, allInvitationData });
//     } catch (error) {
//         console.error(error.message);
//         return res.status(500).json({
//             msg: "Internal Server Error",
//             success: false
//         });
//     }
// };


const getAllVideoCardData = async (req, res) => {
  try {
    const users = await userModel.find(
      {},
      "_id USERNAME MRID EMAIL ROLE HQ REGION BUSINESSUNIT DOJ SCCODE loginLogs cardCategories"
    );

    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "No users found", success: false });
    }

    const allVideoCardData = [];
    users.forEach((user) => {
      const videoCardData = user.cardCategories.filter(
        (category) => category.type === "videocard"
      );
      allVideoCardData.push({
        user: {
          _id: user._id,
          USERNAME: user.USERNAME,
          MRID: user.MRID,
          EMAIL: user.EMAIL,
          ROLE: user.ROLE,
          HQ: user.HQ,
          REGION: user.REGION,
          BUSINESSUNIT: user.BUSINESSUNIT,
          DOJ: user.DOJ,
          SCCODE: user.SCCODE,
        },
        videoCards: videoCardData,
      });
    });

    const count = allVideoCardData.length;
    return res.status(200).json({ count, allVideoCardData, success: true });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      msg: "Internal Server Error",
      success: false,
    });
  }
};




















const getAllInvitationData = async (req, res) => {
  try {
    // Find all users with necessary fields
    const users = await userModel.find(
      {},
      "_id USERNAME MRID EMAIL ROLE HQ REGION BUSINESSUNIT DOJ SCCODE loginLogs cardCategories"
    );

    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "No users found", success: false });
    }

    // Collect all invitation data from all users
    const allInvitationData = [];
    users.forEach((user) => {
      const invitationData = user.cardCategories.filter(
        (category) => category.type === "invitation"
      );
      allInvitationData.push({
        user: {
          _id: user._id,
          USERNAME: user.USERNAME,
          MRID: user.MRID,
          EMAIL: user.EMAIL,
          ROLE: user.ROLE,
          HQ: user.HQ,
          REGION: user.REGION,
          BUSINESSUNIT: user.BUSINESSUNIT,
          DOJ: user.DOJ,
          SCCODE: user.SCCODE,
        },
        invitations: invitationData,
      });
    });

    let count = allInvitationData.length;
    return res.status(200).json({ count, allInvitationData });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      msg: "Internal Server Error",
      success: false,
    });
  }
};


const getAllInvitationDataV2 = async (req, res) => {
  try {
    const users = await userModel.aggregate([
      {
        $unwind: "$cardCategories",
      },
      {
        $match: {
          "cardCategories.type": "invitation",
        },
      },
      {
        $project: {
          _id: 0,
          USERNAME: 1,
          MRID: 1,
          EMAIL: 1,
          ROLE: 1,
          HQ: 1,
          REGION: 1,
          BUSINESSUNIT: 1,
          DOJ: 1,
          SCCODE: 1,
          type: "invitation",
          brandName: "$cardCategories.brandName",
          dateOfCreation: "$cardCategories.dateOfCreation",
          drName: "$cardCategories.drName",
          topic: "$cardCategories.topic",
          speakerName: "$cardCategories.speakerName",
          day: "$cardCategories.day",
          date: "$cardCategories.date",
          time: "$cardCategories.time",
          hotelName: "$cardCategories.hotelName",
          hotelAddress: "$cardCategories.hotelAddress",
        },
      },
    ]);

    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "No users found", success: false });
    }

    let count = users.length;
    return res.status(200).json({ count, allInvitationData: users });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      msg: "Internal Server Error",
      success: false,
    });
  }
};














const getAllPosterData = async (req, res) => {
  try {
    // Find all users with necessary fields
    const users = await userModel.find(
      {},
      "_id USERNAME MRID EMAIL ROLE HQ REGION BUSINESSUNIT DOJ SCCODE loginLogs cardCategories"
    );

    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "No users found", success: false });
    }

    // Collect all poster data from all users
    const allPosterData = [];
    users.forEach((user) => {
      const posterData = user.cardCategories.filter(
        (category) => category.type === "poster"
      );
      allPosterData.push({
        user: {
          _id: user._id,
          USERNAME: user.USERNAME,
          MRID: user.MRID,
          EMAIL: user.EMAIL,
          ROLE: user.ROLE,
          HQ: user.HQ,
          REGION: user.REGION,
          BUSINESSUNIT: user.BUSINESSUNIT,
          DOJ: user.DOJ,
          SCCODE: user.SCCODE,
        },
        posters: posterData,
      });
    });

    let count = allPosterData.length;
    return res.status(200).json({ count, allPosterData });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      msg: "Internal Server Error",
      success: false,
    });
  }
};

const getAllCertificateData = async (req, res) => {
  try {
    // Find all users with necessary fields
    const users = await userModel.find(
      {},
      "_id USERNAME MRID EMAIL ROLE HQ REGION BUSINESSUNIT DOJ SCCODE loginLogs cardCategories"
    );

    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "No users found", success: false });
    }

    // Collect all certificate data from all users
    const allCertificateData = [];
    users.forEach((user) => {
      const certificateData = user.cardCategories.filter(
        (category) => category.type === "certificate"
      );
      allCertificateData.push({
        user: {
          _id: user._id,
          USERNAME: user.USERNAME,
          MRID: user.MRID,
          EMAIL: user.EMAIL,
          ROLE: user.ROLE,
          HQ: user.HQ,
          REGION: user.REGION,
          BUSINESSUNIT: user.BUSINESSUNIT,
          DOJ: user.DOJ,
          SCCODE: user.SCCODE,
        },
        certificates: certificateData,
      });
    });

    let count = allCertificateData.length;
    return res.status(200).json({ count, allCertificateData });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      msg: "Internal Server Error",
      success: false,
    });
  }
};

//

const getAllReminderData = async (req, res) => {
  try {
    // Find all users with necessary fields
    const users = await userModel.find(
      {},
      "_id USERNAME MRID EMAIL ROLE HQ REGION BUSINESSUNIT DOJ SCCODE loginLogs cardCategories"
    );

    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "No users found", success: false });
    }

    // Collect all reminder data from all users
    const allReminderData = [];
    users.forEach((user) => {
      const reminderData = user.cardCategories.filter(
        (category) => category.type === "reminder"
      );
      allReminderData.push({
        user: {
          _id: user._id,
          USERNAME: user.USERNAME,
          MRID: user.MRID,
          EMAIL: user.EMAIL,
          ROLE: user.ROLE,
          HQ: user.HQ,
          REGION: user.REGION,
          BUSINESSUNIT: user.BUSINESSUNIT,
          DOJ: user.DOJ,
          SCCODE: user.SCCODE,
        },
        reminders: reminderData,
      });
    });

    let count = allReminderData.length;
    return res.status(200).json({ count, allReminderData });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      msg: "Internal Server Error",
      success: false,
    });
  }
};

const getAllThankYouData = async (req, res) => {
  try {
    // Find all users with necessary fields
    const users = await userModel.find(
      {},
      "_id USERNAME MRID EMAIL ROLE HQ REGION BUSINESSUNIT DOJ SCCODE loginLogs cardCategories"
    );

    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "No users found", success: false });
    }

    // Collect all thank you data from all users
    const allThankYouData = [];
    users.forEach((user) => {
      const thankYouData = user.cardCategories.filter(
        (category) => category.type === "thankyou"
      );
      allThankYouData.push({
        user: {
          _id: user._id,
          USERNAME: user.USERNAME,
          MRID: user.MRID,
          EMAIL: user.EMAIL,
          ROLE: user.ROLE,
          HQ: user.HQ,
          REGION: user.REGION,
          BUSINESSUNIT: user.BUSINESSUNIT,
          DOJ: user.DOJ,
          SCCODE: user.SCCODE,
        },
        thankYouItems: thankYouData,
      });
    });

    let count = allThankYouData.length;
    return res.status(200).json({ count, allThankYouData });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      msg: "Internal Server Error",
      success: false,
    });
  }
};

//

const getAllBirthdayData = async (req, res) => {
  try {
    // Find all users with necessary fields
    const users = await userModel.find(
      {},
      "_id USERNAME MRID EMAIL ROLE HQ REGION BUSINESSUNIT DOJ SCCODE loginLogs cardCategories"
    );

    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "No users found", success: false });
    }

    // Collect all birthday data from all users
    const allBirthdayData = [];
    users.forEach((user) => {
      const birthdayData = user.cardCategories.filter(
        (category) => category.type === "birthdaygreeting"
      );
      allBirthdayData.push({
        user: {
          _id: user._id,
          USERNAME: user.USERNAME,
          MRID: user.MRID,
          EMAIL: user.EMAIL,
          ROLE: user.ROLE,
          HQ: user.HQ,
          REGION: user.REGION,
          BUSINESSUNIT: user.BUSINESSUNIT,
          DOJ: user.DOJ,
          SCCODE: user.SCCODE,
        },
        birthdays: birthdayData,
      });
    });

    let count = allBirthdayData.length;
    return res.status(200).json({ count, allBirthdayData });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      msg: "Internal Server Error",
      success: false,
    });
  }
};

const getAllAnniversaryData = async (req, res) => {
  try {
    // Find all users with necessary fields
    const users = await userModel.find(
      {},
      "_id USERNAME MRID EMAIL ROLE HQ REGION BUSINESSUNIT DOJ SCCODE loginLogs cardCategories"
    );

    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "No users found", success: false });
    }

    // Collect all anniversary data from all users
    const allAnniversaryData = [];
    users.forEach((user) => {
      const anniversaryData = user.cardCategories.filter(
        (category) => category.type === "anniversary"
      );
      allAnniversaryData.push({
        user: {
          _id: user._id,
          USERNAME: user.USERNAME,
          MRID: user.MRID,
          EMAIL: user.EMAIL,
          ROLE: user.ROLE,
          HQ: user.HQ,
          REGION: user.REGION,
          BUSINESSUNIT: user.BUSINESSUNIT,
          DOJ: user.DOJ,
          SCCODE: user.SCCODE,
        },
        anniversaries: anniversaryData,
      });
    });

    let count = allAnniversaryData.length;
    return res.status(200).json({ count, allAnniversaryData });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      msg: "Internal Server Error",
      success: false,
    });
  }
};

// const getAllPosterData = async (req, res) => {
//     try {
//         // Find all users
//         const users = await userModel.find({});

//         if (!users || users.length === 0) {
//             return res.status(404).json({ msg: "No users found", success: false });
//         }

//         // Collect all invitation data from all users
//         const allPosterData = [];
//         users.forEach(user => {
//             const posterData = user.cardCategories.filter(category => category.type === 'poster');
//             allPosterData.push(...posterData);
//         });
//         let count = allPosterData.length;
//         return res.status(200).json({ count, allPosterData });
//     } catch (error) {
//         console.error(error.message);
//         return res.status(500).json({
//             msg: "Internal Server Error",
//             success: false
//         });
//     }
// };

const deleteInvitatioById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user that contains the invitation to be deleted
    const user = await userModel.findOne({ "cardCategories._id": id });

    if (!user) {
      return res.status(404).json({ msg: "User not found", success: false });
    }

    // Filter out the invitation to be deleted
    user.cardCategories = user.cardCategories.filter(
      (category) => category._id.toString() !== id
    );

    // Save the updated user document
    await user.save();

    return res
      .status(200)
      .json({ msg: "Invitation deleted successfully", success: true });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ msg: "Internal Server Error", success: false });
  }
};

const getreports = async (req, res) => {
  try {
    // Retrieve data from the database
    const usersData = await userModel.find(
      {},
      "USERNAME MRID EMAIL SCCODE loginLogs cardCategories.type cardCategories.image"
    );
    console.log(usersData);

    // Process the data as needed
    const report = usersData.map((user) => {
      // Initialize counts for each category
      const categoryCounts = {
        invitation: 0,
        poster: 0,
        thankyou: 0,
        reminder: 0,
        calender: 0,
        birthdaygreeting: 0,
        anniversary: 0,
        certificate: 0,
      };

      // Count the total number of cards for each category
      user.cardCategories.forEach((category) => {
        console.log("category: ", category);
        if (category) {
          categoryCounts[category.type]++;
        }
      });

      return {
        name: user.USERNAME,
        email: user.EMAIL,
        mrid: user.MRID,
        scCode: user.SCCODE,
        totalLogins: user.loginLogs.length,
        totalCardLength: user.cardCategories.length,
        categoryCounts,
      };
    });

    // Send the processed data in the response
    res.json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createInvitation,
  createPoster,
  createThankyou,
  createBirthday,
  createAnniversary,
  createCertificate,
  createReminder,
  getAllCardCount,
  getInvitationSubBrand,
  getPosterSubBrand,
  getBirthdaySubBrand,
  getAnniversarySubBrand,
  getReminderSubBrands,
  getInvitationBrands,
  getAllPosterData,
  getAllCertificateData,
  getAllReminderData,
  getAllThankYouData,
  getAllBirthdayData,
  getAllAnniversaryData,
  getCertificateSubBrands,
  getCardsByDateRange,
  getAllInvitationData,
  deleteInvitatioById,
  getThankYouSubBrand,
  getreports,
  getAllInvitationDataV2,
  createvideocard,
  getAllVideoCardData
};
