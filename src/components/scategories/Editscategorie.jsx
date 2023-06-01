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
import { updateScategorie } from '../../features/scategorieSlice';
const Editscategorie = ({scat}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [validated, setValidated] = useState(false);
  const [id, setId] = useState(scat._id);
  const [imagescat, setImagescat] = useState(scat.imagescat);
  const [nomscategorie, setNomscategorie] = useState(scat.nomscategorie);
  const dispatch = useDispatch();


  const handleSubmit = (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (form.checkValidity() === true) {
    const scategorie={
    _id :id,
    nomscategorie: nomscategorie,
    imagescat: imagescat,
    }
    dispatch(updateScategorie(scategorie))
    .then(res=>{
    console.log("Modification OK",res);
    setNomscategorie("");
    setImagescat("");
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
    <Modal.Title> <h1 align="center">Modification Sous Categorie</h1></Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div className="container w-100 d-flex justify-content-center">
<div>
<div className='form mt-3'>
<Row className="mb-2">
<Form.Group as={Col} md="6" >
<Form.Label >Nom  sous categorie *</Form.Label>
<Form.Control
required
type="text"
placeholder="Nom sous categorie"
value={nomscategorie}
onChange={(e)=>setNomscategorie(e.target.value)}
/>
<Form.Control.Feedback type="invalid">
Saisir Nom sous categorie
</Form.Control.Feedback>
</Form.Group>
<Form.Group as={Col} md="6">
<Form.Label>Image sous categorie *</Form.Label>
<Form.Control
required
type="text"
placeholder="Image sous categorie"
value={imagescat}
onChange={(e)=>setImagescat(e.target.value)}
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

export default Editscategorie
