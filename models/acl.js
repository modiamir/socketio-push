const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const aclSchema = new Schema({
    owner: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
});

const Acl = mongoose.model('acls', aclSchema);

Acl.allowedTopic = async function(topic, owner) {
    let acls = await Acl.find({topic: topic}).exec();
    if (acls.length <= 0) {
        return true;
    }

    if (owner === undefined || owner == null) {
        return false;
    }

    acls = acls.filter(function (acl) {
        return acl.owner === owner;
    });

    return acls.length > 0;
};

module.exports = Acl;