import React from 'react'
import MUIDataTable from "mui-datatables";
import ReactLoading from 'react-loading';
import {useDispatch,useSelector} from "react-redux"
import { deleteCategorie } from '../../features/categorieSlice';
import Editcategorie from './Editcategorie';
import Insertcategorie from './Insertcategorie';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
const AfficheCategories = () => {
    const dispatch = useDispatch();
    const {categories,isLoading,error} = useSelector((state)=>state.storecategories);
    const handleDelete=(id)=>{
        if(window.confirm("supprimer Categorie O/N")) {
        dispatch(deleteCategorie (id));
        }
        }
        
    const columns = [
        {
            label: "Imagecategorie",
            name:"imagecategorie",
            options: {
            customBodyRender : (rowdata) => (
            <img
            style={{ height: 40, width : 60, borderRadius: '10%' }}
            src= {rowdata}
            alt=""
            />
            )
            }
            },
        {
        label: "Nomcategorie",
        name: "nomcategorie"
        },
        {
            name: "_id",
            label: "Actions",
            options: {
            customBodyRender: (value,tableMeta) => (
            <div>
           <span>
<Editcategorie cat={categories[tableMeta.rowIndex]} />
</span> 
            <span
            onClick={(e) => handleDelete(value)}
            style={{ cursor: 'pointer'}}
            >
            <DeleteForeverRoundedIcon color='error' />
            </span>
            </div>
            )
            }
            }
            
                ];
                const renderCategories = () => {
                    if (isLoading) return <center><ReactLoading type='spokes' color="red"
                    height={'8%'} width={'8%'} /></center>
                    if (error) return <p>Impossible d'afficher la liste des categories...</p>
                    return <React.Fragment>
                    {categories && 
                    <MUIDataTable
                    title="Liste categories"
                    data={categories}
                    columns={columns}
                    options={{
                    rowsPerPageOptions:[5,10,15,100]
                    }}
                    />
                    }
                    </React.Fragment>
                    }

  return (
    <>
    <div>
    <Insertcategorie/>
    </div>
    <div>
    {renderCategories()}
    </div>
    </>
  )
}

export default AfficheCategories
