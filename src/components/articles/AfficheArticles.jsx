import React from 'react'
import MUIDataTable from "mui-datatables";
import ReactLoading from 'react-loading';
import {useDispatch,useSelector} from "react-redux"
import { deleteArticle } from '../../features/articleSlice';

import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Insertarticle from './Insertarticle';
import Editarticle from './Editarticle';



const AfficheArticles = () => {
    const dispatch = useDispatch();
    const {articles,isLoading,error} = useSelector((state)=>state.storearticles);
    const handleDelete=(id)=>{
        if(window.confirm("supprimer Article O/N")) {
        dispatch(deleteArticle(id));
        }
        }
        
    const columns = [
        {
        label: "Désignation",
        name: "designation"
        },
        {
        label: "Référence",
        name: "reference"
        },
        {
        label: "Marque",
        name: "marque"
        },
        {
        label: "Prix",
        name: "prix"
        },
        {
        label: "Quantité",
        name: "qtestock"
        },
        {
        name:"scategorieID",
        label: "S/Categorie",
        options: {
            customBodyRender : (scateg) => (
            scateg? scateg.nomscategorie : null
            )
            }
            },
            {
            label: "Image",
            name:"imageart",
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
                name: "_id",
                label: "Actions",
                options: {
                customBodyRender: (value,tableMeta) => (
                <div>
                <span>
<Editarticle art={articles[tableMeta.rowIndex]} />
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
                const renderArticles = () => {
                    if (isLoading) return <center><ReactLoading type='spokes' color="red"
                    height={'8%'} width={'8%'} /></center>
                    if (error) return <p>Impossible d'afficher la liste des articles...</p>
                    return <React.Fragment>
                    {articles && 
                    <MUIDataTable
                    title="Liste articles"
                    data={articles}
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
<Insertarticle/>
</div>
<div>
{renderArticles()}
</div>
</>

  )
}

export default AfficheArticles

