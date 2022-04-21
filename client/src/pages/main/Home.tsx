import { useEffect } from 'react'
import { Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { RootState } from '../../store/store'
import { setChecked, verify } from '../../store/auth'

import Header from 'layout/Header'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state: RootState) => state.auth)

  return (
    <>
      <Header />
      <div>
        <Grid container alignItems="center" className="home-back">
          <Grid container justifyContent="center" alignItems="center" pt={50}>
            <div className="text-animate-content text-4xl font-normal text-center py-2 md:py-4 lg:py-4 w-full sm:w-full md:w-full lg:w-full">
              <div className="text-animate-content-container">
                <ul className="text-animate-content-container-list">
                  <li className="font-podium96 text-animate-content-container-list-item uppercase mx-auto w-[180px] sm:w-[160px] lg:w-full">
                    Welcome to our Friend's management
                  </li>
                </ul>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default Home
