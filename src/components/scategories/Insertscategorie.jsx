import React from 'react'
import { useState,useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import { createScategorie } from '../../features/scategorieSlice';
import { getCategories } from '../../features/categorieSlice';
const Insertscategorie = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [validated, setValidated] = useState(false);
  const [imagescat, setImagescat] = useState("");
  const [nomscategorie, setNomscategorie] = useState("");
  const [categorieID, setCategorieID] = useState("");
  const dispatch = useDispatch();
  const {categories,isLoading} = useSelector((state) =>state.storecategories);
  useEffect(() => {
  dispatch(getCategories());
  },[dispatch]);
  const handleSubmit = (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (form.checkValidity() === true) {
    const scategorie={
    nomscategorie: nomscategorie,
    imagescat: imagescat,
    categorieID:categorieID,
    }
    dispatch(createScategorie(scategorie))
    .then(res=>{
    console.log("Insert OK",res);
    setNomscategorie("");
    setImagescat("");
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
    <Modal.Title> <h1 align="center">Ajout Sous Categorie</h1></Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div className="container w-100 d-flex justify-content-center">
    <div>
  
    <div className='form mt-3'>
<Row className="mb-2">
<Form.Group as={Col} md="6" >
<Form.Label >Nom sous categorie *</Form.Label>
<Form.Control
required
type="text"
placeholder="Nom sous categorie"
value={nomscategorie}
onChange={(e)=>setNomscategorie(e.target.value)}
/>
<Form.Control.Feedback type="invalid">
Saisir Nom Sous Categorie
</Form.Control.Feedback>
</Form.Group>

<Form.Group as={Col} md="6">
<Form.Label>Image sous Categorie</Form.Label>
<Form.Control
type="text"
placeholder="Image sous categorie"
value={imagescat}
onChange={(e)=>setImagescat(e.target.value)}
/>
</Form.Group>
</Row>
<Row>
<Form.Group as={Col} md="12">
<Form.Label>Catégorie</Form.Label>
<Form.Control
as="select"
type="select"
value={categorieID}
onChange={(e)=>setCategorieID(e.target.value)}
>
<option></option>
{!isLoading? categories.map((cat)=><option key={cat._id}
value={cat._id}>{cat.nomcategorie}</option>):null}
</Form.Control>
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

export default Insertscategorie
