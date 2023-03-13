import React from 'react'
import { Link } from '../../Link'
import { ListItem } from '../../ListItem'
import { Link as LinkType } from '../../../../schemas'

export const ServiceNavListItem = ({
  id,
  href,
  title,
  text,
  srOnly,
}: LinkType) => (
  <ListItem key={`fmli-${id}`} type="menu">
    <Link
      dataTestId={`footer-menu-link-${id}`}
      to={href}
      title={title}
      lineThrough={true}
      srOnly={srOnly}
    >
      {text}
    </Link>
  </ListItem>
)
