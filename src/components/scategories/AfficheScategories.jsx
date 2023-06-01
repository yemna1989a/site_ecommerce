
import React from 'react'
import MUIDataTable from "mui-datatables";
import ReactLoading from 'react-loading';
import {useDispatch,useSelector} from "react-redux"
import { deleteScategorie } from '../../features/scategorieSlice';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Insertscategorie from './Insertscategorie';
import Editscategorie from './Editscategorie';
const AfficheScategories = () => {
    const dispatch = useDispatch();
    const {scategories,isLoading,error} = useSelector((state)=>state.storescategories);
    const handleDelete=(id)=>{
        if(window.confirm("supprimer SCategorie O/N")) {
        dispatch(deleteScategorie (id));
        }
        }
        
    const columns = [
        {
            name:"categorieID",
            label: "Categorie",
        },
           {
            label: "Imagescategorie",
            name:"imagescat",
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
        label: "Nomscategorie",
        name: "nomscategorie"
        },
        {
            name: "_id",
            label: "Actions",
            options: {
            customBodyRender: (value,tableMeta) => (
            <div>
                       <span>
<Editscategorie scat={scategories[tableMeta.rowIndex]} />
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
                const renderScategories = () => {
                    if (isLoading) return <center><ReactLoading type='spokes' color="red"
                    height={'8%'} width={'8%'} /></center>
                    if (error) return <p>Impossible d'afficher la liste des sous categories...</p>
                    return <React.Fragment>
                    {scategories && 
                    <MUIDataTable
                    title="Liste sous categories"
                    data={scategories}
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
    <Insertscategorie/>
    </div>
    <div>
    {renderScategories()}
    </div>
    </>
  )
}

export default AfficheScategories
