const mongoose = require('mongoose');
const cardCategorySchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['invitation', 'poster', 'thankyou', 'reminder', 'calender', 'birthdaygreeting', 'anniversary', 'certificate','videocard']
    },

    brandName: String,
    desginName: String,
    designType: String,
    dateOfCreation: {
        type: Date,
        default: Date.now()
    },
    // type brandName drName DOC
    image: String,
    // finalPdf: String ,
    drName: String,
    topic: String,
    speakerName: String,
    day: String,
    date: Date,
    time: String,
    hotelName: String,
    hotelAddress: String,

    // videoname:String,
    layoutname:String
});

const userSchema = new mongoose.Schema({
    USERNAME: {
        type: String,
        // required: true,

    },
    MRID: {
        type: String,
        // required: true,
        unique: true
    },
    PASSWORD: {
        type: String,
        // required: true,
    },
    EMAIL: {
        type: String,
        //  required: true,
        // unique: true,
    },
    ROLE: {
        type: String,
        // required: true,
    },
    HQ: {
        type: String,
        // required : true,
    },

    REGION: {
        type: String,
        // required:true,
    },
    BUSINESSUNIT: {
        type: String,
        // required:true

    },
    DOJ: {
        type: String,
        // required:true
    },
    SCCODE: {
        type: String,
        // required:true,
        // unique:true
    },






    loginLogs: [
        {
            timestamp: {
                type: Date,
                default: Date.now,
            },
            cnt: {
                type: Number,
                required: false,
                default: 0
            },
        },
    ],
    cardCategories: [cardCategorySchema],
});

// userSchema.pre('save', function (next) {
//     // Check if this is a new user (first login)
//     if (this.isNew) {
//         this.loginLogs = [{
//             timestamp: Date.now(),
//             cnt: 1,
//         }];
//     } else {
//         // This is an existing user; update the loginLogs
//         const lastLog = this.loginLogs[this.loginLogs.length - 1];
//         this.loginLogs.push({
//             timestamp: Date.now(),
//             cnt: lastLog.cnt + 1,
//         });
//     }
//     next();
// });


const User = mongoose.model('User', userSchema);

module.exports = User;
