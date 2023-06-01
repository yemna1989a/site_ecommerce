import React ,{useEffect}from 'react'
import { useDispatch } from "react-redux";
import { getCategories } from '../../features/categorieSlice';
import AfficheCategories from './AfficheCategories';
const Listcategories = () => {
  const dispatch = useDispatch();
  useEffect(() => {
  dispatch(getCategories());
  },[dispatch]);
  return (
    <div>
       <AfficheCategories/>
    </div>
  )
}

export default Listcategories
