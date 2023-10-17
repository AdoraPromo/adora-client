import { classNames } from "~~/utils/adora/cssUtils";

export interface ButtonProps {
  classes?: ButtonClassesProps;
  text: string;
  onClick: any;
}

export interface ButtonClassesProps {
  width?: string;
  height?: string;
  padding?: string;
  bgColor?: string;
  textColor?: string;
  textSize?: string;
  fontWeight?: string;
}

export const Button = ({ text, onClick, classes: classesProps }: ButtonProps) => {
  const classes = {
    width: classesProps?.width ? `w-${classesProps?.width}` : "",
    height: classesProps?.height ? `h-${classesProps?.height}` : "",
    padding: classesProps?.padding ? `p-${classesProps?.padding}` : "",
    bgColor: classesProps?.bgColor ? `bg-${classesProps?.bgColor}` : "",
    textColor: classesProps?.textColor ? `text-${classesProps?.textColor}` : "",
    textSize: classesProps?.textColor ? `text-${classesProps?.textSize}` : "",
    fontWeight: classesProps?.textColor ? `font-${classesProps?.fontWeight}` : "",
  } as ButtonClassesProps;

  // Note: 'bg-primary' is the because Tailwind sometimes bugs out and doesn't take in the passed dynamic value
  const classesJoined = classNames(
    "flex flex-row justify-center items-center rounded-lg bg-primary ",
    ...Object.values(classes),
  );

  return (
    <button onClick={onClick} className={classesJoined}>
      {text}
    </button>
  );
};
