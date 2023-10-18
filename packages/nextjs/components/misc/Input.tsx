import { useEffect, useState } from "react";
import { classNames } from "~~/utils/adora/cssUtils";

export interface ClassesProps {
  width?: string;
  height?: string;
  padding?: string;
  borderColor?: string;
  textColor?: string;
  textSize?: string;
  hover?: string;
}

export interface InputProps {
  classes: ClassesProps;
  content: any;
  setContent: any;
  placeholder: any;
  type: string;
}

export const Input = ({ content, setContent, placeholder, type, classes: classesProps }: InputProps) => {
  const [inputClasses, setInputClasses] = useState("");

  useEffect(() => {
    const _inputClasses = {
      width: classesProps?.width ? `w-${classesProps?.width}` : "",
      height: classesProps?.height ? `h-${classesProps?.height}` : "",
      padding: classesProps?.padding ? `p-${classesProps?.padding}` : "",
      borderColor: classesProps?.borderColor ? `border-2 border-${classesProps?.borderColor}` : "",
      textColor: classesProps?.textColor ? `text-${classesProps?.textColor}` : "",
      textSize: classesProps?.textColor ? `text-${classesProps?.textSize}` : "",
      hover: classesProps?.hover ? classesProps.hover : "",
    } as ClassesProps;

    // Note: 'bg-primary' is the because Tailwind sometimes bugs out and doesn't take in the passed dynamic value
    const inputClassesJoined = classNames(
      "flex flex-row justify-center items-center rounded-lg gap-2", // bg-primary
      ...Object.values(_inputClasses),
    );

    setInputClasses(inputClassesJoined);
  }, [classesProps]);

  return (
    <input
      className={inputClasses}
      value={content}
      onChange={e => setContent(e.target.value)}
      placeholder={placeholder}
      type={type}
    />
  );
};
