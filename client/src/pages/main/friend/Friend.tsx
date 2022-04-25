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

import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { RootState } from '../../../store/store'
import {
  getFriendByUserId,
  updateFriend,
  deleteFriend,
  getFriendByEmail
} from 'store/friend'

import Header from 'layout/Header'

const Friend = () => {
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state: RootState) => state.auth)
  const { friend, friends, loading, updated } = useAppSelector(
    (state: RootState) => state.friend
  )

  const handleShowDelete = (id: number) => {
    setDeletingId(id)
  }

  const handleConfirmDelete = () => {
    if (!deletingId) return

    dispatch(deleteFriend(deletingId))
      .unwrap()
      .then((resolve) => {
        toast.success(resolve.data.message)
      })
      .catch((error) => {
        toast.error(error.message)
      })
    setDeletingId(null)
  }

  const handleDelete = React.useCallback(
    async (id: number) => {
      dispatch(deleteFriend(id))
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
    navigate('/friend/edit/' + id)
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'friendname', headerName: 'Name', flex: 2 },
    { field: 'email', headerName: 'Email', flex: 3 },
    { field: 'gender', headerName: 'Gender', flex: 1 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      flex: 1
    },
    {
      field: 'hobbies',
      headerName: 'Hobbies',
      flex: 4
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 4
    },
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
    dispatch(getFriendByUserId(user.id))
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
            <CustomBreadcrumbs />
          </Grid>
        </Grid>

        <Grid pt={2}></Grid>
        <Card>
          <Grid item xs={12}>
            <div className="flex justify-center">
              <p className="font-podium49 text-4xl uppercase text-grey">{`${user.username}`}</p>
              <p className="font-podium49 text-4xl uppercase">'s New Friend</p>
            </div>
          </Grid>
          <CardContent>
            <Grid item container sm={12} lg={12} justifyContent="space-between">
              <Grid item xs={2}>
                <Link to="/friend/add">
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
                  components={{
                    NoRowsOverlay: () => (
                      <p className="flex justify-center py-9">No Friends</p>
                    )
                  }}
                  autoHeight
                  {...friend}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  rows={friends.data}
                  columns={columns}
                  loading={loading}
                />
              </Grid>
            </Grid>
          </CardContent>
          <DeleteConfirmDialog
            id="delete-confirm-dialog"
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

export default Friend
