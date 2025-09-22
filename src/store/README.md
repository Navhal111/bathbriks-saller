# Redux Store Setup

This directory contains the Redux store configuration for managing application state.

## Structure

```
store/
├── index.ts              # Store configuration
├── ReduxProvider.tsx     # React Redux Provider component
├── hooks.ts              # Typed hooks for Redux
├── exports.ts            # Centralized exports
├── slices/
│   └── userSlice.ts      # User state management
├── selectors/
│   └── userSelectors.ts  # Memoized selectors
└── hooks/
    └── useUserDetailsRedux.ts  # Custom hook combining API + Redux
```

## Usage Examples

### 1. Using the custom hook (Recommended)

```tsx
import { useUserDetailsRedux } from "@/store/hooks/useUserDetailsRedux";

function MyComponent() {
  const {
    userDetails,
    isLoading,
    error,
    fetchUserDetails,
    updateUser,
    clearUser,
  } = useUserDetailsRedux();

  // Fetch user details
  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  // Update user
  const handleUpdate = async (data) => {
    await updateUser({
      username: "newUsername",
      userEmail: data.email,
      userMobile: data.mobile,
      userType: "ADMIN",
    });
  };

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {userDetails && (
        <div>
          <p>Name: {userDetails.userName}</p>
          <p>Email: {userDetails.userEmail}</p>
        </div>
      )}
    </div>
  );
}
```

### 2. Using selectors directly

```tsx
import { useAppSelector } from "@/store/hooks";
import {
  selectUserName,
  selectUserEmail,
} from "@/store/selectors/userSelectors";

function UserProfile() {
  const userName = useAppSelector(selectUserName);
  const userEmail = useAppSelector(selectUserEmail);

  return (
    <div>
      <h1>{userName}</h1>
      <p>{userEmail}</p>
    </div>
  );
}
```

### 3. Dispatching actions directly

```tsx
import { useAppDispatch } from "@/store/hooks";
import { setUserDetails, clearUserDetails } from "@/store/slices/userSlice";

function AdminComponent() {
  const dispatch = useAppDispatch();

  const handleSetUser = (userData) => {
    dispatch(setUserDetails(userData));
  };

  const handleClearUser = () => {
    dispatch(clearUserDetails());
  };

  return (
    <div>
      <button onClick={handleClearUser}>Clear User</button>
    </div>
  );
}
```

## Available Selectors

- `selectUserDetails` - Complete user details object
- `selectUserLoading` - Loading state
- `selectUserError` - Error state
- `selectUserName` - User's name
- `selectUserEmail` - User's email
- `selectUserMobile` - User's mobile number
- `selectUserType` - User's type (ADMIN, SUPER_ADMIN, etc.)
- `selectUserId` - User's ID

## Available Actions

- `setUserDetailsLoading(boolean)` - Set loading state
- `setUserDetails(userDetails)` - Set complete user details
- `setUserDetailsError(error)` - Set error state
- `updateUserDetails(partialUpdate)` - Update specific fields
- `clearUserDetails()` - Clear all user data

## Integration

The Redux store is already integrated into the app layout via `ReduxProvider` in `/src/app/layout.tsx`.

## Best Practices

1. **Use the custom hook `useUserDetailsRedux`** for components that need to fetch or update user data
2. **Use selectors** for components that only need to read user data
3. **Use memoized selectors** to prevent unnecessary re-renders
4. **Dispatch actions directly** only when you need fine-grained control
