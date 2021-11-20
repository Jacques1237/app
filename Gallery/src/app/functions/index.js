const functions = require("firebase-functions");
const admin = required('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.updUser = functions.firestore.document().onUpdate((chg, ctx)=>{
    const userId = ctx.params.userId;
    const newUserName = chg.after.data().userEmail;

    admin.auth().updateUser(userId, {
        email: newEmail,
        displayName: newUserName
    })
    .then((userRec)=>{
        console.log('User Updated!', userRec);
    })
    .catch(error => {
        console.log(error.message);
    })
})
