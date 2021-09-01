import { app } from "../../utils/firebase";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";
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

const DB_COLLECTION_POSTS = "Posts";

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

export function signUp(email, password) {
  return dispatch => {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        dispatch({ type: SIGN_UP_USER, payload: result });
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
    const q = query(collection(db, DB_COLLECTION_POSTS));
    const unsubscribe = onSnapshot(
      q,
      querySnapshot => {
        const data = [];
        querySnapshot.forEach(doc => {
          const document = { ...doc.data(), postId: doc.id };
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
export function addPost(post) {
  return dispatch => {
    const db = getFirestore(app);
    const docRef = addDoc(collection(db, DB_COLLECTION_POSTS), post);

    dispatch({
      type: ADD_POST,
      message: `Document written with ID:  ${docRef.id}`
    });
  };
}
//not yet implemented
export function likePost(id) {
  // update document field base on id;
  alert("liked");
  return dispatch => {
    dispatch({ type: LIKE_POST });
  };
}
export function commentPost(postId) {
  // update document field base on id;
  alert("liked");
  return dispatch => {};
}
