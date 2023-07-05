import '../styles/PopUpActivity.css'
import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddIcon from '@mui/icons-material/Add';
import { Modal, Box, Typography, TextField, Button, InputLabel  } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

const actions = [
  { icon: <AddIcon />, name: 'Créer une activité'},
];

export default function BasicSpeedDial() {
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => {
        setOpenModal(true);
      };
      
      const handleCloseModal = () => {
        setOpenModal(false);
      };

      const [category, setCategory] = React.useState('');

      const handleChange = (event) => {
        setCategory(event.target.value);
      };

      const [categories, setCategories] = React.useState([]);

      const handleCategory = async () => {
        try {
          const responseCategory = await axios.get('http://127.0.0.1:3030/category/getCategories');
          setCategories(responseCategory.data.categories);
        } catch (error) {
          console.error(error);
        }
      };
      


      const handleSubmit = async (event) => {
        event.preventDefault();

    // Récupérer les valeurs du formulaire
    const subject = event.target.elements.nomActivite.value;
    const address = event.target.elements.adresse.value;
    const postal_code = event.target.elements.codePostal.value;
    const city = event.target.elements.ville.value;
    const date_activity = event.target.elements.dateCommencement.value;
    const max_person = event.target.elements.nbMaxPersonnes.value;
    const category_id = event.target.elements.selectCategory.value;

    // Construire l'objet de données à envoyer
    const formData = {
      subject,
      address,
      postal_code,
      city,
      date_activity,
      max_person,
      category_id
    };

    try {
      // Effectuer la requête POST avec Axios
      const response = await axios.post('http://127.0.0.1:3030/activity/addActivity', formData);

      // Traiter la réponse de l'API
      console.log(response.data); // Vous pouvez afficher ou utiliser la réponse de l'API ici

      // Fermer le modal après la soumission réussie
      handleCloseModal();
    } catch (error) {
      // Gérer les erreurs de requête
      console.error(error);
    }
  };
  handleCategory();
  return (
    <Box sx={{ height: 690, width: 1580, transform: 'translateZ(0px)', flexGrow: 1, position: 'fixed' }}>
      <SpeedDial
        ariaLabel="SpeedDial friendZone"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleOpenModal}
          />
        ))}
      </SpeedDial>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box className="formContainer" sx={style}>
        <Typography className="formField" variant="h6" component="div" gutterBottom>
            Création d'activité
          </Typography>

          <form onSubmit={handleSubmit} id='form'>
          <InputLabel id="demo-controlled-open-select-label">Sélectionné une catégorie</InputLabel>
          <Select
                  labelId="demo-simple-select-label"
                  id="selectCategory"
                  value={category}
                  label="category"
                  onChange={handleChange}
                  name='selectCategory'
                  MenuProps={MenuProps}
              >
              <MenuItem disabled value="">
                <em>Choix d'une catégorie</em>
              </MenuItem>
                {categories.map(category => (
                  <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                ))}
              </Select>
                <TextField className="formField" name='nomActivite' label="Nom de l'activité" fullWidth required />
                <TextField className="formField" name='adresse' label="Adresse" fullWidth required />
                <TextField className="formField" name='codePostal' label="Code postal" fullWidth required />
                <TextField className="formField" name='ville' label="Ville" fullWidth required />
                <TextField className="formField" name='dateCommencement' type="date" fullWidth required />
                <InputLabel id="demo-controlled-open-select-label">Date de commencement</InputLabel>
                <TextField className="formField" name='nbMaxPersonnes' label="Nombre maximum de personnes" type="number" fullWidth required />
            <Button type="submit" variant="contained">
              Créer
            </Button>
            <Button onClick={handleCloseModal} variant="contained">
              Annuler
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}