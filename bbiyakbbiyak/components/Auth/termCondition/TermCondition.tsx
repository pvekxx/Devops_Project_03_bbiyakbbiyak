import React from "react";
import TermConditionContent from "../termConditionContent/TermConditionContent";
import Alert from "../../UI/Alert/Alert";

interface TermConditionContentProps {
  textColor?: string;
  children: React.ReactNode;
  isPressed?: boolean | undefined; // isPressed는 boolean 타입
  alert?: string;
  onPress?: () => void;
}

const TermCondition: React.FC<TermConditionContentProps> = ({
  children,
  textColor,
  isPressed,
  onPress,
  alert,
}) => {
  return (
    <>
      <TermConditionContent isPressed={isPressed} onPress={onPress}>
        <Alert style={{ color: textColor }}>{alert} </Alert>
        {children}
      </TermConditionContent>
    </>
  );
};
export default TermCondition;
