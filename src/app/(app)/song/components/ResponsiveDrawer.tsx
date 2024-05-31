'use client'

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import Board from './Board';

const drawerWidth = 180;

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
      <div className="flex gap-10 max-sm:gap-2 items-start">
        <Box
          component="nav"
          className='sm:{drawerWidth}'
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className='sm:hidden'
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            variant="temporary"
            className='sm:hidden'
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            className='max-sm:hidden'
            sx={{
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, position: 'relative' },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <div className="gap-3">
          <h1 className="text-3xl font-semibold">Nome da música</h1>
          <h3 className="text-lg mb-10">Tom: Cm7</h3>
          <div className='max-sm:hidden'>
            <Board />
          </div>
        </div>
      </div>
      <div className='sm:hidden mt-10'>
        <Board /> 
      </div>
    </div>
  );
}
