const mongoose = require('mongoose')
const Schema = mongoose.Schema 




const ContactsSchema = new Schema
            ( 
                {
                    userId:
                    {
                        type: String, 
                        required: true, 
                        unique: true 
                    },
                    contactsOnCheerp:
                    {
                        type: [String]
                    },
                    contactsNotOnCheerp:
                    {
                        type: [String] 
                    }
                }
            )


const Contacts = mongoose.model('contact', ContactsSchema )

module.exports = Contacts