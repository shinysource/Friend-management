import React, { useEffect, useState } from 'react'
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
import CardContent from '@mui/material/CardContent'
import PlusOneIcon from '@mui/icons-material/PlusOne'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'

import CustomButton from 'components/Button/CustomButton'
import FormInput from 'components/Fields/FormInput'
import CustomBreadcrumbs from 'components/Breadcrumbs/CustomBreadcrumbs'
import DeleteConfirmDialog from 'components/Dialog/DeleteConfirmDialog'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import { RootState } from 'store/store'
import { getUsers, deleteUser } from 'store/user'

import Header from 'layout/Header'

const User = () => {
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state: RootState) => state.auth)
  const { users, loading, updated } = useAppSelector(
    (state: RootState) => state.user
  )

  const handleShowDelete = (id: number) => {
    setDeletingId(id)
  }

  const handleConfirmDelete = () => {
    if (!deletingId) return

    dispatch(deleteUser(deletingId))
      .unwrap()
      .then((resolve) => {
        toast.success(resolve.data.message)
      })
      .catch((error) => {
        toast.error(error.message)
      })
    setDeletingId(null)
  }

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
            onClick={() => handleShowDelete(params.row.id)}
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
          <Grid item xs={12}>
            <div className="flex justify-center">
              <span className="font-podium49 text-4xl uppercase">Users</span>
            </div>
          </Grid>
          <CardContent>
            <Grid item container sm={12} lg={12} justifyContent="space-between">
              <Grid item xs={2}>
                <Link to="/user/add">
                  <CustomButton
                    type="button"
                    model="primary"
                    variant="contained"
                    label="ADD User"
                    startIcon={<PlusOneIcon fontSize="large" />}
                  />
                </Link>
              </Grid>
            </Grid>
            <Grid container py={2} spacing={3}>
              <Grid item xs={12}>
                <DataGrid
                  components={{
                    NoRowsOverlay: () => (
                      <p className="flex justify-center py-9">No Users</p>
                    )
                  }}
                  autoHeight
                  {...users}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  rows={users.data}
                  columns={columns}
                  loading={loading}
                />
              </Grid>
            </Grid>
          </CardContent>
          <DeleteConfirmDialog
            id="delete-admin-friend"
            keepMounted
            open={!!deletingId}
            onClose={() => setDeletingId(null)}
            onConfirm={handleConfirmDelete}
          />
        </Card>
      </Container>
    </>
  )
}

export default User
