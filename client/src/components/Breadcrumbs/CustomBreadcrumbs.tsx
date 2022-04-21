import React from 'react'
import Link, { LinkProps } from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import {
  Link as RouterLink,
  Route,
  Routes,
  MemoryRouter,
  useLocation
} from 'react-router-dom'

const breadcrumbNameMap: { [key: string]: string } = {
  '/friend': 'Friend',
  '/friend/add': 'Add',
  '/friend/edit': 'Edit',
  '/profile': 'Profile'
}

interface LinkRouterProps extends LinkProps {
  to: string
  replace?: string
}

const LinkRouter = (props: LinkRouterProps) => (
  <Link {...props} component={RouterLink as any} />
)

const CustomBreadcrumbs = () => {
  const loaction = useLocation()
  const pathnames = loaction.pathname.split('/').filter((x) => x)

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <LinkRouter underline="hover" color="inherit" to="/home">
        User
      </LinkRouter>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1
        const to = `/${pathnames.slice(0, index + 1).join('/')}`

        return last ? (
          <Typography color="text.primary" key={to}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to}>
            {breadcrumbNameMap[to]}
          </LinkRouter>
        )
      })}
    </Breadcrumbs>
  )
}

export default CustomBreadcrumbs
