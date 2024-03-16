
const mongoose = require('mongoose');


const userinvit = new mongoose.Schema(
  {
    brandname: String,
    designname: String,
    image: String, // You can store the image URL or binary data here
    designtypes: [
      {
        name: String, // Design type name
        brandname: String, // Brand name for this design type
        image: String, // Image URL or binary data for this design type
      }
    ],
    drname: String, // Designer name
    topic: String,
    speakername: String,
    creationDetails: {
      dayOfCreation: Date,
      dateOfCreation: Date,
      timeOfCreation: String, // You can use a string or another data type depending on your needs
      hotelname: String,
      address: String,
      success: Boolean, // To indicate whether the creation was successful or not
      finalImage: String, // Store the final image URL or binary data here
    }
  }

)

const Userinvit = mongoose.model("Invitation2", userinvit)



// const invitationSchema = new mongoose.Schema({
//   brandname: {
//     type: String,
//     unique: true,
//     required: true,
//   },
//   design: [
//     {
//       name: {
//         type: String,
//         required: true,
//       },
//       image: {
//         type: String,
//         required: true,
//       },
//     }
//   ],
//   designtype1: [
//     {
//       brandname: String,
//       designName: String,
//       image: String,
//     }
//   ],

// });

// const Invitation = mongoose.model('Invitation', invitationSchema);


const invitationSchema = new mongoose.Schema({
  brandname: {
    type: String,
    unique: true,
    required: true,
  },
  design: [
    {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      type: {
        type: String, // You can change this type to match the actual type you want for design
        // required: true,
      },
    }
  ],
  designtype1: [
    {
      brandname: String,
      designName: String,
      image: String,
    }
  ],
});

const Invitation = mongoose.model('Invitation', invitationSchema);














//poster schema
const posterSchema = new mongoose.Schema({
  brandname: {
    type: String,
    unique: true,
    required: true,
  },
  design: [
    {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    }
  ],
  designtype1: [
    {
      brandname: String,
      designName: String,
      image: String,
    }
  ],
});

const Poster = mongoose.model('Poster', posterSchema);


//thankYou schema
// const thankyouSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//   },
//   imageUrl: {
//     type: String,
//     required: true,
//   },
// });


const thankyouSchema = new mongoose.Schema({
  brandName: {
    type: String,
    unique: true,
    required: true,
  },
  design: [
    {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    }
  ],
  designtype1: [
    {
      brandName: String,
      designName: String,
      image: String,
    }
  ],
});
const ThankYou = mongoose.model('ThankYou', thankyouSchema);


const logoSchema = new mongoose.Schema({
  logos: [
    {
      logoName: {
        type: String,
        unique: true,
      },
      logoImage: String
    }
  ]

})
const thankYouLogo = mongoose.model('thankyouLogo', logoSchema);



const ReminderTemplateSchema = new mongoose.Schema({
  brandName: {
    type: String,
    unique: true,
    required: true,
  },
  design: [
    {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    }
  ],
  designtype1: [
    {
      brandName: String,
      designName: String,
      image: String,
    }
  ],
});

const Remindertemplate = mongoose.model('Remindertemplate', ReminderTemplateSchema);


const reminderLogoschema = new mongoose.Schema({
  logos: [
    {
      logoName: {
        type: String,
        unique: true,
      },
      logoImage: String
    }
  ]

})
const reminderLogo = mongoose.model('reminderLogoschema', reminderLogoschema);





// birthday schema
const birthdayGreetingSchema = new mongoose.Schema({
  brandname: {
    type: String,
    unique: true,
    required: true,
  },
  design: [
    {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    }
  ],
  designtype1: [
    {
      brandname: String,
      designName: String,
      image: String,
    }
  ],
});
const BirthdayGreeting = mongoose.model('BirthdayGreeting', birthdayGreetingSchema);

// anniversay greetting
const anniversaryGreetingSchema = new mongoose.Schema({
  brandname: {
    type: String,
    unique: true,
    required: true,
  },
  design: [
    {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    }
  ],
  designtype1: [
    {
      brandname: String,
      designName: String,
      image: String,
    }
  ],
});

const AnniversaryGreeting = mongoose.model('AnniversaryGreeting', anniversaryGreetingSchema);


//calendar

const calendarSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
  },
});

const CalendarEvent = mongoose.model('Calendar', calendarSchema);



// reminder card

// const reminderCardSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//   },
//   imageUrl: {
//     type: String,
//     required: true,
//   },
//   reminderDate: {
//     type: Date,
//     required: true,
//   },
//   priority: {
//     type: String,
//     enum: ['low', 'medium', 'high'], // You can adjust the allowed values for priority
//   },
// });

// const ReminderCard = mongoose.model('ReminderCard', reminderCardSchema);


// Placard

const placardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
});

const Placard = mongoose.model('Placard', placardSchema);


//certificate

const certificateSchema = new mongoose.Schema({
  brandname: {
    type: String,
    unique: true,
    required: true,
  },
  design: [
    {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    }
  ],
  designtype1: [
    {
      brandname: String,
      designName: String,
      image: String,
    }
  ],
});

const Certificate = mongoose.model('Certificate', certificateSchema);


// persciption pad

const prescriptionPadSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  prescriptionText: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  medications: [
    {
      medicationName: {
        type: String,
        required: true,
      },
      dosage: {
        type: String,
        required: true,
      },
      instructions: {
        type: String,
      },
    },
  ],
});

const PrescriptionPad = mongoose.model('PrescriptionPad', prescriptionPadSchema);


// of labels

const labelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  description: {
    type: String,
  },
  // You can add more fields as needed for your specific use case
});

const Label = mongoose.model('Labels', labelSchema);


// delegate badge

const delegateBadgeSchema = new mongoose.Schema({
  delegateName: {
    type: String,
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
  badgeNumber: {
    type: Number,
    required: true,
  },
  badgeType: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  // You can add more fields as needed for your specific use case
});

const DelegateBadge = mongoose.model('DelegateBadge', delegateBadgeSchema);

// sticker

const stickerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  // You can add more fields as needed for your specific use case
});

const Sticker = mongoose.model('Sticker', stickerSchema);


// of welcome card

const welcomeCardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  recipientName: {
    type: String,
    required: true,
  },
  senderName: {
    type: String,
    required: true,
  },
  // You can add more fields as needed for your specific use case
});

const WelcomeCard = mongoose.model('WelcomeCard', welcomeCardSchema);
// schema ends here total 14


// Export your models
module.exports = {
  Invitation,
  Poster,
  ThankYou,
  DelegateBadge,
  AnniversaryGreeting,
  Placard,
  Certificate,
  CalendarEvent,
  Sticker,
  Label,
  PrescriptionPad,
  Remindertemplate,
  reminderLogo,
  // ReminderCard,
  BirthdayGreeting,
  WelcomeCard,
  Userinvit,
  thankYouLogo
  // Add other models here
};