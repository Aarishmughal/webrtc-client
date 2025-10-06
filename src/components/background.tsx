type BackgroundProps = {
  size?: string;
};

const Background = ({ size = "40px 40px" }: BackgroundProps) => {
  return (
    <div
      aria-hidden={true}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `
          linear-gradient(45deg, transparent 49%, var(--color-border) 49%, var(--color-border) 51%, transparent 51%),
          linear-gradient(-45deg, transparent 49%, var(--color-border) 49%, var(--color-border) 51%, transparent 51%)
        `,
        backgroundSize: size,
      }}
    >
      
    </div>
  );
};

export default Background;
