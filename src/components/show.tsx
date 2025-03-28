import React, {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
} from "react";

interface ShowProps {
  children: ReactNode;
}

interface ShowIfProps {
  condition: boolean;
  children: ReactNode;
}

interface ShowElseProps {
  children: ReactNode;
}

export const Show = ({ children }: ShowProps) => {
  const childrenArray = Children.toArray(children);

  // Find the first <ShowIf> where condition is true
  const showIf = childrenArray.find(
    (child): child is ReactElement<ShowIfProps> =>
      isValidElement(child) &&
      child.type === ShowIf &&
      Boolean((child as ReactElement<ShowIfProps>).props.condition)
  );

  // Find the <ShowElse> component if no <ShowIf> was found
  const showElse = childrenArray.find(
    (child): child is ReactElement<ShowElseProps> =>
      isValidElement(child) && child.type === ShowElse
  );

  return (
    <>
      {showIf ? cloneElement(showIf) : showElse ? cloneElement(showElse) : null}
    </>
  );
};

export const ShowIf = ({ children }: ShowIfProps) => <>{children}</>;

export const ShowElse = ({ children }: ShowElseProps) => <>{children}</>;

// Add display names for debugging
Show.displayName = "Show";
ShowIf.displayName = "ShowIf";
ShowElse.displayName = "ShowElse";
