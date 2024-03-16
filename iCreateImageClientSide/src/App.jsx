import { useState } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
// import DefaultInvitationComponent
import Sidebar from "./Admin/Sidebar";
import Invitation from "./Admin/Sidecontents/Invitation/Invitation";
import Poster from "./Admin/Sidecontents/Poster/Poster";
import Calender from "./Admin/Sidecontents/Calender/Calender";
import Thank from "./Admin/Sidecontents/Thankyou/Thank";
import Birthday from "./Admin/Sidecontents/Birthday/Birthday";
import Annicersary from "./Admin/Sidecontents/Anniversary/Anniversary";
import Reminder from "./Admin/Sidecontents/Reminder/Reminder";
import Invitationbrands from "./Admin/Sidecontents/Invitation/Invitationbrands";
import Invitationaddnew from "./Admin/Sidecontents/Invitation/Invitationaddnew";
import Posterbrands from "./Admin/Sidecontents/Poster/Posterbrands";
import Posteraddnew from "./Admin/Sidecontents/Poster/Posteraddnew";
import Calenderbrands from "./Admin/Sidecontents/Calender/Calenderbrands";
import Calenderaddnew from "./Admin/Sidecontents/Calender/Calenderaddnew";
import Thankyoubrands from "./Admin/Sidecontents/Thankyou/Thankyoubrands";
import Thankyouaddnew from "./Admin/Sidecontents/Thankyou/Thankyouaddnew";
import Reminderbrands from "./Admin/Sidecontents/Reminder/Reminderbrands";
import Reminderaddnew from "./Admin/Sidecontents/Reminder/Reminderaddnew";
import Birthdaybrands from "./Admin/Sidecontents/Birthday/Birthdaybrands";
import Birthdayaddnew from "./Admin/Sidecontents/Birthday/Birthdayaddnew";
import Anniversarybrands from "./Admin/Sidecontents/Anniversary/Anniversarybrands";
import Anniversaryaddnew from "./Admin/Sidecontents/Anniversary/Anniversaryaddnew";
import Dashboard from "./Admin/Sidecontents/Dashboard";
import InvitatipnBrandEdit from "./Admin/Sidecontents/Invitation/InvitatipnBrandEdit";
import PosterBrandsEdit from "./Admin/Sidecontents/Poster/PosterBrandsEdit";

import Login from "./Client/Login";
import UserInvitation from "./Client/UserSideContent/Invitation/UserInvitation";
import UserSidebar from "./Client/UserSidebar";
import UserPoster from "./Client/UserSideContent/Poster/UserPoster";
import UserCalender from "./Client/UserSideContent/Calender/UserCalender";
import UserBirthday from "./Client/UserSideContent/Birthday/UserBirthday";
import UserThank from "./Client/UserSideContent/Thankyou/UserThank";
import UserAnniversary from "./Client/UserSideContent/Anniversary/UserAnniversary";
import UserReminder from "./Client/UserSideContent/Reminder/UserReminder";
import Adminlogin from "./Admin/Adminlogin";
import Welcome from "./Client/Welcome";
import FormInvitation from "./Client/UserSideContent/Invitation/FormInvitation";
import PosterForm from "./Client/UserSideContent/Poster/PosterForm";
import BirthdayForm from "./Client/UserSideContent/Birthday/BirthdayForm";
import BirthdayForm2 from "./Client/UserSideContent/Birthday/BirthdayForm2";
import AnniversaryForm from "./Client/UserSideContent/Anniversary/AnniversaryForm";
import Certificate from "./Admin/Sidecontents/Certificate/Certificate";
import UserCertificate from "./Client/UserSideContent/Certificate/UserCertificate";
import Certificatebrands from "./Admin/Sidecontents/Certificate/Certificatebrands";
import Certificateaddnew from "./Admin/Sidecontents/Certificate/Certificateaddnew";
import FormCertificate from "./Client/UserSideContent/Certificate/formCertificate";
import ThankForm from "./Client/UserSideContent/Thankyou/ThankForm";
import ReminderForm from "./Client/UserSideContent/Reminder/ReminderForm";
import ImageMerger from "./ImageMerger";
import CertificateBrandEdit from "./Admin/Sidecontents/Certificate/CertificateBrandEdit";
import BirthdayBrandsEdit from "./Admin/Sidecontents/Birthday/BirthdayBrandsEdit";
import AnniversaryBrandEdits from "./Admin/Sidecontents/Anniversary/AnniversaryBrandEdits";
import Reports from "./Admin/Sidecontents/Reports/Reports";
import InvitationReport from "./Admin/Sidecontents/Reports/InvitationReport";
import PosterReport from "./Admin/Sidecontents/Reports/PosterReport";
import CertificateReport from "./Admin/Sidecontents/Reports/CertificateReport";
import ReminderReport from "./Admin/Sidecontents/Reports/ReminderReport";
import ThankYouReport from "./Admin/Sidecontents/Reports/ThankYouReport";
import BirthdayReport from "./Admin/Sidecontents/Reports/BirthdayReport";
import AnniversaryData from "./Admin/Sidecontents/Reports/AnniversaryData";
import AnniversaryForm1 from "./Client/UserSideContent/Anniversary/AnniversaryForm1";
import InvitationsAllDesign from "./Admin/Sidecontents/Invitation/InvitationsAllDesign";
import InvitationSubBrands from "./Client/UserSideContent/Invitation/InvitationSubBrands";
import Form2 from "./Client/UserSideContent/Invitation/Form2";

import PostersAllDesign from "./Admin/Sidecontents/Poster/PosterAllDesign";
import PosterSubBrands from "./Client/UserSideContent/Poster/PosterSubBrands";
import ThankyouSubBrands from "./Client/UserSideContent/Thankyou/ThankyouSubBrands";
import PosterForm2 from "./Client/UserSideContent/Poster/Form2";
import CertificatesAllDesign from "./Admin/Sidecontents/Certificate/CertificatesAllDesign";
import CertificateSubBrands from "./Client/UserSideContent/Certificate/CertificateSubBrands";
import ReminderSubBrands from "./Client/UserSideContent/Reminder/ReminderSubBrands";

import ReminderAllDesign from "./Admin/Sidecontents/Reminder/ReminderAllDesign";

import CertificateForm2 from "./Client/UserSideContent/Certificate/Form2";

import ReminderForm2 from "./Client/UserSideContent/Reminder/ReminderForm2";

import ThankyouAllDesign from "./Admin/Sidecontents/Thankyou/ThankyouAllDesign";
import BirthdayAllDesign from "./Admin/Sidecontents/Birthday/BirthdayAllDesign";
import ThankyouForm2 from "./Client/UserSideContent/Thankyou/ThankyouForm2";
import BirthdaySubBrands from "./Client/UserSideContent/Birthday/BirthdaySubBrands";
import AnniversarySubBrands from "./Client/UserSideContent/Anniversary/AnniversarySubBrands";

import AnniversaryAllDesign from "./Admin/Sidecontents/Anniversary/AnniversaryAllDesign";

// import AnniversaryForm2 from "./Client/UserSideContent/Anniversary/AnniversaryForm2";
import UploadAll from "./Admin/Sidecontents/Settings/UploadAll";
import Makeadmins from "./Admin/Sidecontents/Settings/Makeadmins";
import ManageMR from "./Admin/Sidecontents/Settings/ManageMR";
import VideoReport from "./Admin/Sidecontents/Reports/VideoReport";
import Form3 from "./Client/UserSideContent/Poster/Form3";
import InvitationForm3 from "./Client/UserSideContent/Invitation/InvitationForm3";
import AnniversaryForm2 from "./Client/UserSideContent/Anniversary/AnniversaryForm2";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Admin" element={<Sidebar />}>
            <Route path="demo" element={<ImageMerger />} />
            <Route path="welcome" element={<Dashboard />} />
            <Route path="invitation" element={<Invitation />} />
            <Route path="invitationbrands" element={<Invitationbrands />} />
            <Route path="invitationaddnew" element={<Invitationaddnew />} />
            <Route path="poster" element={<Poster />} />
            <Route path="reports" element={<Reports />} />
            <Route path="videoreports" element={<VideoReport />} />
            <Route path="invireports" element={<InvitationReport />} />
            <Route path="posterreports" element={<PosterReport />} />
            <Route path="certificatereports" element={<CertificateReport />} />
            <Route path="reminderreports" element={<ReminderReport />} />
            <Route path="thankyoureports" element={<ThankYouReport />} />
            <Route path="birthdayreport" element={<BirthdayReport />} />
            <Route path="anniversayreport" element={<AnniversaryData />} />
            <Route path="posterbrands" element={<Posterbrands />} />
            <Route path="posteraddnew" element={<Posteraddnew />} />
            <Route path="calender" element={<Calender />} />
            <Route path="calenderbrands" element={<Calenderbrands />} />
            <Route path="calenderaddnew" element={<Calenderaddnew />} />
            <Route path="certificate" element={<Certificate />} />
            <Route path="certificatebrands" element={<Certificatebrands />} />
            <Route path="certificateaddnew" element={<Certificateaddnew />} />
            <Route path="thank" element={<Thank />} />
            <Route path="thankbrands" element={<Thankyoubrands />} />
            <Route path="thankaddnew" element={<Thankyouaddnew />} />
            <Route path="reminder" element={<Reminder />} />
            <Route path="reminderbrands" element={<Reminderbrands />} />
            <Route path="reminderaddnew" element={<Reminderaddnew />} />
            <Route path="birthday" element={<Birthday />} />
            <Route path="birthdaybrands" element={<Birthdaybrands />} />
            <Route path="birthdayaddnew" element={<Birthdayaddnew />} />
            <Route path="anniversary" element={<Annicersary />} />
            <Route path="anniversarybrands" element={<Anniversarybrands />} />
            <Route path="anniversaryaddnew" element={<Anniversaryaddnew />} />
            <Route path="uploadall" element={<UploadAll />} />
            <Route path="manageadmins" element={<Makeadmins />} />
            <Route path="managemr" element={<ManageMR />} />
            <Route
              path="invitation-sub-brands/:id"
              element={<InvitationsAllDesign />}
            />
            <Route
              path="poster-sub-brands/:id"
              element={<PostersAllDesign />}
            />
            <Route
              path="certificate-sub-brands/:id"
              element={<CertificatesAllDesign />}
            />
            <Route
              path="reminder-sub-brands/:id"
              element={<ReminderAllDesign />}
            />
            <Route
              path="thankyou-sub-brands/:id"
              element={<ThankyouAllDesign />}
            />
            <Route
              path="birthday-sub-brands/:id"
              element={<BirthdayAllDesign />}
            />

            <Route
              path="anniversary-sub-brands/:id"
              element={<AnniversaryAllDesign />}
            />
            <Route
              path="invitationbrandsedit/:id"
              element={<InvitatipnBrandEdit />}
            />
            <Route path="posterbrandsedit/:id" element={<PosterBrandsEdit />} />
            <Route
              path="certificatebrandsedit/:id"
              element={<CertificateBrandEdit />}
            />
            <Route
              path="birthdaybrandsedit/:id"
              element={<BirthdayBrandsEdit />}
            />
            <Route
              path="anniversarybrandsedit/:id"
              element={<AnniversaryBrandEdits />}
            />
          </Route>

          <Route path="/Adminlogin" element={<Adminlogin />} />
        </Routes>

        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/client" element={<UserSidebar />}>
            <Route path="welcome/:MRID" element={<Welcome />} />
            <Route path="clientinvitation/:MRID" element={<UserInvitation />} />
            <Route
              path="clientinvitation2/:MRID"
              element={<UserInvitation />}
            />
            <Route path="clientposter/:MRID" element={<UserPoster />} />
            <Route path="clientcalender" element={<UserCalender />} />
            <Route
              path="invitationbrands/:id/:MRID/:brandname/:name"
              element={<InvitationSubBrands />}
            />

            <Route
              path="posterbrands/:id/:MRID/:brandname/:name"
              element={<PosterSubBrands />}
            />

            <Route
              path="certificatebrands/:id/:MRID/:brandname/:name"
              element={<CertificateSubBrands />}
            />
            <Route
              path="remindersubbrands/:id/:MRID/:brandName/:name"
              element={<ReminderSubBrands />}
            />
            <Route
              path="thankyousubbrands/:id/:MRID/:brandName/:name"
              element={<ThankyouSubBrands />}
            />
            <Route
              path="birthdaybrands/:id/:MRID/:brandname/:name"
              element={<BirthdaySubBrands />}
            />
            <Route
              path="anniversary/:id/:MRID/:brandname/:name"
              element={<AnniversarySubBrands />}
            />

            <Route
              path="clientcertificate/:MRID"
              element={<UserCertificate />}
            />
            <Route path="clientbirthday/:MRID" element={<UserBirthday />} />
            <Route path="clientthank/:MRID" element={<UserThank />} />
            <Route
              path="clientanniversary/:MRID"
              element={<UserAnniversary />}
            />
            <Route path="clientreminder/:MRID" element={<UserReminder />} />
            <Route
              path="invitatationform/:MRID/:id/:image/:name"
              element={<FormInvitation />}
            />

            <Route
              path="invitatationform2/:MRID/:id/:image/:name"
              element={<Form2 />}
            />

            <Route
              path="invitatationform3/:MRID/:id/:image/:name"
              element={<InvitationForm3 />}
            />

            <Route
              path="posterform/:MRID/:id/:image/:name"
              element={<PosterForm />}
            />
            <Route
              path="posterform2/:MRID/:id/:image/:name"
              element={<PosterForm2 />}
            />

            <Route
              path="posterform3/:MRID/:id/:image/:name"
              element={<Form3 />}
            />

            <Route
              path="thankyouform/:MRID/:id/:image/:name"
              element={<ThankForm />}
            />
            <Route
              path="thankyouform2/:MRID/:id/:image/:name"
              element={<ThankyouForm2 />}
            />
            <Route
              path="certificateform/:MRID/:id/:image/:name"
              element={<FormCertificate />}
            />
            <Route
              path="certificateform2/:MRID/:id/:image/:name"
              element={<CertificateForm2 />}
            />

            <Route
              path="reminderform/:MRID/:id/:image/:name"
              element={<ReminderForm />}
            />
            <Route
              path="reminderform2/:MRID/:id/:image/:name"
              element={<ReminderForm2 />}
            />
            <Route
              path="birthdayform/:MRID/:id/:image/:name"
              element={<BirthdayForm />}
            />

            <Route
              path="birthdayform2/:MRID/:id/:image/:name"
              element={<BirthdayForm2 />}
            />

            <Route
              path="anniversaryform1/:MRID/:id/:image/:name"
              element={<AnniversaryForm1 />}
            />

            <Route
              path="anniversaryform2/:MRID/:id/:image/:name"
              element={<AnniversaryForm2 />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
