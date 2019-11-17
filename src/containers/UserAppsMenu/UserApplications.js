import { Box, CircularProgress, Container, Grid, IconButton, makeStyles, Menu, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withFirebase } from 'firekit-provider'
import { getList, isLoading } from 'firekit'
import { Apps as AppsIcon } from '@material-ui/icons'
import { ApplicationLauncher } from '../../components/ApplicationLauncher'

const dataPath = 'userApps'

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: 300,
    [theme.breakpoints.down('sm')]: {
      width: '90vw'
    }
  }
}))

const applicationLauncherRenderer = ({ val }) => {
  return (
    <Grid item xs={4}>
      <ApplicationLauncher application={val} />
    </Grid>
  )
}

const UserApplications = ({ watchList, unwatchList, list, isLoading }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  useEffect(() => {
    watchList(dataPath)
    // return () => unwatchList(dataPath)
  })

  const handleClick = event => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <IconButton aria-controls='application-launcher-menu' aria-haspopup='true' onClick={handleClick}>
        <AppsIcon />
      </IconButton>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Container className={classes.container} maxWidth='md'>
          {isLoading
            ? <CircularProgress />
            : list.length === 0
              ? (
                <Box width='100%' height='100%'>
                  <Typography className={classes.emptyText} align='center'>No applications linked to your account. Visit the WebStore and add some!</Typography>
                </Box>
              )
              : <Grid container spacing={2}>{list.map(applicationLauncherRenderer)}</Grid>}
        </Container>
      </Menu>
    </>
  )
}

const mapStateToProps = (state, _) => ({
  isLoading: isLoading(state, dataPath),
  list: getList(state, dataPath)
})

export default compose(
  connect(
    mapStateToProps
  ),
  withFirebase
)(UserApplications)
