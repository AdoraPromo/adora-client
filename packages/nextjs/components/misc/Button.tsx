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

  const classesJoined = Object.values(classes).join(" ");

  return (
    <button onClick={onClick} className={`flex flex-row justify-center items-center rounded-lg ${classesJoined}`}>
      {text}
    </button>
  );
};
