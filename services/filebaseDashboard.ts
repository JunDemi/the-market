import {
    addDoc,
    arrayRemove,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    documentId,
    getDocs,
    limit,
    orderBy,
    query,
    updateDoc,
    where,
  } from "firebase/firestore";
  import { db } from "./firebase";
//Firestore 테이블 불러오기
const authRef = collection(db, "profiles");
const productsRef = collection(db, "product");
const buyRef = collection(db, "buy");
const snsRef = collection(db, "sns");
const snsCommentRef = collection(db, "snscomment");
