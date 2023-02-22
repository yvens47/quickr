import { app } from "../../utils/firebase";
// import firebase from "firebase/app";
import { toast } from "react-toastify";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  
  getFirestore,
  collection,
  getDocs,
  addDoc,
  getDoc,
  // serverTimestamp,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  // FieldValue,
  arrayUnion,
  // arrayRemove,
  Timestamp,
  // collectionGroup,
  // Query,
  where,
  deleteDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "firebase/storage";
import {
  GET_USER,
  IS_LOGIN,
  // IS_LOGIN_ERROR,
  SIGN_UP_USER,
  SIGN_UP_USER_ERROR,
  SIGN_OUT_USER,
  SIGN_OUT_USER_ERROR,
  READ_POSTS,
  READ_POSTS_ERROR,
  ADD_POST,
  LIKE_POST,
  // COMMENTS,
  COMMENT_ON_POST,
  SUGGESTED_FRIENDS,
  SUGGESTED_FRIENDS_ERROR,
  GET_USER_PROFILE,
  GET_USER_PROFILE_ERROR,
  CHANGE_PROFILE,
  DELETE_USER_POST,
  MOST_POPULAR_USER,
  BOOKMARK
} from "./type";

import { showToast } from "../../utils/utills";

const DB_COLLECTION_POSTS = "Posts";
const DB_COLLECTION_USERS = "users";
const auth = getAuth(app);
const DB = getFirestore(app);

/************************************
 * user functions starts here       *
 * **********************************/
export function isLoggedIn() {
  return async dispatch => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, async user => {
      if (user) {
        // update the profile collection
        const { uid } = user;
        const db = getFirestore(app);
        //const postBucket = "postImages";
        const docRef = collection(db, DB_COLLECTION_USERS);
        
        const q = query(docRef, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) {
          querySnapshot.forEach(snapshot => {
            dispatch({
              type: IS_LOGIN,
              payload: snapshot.data()
            });
          });
        }
      }
    });
  };
}

export function loginWithGoogle() {
  return dispatch => {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then(async result => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const {
          uid,
          email,
          emailVerified,
          displayName,
          isAnonymous,
          photoURL,
          // createdAt,
          // lastLoginAt
        } = user;

        // update the profile collection
        const db = getFirestore(app);
        //const postBucket = "postImages";
        // const storage = getStorage(app);
        const docRef = collection(db, DB_COLLECTION_USERS);
        const q = query(docRef, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size === 0) {
          // add to users collection
          // Add a new document in collection "cities"
          await setDoc(doc(db, DB_COLLECTION_USERS, uid), {
            uid,
            email,
            emailVerified,
            displayName,
            isAnonymous,
            photoURL,

            friends: [],
            followers: [],
            photos: [],
            friendRequests: []
          });
        } else {
          dispatch({
            type: GET_USER,
            payload: querySnapshot.docs
          });
        }
      })
      .catch(error => {
        // Handle Errors here.
        console.log(error)

        dispatch({
          type: "GET_USER_ERROR",
          payload: error
        });
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential)
        // ...
      });
  };
}
export function login(account) {
  return dispatch => {
    const { email, password } = account;

    signInWithEmailAndPassword(auth, email, password)
      .then(async result => {
        const user = result.user;
        const db = getFirestore(app);
        const docRef = doc(db, DB_COLLECTION_USERS, `${user.uid}`);
       
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dispatch({
            type: GET_USER,
            payload: docSnap.get()
          });
        }
      })
      .catch(e => {
        console.log(e);
      });
  };
}

export function signUp(account) {
  return dispatch => {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, account.email, account.password)
      .then(async result => {
        // save the result to users profile table
        const user = result.user;
        user.displayName = account.fullname;
        user.photoURL =
          "https://w7.pngwing.com/pngs/741/68/png-transparent-user-computer-icons-user-miscellaneous-cdr-rectangle-thumbnail.png";
        const {
          uid,
          email,
          emailVerified,
          displayName,
          isAnonymous,
          photoURL,
          // createdAt,
          // lastLoginAt
        } = user;

        // update the profile collection
        const db = getFirestore(app);
        //const postBucket = "postImages";
        // const storage = getStorage(app);
        const docRef = doc(db, DB_COLLECTION_USERS, uid);
        const userProfile = {
          uid,
          email,
          emailVerified,
          displayName,
          isAnonymous,
          photoURL,
          createdAt: Timestamp.now(),
          lastLoginAt: Timestamp.now(),
          friends: [],
          followers: [],
          photos: [],
          friendRequests: []
        };
        await setDoc(docRef, userProfile, { merge: true });
        dispatch({ type: SIGN_UP_USER, payload: userProfile });
      })
      .catch(error => {
        if (error.code === "auth/email-already-in-use") {
          showToast("Email is already in use", error);
          dispatch({
            type: SIGN_UP_USER_ERROR,
            payload: "Email is already in use"
          });
        }
        if (error.code === "auth/invalid-email") {
          showToast("Invalid email", error);
          dispatch({
            type: SIGN_UP_USER_ERROR,
            payload: "Invalid email"
          });
        }
      });
  };
}

export function logOut() {
  return dispatch => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch({ type: SIGN_OUT_USER, payload: {} });
        toast.success("Signed out succesfully");
      })
      .catch(error => {
        // An error happened.
        dispatch({ type: SIGN_OUT_USER_ERROR });
      });
  };
}

export function mostPopular () {
  return async dispatch =>{

    try {

      //const db = getFirestore(app);
     
      // const q = query(
      //   collection(db, DB_COLLECTION_USERS)
      // );
      const popularUsers = [
        { displayName: "Jug Sam", friends: 60, handle: "@Jug" },
        { displayName: "Hollen holerd", friends: 60, handle: "@Jholed" }
      ];
    

      dispatch({ type: MOST_POPULAR_USER, payload: popularUsers })
      
    } catch (error) {
      console.log(error)
      
    }
   

  }
}
export function getBookmarks (userid){
  return async dispatch => {
    const db = getFirestore(app);    
    const docRef = doc(db, DB_COLLECTION_USERS, userid);
    console.log(docRef)
    const document =  await getDoc(docRef);
    console.log(document.data())
    
    
  };

}
/*
popular:{}
index:positions of the uses
*/
export function removeMostPopular (popular, index){



  return async dispatch => {
    
    const popularUsers = [
      {id:1, displayName: "Jug Sam", friends: 60, handle: "@Jug" },
      {id:2, displayName: "Hollen holerd", friends: 60, handle: "@Jholed" }
    ];   
    
    const removedList =popularUsers.filter((value)=> value.id !== popular.id);  

    dispatch({ type: MOST_POPULAR_USER, payload: removedList })

  }

}

/************************************
 *         Friends Actions here       *
 * **********************************/

export function unFriend(myId, usersId = []) {
  return async dispatch => { };
}

export function Friends(userid) {
  return async dispatch => {
    // list all frriends of logge user;
  };
}
export function suggestedFriends(limit, userid) {
  // random show 10 friends to a user that does not have friends yet
  return async dispatch => {
    const q = query(
      collection(DB, DB_COLLECTION_USERS),
      where("uid", "!=", userid)
    );
    onSnapshot(
      q,
      querySnapshot => {
        const userList = [];

        querySnapshot.forEach(result => {
          userList.push({
            ...result.data()
            // date: result.data().date.toDate()
          });
        });
        dispatch({ type: SUGGESTED_FRIENDS, payload: userList });
      },
      error => dispatch({ type: SUGGESTED_FRIENDS_ERROR, payload: error })
    );
  };
}
export function friendRequest(profile, currentUid) {
  return async dispatch => {
    try {
      
      const { displayName, email, uid, photoURL } = profile;
      const user = { displayName, email, uid, photoURL };
      const docRef = doc(DB, DB_COLLECTION_USERS, currentUid);
      //check if user already like the post if so dislike
      /*********** dislike the post */

      //if not likes the post
      updateDoc(docRef, { friendRequests: arrayUnion(user) }, d => {
        console.log("successfully updated");
      });
      /***********like the post */
      dispatch({ type: "FRIEND_REQUESTED" });
    } catch (error) {
      console.log(error);
    }
  };
}

/***********************************
 * Profile
 ***********************************/

export function getProfile(userid, displayName) {
  return dispatch => {
    const q = query(
      collection(DB, DB_COLLECTION_USERS),
      where("uid", "==", userid)
      //where("displayName", "==", displayName)
    );
    onSnapshot(
      q,
      querySnapshot => {
        const data = [];
        querySnapshot.forEach(doc => {
         
          data.push({
            // id: doc.id,
            ...doc.data()
            // date: doc.data().date.toDate()
          });
        });
        dispatch({
          type: GET_USER_PROFILE,
          payload: data[0]
        });
      },
      error => dispatch({ type: GET_USER_PROFILE_ERROR, payload: error })
    );
  };
}
export function changeProfile(user, image) {
  return async dispatch => {
    const db = getFirestore(app);
    const docRef = doc(db, DB_COLLECTION_USERS, user.uid);

    const storage = getStorage(app);
    const storageRef = ref(storage, `${DB_COLLECTION_USERS}/${image.name}`);
     await uploadBytes(storageRef, image, image);
    const url = await getDownloadURL(ref(storage, storageRef));
    const imageData = { url: url, name: image.name };

    updateDoc(docRef, { photoURL: url, photos: arrayUnion(imageData) });
   
    const docData = await getDoc(docRef);
    /***********like the post */
    dispatch({ type: CHANGE_PROFILE, payload: docData.data() });
  };
}

/************************************
 *         Posts Actions here       *
 * **********************************/

export function getPosts(start, limit) {
  return async dispatch => {
    const db = getFirestore(app);
    const q = query(
      collection(db, DB_COLLECTION_POSTS),
      
      orderBy("date", "desc"),
    
      
    );
    
    
    
    

    onSnapshot(
      q,
      querySnapshot => {
        const data = [];
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          

          data.push({
            id: doc.id,
            ...doc.data(),
            date: doc.data().date.toDate()
          });
        });
        dispatch({ type: READ_POSTS, payload: data });
      },
      error => dispatch({ type: READ_POSTS_ERROR, payload: error })
    );
  };
}

// to be refactored
export function addPost(post, postType, file) {
  return async dispatch => {
    const db = getFirestore(app);
    //const postBucket = "postImages";
    const storage = getStorage(app);
    post.postType = postType;
    //delete fake file property
    delete post.file;

    if (postType === "photo") {
      for (var i = 0; i < file.length; i++) {
        const photo = file.item(i);
        const storageRef = ref(storage, `media/${photo.name}`);
         await uploadBytes(storageRef, photo, photo);
        const url = await getDownloadURL(ref(storage, storageRef));
        post.photos.push(url);
        post.image = post.photos[0];
        post.photoName = photo.name;
      }
      post.date = Timestamp.now();

      const docRef = addDoc(
        collection(db, DB_COLLECTION_POSTS),
        post,
        result => {
          console.log(result);
        }
      );

      dispatch({
        type: ADD_POST,
        message: `Document written with ID:  ${docRef.id}`
      });
    } else if (postType === "video") {
      // eslint-disable-next-line no-redeclare
      for (var i = 0; i < file.length; i++) {
        const photo = file.item(i);
        const storageRef = ref(storage, `media/${photo.name}`);
        await uploadBytes(storageRef, photo, photo);
        const url = await getDownloadURL(ref(storage, storageRef));
        post.videos.push(url);

        post.type = photo.type;
      }
      post.video = post.videos[0];
      post.date = Timestamp.now();

      const docRef = addDoc(
        collection(db, DB_COLLECTION_POSTS),
        post,
        result => {
          console.log(result);
        }
      );

      dispatch({
        type: ADD_POST,
        payload: `Document written with ID:  ${docRef.id}`
      });
    } else {
      //its apost
      post.date = Timestamp.now();
      const docRef = await addDoc(collection(db, DB_COLLECTION_POSTS), post);

      dispatch({
        type: ADD_POST,
        payload: `Document written with ID:  ${docRef.id}`
      });
    }
  };
}

export function deleteUserPost(postId, userId) {
  return async dispatch => {
    const db = getFirestore(app);
    const d = doc(db, DB_COLLECTION_POSTS, postId);
    const docRef = await getDoc(d);

    // delete media associtated with the post from the storage
    const { image, photoName, video } = docRef.data();
    if (image.length !== 0 || video.length !== 0) {
      const storage = getStorage();
      // Create a reference to the file to delete
      const desertRef = ref(storage, `media/${photoName}`);
      // Delete the file
      deleteObject(desertRef)
        .then(() => {
          // File deleted successfully
          deleteDoc(d);
          dispatch({ type: DELETE_USER_POST });
          showToast("Post is deleted", "info");
        })
        .catch(error => {
          showToast("unable to delete image", "error");
        });
    } else {

      deleteDoc(d);
    }



  };
}
//not yet implemented
export function likePost(id, user) {
  // update document field base on id;
  return dispatch => {
    const db = getFirestore(app);
    const docRef = doc(db, DB_COLLECTION_POSTS, id);

    //check if user already like the post if so dislike
    /*********** dislike the post */

    //if not likes the post
    updateDoc(docRef, { likes: arrayUnion(user) }, d => {
      console.log("successfully updated");
    });
    /***********like the post */
    dispatch({ type: LIKE_POST });
  };
}

export function bookmarkPost (post,userid){
  return async dispatch => {
    try {
      console.log(post)
      const db = getFirestore(app);
      const docRef = doc(db, DB_COLLECTION_USERS, userid);

      //check if user already like the post if so dislike
      /*********** dislike the post */

      //if not likes the post
      updateDoc(docRef, { bookmarks: arrayUnion(post) }, d => {
        console.log("successfully updated");
      });
      /***********like the post */
      console.log(docRef)
      dispatch({ type: BOOKMARK });
      
    } catch (error) {
      console.log(error)
      
    }
  
  };


}
/*
add comment base on post id.
user can only post one comment.
*/
/************************************
 *         Comments Actions here       *
 * **********************************/

export function addComment(postId, comment) {
  return async dispatch => {
    const db = getFirestore(app);
    const docRef = doc(db, DB_COLLECTION_POSTS, `${postId}`); //console.log(docRef);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (
        docSnap.get("comments").filter(e => e.uid === comment.uid).length > 0
      ) {
        // flash message to User you  already posted
        showToast("🦄 you already posted a comment to this post", "error");
       
      } else {
        const commentCopy = { ...comment, id:  (Math.random() + 1).toString(36).substring(0,29) }

        updateDoc(docRef, { comments: arrayUnion(commentCopy) }, d => {
          showToast("🦄 Your Comment was added", "success");
        });
        /***********like the post */
        dispatch({ type: COMMENT_ON_POST });
      }
    }
  };
}
export function likeComment(postId, comment) {
  return async dispatch => {
    const db = getFirestore(app);
    const docRef = doc(db, DB_COLLECTION_POSTS, `${postId}`); 
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (
        docSnap.get("comments").filter(e => e.uid === comment.uid).length > 0
      ) {
        // flash message to User you  already posted
        showToast("🦄 you already posted a comment to this post", "error");

      } else {
        const commentCopy = { ...comment, id: (Math.random() + 1).toString(36).substring(0, 29) }

        updateDoc(docRef, { comments: arrayUnion(commentCopy) }, d => {
          showToast("🦄 Your Comment was added", "success");
        });
        /***********like the post */
        dispatch({ type: COMMENT_ON_POST });
      }
    }
  };
}

