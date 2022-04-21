import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Grid } from '@mui/material'

import PlusOneIcon from '@mui/icons-material/PlusOne'

import CustomButton from 'components/Button/CustomButton'
import FormInput from 'components/Fields/FormInput'

import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { RootState } from '../../../store/store'
import { getFriendByUserId, updateFriend, deleteFriend } from 'store/friend'

import Header from 'layout/Header'

const Friend = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state: RootState) => state.auth)
  const { friends, loading, updated } = useAppSelector(
    (state: RootState) => state.friend
  )

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

  useEffect(() => {
    dispatch(getFriendByUserId(user.id))
      .unwrap()
      .then((resolve) => {})
      .catch((error) => {
        console.log(error)
      })
  }, [dispatch, updated])

  const handleChange = () => {}

  return (
    <>
      <Header />
      <Grid container justifyContent="center" spacing={5} py={6}>
        <Grid item xs={12}>
          <div className="flex justify-center">
            <p className="font-podium49 text-4xl uppercase text-grey">{`${user.username}`}</p>
            <p className="font-podium49 text-4xl uppercase">'s Friends</p>
          </div>
        </Grid>
        <Grid item container sm={11} lg={10} justifyContent="space-between">
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
          <Grid item xs={2}>
            <FormInput
              type="text"
              name="friendname"
              handleChange={handleChange}
              label="Search your friend"
              placeholder="Name and Email"
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Friend
