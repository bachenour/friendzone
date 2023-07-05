import '../styles/PopUpActivity.css'
import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddIcon from '@mui/icons-material/Add';
import {Modal, Box, Typography, TextField, Button, InputLabel, TextareaAutosize, Divider, Avatar} from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import {useNavigate, useLocation} from "react-router-dom";
import {blue, deepOrange} from "@mui/material/colors";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
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
  { icon: <Avatar sx={{ bgcolor: blue[500] }}>FZ</Avatar>, name: 'Créer une FrienDZone', tag: 'activity' },
  { icon: <Avatar sx={{ bgcolor: deepOrange[500] }}>FP</Avatar>, name: 'Ajouter un post', tag: 'post' },
];

export default function BasicSpeedDial() {
    const navigate = useNavigate();
    const location = useLocation();

    const [openModal, setOpenModal] = React.useState(false);
    const [actionMode, setActionMode] = React.useState('');
    
    
    
    
    const handleOpenModal = (action) => {
        setActionMode(action);
        setOpenModal(true);
        console.log(action);
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
React.useEffect(() => {
    handleCategory();
}, []);
      


    const handleSubmit = async (event) => {
        event.preventDefault();
        if(actionMode === 'activity') {
        
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
              const response = await axios.post('http://127.0.0.1:3030/activity/addActivity', formData,
                  {
                      headers: {
                          "x-access-token": localStorage.getItem('token') ?? sessionStorage.getItem('token')
                      }
                      });
        
              // Traiter la réponse de l'API
              console.log(response.data); // Vous pouvez afficher ou utiliser la réponse de l'API ici
        
              // Fermer le modal après la soumission réussie
              handleCloseModal();
            } catch (error) {
              // Gérer les erreurs de requête
              console.error(error);
            }
        }
        else if(actionMode === 'post') {
            // Récupérer les valeurs du formulaire
            const title = event.target.elements.titre.value;
            const content = event.target.elements.contenu.value;

            // Construire l'objet de données à envoyer
            const formData = {
                title,
                content
            };

            try {
                // Effectuer la requête POST avec Axios
                const response = await axios.post('http://127.0.0.1:3030/posts/addPost', formData,
                    {
                        headers: {
                            "x-access-token": localStorage.getItem('token') ?? sessionStorage.getItem('token')
                        }
                    });
                // Fermer le modal après la soumission réussie
                handleCloseModal();
                if(location.pathname === '/friendplace') {
                    //reload
                    window.location.reload();
                }
                else {
                    //redirect
                    navigate('/friendplace')
                }
                
                
            } catch (error) {
                // Gérer les erreurs de requête
                console.error(error);
            }
        }
              

  };
  
  return (
    <Box className="back-popup" sx={{ height: 690, width: 1580, transform: 'translateZ(0px)', flexGrow: 1, position: 'fixed' }} >
      <SpeedDial
        ariaLabel="SpeedDial friendZone"
        sx={{ position: 'absolute', bottom: 16, zIndex: 7, right: -250 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleOpenModal(action.tag)}
          />
        ))}
      </SpeedDial>
        {actionMode === 'activity' && (
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box className="formContainer" sx={style}>
                    <Typography className="formField" variant="h6" component="div" gutterBottom>
                        Création d'une FrienDZone
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
        )}
        {actionMode === 'post' && (
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box className="formContainer" sx={style}>
                    <Typography className="formField" variant="h6" component="div" gutterBottom>
                        Ajouter un post à la FriendPlace
                    </Typography>

                    <form onSubmit={handleSubmit} id='form'>
                        <InputLabel id="demo-controlled-open-select-label">Ajoute ton titre</InputLabel>
                        <TextField className="formField" name='titre' label="Titre" fullWidth required />
                        <InputLabel id="demo-controlled-open-select-label" >Insère ton contenu</InputLabel>
                        <TextField
                            multiline
                            rows={4} 
                            variant="outlined"
                            label="Mon Texte"
                            name='contenu'
                            fullWidth required
                        />
                        
                        <Button type="submit" variant="contained">
                            Ajouter le post
                        </Button>
                        <Button onClick={handleCloseModal} variant="contained">
                            Annuler
                        </Button>
                    </form>
                </Box>
            </Modal>
        )}
    </Box>
  );
}