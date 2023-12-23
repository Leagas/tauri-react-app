import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import {
  useNavigate,
} from '@tanstack/react-router'
import { useRecoilState } from 'recoil';
import { navigationAtom } from "../store";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export const MainList = () => {
  const [navigation, setNavigation] = useRecoilState(navigationAtom);
  const navigate = useNavigate()

  const handleNavigate = (name: string, e?: any) => {
    if (e) e.stopPropagation()
    setNavigation(name)
    navigate({ to: name })
  }

  return (
    <React.Fragment>
      <ListItemButton onClick={() => handleNavigate('dashboard')}>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <div>
        <Accordion expanded={navigation.includes('production')} onClick={() => handleNavigate('production')}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Production</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ListItemButton onClick={(e) => handleNavigate('production/status', e)}>
              <ListItemText style={{ paddingLeft: '20%' }} primary="Status" />
            </ListItemButton>
            <ListItemButton onClick={(e) => handleNavigate('production/client', e)}>
              <ListItemText style={{ paddingLeft: '20%' }} primary="Client" />
            </ListItemButton>
          </AccordionDetails>
        </Accordion>
      </div>
      <div>
        <Accordion expanded={navigation.includes('staging')} onClick={() => handleNavigate('staging')}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Staging</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ListItemButton onClick={(e) => handleNavigate('staging/status', e)}>
              <ListItemText style={{ paddingLeft: '20%' }} primary="Status" />
            </ListItemButton>
            <ListItemButton onClick={(e) => handleNavigate('staging/client', e)}>
              <ListItemText style={{ paddingLeft: '20%' }} primary="Client" />
            </ListItemButton>
          </AccordionDetails>
        </Accordion>
      </div>
    </React.Fragment>
  )
}
