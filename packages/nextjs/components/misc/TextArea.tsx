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

export interface TextAreaProps {
  classes: ClassesProps;
  content: any;
  setContent: any;
  placeholder: any;
  label?: string;
  rows: number;
}

export const TextArea = ({ content, setContent, placeholder, label, rows, classes: classesProps }: TextAreaProps) => {
  const [textAreaClasses, setTextAreaClasses] = useState("");
  const [wrapperClasses, setWrapperClasses] = useState("");

  useEffect(() => {
    const _textAreaClasses = {
      padding: classesProps?.padding ? `p-${classesProps?.padding}` : "",
      borderColor: classesProps?.borderColor
        ? `border-2 border-${classesProps?.borderColor} active:border-${classesProps?.borderColor} focus:outline-${classesProps?.borderColor}`
        : "", // TODO: Focus border not applying
      textColor: classesProps?.textColor ? `text-${classesProps?.textColor}` : "",
      textSize: classesProps?.textColor ? `text-${classesProps?.textSize}` : "",
      hover: classesProps?.hover ? classesProps.hover : "",
    } as ClassesProps;

    // Note: 'bg-primary' is the because Tailwind sometimes bugs out and doesn't take in the passed dynamic value
    const textAreaClassesJoined = classNames(
      "w-full rounded-lg gap", // bg-primary
      ...Object.values(_textAreaClasses),
    );

    const _wrapperClasses = {
      width: classesProps?.width ? `!w-${classesProps?.width}` : "",
      height: classesProps?.height ? `!h-${classesProps?.height}` : "",
    };

    const wrapperClassesJoined = classNames(
      "flex flex-col gap-1", // bg-primary
      ...Object.values(_wrapperClasses),
    );

    setTextAreaClasses(textAreaClassesJoined);
    setWrapperClasses(wrapperClassesJoined);
  }, [classesProps]);

  return (
    <div className={wrapperClasses}>
      {label && <label className="text-neutral font-bold">{label}</label>}
      <textarea
        rows={rows || 10}
        className={textAreaClasses}
        value={content}
        onChange={setContent}
        placeholder={placeholder}
      />
    </div>
  );
};
