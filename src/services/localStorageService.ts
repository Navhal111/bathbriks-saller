// Interface for user data stored in localStorage
export interface UserData {
  token: string;
  username: string;
  role: string;
}

// Keys for localStorage
const STORAGE_KEYS = {
  USER_DATA: "opsifi_user_data",
  TOKEN: "opsifi_token",
  USERNAME: "opsifi_username",
  ROLE: "opsifi_role",
} as const;

/**
 * Local Storage Service for managing user authentication data
 */
export class LocalStorageService {
  /**
   * Store complete user data (token, username, role) in localStorage
   * @param userData - The user data object containing token, username, and role
   */
  static setUserData(userData: UserData): void {
    try {
      // Store complete user data object
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));

      // Store individual items for easy access
      localStorage.setItem(STORAGE_KEYS.TOKEN, userData.token);
      localStorage.setItem(STORAGE_KEYS.USERNAME, userData.username);
      localStorage.setItem(STORAGE_KEYS.ROLE, userData.role);

      console.log("✅ User data stored successfully in localStorage");
    } catch (error) {
      console.error("❌ Failed to store user data in localStorage:", error);
      throw new Error("Failed to store user data");
    }
  }

  /**
   * Get complete user data from localStorage
   * @returns UserData object or null if not found
   */
  static getUserData(): UserData | null {
    try {
      const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
      if (userData) {
        const parsedData = JSON.parse(userData) as UserData;
        console.log("📊 Retrieved user data from localStorage");
        return parsedData;
      }
      return null;
    } catch (error) {
      console.error(
        "❌ Failed to retrieve user data from localStorage:",
        error
      );
      return null;
    }
  }

  /**
   * Get authentication token from localStorage
   * @returns Token string or null if not found
   */
  static getToken(): string | null {
    try {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      return token;
    } catch (error) {
      console.error("❌ Failed to retrieve token from localStorage:", error);
      return null;
    }
  }

  /**
   * Get username from localStorage
   * @returns Username string or null if not found
   */
  static getUsername(): string | null {
    try {
      const username = localStorage.getItem(STORAGE_KEYS.USERNAME);
      return username;
    } catch (error) {
      console.error("❌ Failed to retrieve username from localStorage:", error);
      return null;
    }
  }

  /**
   * Get user role from localStorage
   * @returns Role string or null if not found
   */
  static getRole(): string | null {
    try {
      const role = localStorage.getItem(STORAGE_KEYS.ROLE);
      return role;
    } catch (error) {
      console.error("❌ Failed to retrieve role from localStorage:", error);
      return null;
    }
  }

  /**
   * Check if user is authenticated (has valid token)
   * @returns Boolean indicating if user is authenticated
   */
  static isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && token.trim() !== "";
  }

  /**
   * Check if user has a specific role
   * @param requiredRole - The role to check for
   * @returns Boolean indicating if user has the required role
   */
  static hasRole(requiredRole: string): boolean {
    const userRole = this.getRole();
    return userRole === requiredRole;
  }

  /**
   * Check if user is admin
   * @returns Boolean indicating if user has admin role
   */
  static isAdmin(): boolean {
    return this.hasRole("ADMIN");
  }

  /**
   * Clear all user data from localStorage (logout)
   */
  static clearUserData(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USERNAME);
      localStorage.removeItem(STORAGE_KEYS.ROLE);

      console.log("✅ User data cleared from localStorage");
    } catch (error) {
      console.error("❌ Failed to clear user data from localStorage:", error);
      throw new Error("Failed to clear user data");
    }
  }

  /**
   * Update specific user data field
   * @param field - The field to update
   * @param value - The new value
   */
  static updateUserDataField(field: keyof UserData, value: string): void {
    try {
      const currentUserData = this.getUserData();
      if (currentUserData) {
        const updatedUserData = {
          ...currentUserData,
          [field]: value,
        };
        this.setUserData(updatedUserData);
        console.log(`✅ Updated ${field} in localStorage`);
      } else {
        throw new Error("No user data found to update");
      }
    } catch (error) {
      console.error(`❌ Failed to update ${field} in localStorage:`, error);
      throw new Error(`Failed to update ${field}`);
    }
  }

  /**
   * Get auth header for API requests
   * @returns Authorization header object or null if no token
   */
  static getAuthHeader(): { Authorization: string } | null {
    const token = this.getToken();
    if (token) {
      return {
        Authorization: `Bearer ${token}`,
      };
    }
    return null;
  }

  /**
   * Get common headers for authenticated API requests
   * @returns Headers object with Authorization and Content-Type
   */
  static getAuthenticatedHeaders(): HeadersInit {
    const authHeader = this.getAuthHeader();
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(authHeader && authHeader),
    };
  }
}
