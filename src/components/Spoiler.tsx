import * as React from 'react'

export type SpoilerProps = {
  label?: string
  children: React.ReactNode
}

export const Spoiler = (props: SpoilerProps) => {
  const [open, setOpen] = React.useState(true);

  
    return open ? props.children : (
      <button
        onClick={() => setOpen(true)}
        style={{cursor: 'pointer', borderRadius: '4px', backgroundColor: '#eee', marginBottom: '1.45rem'}}>
        {props.label || "Click to open"}
      </button>
    )
}