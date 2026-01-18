"use server";

import { auth, adminAuth } from "@/firebase/config";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    updateProfile
} from "firebase/auth";
import { cookies } from "next/headers";

export async function signUpAction(email: string, password: string, displayName: string = "") {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (displayName) {
            await updateProfile(user, { displayName });
        }

        const token = await user.getIdToken();
        (await cookies()).set("session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });

        return { success: true, user: { uid: user.uid, email: user.email, displayName: user.displayName } };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function signInAction(email: string, password: string) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const token = await user.getIdToken();
        (await cookies()).set("session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });

        return { success: true, user: { uid: user.uid, email: user.email, displayName: user.displayName } };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function signOutAction() {
    try {
        await firebaseSignOut(auth);
        (await cookies()).set("session", "", { maxAge: 0 });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function getSessionAction() {
    const session = (await cookies()).get("session")?.value;
    if (!session) return null;

    try {
        const decodedToken = await adminAuth.verifyIdToken(session);
        return {
            uid: decodedToken.uid,
            email: decodedToken.email,
            displayName: decodedToken.name || null
        };
    } catch (error) {
        console.error("Session verification failed:", error);
        return null;
    }
}
