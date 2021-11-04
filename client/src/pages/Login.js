import { Link,useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ name: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

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
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      name: '',
      password: '',
    });
  };

    return (
    
    <div className="card bg-white card-rounded w-50">
      <div className="card-header bg-dark text-center">
        <h1>Welcome to the NRL 2022 Grand final tipping tracker!</h1>
      </div>
      <div className="card-footer text-center m-3">
        <form onSubmit={handleFormSubmit}>
          <h2>Login</h2>
          <p>
            <input name="name" type="text" placeholder="Name" value={formState.name} onChange={handleChange}/>
          </p>
          <p>
            <input  name="password" type="password" placeholder="Password" value={formState.password} onChange={handleChange} />
          </p>        
            <button type="submit" className="btn btn-lg btn-danger">Login</button> 
            <Link to="/SignUp">
              <button className="btn btn-lg btn-danger">Sign Up</button>
            </Link>            
        </form>
      </div>
      {error && <div>Something went wrong...</div>} 
    </div>
    
  );
};

// const Login = () => {

//   const [formData, setFormData] = useState({
//     _id: '',
//     name: '',
//     password: '',
//   });
  
//   const [UseQuery, { data, error }] = useLazyQuery(QUERY_LOGIN, {
//     variables: {  ...formData },
//   });
  
//   let history = useHistory();

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
  
//     try {

//       UseQuery();
      
//       if (data && data.login && data.login.length > 0){
//         console.log(data)
//         history.push(`/home/${data.login[0]._id}`);
//       }
      

//     } catch (err) {
//       console.error(err);
//     }

//   //  setFormData({
//   //   _id: '',
//   //    name: '',
//   //    password: '',
//   //  });
//   };

//   return (
    
//     <div className="card bg-white card-rounded w-50">
//       <div className="card-header bg-dark text-center">
//         <h1>Welcome to the NRL 2022 Grand final tipping tracker!</h1>
//       </div>
//       <div className="card-footer text-center m-3">
//         <form onSubmit={handleFormSubmit}>
//           <h2>Login</h2>
//           <p>
//             <input name="name" type="text" placeholder="Name"  onChange={handleInputChange}/>
//           </p>
//           <p>
//             <input  name="password" type="text" placeholder="Password"  onChange={handleInputChange} />
//           </p>        
//             <button type="submit" className="btn btn-lg btn-danger">Login</button> 
//             <Link to="/SignUp">
//               <button className="btn btn-lg btn-danger">Sign Up</button>
//             </Link>            
//         </form>
//       </div>
//       {error && <div>Something went wrong...</div>} 
//     </div>
    
//   );
// };

export default Login;
