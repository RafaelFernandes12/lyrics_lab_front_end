'use client'

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import RemoveIcon from '@mui/icons-material/Remove';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import Board from './Board';

const drawerWidth = 200;

export default function ResponsiveDrawer() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <List>
        {['Baixar PDF', 'Excluir'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <PictureAsPdfIcon /> : <DeleteIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Linha de texto', 'Linha de cifra'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AddIcon /> 
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['1/2 Tom', '1/2 Tom'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <AddIcon /> : <RemoveIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <div className="flex gap-10">
        <Drawer
          variant="permanent"
          className='max-sm:hidden'
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, position: 'relative', border: 'none', borderRadius:'12px' },
          }}
          open
        >
          {drawer}
        </Drawer>
        <div>
          <h1 className="text-2xl font-semibold">Nome da música</h1>
            <h3 className="text-lg">Tom: Cm7</h3>
          <button
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            className='sm:hidden p-0'
          >
            <MenuIcon />
          </button>
          <div className='max-sm:hidden mt-10'>
            <Board />
          </div>
        </div>
      </div>
      <div className='sm:hidden mt-10'>
        <Board /> 
      </div>
      <Drawer
        anchor='bottom'
        variant="temporary"
        className='sm:hidden'
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 'full' },
        }}
      >
        {drawer}
      </Drawer>
    </div>
  );
}