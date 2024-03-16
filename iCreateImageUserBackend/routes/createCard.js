

const express = require("express");
const router = express.Router();



const { createInvitation, createPoster, createThankyou, getAllCardCount, createBirthday, createCertificate, getInvitationSubBrand, getPosterSubBrand, getBirthdaySubBrand, getAnniversarySubBrand, getReminderSubBrands, getInvitationBrands, createAnniversary, getCertificateSubBrands, getCardsByDateRange, createReminder, getAllInvitationData, deleteInvitatioById, getThankYouSubBrand, getAllPosterData, getAllCertificateData, getAllReminderData, getAllThankYouData, getAllBirthdayData, getAllAnniversaryData, getreports, getAllInvitationDataV2,  createvideocard, getAllVideoCardData } = require('../controller/createCard');

router.post("/create-invitation", createInvitation);
router.post("/create-poster",createPoster);
router.post("/create-thankyou", createThankyou);
router.post("/create-anniversary", createAnniversary);
router.post("/create-birthday", createBirthday);
router.post("/create-certificate", createCertificate);
router.post("/create-reminder", createReminder)
router.post("/create-videocard", createvideocard)




// all card Count
router.get("/all-card-count", getAllCardCount);
router.get("/invitation-sub-brand", getInvitationSubBrand);

// poster card sub-brand count

router.get("/poster-sub-brand", getPosterSubBrand)

// birthday card sub-brand count
router.get('/birdthday-sub-brand', getBirthdaySubBrand);


// anniversary card sub-brand count
router.get("/anniversary-sub-brand", getAnniversarySubBrand);


// reminder card sub-brand count
router.get("/reminder-sub-brand", getReminderSubBrands);

// certificate card sub-brand count
router.get('/certificate-sub-brand', getCertificateSubBrands);

//thankyou card sub-brand count
router.get("/thankyou-sub-brand", getThankYouSubBrand)



// invitation card {brandName: image } => get request 
router.get("/invitation-brands", getInvitationBrands);
//get filter data from the cards
router.post("/get-filter-cards", getCardsByDateRange);




// get all reports categories wise data
router.get('/users-invitation-data', getAllInvitationData);

router.get('/v2/users-invitation-data', getAllInvitationDataV2);

router.get('/users-poster-data', getAllPosterData)
router.get('/users-certificate-data', getAllCertificateData)
router.get('/users-reminder-data', getAllReminderData)
router.get('/users-thankyou-data', getAllThankYouData)
router.get('/users-birthday-data', getAllBirthdayData)
router.get('/users-anniversay-data', getAllAnniversaryData)
router.get('/users-video-data', getAllVideoCardData)











router.delete("/user-invitiation-delete/:id", deleteInvitatioById)


router.get('/reports', getreports)



module.exports = router