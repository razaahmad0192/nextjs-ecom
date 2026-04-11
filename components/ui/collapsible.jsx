"use client"

import React, { forwardRef } from "react"
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"

function Collapsible({
  ...props
}) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

const CollapsibleTrigger = forwardRef(function CollapsibleTrigger(
  { children, ...props },
  ref
) {
  return (
    <CollapsiblePrimitive.Trigger 
      ref={ref}
      data-slot="collapsible-trigger" 
      asChild
      {...props}
    >
      {children}
    </CollapsiblePrimitive.Trigger>
  );
});

function CollapsibleContent({
  ...props
}) {
  return (<CollapsiblePrimitive.Panel data-slot="collapsible-content" {...props} />);
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
