import React from 'react'
import { useState,useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import {useDispatch,useSelector} from "react-redux";
import { updateArticle } from '../../features/articleSlice';
import { getScategories } from '../../features/scategorieSlice';

const Editarticle = ({art}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [validated, setValidated] = useState(false);
  const [id, setId] = useState(art._id);
  const [reference, setReference] = useState(art.reference);
  const [designation, setDesignation] = useState(art.designation);
  const [prix, setPrix] = useState(art.prix);
  const [marque, setMarque] = useState(art.marque);
  const [qtestock, setQtestock] = useState(art.qtestock);
  const [imageart, setImageart] = useState(art.imageart);
  const [scategorieID, setScategorieID] = useState(art.scategorieID?._id);
  const dispatch = useDispatch();
  const {scategories,isLoading} = useSelector((state) =>state.storescategories);
  useEffect(() => {
   if (scategories==0) 
  dispatch(getScategories());
  },[dispatch]);
  const handleSubmit = (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (form.checkValidity() === true) {
    const article={
    _id :id,
    reference: reference,
    designation: designation,
    prix: prix,
    marque: marque,
    qtestock: qtestock,
    imageart: imageart,
    scategorieID: scategorieID
    }
    dispatch(updateArticle(article))
    .then(res=>{
    console.log("Modification OK",res);
    setReference("");
    setDesignation("");
    setPrix("");
    setMarque("");
    setQtestock("");
    setImageart("");
    setScategorieID("");
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
    <Modal.Title> <h1 align="center">Modification Article</h1></Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div className="container w-100 d-flex justify-content-center">
<div>
<div className='form mt-3'>
<Row className="mb-2">
<Form.Group as={Col} md="6" >
<Form.Label >Référence *</Form.Label>
<Form.Control
required
type="text"
placeholder="Référence"
value={reference}
onChange={(e)=>setReference(e.target.value)}
/>
<Form.Control.Feedback type="invalid">
Saisir Référence Article
</Form.Control.Feedback>
</Form.Group>
<Form.Group as={Col} md="6">
<Form.Label>Désignation *</Form.Label>
<Form.Control
required
type="text"
placeholder="Désignation"
value={designation}
onChange={(e)=>setDesignation(e.target.value)}
/>
<Form.Control.Feedback type="invalid">
Saisir Désignation
</Form.Control.Feedback>
</Form.Group>
</Row>
<Row className="mb-2">
<Form.Group className="col-md-6">
<Form.Label>Marque *</Form.Label>
<InputGroup hasValidation>
<Form.Control
type="text"
required
placeholder="Marque"
value={marque}
onChange={(e)=>setMarque(e.target.value)}
/>
<Form.Control.Feedback type="invalid">
Marque Incorrecte
</Form.Control.Feedback>
</InputGroup>
</Form.Group>
<Form.Group as={Col} md="6">
<Form.Label>Prix</Form.Label>
<Form.Control
type="number"
placeholder="Prix"
value={prix}
onChange={(e)=>setPrix(e.target.value)}
/>
</Form.Group>
</Row>
<Row className="mb-3">
<Form.Group className="col-md-6 ">
<Form.Label>
Qté stock<span className="req-tag">*</span>
</Form.Label>
<Form.Control
required
type="number"
value={qtestock}
onChange={(e)=>setQtestock(e.target.value)}
placeholder="Qté stock"
/>
<Form.Control.Feedback type="invalid">
Qté stock Incorrect
</Form.Control.Feedback>
</Form.Group>
<Form.Group as={Col} md="6">
<Form.Label>Image</Form.Label>
<Form.Control
type="text"
placeholder="Image"
value={imageart}
onChange={(e)=>setImageart(e.target.value)}
/>
</Form.Group>
<Form.Group as={Col} md="12">
<Form.Label>S/Catégorie</Form.Label>
<Form.Control
as="select"
type="select"
value={scategorieID}
onChange={(e)=>setScategorieID(e.target.value)}
>
<option></option>
{!isLoading? scategories.map((scat)=><option key={scat._id}
value={scat._id}>{scat.nomscategorie}</option>):null}
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
export default Editarticle