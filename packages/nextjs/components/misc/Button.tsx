interface ButtonProps {
  widthPx?: number;
  heightPx?: number;
  bgColor?: string;
  textColor?: string;
  text: string;
  onClick: any;
}

export const Button = (props: ButtonProps) => {
  const settings = {
    widthPx: props.widthPx || 80,
    heightPx: props.heightPx || 12,
    bgColor: props.bgColor || "secondary-content",
    textColor: props.textColor || "accent",
    text: props.text || "{button_text}",
    onClick: props.onClick || (() => console.log("button_action")),
  } as ButtonProps;

  return (
    <button
      onClick={settings.onClick}
      className={`
            rounded-lg 
            w-${settings.widthPx} 
            h-${settings.heightPx} 
            bg-${settings.bgColor} 
            text-${settings.textColor}`}
    >
      {settings.text}
    </button>
  );
};
