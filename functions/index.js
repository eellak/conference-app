const functions = require('firebase-functions');

const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

const ref = admin.database().ref()

exports.LikeCounterDay1 = functions.database
        .ref('users-day-1/{deviceid}/{groupid}/sessions/{sessionid}')
        .onWrite(event =>{
            
            const deviceid = event.params.deviceid;
            const groupid = event.params.groupid;
            const sessionid = event.params.sessionid;

            const session = event.data.val();
            const liked = session.liked;
            const sanitize = session.sanitized;

            if(session.written){
                return;
            }
            
            const root = event.data.ref.root;
            if(liked == 'true' && sanitize == 'false'){
                console.log('true');
                return root.child('schedule-day-1/0/groups/' + groupid + '/sessions/' + sessionid).once('value').then(snap =>{
                    var likes = snap.val().likes;
                    console.log(snap.val());
                    console.log(snap.val().likes);
                    
                    likes = Number(likes) + 1;
                    console.log(likes);
                    const writeRef = admin.database().ref('schedule-day-1/0/groups/').child(groupid + '/sessions/' + sessionid);
                    return writeRef.update({
                       likes: likes ,
                    }).catch(error =>{
                        //update Errors
                        console.log('write likes error');
                    }); 
                }).then(res =>{
                    const likeRef = admin.database().ref('users-day-1/').child(deviceid + '/' + groupid + '/' + 'sessions/' + sessionid);
                    session.written = true;
                    return likeRef.update({
                        sanitized: 'true'
                    }).catch(error =>{
                        //update Errors
                        console.log('error sani');
                    });
                }).catch(error =>{
                    //update Errors
                    console.log('error gene');
                });
            }

})


exports.LikeCounterDay2 = functions.database
        .ref('users-day-2/{deviceid}/{groupid}/sessions/{sessionid}')
        .onWrite(event =>{
            
            const deviceid = event.params.deviceid;
            const groupid = event.params.groupid;
            const sessionid = event.params.sessionid;

            const session = event.data.val();
            const liked = session.liked;
            const sanitize = session.sanitized;

            if(session.written){
                return;
            }
            
            const root = event.data.ref.root;
            if(liked == 'true' && sanitize == 'false'){
                console.log('true not sani');
                return root.child('schedule-day-2/0/groups/' + groupid + '/sessions/' + sessionid).once('value').then(snap =>{
                    var likes = snap.val().likes;
                    console.log(snap.val());
                    console.log(snap.val().likes);
                    
                    likes = Number(likes) + 1;
                    console.log(likes);
                    const writeRef = admin.database().ref('schedule-day-2/0/groups/').child(groupid + '/sessions/' + sessionid);
                    return writeRef.update({
                       likes: likes ,
                    }).catch(error =>{
                        //update Errors
                        console.log('write likes error');
                    }); 
                }).then(res =>{
                    const likeRef = admin.database().ref('users-day-2/').child(deviceid + '/' + groupid + '/' + 'sessions/' + sessionid);
                    session.written = true;
                    return likeRef.update({
                        sanitized: 'true'
                    }).catch(error =>{
                        //update Errors
                        console.log('sanitized error');
                    });
                }).catch(error =>{
                    //update Errors
                    console.log('funcs error');
                });
            }

})
