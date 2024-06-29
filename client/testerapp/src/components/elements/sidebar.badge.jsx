import styled from '@emotion/styled';
import React from 'react';

const StyledBadge = styled.div(props => ({
  minWidth: '18px',
  minHeight: '18px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: props.shape === 'circle' ? '50%' : '16px',
  padding: props.shape === 'circle' ? '0' : '0 6px',
  fontSize: '11px',
  fontWeight: 600,
  backgroundColor: props.variant === 'info' ? '#048acd' :
                    props.variant === 'success' ? '#0cbb34' :
                    props.variant === 'danger' ? '#fb3939' :
                    props.variant === 'warning' ? '#e25807' : '#048acd',
  color: '#fff',
}));

export const Badge = ({
  children,
  variant = 'info',
  shape = 'rounded',
  ...rest
}) => {
  return (
    <StyledBadge variant={variant} shape={shape} {...rest}>
      {children}
    </StyledBadge>
  );
};