import React from 'react'
import { useState,useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { useNavigate,useParams } from 'react-router-dom';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import {useDispatch,useSelector} from "react-redux";
import { updateCategorie } from '../../features/categorieSlice';
const Editcategorie= ({cat}) => {
 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [validated, setValidated] = useState(false);
  const [id, setId] = useState(cat._id);
  const [imagecategorie, setImagecategorie] = useState(cat.imagecategorie);
  const [nomcategorie, setNomcategorie] = useState(cat.nomcategorie);
  const dispatch = useDispatch();


  const handleSubmit = (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (form.checkValidity() === true) {
    const categorie={
    _id :id,
    nomcategorie: nomcategorie,
    imagecategorie: imagecategorie,
    }
    dispatch(updateCategorie(categorie))
    .then(res=>{
    console.log("Modification OK",res);
    setNomcategorie("");
    setImagecategorie("");
    setValidated(false);
    handleClose()
    })
    .catch(error=>{
    console.log(error)
    alert("Erreur ! Modification non effectuée")
    })
    }
    setValidated(true);
    };
    return (
    <>
    <span
    onClick={handleShow}
    style={{ cursor: 'pointer'}}
    >
    <NoteAltOutlinedIcon color='success' />
    </span>
    <Modal show={show} onHide={handleClose}>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
    <Modal.Header closeButton>
    <Modal.Title> <h1 align="center">Modification Categorie</h1></Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div className="container w-100 d-flex justify-content-center">
<div>
<div className='form mt-3'>
<Row className="mb-2">
<Form.Group as={Col} md="6" >
<Form.Label >Nom categorie *</Form.Label>
<Form.Control
required
type="text"
placeholder="Nom categorie"
value={nomcategorie}
onChange={(e)=>setNomcategorie(e.target.value)}
/>
<Form.Control.Feedback type="invalid">
Saisir Nom categorie
</Form.Control.Feedback>
</Form.Group>
<Form.Group as={Col} md="6">
<Form.Label>Image categorie *</Form.Label>
<Form.Control
required
type="text"
placeholder="Image categorie"
value={imagecategorie}
onChange={(e)=>setImagecategorie(e.target.value)}
/>
<Form.Control.Feedback type="invalid">
Saisir Image
</Form.Control.Feedback>
</Form.Group>
</Row>

</div>
</div>
</div>
</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={handleClose}>
Fermer
</Button>
<Button type="submit">Enregistrer</Button>
</Modal.Footer>
</Form>
</Modal>
</>
  )
}

export default Editcategorie

