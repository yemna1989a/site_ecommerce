import React,{useEffect} from 'react'
import { useDispatch } from "react-redux";
import { getScategories } from '../../features/scategorieSlice';
import AfficheScategories from './AfficheScategories';
const Listscategories = () => {
  const dispatch = useDispatch();
  useEffect(() => {
  dispatch(getScategories());
  },[dispatch]);
  return (
    <div>
    <AfficheScategories/>
    </div>
  )
}

export default Listscategories
