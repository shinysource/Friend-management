import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Grid, Container } from '@mui/material'
import Divider from '@mui/material/Divider'
import {
  DataGrid,
  GridRenderCellParams,
  GridColDef,
  GridValueGetterParams,
  GridActionsCellItem
} from '@mui/x-data-grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import PlusOneIcon from '@mui/icons-material/PlusOne'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'

import CustomButton from 'components/Button/CustomButton'
import FormInput from 'components/Fields/FormInput'
import CustomBreadcrumbs from 'components/Breadcrumbs/CustomBreadcrumbs'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import { RootState } from 'store/store'
import { getUsers, deleteUser } from 'store/user'

import Header from 'layout/Header'

const User = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state: RootState) => state.auth)
  const { users, loading, updated } = useAppSelector(
    (state: RootState) => state.user
  )

  const handleDelete = React.useCallback(
    async (id: number) => {
      dispatch(deleteUser(id))
        .unwrap()
        .then((resolve) => {
          toast.success(resolve.data.message)
        })
        .catch((error) => {
          toast.error(error.message)
        })
    },
    [dispatch]
  )

  const handleEdit = (id: number) => {
    navigate('/user/edit/' + id)
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'username', headerName: 'Name', flex: 2 },
    { field: 'email', headerName: 'Email', flex: 3 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 2,
      align: 'center',
      renderCell: (params: GridRenderCellParams) => (
        <>
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEdit(params.row.id)}
            color="inherit"
          />
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDelete(params.row.id)}
            color="inherit"
          />
        </>
      )
    }
  ]

  useEffect(() => {
    dispatch(getUsers())
      .unwrap()
      .then((resolve) => {})
      .catch((error) => {
        console.log(error)
      })
  }, [dispatch, updated])

  return (
    <>
      <Header />
      <Container>
        <Grid container>
          <Grid item py={2}>
            <CustomBreadcrumbs root="admin" />
          </Grid>
        </Grid>

        <Grid pt={2}></Grid>
        <Card>
          <CardHeader>
            <Grid item xs={12}>
              <div className="flex justify-center">
                <p className="font-podium49 text-4xl uppercase text-grey">{`${user.username}`}</p>
                <p className="font-podium49 text-4xl uppercase">
                  's New Friend
                </p>
              </div>
            </Grid>
          </CardHeader>
          <CardContent>
            <Grid item container sm={12} lg={12} justifyContent="space-between">
              <Grid item xs={2}>
                <Link to="/user/add">
                  <CustomButton
                    type="button"
                    model="primary"
                    variant="contained"
                    label="ADD Friend"
                    startIcon={<PlusOneIcon fontSize="large" />}
                  />
                </Link>
              </Grid>
            </Grid>
            <Grid container py={2} spacing={3}>
              <Grid item xs={12}>
                <DataGrid
                  autoHeight
                  {...users}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  rows={users}
                  columns={columns}
                  loading={loading}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

export default User
