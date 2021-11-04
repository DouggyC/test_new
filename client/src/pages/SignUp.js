import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const SignUp = () => {
  const [formState, setFormState] = useState({
    name: '',
    password: '',
  });
  const [createUser, { error, data }] = useMutation(CREATE_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await createUser({
        variables: { ...formState },
      });

      Auth.login(data.createUser.token);
    } catch (e) {
      console.error(e);
    }
  };


    return (
    
    <div className="card bg-white card-rounded w-50">
      <div className="card-header bg-dark text-center">
        <h1>Welcome to the NRL 2022 Grand final tipping tracker!</h1>
      </div>
      <div className="card-footer text-center m-3">
        <form onSubmit={handleFormSubmit}>
          <h2>Sign Up</h2>
          <p>
            <input name="name" type="text" placeholder="Name" value={formState.name} onChange={handleChange}/>
          </p>
          <p>
            <input  name="password" type="text" placeholder="Password" value={formState.password} onChange={handleChange}/>
          </p>        
            <button type="submit" className="btn btn-lg btn-danger">Join</button> 
        </form>
        
      </div>
      {error && <div>Something went wrong...</div>}
    </div>
    
  );
};

// const SignUp = () => {

//   const [formData, setFormData] = useState({
//     name: '',
//     password: '',
//   });
  
//   const [createUser, { error }] = useMutation(CREATE_USER);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   let history = useHistory();
      
//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
      
//       const { data } = await createUser({
//         variables: { ...formData },
//       });

//       history.push(`/home/${data.createUser._id}`);
//     } catch (err) {
//       console.error(err);
//     }

//     setFormData({
//       name: '',
//       password: '',
//     });
//   };

//   return (
    
//     <div className="card bg-white card-rounded w-50">
//       <div className="card-header bg-dark text-center">
//         <h1>Welcome to the NRL 2022 Grand final tipping tracker!</h1>
//       </div>
//       <div className="card-footer text-center m-3">
//         <form onSubmit={handleFormSubmit}>
//           <h2>Sign Up</h2>
//           <p>
//             <input name="name" type="text" placeholder="Name"  onChange={handleInputChange}/>
//           </p>
//           <p>
//             <input  name="password" type="text" placeholder="Password"  onChange={handleInputChange}/>
//           </p>        
//             <button type="submit" className="btn btn-lg btn-danger">Join</button> 
//         </form>
        
//       </div>
//       {error && <div>Something went wrong...</div>}
//     </div>
    
//   );
// };

export default SignUp;
