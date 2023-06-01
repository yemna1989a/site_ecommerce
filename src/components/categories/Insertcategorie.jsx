import React from 'react'
import { useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import {useDispatch,useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import { addCategorie } from '../../services/categorieService';
import { createCategorie } from '../../features/categorieSlice';
const Insertcategorie = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [validated, setValidated] = useState(false);
  const [imagecategorie, setImagecategorie] = useState("");
  const [nomcategorie, setNomcategorie] = useState("");
  const dispatch = useDispatch();

 
  const handleSubmit = (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (form.checkValidity() === true) {
    const categorie={
    nomcategorie: nomcategorie,
    imagecategorie: imagecategorie,
    }
    dispatch(createCategorie(categorie))
    .then(res=>{
    console.log("Insert OK",res);
    setNomcategorie("");
    setImagecategorie("");
    setValidated(false);
    handleClose()
    })
    .catch(error=>{
    console.log(error)
    alert("Erreur ! Insertion non effectuée")
    })
    }
    setValidated(true);
    };
    return (
    <>
    <Button variant="success"style={{'margin':10,'left':10}}
    onClick={handleShow}>
    Nouveau
    </Button>
    <Modal show={show} onHide={handleClose}>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
    <Modal.Header closeButton>
    <Modal.Title> <h1 align="center">Ajout Categorie</h1></Modal.Title>
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
Saisir Nom Categorie
</Form.Control.Feedback>
</Form.Group>

<Form.Group as={Col} md="6">
<Form.Label>Image Categorie</Form.Label>
<Form.Control
type="text"
placeholder="Image categorie"
value={imagecategorie}
onChange={(e)=>setImagecategorie(e.target.value)}
/>
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

export default Insertcategorie



