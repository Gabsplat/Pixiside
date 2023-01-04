type Props = {
  className?: string;
  children: React.ReactNode;
};

function Container({ className, children }: Props) {
  return (
    <div className={`m-auto w-2/3 md:w-9/12 ${className}`}>{children}</div>
  );
}

export default Container;
