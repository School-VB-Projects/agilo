import {
    CollectionReference,
    addDoc,
    collection,
    getDoc,
    getDocs,
    limit,
    query,
    where,
    doc,
} from "firebase/firestore";
import {db} from "./firebase";
import {User} from "../types/UserType";
import {UserActionType} from "../context/UserReducer";
import {Action} from "../types/ActionType";
import {NavigateFunction} from "react-router-dom";
import React from "react";

export const createUser = async (
    firstname: string,
    lastname: string,
    mail: string,
    password: string,
    dispatch: React.Dispatch<Action<UserActionType>>,
    navigate: NavigateFunction,
    redirectPath: string
) => {
    try {
        const docRef = await addDoc<User>(
            collection(db, "users") as CollectionReference<User>,
            {
                firstname,
                lastname,
                mail,
                authenticationString: password,
            }
        );

        const doc = await getDoc(docRef);
        const data = doc.data();

        if (data) {
            dispatch({
                type: UserActionType.ADD_USERS,
                payload: {
                    id: doc.id,
                    ...data,
                },
            });
        }

        navigate(redirectPath);
    } catch (e) {
        console.error(e);
    }
};

export const findUser = async (
    mail: string,
    password: string,
    dispatch: React.Dispatch<Action<UserActionType>>,
    navigate: NavigateFunction,
    redirectPath: string
) => {

    try {
        const docRef = query(
            collection(db, "users"),
            where("mail", "==", mail),
            where("authenticationString", "==", password),
            limit(1)
        );

        const users = await getDocs(docRef);

        if (users.size !== 1) {
            throw new Error("Requested credentials do not match any account");
        }

        users.forEach((doc) => {
            const user = doc;
            const data = user.data();
            console.log(data);
            if (data) {
                dispatch({
                    type: UserActionType.SET_CURRENT_USER,
                    payload: {
                        id: user.id,
                        ...data,
                    },
                });
            }
        });

        navigate(redirectPath);
    } catch (e) {
        throw e;
    }
};

export const logout = async (userId: string | undefined, dispatch: React.Dispatch<Action<UserActionType>>, navigate: NavigateFunction, redirectPath: string) => {
    if (userId) {
        try {
            const _doc = doc(db, 'users', userId);
            const user = await getDoc(_doc);

            dispatch({
                type: UserActionType.SET_CURRENT_USER,
                payload: undefined,
            });

            navigate(redirectPath);
        } catch (e) {
            throw e;
        }
    }
}
