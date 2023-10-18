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
  content?: any;
  disabled?: boolean;
  setContent?: any;
  placeholder: any;
  type: string;
  label?: string;
}

export const Input = ({
  content,
  setContent,
  placeholder,
  type,
  label,
  disabled,
  classes: classesProps,
}: InputProps) => {
  const [inputClasses, setInputClasses] = useState("");
  const [wrapperClasses, setWrapperClasses] = useState("");

  useEffect(() => {
    const _inputClasses = {
      padding: classesProps?.padding ? `p-${classesProps?.padding}` : "",
      borderColor: classesProps?.borderColor
        ? `border-2 border-${classesProps?.borderColor} active:border-${classesProps?.borderColor} focus:outline-${classesProps?.borderColor}`
        : "", // TODO: Focus border not applying
      textColor: classesProps?.textColor ? `text-${classesProps?.textColor}` : "",
      textSize: classesProps?.textColor ? `text-${classesProps?.textSize}` : "",
      hover: classesProps?.hover ? classesProps.hover : "",
    } as ClassesProps;

    // Note: 'bg-primary' is the because Tailwind sometimes bugs out and doesn't take in the passed dynamic value
    const inputClassesJoined = classNames(
      "w-full rounded-lg gap", // bg-primary
      ...Object.values(_inputClasses),
    );

    const _wrapperClasses = {
      width: classesProps?.width ? `!w-${classesProps?.width}` : "",
      height: classesProps?.height ? `h-${classesProps?.height}` : "",
    };

    const wrapperClassesJoined = classNames(
      "flex flex-col gap-1", // bg-primary
      ...Object.values(_wrapperClasses),
    );

    setInputClasses(inputClassesJoined);
    setWrapperClasses(wrapperClassesJoined);
  }, [classesProps]);

  return (
    <div className={wrapperClasses}>
      {label && <label className="text-neutral font-bold ml-2">{label}</label>}
      <input
        disabled={disabled}
        className={inputClasses}
        value={content}
        min={type === "number" ? 0 : ""}
        onChange={setContent ? e => setContent(e.target.value) : undefined}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
};
