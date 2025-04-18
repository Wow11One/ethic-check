import mongoose from "mongoose";

const UserRequestsSchema = new mongoose.Schema({
  email: String,
  siteUrl: String,
  country: String,
  requestParams: {
    language: Boolean,
    colorsAndSymbolism: Boolean,
    usability: Boolean,
    contentAndImagery: Boolean,
    localization: Boolean,
  },
  geminiResponse: [
    {
      content: String,
    },
    { timestamps: true }
  ],
});

const UserRequestsModel = mongoose.models.requestsHistory || mongoose.model('requestsHistory', UserRequestsSchema);

export default UserRequestsModel;