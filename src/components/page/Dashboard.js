import { useEffect } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { categoriesListAction } from "../../store/RecipeCategorySlice";
import styles from "./Dashboard.module.css";
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
     const dispatch = useDispatch();
     const dataLoaded = useSelector(state => state.list.dataLoaded);
     const categoriesList = useSelector(state => state.list.categoriesList);
     const history = useHistory();

     useEffect(() => {
          if (!dataLoaded) {
               getData();
          }
     }, [dataLoaded]);

     async function getData() {
          try {
               const response = await axios.get(`https://restaurant-admin-panel-f2680-default-rtdb.firebaseio.com/categorieslist.json`);
               if (response.data) {
                    for (const key of Object.keys(response.data)) {
                         const categoriesData = {
                              id: key,
                              ...response.data[key],
                         };
                         dispatch(categoriesListAction.addcategories(categoriesData));
                    }
               } else {
                    dispatch(categoriesListAction.clearCategories());
               }
          } catch (err) {
               alert(err.message);
          }
     }

     const handleCategoryClick = (id) => {
          history.push(`/recipe/${id}`);
     };

  
     
     
     return (
          <>
               <div className={styles.dashboardContainer}>
                    <h1>Welcome To The Recipe Category</h1>
               </div>
               <ul className={styles.cardContainer}>
                    {categoriesList.map((item) => (
                         <li
                         key={item.id}
                         className={styles.card}
                         onClick={() => handleCategoryClick(item.id)}
                         >
                                 
                              <img   src={item.image}  alt={item.recipeName} className={styles.image}/>
                              <h3>{item.recipeName}</h3>
                              <p>Price: ₹{item.price}</p>
                         </li>
                    ))}
               </ul>
          </>
     );
};

export default Dashboard;
