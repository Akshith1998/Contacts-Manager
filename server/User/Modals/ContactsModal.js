const mongoose = require("mongoose");

const ContactsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  contacts: [
    {
      Name: {
        type: String,
      },
      Designation: {
        type: String,
      },
      Company: {
        type: String,
      },
      Industry: {
        type: String,
      },
      Email: {
        type: String,
      },
      PhoneNumber: {
        type: Number,
      },
      Country: {
        type: String,
      },
    },
  ],
});

const ContactsModal = mongoose.model("Contacts", ContactsSchema);

module.exports = ContactsModal;
