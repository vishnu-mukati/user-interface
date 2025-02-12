import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import classes from './UserProfile.module.css';

const UserProfile = () => {
  const token = useSelector((state) => state.auth.token);  
  const [name, setName] = useState('');
  const nameInputRef = useRef();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(
          'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB-4zGintfY6F596VqLXCPFAoAlQGVK_N4',
          {
            idToken: token,
          }
        );
        const fetchedName = response.data.users[0].displayName;
        setName(fetchedName);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUserData();
  }, [token]);

 
  const updateProfileHandler = async (event) => {
    event.preventDefault();
    const updatedName = nameInputRef.current.value;

    try {
      await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB-4zGintfY6F596VqLXCPFAoAlQGVK_N4',
        {
          idToken: token,
          displayName: updatedName,
          returnSecureToken: true,
        }
      );
      setName(updatedName);
      alert('Profile updated successfully!');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={classes.profile}>
      <h2>Your Profile</h2>
      <form onSubmit={updateProfileHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" defaultValue={name} ref={nameInputRef} />
        </div>
        <button className={classes.button}>Update Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;



// import { Fragment } from "react"

// const UserProfile = () => {
//     const nameInputRef = useRef();
// return (
//     <Fragment>
//         <div>
//             <h1>Profile Information</h1>
//         </div>
//         <form>
//             <div>
//                 <label htmlFor="name">Name</label>
//                 <input type="text" id="name" required />
//             </div>
//             <div>
//                 <label htmlFor="mob">Number</label>
//                 <input type="number" id="mob" required />
//             </div>
//             <div>
//                 <label htmlFor="address">address</label>
//                 <input type="text" id="address" required />
//             </div>
//             <div>
//                 <label htmlFor="District">District</label>
//                 <input type="text" id="District" required />
//             </div>
//             <div>
//                 <label htmlFor="State">State</label>
//                 <input type="text" id="State" required />
//             </div>
//             <div>
//                 <label htmlFor="pincode">PinCode</label>
//                 <input type="number" id="pincode" required />
//             </div>
          
//         </form>

//     </Fragment>
//     );
// };

// export default UserProfile;