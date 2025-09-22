import { useAppSelector } from "@/store/hooks";
import {
  selectUserDetails,
  selectUserName,
  selectUserEmail,
  selectUserType,
} from "@/store/selectors/userSelectors";

export const UserInfo = () => {
  const userDetails = useAppSelector(selectUserDetails);
  const userName = useAppSelector(selectUserName);
  const userEmail = useAppSelector(selectUserEmail);
  const userType = useAppSelector(selectUserType);

  if (!userDetails) {
    return <div>User not loaded</div>;
  }

  return (
    <div>
      <h3>User Information (from Redux)</h3>
      <p>Name: {userName}</p>
      <p>Email: {userEmail}</p>
      <p>Type: {userType}</p>
      <p>ID: {userDetails.id}</p>
    </div>
  );
};
