// js/auth.js
import { db } from "./firebase-config.js";
import { ref, set, get, update } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

/**
 * Formats the ID for Firebase keys (e.g., replaces '.' with '_').
 */
export function formatID(rawID) {
    if (!rawID) return "";
    return rawID.trim().replace(/\./g, '_').toUpperCase();
}

/**
 * Login User
 */
export async function loginUser(rawID, password) {
    if (!rawID || !password) {
        throw new Error("Please enter both ID and Password.");
    }

    const dbPath = formatID(rawID);
    const userRef = ref(db, `users/${dbPath}`);

    try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            const userData = snapshot.val();

            // NOTE: In production, hash passwords!
            if (userData.password === password) {
                // Set Session
                sessionStorage.setItem("isLoggedIn", "true");
                sessionStorage.setItem("role", userData.role);
                sessionStorage.setItem("userName", userData.name || "User");
                sessionStorage.setItem("userId", dbPath); // Common ID
                sessionStorage.setItem("userEmail", userData.email || "");
                sessionStorage.setItem("dept", userData.dept || "");
                sessionStorage.setItem("year", userData.year || "");

                return userData;
            } else {
                throw new Error("Invalid Password!");
            }
        } else {
            throw new Error("User ID not found!");
        }
    } catch (error) {
        throw error;
    }
}

/**
 * Register User
 */
export async function registerUser(data) {
    const { name, email, id, role, dept, year, password } = data;
    const dbID = formatID(id);

    // Check if user exists
    const userRef = ref(db, `users/${dbID}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
        throw new Error("User ID already registered!");
    }

    // Save
    await set(userRef, {
        name, email, id, role, dept, year, password
    });

    return true;
}

/**
 * Logout
 */
export function logout() {
    sessionStorage.clear();
    window.location.href = "../login.html"; // Adjust path as needed
}

/**
 * Check Session
 * Returns user object if valid, else null (and redirects).
 */
export function checkSession(requiredRole = null) {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const role = sessionStorage.getItem("role");

    if (isLoggedIn !== "true") {
        window.location.href = "../login.html";
        return null;
    }

    if (requiredRole && role !== requiredRole) {
        alert("Unauthorized Access!");
        window.location.href = "../login.html";
        return null;
    }

    return {
        id: sessionStorage.getItem("userId"),
        name: sessionStorage.getItem("userName"),
        role: role,
        dept: sessionStorage.getItem("dept"),
        year: sessionStorage.getItem("year")
    };
}
