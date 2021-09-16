import { app } from "../../utils/firebase";
import firebase from "firebase/app";
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
  serverTimestamp,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  FieldValue,
  arrayUnion,
  arrayRemove,
  Timestamp,
  collectionGroup,
  Query,
  where
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  GET_USER,
  IS_LOGIN,
  IS_LOGIN_ERROR,
  SIGN_UP_USER,
  SIGN_UP_USER_ERROR,
  SIGN_OUT_USER,
  SIGN_OUT_USER_ERROR,
  READ_POSTS,
  ADD_POST,
  LIKE_POST,
  COMMENTS,
  COMMENT_ON_POST
} from "./type";
import { createDeflate } from "zlib";

const DB_COLLECTION_POSTS = "Posts";
const auth = getAuth(app);

/************************************
 * user functions starts here       *
 * **********************************/
export function isLoggedIn() {
  return dispatch => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;

        dispatch({
          type: IS_LOGIN,
          payload: user
        });
        // ...
      } else {
        // User is signed out
        // ...
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
      .then(result => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        dispatch({
          type: GET_USER,
          payload: user
        });
      })
      .catch(error => {
        // Handle Errors here.

        dispatch({
          type: "GET_USER_ERROR",
          payload: error
        });
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
}
export function login(account) {
  return dispatch => {
    const { email, password } = account;
    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        //const credential = GoogleAuthProvider.credentialFromResult(result);
        //const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        dispatch({
          type: GET_USER,
          payload: user
        });
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
          createdAt,
          lastLoginAt
        } = user;

        // update the profile collection
        const db = getFirestore(app);
        //const postBucket = "postImages";
        const storage = getStorage(app);
        const docRef = doc(db, "users", uid);
        await setDoc(
          docRef,
          {
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
            photos: []
          },
          { merge: true }
        );

        console.log(user);
        dispatch({ type: SIGN_UP_USER, payload: user });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function logOut() {
  return dispatch => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch({ type: SIGN_OUT_USER });
        toast.success("Signed out succesfully");
      })
      .catch(error => {
        // An error happened.
        dispatch({ type: SIGN_OUT_USER_ERROR });
      });
  };
}

/************************************
 *         Posts Actions here       *
 * **********************************/

export function getPosts(start, limit) {
  return dispatch => {
    const db = getFirestore(app);
    const q = query(
      collection(db, DB_COLLECTION_POSTS),
      orderBy("date", "desc")
    );
    const unsubscribe = onSnapshot(
      q,
      querySnapshot => {
        const data = [];
        const changes = querySnapshot.docChanges();
        changes.forEach(change => {
          if (change.type === "modified") {
            console.log(change);
            //alert("modified");
          }
          if (change.type === "added" && change.oldIndex >= 0) {
            // send notifications to users[friends]
            //alert("new post hasbeen added");
          }
        });
        querySnapshot.forEach(doc => {
          const document = { ...doc.data(), postId: doc.id };

          document.date = doc.data().date.toDate();

          data.push(document);
        });
        dispatch({ type: READ_POSTS, payload: data });
      },

      error => {
        console.log(error);
      }
    );
  };
}

//not yet implemented
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
        const storageRef = ref(storage, `postImages/${photo.name}`);
        const upload = await uploadBytes(storageRef, photo, photo);
        const url = await getDownloadURL(ref(storage, storageRef));
        post.photos.push(url);
        post.image = post.photos[0];
      }

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
      for (var i = 0; i < file.length; i++) {
        const photo = file.item(i);
        const storageRef = ref(storage, `postVideos/${photo.name}`);
        const upload = await uploadBytes(storageRef, photo, photo);
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
        message: `Document written with ID:  ${docRef.id}`
      });
    } else {
      //its apost
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

    // if not likes the post
    updateDoc(docRef, { likes: arrayUnion(user) }, d => {
      console.log("successfully updated");
    });
    /***********like the post */

    dispatch({ type: LIKE_POST });
  };
}
/*
add comment base on post id.
user can only post one comment.
*/

export function addComment(postId, comment) {
  return async dispatch => {
    const db = getFirestore(app);
    const docRef = doc(db, DB_COLLECTION_POSTS, `${postId}`);

    //console.log(docRef);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (
        docSnap.get("comments").filter(e => e.uid === comment.uid).length > 0
      ) {
        // flash message to User you  already posted

        toast.error("🦄 you already posted a comment to this post", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      } else {
        updateDoc(docRef, { comments: arrayUnion(comment) }, d => {
          console.log("successfully updated");
          console.log(d);
        });
        /***********like the post */
        dispatch({ type: COMMENT_ON_POST });
      }
    }
  };
}
